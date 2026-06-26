import { patterns } from "@/data/patterns";
import type { PatternId, Question } from "@/types";

/** Prompt builder for the local Ollama generator script (`npm run generate-questions`). Not used at runtime. */

const VALID_PATTERNS = new Set(patterns.map((p) => p.id));

export function buildGenerationPrompt(options: {
  patternId?: PatternId;
  difficulty?: "easy" | "medium" | "hard";
  existingTitles: string[];
  count: number;
}): string {
  const patternBlock = options.patternId
    ? `Focus on the "${options.patternId}" pattern.`
    : "Cover a mix of DSA patterns.";

  const difficultyBlock = options.difficulty
    ? `All questions should be "${options.difficulty}" difficulty.`
    : "Use a mix of easy, medium, and hard difficulties.";

  const patternReference = patterns
    .map(
      (p) =>
        `- ${p.id}: ${p.name} — ${p.description} Signals: ${p.signals.join(", ")}`
    )
    .join("\n");

  const avoidBlock =
    options.existingTitles.length > 0
      ? `\nDo NOT repeat or closely paraphrase these existing problems:\n${options.existingTitles
          .slice(0, 80)
          .map((t) => `- ${t}`)
          .join("\n")}`
      : "";

  return `You are creating practice problems for a "pattern recognition" drill app. Each question describes a LeetCode-style problem and asks which algorithmic pattern solves it best.

${patternBlock}
${difficultyBlock}
Generate exactly ${options.count} unique questions.${avoidBlock}

Valid pattern IDs (use exactly one as correctPattern):
${patternReference}

Return a JSON object with a "questions" array. Each question must match this schema:
{
  "id": "kebab-case-slug",
  "title": "Problem Title",
  "description": "2-4 sentence problem statement",
  "difficulty": "easy" | "medium" | "hard",
  "correctPattern": "<pattern-id>",
  "acceptedPatterns": ["optional-alternate-pattern-id"],
  "hints": ["hint 1", "hint 2"],
  "solution": {
    "approach": ["step 1", "step 2", "..."],
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "keyInsight": "One sentence explaining why this pattern fits"
  },
  "tags": ["array", "string", etc]
}

Rules:
- Use well-known interview problems or realistic variants (not contrived trivia).
- correctPattern must be the PRIMARY best pattern; only add acceptedPatterns when another pattern is genuinely valid.
- IDs must be unique kebab-case slugs derived from the title.
- hints should nudge toward the pattern without naming it.
- No markdown, no code fences — raw JSON only.`;
}

export function parseGeneratedQuestions(raw: string): Question[] {
  const trimmed = raw.trim();
  const jsonText = trimmed.startsWith("{")
    ? trimmed
    : trimmed.slice(trimmed.indexOf("{"), trimmed.lastIndexOf("}") + 1);

  const parsed = JSON.parse(jsonText) as { questions?: Question[] };
  if (!Array.isArray(parsed.questions)) {
    throw new Error("Response missing questions array");
  }

  return parsed.questions.map(validateQuestion);
}

export function validateQuestion(q: Question): Question {
  if (!q.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(q.id)) {
    throw new Error(`Invalid id: ${q.id}`);
  }
  if (!q.title?.trim()) throw new Error(`Missing title for ${q.id}`);
  if (!q.description?.trim()) throw new Error(`Missing description for ${q.id}`);
  if (!["easy", "medium", "hard"].includes(q.difficulty)) {
    throw new Error(`Invalid difficulty for ${q.id}`);
  }
  if (!VALID_PATTERNS.has(q.correctPattern)) {
    throw new Error(`Invalid correctPattern "${q.correctPattern}" for ${q.id}`);
  }
  if (q.acceptedPatterns) {
    for (const p of q.acceptedPatterns) {
      if (!VALID_PATTERNS.has(p)) {
        throw new Error(`Invalid acceptedPattern "${p}" for ${q.id}`);
      }
    }
  }
  if (!Array.isArray(q.hints) || q.hints.length < 1) {
    throw new Error(`Missing hints for ${q.id}`);
  }
  if (!q.solution?.approach?.length || !q.solution.keyInsight) {
    throw new Error(`Incomplete solution for ${q.id}`);
  }
  if (!Array.isArray(q.tags) || q.tags.length < 1) {
    throw new Error(`Missing tags for ${q.id}`);
  }
  return q;
}
