import type { Difficulty } from "@/types";

const styles: Record<Difficulty, string> = {
  easy: "text-[var(--lc-easy)]",
  medium: "text-[var(--lc-medium)]",
  hard: "text-[var(--lc-hard)]",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`text-xs font-semibold capitalize ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
