import type { PatternId, Progress, AttemptRecord } from "@/types";
import { patterns } from "@/data/patterns";

const STORAGE_KEY = "dsa-pattern-drill-progress";

function createEmptyPatternStats(): Record<PatternId, { attempted: number; correct: number }> {
  return Object.fromEntries(
    patterns.map((pattern) => [pattern.id, { attempted: 0, correct: 0 }])
  ) as Record<PatternId, { attempted: number; correct: number }>;
}

export function createEmptyProgress(): Progress {
  return {
    totalAttempted: 0,
    totalCorrect: 0,
    seenQuestionIds: [],
    patternStats: createEmptyPatternStats(),
    history: [],
  };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return createEmptyProgress();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyProgress();
    const parsed = JSON.parse(raw) as Progress;
    return {
      ...createEmptyProgress(),
      ...parsed,
      patternStats: {
        ...createEmptyPatternStats(),
        ...parsed.patternStats,
      },
    };
  } catch {
    return createEmptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordAttempt(
  progress: Progress,
  attempt: Omit<AttemptRecord, "timestamp"> & { timestamp?: string }
): Progress {
  const fullAttempt: AttemptRecord = {
    ...attempt,
    timestamp: attempt.timestamp ?? new Date().toISOString(),
  };

  const patternStats = { ...progress.patternStats };
  const ps = { ...patternStats[attempt.correctPattern] };
  ps.attempted += 1;
  if (attempt.isCorrect) ps.correct += 1;
  patternStats[attempt.correctPattern] = ps;

  const seenQuestionIds = progress.seenQuestionIds.includes(attempt.questionId)
    ? progress.seenQuestionIds
    : [...progress.seenQuestionIds, attempt.questionId];

  return {
    totalAttempted: progress.totalAttempted + 1,
    totalCorrect: progress.totalCorrect + (attempt.isCorrect ? 1 : 0),
    seenQuestionIds,
    patternStats,
    history: [...progress.history.slice(-99), fullAttempt],
  };
}

export function getAccuracy(progress: Progress): number {
  if (progress.totalAttempted === 0) return 0;
  return Math.round((progress.totalCorrect / progress.totalAttempted) * 100);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
