"use client";

import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";

type GiftShowcaseProps = {
  imageSrc: string;
  label?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function GiftShowcase({
  imageSrc,
  title,
  description,
  ctaLabel,
  ctaHref,
}: GiftShowcaseProps) {
  return (
    // Full-bleed section unaligned with strict paddings to maintain infinity width
    <section className="bg-background w-full pt-24 pb-16">
      {/* 1. EDITORIAL TEXT BLOCK - Placed entirely outside and above the imagery */}
      <div className="mb-14 w-full px-4 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">

          <h2 className="text-2xl leading-tight font-light tracking-[0.14em] text-neutral-900 uppercase md:text-3xl lg:text-4xl">
            {title}
          </h2>

          <p className="font-garamond mt-5 max-w-xl text-sm leading-relaxed font-light text-neutral-600">
            {description}
          </p>

          {/* EL COMPONENTE UNIFICADO: Caja rectangular pura de líneas rectas, idéntica a tu Hero pero adaptada para fondo claro */}
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-block border border-neutral-900 bg-transparent px-9 py-3.5 text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FULL-BLEED CAMPAIGN IMAGE - Raw, clean, with cinema landscape proportions */}
      <div className="w-full px-4 md:px-6">
        <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video">
          <SmoothImage
            src={imageSrc}
            alt={title}
            fill
            sizes="100vw"
            // No translations, scaling or black overlays to maintain the pristine render quality
            className="object-cover object-center transition-transform duration-1000 hover:scale-[1.01]"
            priority={false}
            quality={95}
          />
        </div>
      </div>
    </section>
  );
}
