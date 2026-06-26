import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1080px] items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <h1 className="lc-page-title text-center">Pattern Drill</h1>
          <p className="lc-body mt-3 text-center">
            Learn the patterns, then practice on live LeetCode problems.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link href="/learn" className="lc-btn-secondary py-4 text-center text-base">
              Learn
            </Link>
            <Link href="/practice" className="lc-btn-primary py-4 text-center text-base">
              Practice
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
