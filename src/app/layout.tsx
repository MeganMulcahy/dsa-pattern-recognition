import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pattern Drill",
  description: "Practice identifying DSA patterns on LeetCode problems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[var(--lc-bg)] text-[var(--lc-text)]">
        {children}
      </body>
    </html>
  );
}
