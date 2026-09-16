interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="w-full section-heading">
      <div className="flex items-center gap-4 mb-6">
        <span className="section-number font-mono">/{number}</span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="font-mono text-xs tracking-[0.22em] text-[var(--color-text-muted)] uppercase">
          {title}
        </span>
      </div>
      {subtitle && (
        <p className="section-subtitle text-[var(--color-text-primary)] mb-12 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
