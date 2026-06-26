import type { PatternId } from "@/types";
import { patterns } from "@/data/patterns";

interface PatternPickerProps {
  selected: PatternId | null;
  onSelect: (pattern: PatternId) => void;
  disabled?: boolean;
}

export function PatternPicker({ selected, onSelect, disabled }: PatternPickerProps) {
  return (
    <section>
      <h3 className="lc-section-title mb-1">Which pattern would you use?</h3>
      <p className="mb-4 text-sm text-[var(--lc-text-muted)]">
        Select the primary technique before checking your answer.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {patterns.map((pattern) => {
          const isSelected = selected === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(pattern.id)}
              className={`rounded-lg border px-3 py-2.5 text-left transition-colors disabled:opacity-50 ${
                isSelected
                  ? "border-[var(--lc-orange)] bg-[rgb(255_161_22/0.1)]"
                  : "border-[var(--lc-border)] bg-[var(--lc-panel)] hover:border-[var(--lc-text-muted)]"
              }`}
            >
              <span className="block text-sm font-medium text-[var(--lc-text)]">
                {pattern.name}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--lc-text-muted)] line-clamp-1">
                {pattern.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
