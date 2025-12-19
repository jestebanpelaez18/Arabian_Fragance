"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

interface InvitationHeroProps {
  imageSrc: string;
  label?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heightClassName?: string; // e.g. "h-[78vh] md:h-[70vh]"
  priority?: boolean;
}

export default function InvitationHero({
  imageSrc,
  title,
  description,
  ctaLabel = "Explore Now",
  ctaHref = "/shop",
  heightClassName = "h-[78vh] md:h-[70vh]",
  priority = false,
}: InvitationHeroProps) {
  return (
    <section className={`relative overflow-hidden ${heightClassName}`}>
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="100vw"
        className="scale-[1.06] object-cover object-center"
        priority={priority}
        quality={90}
      />

      {/* Overlay + strong bottom gradient for legibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/25 to-transparent" />

      {/* Centered content styled like ShowroomHero */}
      <div className="absolute inset-0 flex h-full items-center justify-center px-8 text-white md:px-16 lg:px-32 xl:px-48">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-garamond mx-auto text-4xl leading-tight tracking-[-0.01em] md:text-[44px] lg:text-[54px]">
            {title}
          </h2>

          {description && (
            <p className="font-garamond mx-auto mt-4 max-w-2xl text-[15px] opacity-90 md:text-lg">
              {description}
            </p>
          )}

          <div className="mt-6">
            <Button
              href={ctaHref}
              variant="secondary"
              className="rounded-full border border-white/30 bg-black/40 px-8 py-3 text-[13px] tracking-[0.14em] backdrop-blur-sm transition hover:bg-white hover:text-background"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
