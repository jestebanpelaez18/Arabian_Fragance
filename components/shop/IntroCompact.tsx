import { ReactNode } from "react";

export default function IntroCompact({
  title,
  subtitle,
  count,
  chips,
}: {
  title: string;
  subtitle?: ReactNode;
  count?: number;
  chips?: string[];
}) {
  return (
    <section className="w-full px-5 pt-6 text-white md:px-5 md:pt-8 xl:px-6">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.05fr_1fr]">
        <h1 className="font-playfair-display text-[28px] leading-tight md:text-[40px]">
          {title}
          {typeof count === "number" && (
            <span className="ml-3 align-super text-sm opacity-70">
              [ {count} ]
            </span>
          )}
        </h1>
        <div className="font-garamond text-base opacity-85 md:text-lg/relaxed">
          {subtitle}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-white/15 md:mt-8" />

      {/* Chips */}
      {!!chips?.length && (
        <div className="mt-5 flex flex-wrap gap-6">
          {chips.map((t) => (
            <button
              key={t}
              type="button"
              className="rounded-full border border-white/25 px-3 py-1 text-[12px] opacity-85 transition hover:opacity-100"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
