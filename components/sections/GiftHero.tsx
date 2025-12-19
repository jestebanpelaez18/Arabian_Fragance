"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

type GiftHeroProps = {
  imageSrc: string;
  label?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  heightClassName?: string; // e.g. "h-[78vh] md:h-[70vh]"
  contentAlign?: "bottom" | "center"; // layout style similar to reference
};

export default function GiftHero({
  imageSrc,
  label,
  title,
  description,
  ctaLabel,
  ctaHref,
  heightClassName = "h-[78vh] md:h-[70vh]",
  contentAlign = "bottom",
}: GiftHeroProps) {
  return (
    <section className={`relative overflow-hidden ${heightClassName}`}>
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="100vw"
        className="scale-[1.06] object-cover object-center"
        priority={false}
        quality={90}
      />

      {/* Luxe overlays for legibility and warmth */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="overlay-amber absolute inset-0" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/30 via-black/10 to-transparent" />

      {contentAlign === "center" ? (
        <>
          {/* Top label */}
          {label ? (
            <div className="absolute inset-x-0 top-0 px-8 pt-6 text-center text-white md:px-16 md:pt-8 lg:px-32 xl:px-48">
              <span className="font-garamond text-[11px] tracking-[0.34em] uppercase opacity-75">
                {label}
              </span>
            </div>
          ) : null}

          {/* Centered title and CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white md:px-16 lg:px-32 xl:px-48">
            <h2 className="font-garamond text-shadow-soft mx-auto max-w-4xl text-4xl leading-[1.15] tracking-[-0.015em] md:text-[48px] lg:text-[56px]">
              {title}
            </h2>
            <div className="mt-7">
              <Button
                href={ctaHref}
                variant="secondary"
                className="btn-luxe rounded-full border border-white/70 bg-white/10 px-8 py-3 text-[13px] tracking-[0.14em] backdrop-blur-sm"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-x-0 bottom-0 px-8 pb-14 text-center text-white md:px-16 md:pb-16 lg:px-32 xl:px-48">
          {label ? (
            <span className="font-garamond mb-3 block text-[11px] tracking-[0.34em] uppercase opacity-75">
              {label}
            </span>
          ) : null}

          <h2 className="font-garamond text-shadow-soft mx-auto max-w-4xl text-4xl leading-[1.15] tracking-[-0.015em] md:text-[44px] lg:text-[50px]">
            {title}
          </h2>

          <p className="font-garamond mx-auto mt-3 max-w-2xl text-[15px] opacity-90 md:mt-4 md:text-lg">
            {description}
          </p>

          <div className="mt-7">
            <Button
              href={ctaHref}
              variant="secondary"
              className="hover:text-background rounded-full border border-white/70 bg-white/10 px-8 py-3 text-[13px] tracking-[0.14em] backdrop-blur-sm transition hover:bg-white"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
