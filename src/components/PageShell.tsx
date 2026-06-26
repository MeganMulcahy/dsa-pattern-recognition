import Link from "next/link";
import { Navbar } from "@/components/Navbar";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {children}
    </div>
  );
}
