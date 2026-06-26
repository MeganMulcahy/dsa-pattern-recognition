import type { Difficulty, PatternId, Question } from "@/types";
import slugPatterns from "@/data/slug-patterns.json";
import { inferPattern } from "@/lib/pattern-inference";
import { filterDisplayTags } from "@/lib/tag-filter";

const LIST_URL = "https://leetcode.com/api/problems/all/";
const GRAPHQL_URL = "https://leetcode.com/graphql";

const DIFFICULTY_MAP: Record<number, Difficulty> = {
  1: "easy",
  2: "medium",
  3: "hard",
};

export interface LCListItem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  paidOnly: boolean;
  topicSlugs: string[];
}

interface LCListCache {
  problems: LCListItem[];
  fetchedAt: number;
}

let listCache: LCListCache | null = null;
const LIST_TTL_MS = 60 * 60 * 1000;

const QUESTION_QUERY = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      difficulty
      content
      topicTags { name slug }
      hints
    }
  }
`;

export function stripHtml(html: string): string {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<code[^>]*>/gi, "")
    .replace(/<\/code>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchProblemList(): Promise<LCListItem[]> {
  if (listCache && Date.now() - listCache.fetchedAt < LIST_TTL_MS) {
    return listCache.problems;
  }

  const res = await fetch(LIST_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`LeetCode list API error: ${res.status}`);

  const data = (await res.json()) as {
    stat_status_pairs: Record<
      string,
      {
        stat: { question__title: string; question__title_slug: string; question__hide?: boolean };
        difficulty: { level: number };
        paid_only: boolean;
      }
    >;
  };

  const problems: LCListItem[] = Object.values(data.stat_status_pairs)
    .filter((p) => !p.paid_only && !p.stat?.question__hide)
    .map((p) => ({
      slug: p.stat.question__title_slug,
      title: p.stat.question__title,
      difficulty: DIFFICULTY_MAP[p.difficulty.level] ?? "medium",
      paidOnly: p.paid_only,
      topicSlugs: [],
    }));

  listCache = { problems, fetchedAt: Date.now() };
  return problems;
}

export async function fetchProblemDetail(slug: string) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUESTION_QUERY,
      variables: { titleSlug: slug },
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`LeetCode GraphQL error: ${res.status}`);

  const json = await res.json();
  const q = json.data?.question;
  if (!q) throw new Error(`Problem not found: ${slug}`);

  return {
    questionId: String(q.questionId),
    title: q.title as string,
    difficulty: (q.difficulty as string).toLowerCase() as Difficulty,
    contentHtml: q.content as string,
    topicTags: (q.topicTags as { name: string; slug: string }[]) ?? [],
    hints: ((q.hints as string[]) ?? []).map(stripHtml).filter(Boolean),
  };
}

function matchesPatternFilter(
  slug: string,
  title: string,
  topicSlugs: string[],
  patternId: PatternId
): boolean {
  const known = slugPatterns[slug as keyof typeof slugPatterns];
  if (known === patternId) return true;

  const inferred = inferPattern({ slug, title, topicSlugs });
  return (
    inferred.correctPattern === patternId ||
    inferred.acceptedPatterns?.includes(patternId) === true
  );
}

export async function fetchRandomQuestion(options: {
  excludeSlugs?: string[];
  patternId?: PatternId;
  maxAttempts?: number;
}): Promise<Question> {
  const exclude = new Set(options.excludeSlugs ?? []);
  const list = await fetchProblemList();
  const pool = list.filter((p) => !exclude.has(p.slug));

  if (pool.length === 0) {
    throw new Error("No unseen problems available — clear your progress or practice repeats.");
  }

  const maxAttempts = options.maxAttempts ?? 40;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  for (let attempt = 0; attempt < Math.min(maxAttempts, shuffled.length); attempt++) {
    const candidate = shuffled[attempt];
    try {
      const detail = await fetchProblemDetail(candidate.slug);
      const topicSlugs = detail.topicTags.map((t) => t.slug);

      if (
        options.patternId &&
        !matchesPatternFilter(candidate.slug, detail.title, topicSlugs, options.patternId)
      ) {
        continue;
      }

      const inferred = inferPattern({
        slug: candidate.slug,
        title: detail.title,
        topicSlugs,
      });

      const description = stripHtml(detail.contentHtml);
      const tags = filterDisplayTags(detail.topicTags);

      return {
        id: candidate.slug,
        title: detail.title,
        description,
        difficulty: detail.difficulty,
        correctPattern: inferred.correctPattern,
        acceptedPatterns: inferred.acceptedPatterns,
        hints: detail.hints.length > 0 ? detail.hints : inferred.fallbackHints,
        solution: inferred.solution,
        tags,
        leetcodeUrl: `https://leetcode.com/problems/${candidate.slug}/`,
      };
    } catch {
      continue;
    }
  }

  if (options.patternId) {
    return fetchRandomQuestion({
      excludeSlugs: options.excludeSlugs,
      maxAttempts,
    });
  }

  throw new Error("Could not load a problem from LeetCode. Try again.");
}

export async function getProblemCount(): Promise<number> {
  const list = await fetchProblemList();
  return list.length;
}
