interface SectionDividerProps {
  text: string;
  className?: string;
}

export default function SectionDivider({
  text,
  className = "",
}: SectionDividerProps) {
  return (
    <section className={`px-5 py-12 md:py-16 ${className}`}>
      <div className="flex items-center justify-center gap-6 text-center">
        <div className="h-px flex-1 bg-black/20"></div>
        <p className="font-garamond text-[14px] tracking-[0.22em] text-black/90 uppercase">
          {text}
        </p>
        <div className="h-px flex-1 bg-black/20"></div>
      </div>
    </section>
  );
}
