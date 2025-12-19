"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

type ShowroomSectionProps = {
  leftImageSrc?: string;
  leftImageAlt?: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
  label?: string; // small label above the heading
  heading?: string; // main heading text
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ShowroomSection({
  leftImageSrc = "/hero/shop.jpg",
  leftImageAlt = "Arabian Fragrance showroom",
  rightImageSrc = "/showroom/example_shop.avif",
  rightImageAlt = "Showroom detail",
  label = "VISIT US",
  heading = "IN HELSINKI",
  ctaLabel = "Our Shop",
  ctaHref = "/showroom",
}: ShowroomSectionProps) {
  return (
    <section className="grid grid-cols-1 items-stretch gap-x-0 px-5 py-3 md:grid-cols-2">
      {/* Large image on the left */}
      <div className="relative order-1 aspect-4/3 md:order-1 md:aspect-auto md:min-h-[680px]">
        <Image
          src={leftImageSrc}
          alt={leftImageAlt}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover"
          loading="lazy"
          priority={false}
          decoding="async"
        />
      </div>

      {/* Right column: title + portrait image + CTA */}
      <div className="order-2 flex flex-col justify-center border-b border-black/15 px-12 py-12 md:order-2 md:border-l md:border-b-0 lg:px-16">
        <div className="mb-8">
          <span className="font-garamond block text-xs tracking-[0.24em] uppercase opacity-70">
            {label}
          </span>
          <h2 className="font-playfair-display mt-2 text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="relative mb-10 h-[420px] w-full md:h-[520px]">
          <Image
            src={rightImageSrc}
            alt={rightImageAlt}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-center"
            loading="lazy"
            priority={false}
            decoding="async"
          />
        </div>

        <div className="mt-2 flex items-center">
          <Button href={ctaHref} className="btn-luxe min-h-11">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
