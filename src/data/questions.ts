import type { Question } from "@/types";
import core from "./questions/core.json";
import extra from "./questions/extra.json";
import generated from "./questions/generated.json";

function dedupeQuestions(items: Question[]): Question[] {
  const seen = new Set<string>();
  return items.filter((q) => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}

export const questions: Question[] = dedupeQuestions([
  ...(core as Question[]),
  ...(extra as Question[]),
  ...(generated as Question[]),
]);
