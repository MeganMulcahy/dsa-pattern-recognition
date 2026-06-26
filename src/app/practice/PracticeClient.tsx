"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PatternId, Progress, Question } from "@/types";
import { QuestionCard } from "@/components/QuestionCard";
import { PatternPicker } from "@/components/PatternPicker";
import { SolutionReveal } from "@/components/SolutionReveal";
import { PageShell } from "@/components/PageShell";
import { fetchRandomQuestion, isCorrectPattern } from "@/lib/quiz";
import { patternMap } from "@/data/patterns";
import { loadProgress, saveProgress, recordAttempt } from "@/lib/progress";

type Phase = "question" | "revealed";

export default function PracticeClient() {
  const searchParams = useSearchParams();
  const patternFilter = searchParams.get("pattern") as PatternId | null;

  const [progress, setProgress] = useState<Progress | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedPattern, setSelectedPattern] = useState<PatternId | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuestion = useCallback(
    async (seenIds: string[], pattern?: PatternId | null) => {
      setLoading(true);
      setError(null);
      try {
        const q = await fetchRandomQuestion({
          excludeSlugs: seenIds,
          patternId: pattern ?? undefined,
        });
        setQuestion(q);
        setPhase("question");
        setSelectedPattern(null);
        setShowHints(false);
        setIsCorrect(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load question");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    loadQuestion(loaded.seenQuestionIds, patternFilter);
  }, [loadQuestion, patternFilter]);

  const handleSubmit = () => {
    if (!question || !selectedPattern || !progress) return;
    const correct = isCorrectPattern(question, selectedPattern);
    setIsCorrect(correct);
    const updated = recordAttempt(progress, {
      questionId: question.id,
      selectedPattern,
      correctPattern: question.correctPattern,
      isCorrect: correct,
    });
    setProgress(updated);
    saveProgress(updated);
    setPhase("revealed");
  };

  const handleNext = () => {
    if (!progress) return;
    loadQuestion(progress.seenQuestionIds, patternFilter);
  };

  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-4 pb-16 pt-8">
        <div className="mb-6 flex items-end justify-between border-b border-[var(--lc-border)] pb-4">
          <div>
            <h1 className="lc-page-title">Practice</h1>
            <p className="mt-1 text-sm text-[var(--lc-text-muted)]">
              {progress ? (
                <>
                  {progress.seenQuestionIds.length} seen this session
                  {patternFilter && patternMap[patternFilter] && (
                    <>
                      {" · "}
                      <span className="text-[var(--lc-orange)]">
                        {patternMap[patternFilter].name}
                      </span>
                    </>
                  )}
                </>
              ) : (
                "Loading…"
              )}
            </p>
          </div>
          <Link
            href="/stats"
            className="text-sm text-[var(--lc-link)] hover:underline"
          >
            Stats
          </Link>
        </div>

        {loading && (
          <div className="lc-panel flex flex-col items-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--lc-border)] border-t-[var(--lc-orange)]" />
            <p className="mt-4 text-sm text-[var(--lc-text-muted)]">
              Loading from LeetCode…
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="space-y-4">
            <div className="lc-panel p-5 text-center">
              <p className="text-sm text-[var(--lc-hard)]">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => progress && loadQuestion(progress.seenQuestionIds, patternFilter)}
              className="lc-btn-primary w-full"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && question && progress && (
          <div className="space-y-6">
            <QuestionCard
              question={question}
              showHints={showHints}
              onToggleHints={() => setShowHints((v) => !v)}
            />
            <PatternPicker
              selected={selectedPattern}
              onSelect={setSelectedPattern}
              disabled={phase === "revealed"}
            />
            {phase === "question" ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedPattern}
                className="lc-btn-primary w-full disabled:opacity-50"
              >
                Submit
              </button>
            ) : (
              <>
                <SolutionReveal
                  question={question}
                  selectedPattern={selectedPattern!}
                  isCorrect={isCorrect}
                />
                <button type="button" onClick={handleNext} className="lc-btn-secondary w-full">
                  Next Question
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </PageShell>
  );
}
