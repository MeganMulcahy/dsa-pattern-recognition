import { Suspense } from "react";
import PracticeClient from "./PracticeClient";

export default function PracticeRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--lc-bg)] text-sm text-[var(--lc-text-muted)]">
          Loading…
        </div>
      }
    >
      <PracticeClient />
    </Suspense>
  );
}
