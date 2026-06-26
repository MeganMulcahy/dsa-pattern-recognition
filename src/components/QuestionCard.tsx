import type { Question } from "@/types";
import { DifficultyBadge } from "./DifficultyBadge";

interface QuestionCardProps {
  question: Question;
  showHints: boolean;
  onToggleHints: () => void;
}

export function QuestionCard({ question, showHints, onToggleHints }: QuestionCardProps) {
  return (
    <section className="lc-panel p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-[var(--lc-border)] pb-4">
        <h2 className="text-lg font-semibold text-[var(--lc-text)]">{question.title}</h2>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <div className="lc-body whitespace-pre-line">{question.description}</div>

      {question.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span key={tag} className="lc-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {question.leetcodeUrl && (
        <a
          href={question.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-[var(--lc-link)] hover:underline"
        >
          Open on LeetCode ↗
        </a>
      )}

      <button
        type="button"
        onClick={onToggleHints}
        className="mt-4 text-sm text-[var(--lc-link)] hover:underline"
      >
        {showHints ? "Hide Hints" : "Show Hints"}
      </button>

      {showHints && (
        <div className="mt-3 lc-list">
          {question.hints.map((hint, i) => (
            <div key={i} className="px-4 py-3">
              <p className="lc-body">
                <span className="mr-2 font-mono text-xs text-[var(--lc-orange)]">
                  {i + 1}.
                </span>
                {hint}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
