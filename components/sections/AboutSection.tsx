"use client";

import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { usePathname } from "next/navigation";
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
  imageSrc = "/hero/story.jpg", // Replace with your high-end ingredient shot
  imageAlt,
  title,
  description,
  ctaHref = "/about",
  ctaLabel,
  descriptions,
  reverse = false,
}: AboutSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.aboutDefaults;

  const resolvedImageAlt = imageAlt ?? labels.imageAlt;
  const resolvedTitle = title ?? labels.title ?? "The Art of Ingredients";
  const resolvedDescription = description ?? labels.description;
  const resolvedCtaLabel = ctaLabel ?? labels.ctaLabel ?? "Discover Our Story";

  // Control layout direction
  const imageOrder = reverse ? "lg:order-2" : "lg:order-1";
  const textOrder = reverse ? "lg:order-1" : "lg:order-2";

  return (
    <section className="w-full bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* 1. EDITORIAL IMAGE: Vertical portrait style for high-fashion feel */}
        <div className={`w-full lg:w-1/2 ${imageOrder}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
            <SmoothImage
              src={imageSrc}
              alt={resolvedImageAlt}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
              loading="lazy"
              priority={false}
              decoding="async"
            />
          </div>
        </div>

        {/* 2. MANIFESTO TEXT BLOCK: Deep paddings, elegant typography rhythm */}
        <div className={`w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left ${textOrder}`}>
          
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-400 font-light mb-6 block">
            Savoir-Faire
          </span>

          <h2 className="font-serif text-3xl tracking-[0.08em] uppercase text-neutral-900 md:text-4xl lg:text-5xl font-light leading-tight">
            {resolvedTitle}
          </h2>
          
          <div className="mt-8 flex flex-col gap-5">
            {descriptions && descriptions.length > 0 ? (
              descriptions.map((para, idx) => (
                <p key={idx} className="font-garamond text-base leading-relaxed text-neutral-600 md:text-lg max-w-lg mx-auto lg:mx-0">
                  {para}
                </p>
              ))
            ) : (
              <p className="font-garamond text-base leading-relaxed text-neutral-600 md:text-lg max-w-lg mx-auto lg:mx-0">
                {resolvedDescription}
              </p>
            )}
          </div>

          {/* 3. RECTANGULAR COUTURE BUTTON */}
          <div className="mt-12">
            <Link
              href={ctaHref}
              className="inline-block border border-neutral-900 bg-transparent px-9 py-3.5 text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
            >
              {resolvedCtaLabel}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}