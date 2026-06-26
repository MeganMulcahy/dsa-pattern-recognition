import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { GroupedSection, ListRow } from "@/components/GroupedList";
import { basicsPages, patternLearnPages } from "@/data/learn/pages";

export default function LearnPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-[1080px] px-4 pb-16 pt-8">
        <h1 className="lc-page-title mb-6">Learn</h1>

        <GroupedSection title="Reference">
          {basicsPages.map((page) => (
            <ListRow
              key={page.slug}
              title={page.title}
              subtitle={page.subtitle}
              href={`/learn/${page.slug}`}
            />
          ))}
        </GroupedSection>

        <section className="mb-6">
          <h2 className="lc-label mb-3 px-1">Pattern Guides</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {patternLearnPages.map((page) => (
              <Link
                key={page.slug}
                href={`/learn/${page.slug}`}
                className="lc-panel block p-4 transition-colors hover:border-[var(--lc-orange)]"
              >
                <h3 className="font-medium text-[var(--lc-text)]">
                  {page.title} Guide
                </h3>
                <p className="mt-1.5 text-xs text-[var(--lc-text-muted)] line-clamp-2">
                  {page.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
