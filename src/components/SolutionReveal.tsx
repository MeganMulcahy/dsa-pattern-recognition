import type { PatternId, Question } from "@/types";
import { patternMap } from "@/data/patterns";

interface SolutionRevealProps {
  question: Question;
  selectedPattern: PatternId;
  isCorrect: boolean;
}

export function SolutionReveal({
  question,
  selectedPattern,
  isCorrect,
}: SolutionRevealProps) {
  const correctPattern = patternMap[question.correctPattern];
  const chosenPattern = patternMap[selectedPattern];

  return (
    <div className="space-y-4">
      <div
        className={`lc-panel p-4 ${
          isCorrect ? "border-[var(--lc-easy)]" : "border-[var(--lc-hard)]"
        }`}
      >
        <p className="font-semibold text-[var(--lc-text)]">
          {isCorrect ? "Accepted" : "Wrong Answer"}
        </p>
        <p className="mt-1 text-sm text-[var(--lc-text-secondary)]">
          {isCorrect ? (
            <>Correct — {chosenPattern.name}.</>
          ) : (
            <>
              You picked {chosenPattern.name}. Expected primary pattern:{" "}
              <span className="text-[var(--lc-orange)]">{correctPattern.name}</span>.
              {question.acceptedPatterns && question.acceptedPatterns.length > 0 && (
                <span className="mt-1 block text-xs text-[var(--lc-text-muted)]">
                  Also accepted:{" "}
                  {question.acceptedPatterns.map((id) => patternMap[id].name).join(", ")}
                </span>
              )}
            </>
          )}
        </p>
      </div>

      <div className="lc-panel p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="lc-tag">{correctPattern.name}</span>
          <span className="text-xs font-mono text-[var(--lc-text-muted)]">
            {question.solution.timeComplexity} · {question.solution.spaceComplexity}
          </span>
        </div>

        <div className="mb-4 rounded-lg border border-[var(--lc-border)] bg-[var(--lc-code-bg)] p-4">
          <p className="lc-label mb-2">Key Insight</p>
          <p className="text-sm text-[var(--lc-text-secondary)] leading-relaxed">
            {question.solution.keyInsight}
          </p>
        </div>

        <p className="lc-label mb-3">Approach</p>
        <ol className="space-y-2">
          {question.solution.approach.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--lc-text-secondary)]">
              <span className="font-mono text-xs text-[var(--lc-orange)]">{i + 1}.</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        {question.leetcodeUrl && (
          <a
            href={question.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-[var(--lc-link)] hover:underline"
          >
            View full solution on LeetCode ↗
          </a>
        )}
      </div>
    </div>
  );
}
