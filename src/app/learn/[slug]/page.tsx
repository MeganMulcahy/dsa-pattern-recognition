import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { LearnContent } from "@/components/LearnContent";
import { getLearnSlugs, learnPageMap } from "@/data/learn/pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLearnSlugs().map((slug) => ({ slug }));
}

export default async function LearnTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = learnPageMap[slug];
  if (!page) notFound();

  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-4 pb-16 pt-8">
        <Link
          href="/learn"
          className="mb-6 inline-block text-sm text-[var(--lc-link)] hover:underline"
        >
          ← Back to Learn
        </Link>
        <LearnContent page={page} />
      </main>
    </PageShell>
  );
}
