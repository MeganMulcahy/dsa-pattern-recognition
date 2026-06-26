import Link from "next/link";
import type { LearnPage } from "@/data/learn/types";
import { CodeBlock } from "@/components/CodeBlock";

interface LearnContentProps {
  page: LearnPage;
}

function ProseBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="lc-panel px-4 py-4">
      <div className="lc-body space-y-3">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="lc-list">
      {items.map((item) => (
        <li key={item} className="px-4 py-3">
          <p className="lc-body">{item}</p>
        </li>
      ))}
    </ul>
  );
}

export function LearnContent({ page }: LearnContentProps) {
  return (
    <article>
      <header className="mb-8 border-b border-[var(--lc-border)] pb-6">
        <p className="lc-label mb-2">
          {page.category === "basics" ? "Reference" : "Pattern Guide"}
        </p>
        <h1 className="lc-page-title">{page.title}</h1>
        <p className="lc-body mt-2">{page.subtitle}</p>
        {page.practiceHref && (
          <Link href={page.practiceHref} className="lc-btn-primary mt-5 inline-flex">
            Practice This Pattern
          </Link>
        )}
      </header>

      {page.codeExamples && page.codeExamples.length > 0 && (
        <section className="mb-8">
          <h2 className="lc-section-title mb-4">Example Code</h2>
          <div className="space-y-4">
            {page.codeExamples.map((ex) => (
              <CodeBlock
                key={ex.title}
                title={ex.title}
                language={ex.language}
                code={ex.code}
              />
            ))}
          </div>
        </section>
      )}

      {page.resources && page.resources.length > 0 && (
        <section className="mb-8">
          <h2 className="lc-section-title mb-4">Supplementary Materials</h2>
          <ul className="lc-list">
            {page.resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lc-list-row block hover:no-underline"
                >
                  <div>
                    <div className="font-medium text-[var(--lc-link)]">{r.title}</div>
                    {r.description && (
                      <div className="mt-0.5 text-xs text-[var(--lc-text-muted)]">
                        {r.description}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-[var(--lc-text-muted)]">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="lc-section-title mb-3">{section.heading}</h2>

            {section.paragraphs && section.paragraphs.length > 0 && (
              <ProseBlock>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </ProseBlock>
            )}

            {section.bullets && section.bullets.length > 0 && (
              <BulletList items={section.bullets} />
            )}

            {section.subsections?.map((sub) => (
              <div key={sub.heading} className="mt-4">
                <h3 className="mb-2 text-sm font-semibold text-[var(--lc-text)]">
                  {sub.heading}
                </h3>
                {sub.paragraphs && sub.paragraphs.length > 0 && (
                  <ProseBlock>
                    {sub.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </ProseBlock>
                )}
                {sub.bullets && sub.bullets.length > 0 && (
                  <BulletList items={sub.bullets} />
                )}
              </div>
            ))}

            {section.table && (
              <div className="lc-panel overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--lc-border)]">
                      {section.table.headers.map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 font-semibold text-[var(--lc-text-secondary)]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-[var(--lc-border)] last:border-0"
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-4 py-3 text-[var(--lc-text-secondary)] align-top"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
