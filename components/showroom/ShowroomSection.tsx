"use client";

import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import SectionHeader from "@/components/ui/SectionHeader";
import { usePathname } from "next/navigation";
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
  ctaHref = "/showroom",
}: ShowroomSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.showroomSection;

  // Resolving text fallbacks gracefully
  const resolvedHeading = heading ?? labels.heading ?? "Our Showroom";
  const resolvedDescription =
    description ??
    "Experience the art of Arabian perfumery in person. Visit our Helsinki boutique to discover our rare ingredients and signature collections.";
  const resolvedImageAlt =
    imageAlt ?? labels.rightImageAlt ?? "Arabian Fragrance Showroom";
  const resolvedCtaLabel = ctaLabel ?? labels.ctaLabel ?? "Visit Boutique";

  return (
    <section className="bg-background w-full pt-12 pb-20">
      {/* 1. EDITORIAL HEADER: Reusing the unified layout block */}
      <SectionHeader
        title={resolvedHeading}
        description={resolvedDescription}
      />

      {/* 2. HAUTE COUTURE CTA BUTTON: Matches the hero and gift sections */}
      <div className="-mt-4 mb-16 w-full px-4 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Link
            href={ctaHref}
            className="inline-block border border-neutral-900 bg-transparent px-9 py-3.5 text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
          >
            {resolvedCtaLabel}
          </Link>
        </div>
      </div>

      {/* 3. CINEMATIC SHOWROOM IMAGE: Framed perfectly within the container */}
      <div className="w-full px-4 md:px-6">
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          <SmoothImage
            src={imageSrc}
            alt={resolvedImageAlt}
            fill
            sizes="(min-width:1024px) 100vw, 100vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
            loading="lazy"
            priority={false}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
