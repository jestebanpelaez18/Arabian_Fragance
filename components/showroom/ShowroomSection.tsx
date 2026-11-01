"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SmoothImage from "@/components/ui/SmoothImage";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type ShowroomSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ShowroomSection({
  imageSrc = "/showroom/example_shop.avif",
  imageAlt,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: ShowroomSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.showroomSection;

  const resolvedHeading = heading ?? labels.heading;

  const resolvedDescription = description ?? labels.description;

  const resolvedImageAlt = imageAlt ?? labels.rightImageAlt;
  const resolvedCtaLabel = ctaLabel ?? labels.ctaLabel;

  const resolvedCtaHref = ctaHref ?? `/${locale}/showroom`;

  return (
    <section
      aria-labelledby="home-showroom-heading"
      className="bg-background w-full px-5 pt-12 pb-6 md:py-16 xl:px-6"
    >
      <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <h2
          id="home-showroom-heading"
          className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-4xl"
        >
          {resolvedHeading}
        </h2>

        {resolvedDescription && (
          <p className="font-garamond mt-4 text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg">
            {resolvedDescription}
          </p>
        )}

        <Link
          href={resolvedCtaHref}
          className="font-garamond hover:border-gold hover:text-gold mt-7 inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:mt-8"
        >
          {resolvedCtaLabel}
        </Link>
      </header>

      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <SmoothImage
          src={imageSrc}
          alt={resolvedImageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
          loading="lazy"
        />
      </div>
    </section>
  );
}
