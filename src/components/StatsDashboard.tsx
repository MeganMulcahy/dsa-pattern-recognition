"use client";

import type { Progress } from "@/types";
import { patterns } from "@/data/patterns";
import { getAccuracy } from "@/lib/progress";

interface StatsDashboardProps {
  progress: Progress;
  onReset?: () => void;
}

export function StatsDashboard({ progress, onReset }: StatsDashboardProps) {
  const accuracy = getAccuracy(progress);

  const patternRows = patterns
    .map((pattern) => {
      const stats = progress.patternStats[pattern.id];
      const pct =
        stats.attempted > 0
          ? Math.round((stats.correct / stats.attempted) * 100)
          : null;
      return { pattern, stats, pct };
    })
    .filter((row) => row.stats.attempted > 0)
    .sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0));

  const weakPatterns = patterns
    .map((pattern) => {
      const stats = progress.patternStats[pattern.id];
      const pct =
        stats.attempted > 0
          ? Math.round((stats.correct / stats.attempted) * 100)
          : null;
      return { pattern, stats, pct };
    })
    .filter((row) => row.stats.attempted >= 2 && (row.pct ?? 100) < 70)
    .sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0));

  if (progress.totalAttempted === 0) {
    return (
      <div className="lc-panel p-10 text-center">
        <p className="text-[var(--lc-text-secondary)]">No data yet</p>
        <p className="mt-1 text-sm text-[var(--lc-text-muted)]">
          Complete a few practice questions first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Accuracy", value: `${accuracy}%` },
          { label: "Attempted", value: progress.totalAttempted },
          { label: "Unique", value: progress.seenQuestionIds.length },
        ].map((stat) => (
          <div key={stat.label} className="lc-panel p-4 text-center">
            <p className="text-2xl font-semibold text-[var(--lc-text)]">{stat.value}</p>
            <p className="mt-1 text-xs text-[var(--lc-text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {weakPatterns.length > 0 && (
        <section>
          <h2 className="lc-label mb-2">Needs Practice</h2>
          <div className="lc-list">
            {weakPatterns.map(({ pattern, pct }) => (
              <div key={pattern.id} className="lc-list-row">
                <span>{pattern.name}</span>
                <span className="text-sm font-mono text-[var(--lc-medium)]">{pct}%</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="lc-label mb-2">By Pattern</h2>
        <div className="lc-list">
          {patternRows.map(({ pattern, stats, pct }) => (
            <div key={pattern.id} className="px-4 py-3">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[var(--lc-text)]">{pattern.name}</span>
                <span className="font-mono text-[var(--lc-text-muted)]">
                  {stats.correct}/{stats.attempted} · {pct}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-[var(--lc-code-bg)]">
                <div
                  className="h-full rounded bg-[var(--lc-orange)] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-[var(--lc-hard)] hover:underline"
        >
          Reset Progress
        </button>
      )}
    </div>
  );
}
