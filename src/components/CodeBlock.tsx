interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
}

export function CodeBlock({ title, language, code }: CodeBlockProps) {
  return (
    <div className="lc-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--lc-border)] bg-[var(--lc-code-bar)] px-4 py-2">
        <span className="text-sm font-medium text-[var(--lc-text)]">{title}</span>
        <span className="text-xs text-[var(--lc-text-muted)] uppercase">{language}</span>
      </div>
      <pre className="overflow-x-auto bg-[var(--lc-code-bg)] p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[var(--lc-text)]">{code.trim()}</code>
      </pre>
    </div>
  );
}
