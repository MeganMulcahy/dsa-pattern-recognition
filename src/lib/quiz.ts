import type { PatternId, Question } from "@/types";

export function isCorrectPattern(
  question: Question,
  selected: PatternId
): boolean {
  if (selected === question.correctPattern) return true;
  return question.acceptedPatterns?.includes(selected) ?? false;
}

export async function fetchRandomQuestion(options: {
  excludeSlugs?: string[];
  patternId?: PatternId;
}): Promise<Question> {
  const params = new URLSearchParams();
  if (options.excludeSlugs?.length) {
    params.set("exclude", options.excludeSlugs.join(","));
  }
  if (options.patternId) {
    params.set("pattern", options.patternId);
  }

  const res = await fetch(`/api/questions/random?${params}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to load question");
  }
  return res.json();
}
