import type { ReactNode } from "react";

export default function IntroCompact({
  title,
  subtitle,
  count,
  countLabelSingular = "Fragrance",
  countLabelPlural = "Fragrances",
}: {
  title: string;
  subtitle?: ReactNode;
  count?: number;
  countLabelSingular?: string;
  countLabelPlural?: string;
  chips?: string[];
}) {
  return (
    <section className="w-full px-5 pt-10 text-center md:px-8 md:pt-14 xl:px-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:gap-5">
        {/* Contador elegante en la parte superior como un meta-dato editorial */}
        {typeof count === "number" && (
          <span className="text-[10px] font-light tracking-[0.25em] text-black/40 uppercase">
            {count} {count === 1 ? countLabelSingular : countLabelPlural}
          </span>
        )}

        {/* Título de la colección: Imponente, limpio y sin añadidos que rompan la línea */}
        <h1 className="font-serif text-3xl font-normal tracking-[0.03em] text-neutral-900 uppercase md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Descripción: Centrada, ligera, usando Garamond con aire de alta perfumería */}
        {subtitle && (
          <div className="font-garamond mt-2 max-w-2xl text-base leading-relaxed text-black/60 italic md:text-lg">
            {subtitle}
          </div>
        )}
      </div>

      {/* Divisor ultrafino y sutil */}
      <div className="mt-10 h-px w-full bg-black/8 md:mt-14" />
    </section>
  );
}
