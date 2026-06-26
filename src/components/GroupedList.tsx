import Link from "next/link";

interface ListRowProps {
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}

export function ListRow({ title, subtitle, href, onClick, trailing }: ListRowProps) {
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-[var(--lc-text)]">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-xs text-[var(--lc-text-muted)]">{subtitle}</div>
        )}
      </div>
      {trailing}
    </>
  );

  const className = "lc-list-row w-full text-left";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

export function GroupedSection({
  title,
  children,
  footer,
}: {
  title?: string;
  children: React.ReactNode;
  footer?: string;
}) {
  return (
    <section className="mb-6">
      {title && <h2 className="lc-label mb-2 px-1">{title}</h2>}
      <div className="lc-list">{children}</div>
      {footer && (
        <p className="mt-2 px-1 text-xs text-[var(--lc-text-muted)]">{footer}</p>
      )}
    </section>
  );
}
