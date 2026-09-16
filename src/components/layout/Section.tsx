interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`section-shell py-24 lg:py-36 max-w-6xl mx-auto px-5 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
