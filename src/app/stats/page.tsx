"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { StatsDashboard } from "@/components/StatsDashboard";
import type { Progress } from "@/types";
import {
  loadProgress,
  saveProgress,
  createEmptyProgress,
  resetProgress,
} from "@/lib/progress";

export default function StatsPage() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleReset = () => {
    if (!confirm("Reset all progress? This cannot be undone.")) return;
    resetProgress();
    const empty = createEmptyProgress();
    setProgress(empty);
    saveProgress(empty);
  };

  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-4 pb-16 pt-8">
        <h1 className="lc-page-title mb-2">Stats</h1>
        <p className="mb-8 text-sm text-[var(--lc-text-muted)]">Session progress by pattern</p>
        {progress ? (
          <StatsDashboard progress={progress} onReset={handleReset} />
        ) : (
          <p className="text-sm text-[var(--lc-text-muted)]">Loading…</p>
        )}
      </main>
    </PageShell>
  );
}
