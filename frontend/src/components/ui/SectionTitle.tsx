interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <div
      className={`font-orbitron text-sm tracking-[2px] uppercase pb-3 mb-5 border-b ${className}`}
      style={{
        color: "var(--text-secondary)",
        borderColor: "var(--border-soft)",
      }}
    >
      {children}
    </div>
  );
}
