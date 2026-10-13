import type { ReactNode } from "react";

type IntroCompactProps = {
  title: string;
  subtitle?: ReactNode;
  count?: number;
  countLabelSingular?: string;
  countLabelPlural?: string;
};

export default function IntroCompact({
  title,
  subtitle,
  count,
  countLabelSingular = "Fragrance",
  countLabelPlural = "Fragrances",
}: IntroCompactProps) {
  return (
    <section className="w-full px-5 pt-8 text-center md:px-8 md:pt-10 xl:px-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <h1 className="font-bodoni text-3xl leading-tight font-normal tracking-[0.02em] text-neutral-900 uppercase md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <div className="font-garamond mt-4 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">
            {subtitle}
          </div>
        )}

        {typeof count === "number" && (
          <p className="font-garamond mt-4 text-sm text-black/60">
            {count} {count === 1 ? countLabelSingular : countLabelPlural}
          </p>
        )}
      </div>

      <div className="mt-6 h-px w-full bg-black/8 md:mt-8" />
    </section>
  );
}
