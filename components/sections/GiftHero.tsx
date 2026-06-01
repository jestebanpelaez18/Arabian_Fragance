"use client";

import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import SectionHeader from "@/components/ui/SectionHeader";

type GiftShowcaseProps = {
  imageSrc: string;
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
    <>
      <SectionHeader title={title} description={description} />

      {/* We maintain the content block with matching background transitions */}
      <section className="bg-background w-full pb-16">
        {/* 2. UNIFIED HAUTE COUTURE CTA BUTTON */}
        <div className="mb-14 w-full px-4 text-center -mt-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Link
              href={ctaHref}
              className="inline-block border border-neutral-900 bg-transparent px-9 py-3.5 text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* 3. FULL-BLEED CAMPAIGN IMAGE */}
        <div className="w-full px-4 md:px-6">
          <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video">
            <SmoothImage
              src={imageSrc}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000 hover:scale-[1.01]"
              priority={false}
              quality={95}
            />
          </div>
        </div>
      </section>
    </>
  );
}