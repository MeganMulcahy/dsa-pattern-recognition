"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/stats", label: "Stats" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 lc-nav">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--lc-orange)] text-sm font-bold text-[#1a1a1a]">
            P
          </span>
          <span className="text-base font-semibold text-[var(--lc-text)]">
            Pattern Drill
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/learn" && pathname.startsWith("/learn"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--lc-panel-hover)] text-[var(--lc-orange)]"
                    : "text-[var(--lc-text-secondary)] hover:text-[var(--lc-text)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
