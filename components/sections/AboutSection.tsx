"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SmoothImage from "@/components/ui/SmoothImage";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

interface AboutSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  descriptions?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  reverse?: boolean;
}

export default function AboutSection({
  imageSrc = "/hero/story.jpg",
  imageAlt,
  title,
  description,
  descriptions,
  ctaHref,
  ctaLabel,
  reverse = true,
}: AboutSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.aboutDefaults;

  const resolvedImageAlt = imageAlt ?? labels.imageAlt;
  const resolvedTitle = title ?? labels.title;
  const resolvedDescription = description ?? labels.description;
  const resolvedCtaLabel = ctaLabel ?? labels.ctaLabel;
  const resolvedCtaHref = ctaHref ?? `/${locale}/about`;

  const paragraphs = (
    descriptions && descriptions.length > 0
      ? descriptions
      : [resolvedDescription]
  )
    .flatMap((text) => text.split(/\r?\n\s*\r?\n/))
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <section
      aria-labelledby="home-about-heading"
      className="bg-background w-full px-5 pt-6 pb-12 md:py-16 xl:px-6"
    >
      <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-12">
        <div
          className={[
            "relative aspect-4/5 w-full overflow-hidden",
            reverse ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <SmoothImage
            src={imageSrc}
            alt={resolvedImageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={85}
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        <div
          className={[
            "px-2 text-center md:px-8 lg:px-10",
            reverse ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-lg flex-col items-center">
            <h2
              id="home-about-heading"
              className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[34px] lg:text-[40px]"
            >
              {resolvedTitle}
            </h2>

            {paragraphs.length > 0 && (
              <div className="mt-5 flex flex-col gap-5">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-garamond text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <Link
              href={resolvedCtaHref}
              className="font-garamond hover:border-gold hover:text-gold mt-7 inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:mt-8"
            >
              {resolvedCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
