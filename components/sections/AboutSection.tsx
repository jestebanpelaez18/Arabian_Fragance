"use client";

import Image from "next/image";
import Button from "@/components/ui/button";

interface AboutSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  objectClassName?: string;
  label?: string;
  title?: string;
  description?: string;
  descriptions?: string[]; // optional multi-paragraph
  ctaHref?: string;
  ctaLabel?: string;
  reverse?: boolean; // text left, image right
  showDivider?: boolean; // vertical divider between columns
}

export default function AboutSection({
  imageSrc = "/hero/story.jpg",
  imageAlt = "Our Story",
  objectClassName = "object-cover object-[50%_35%]",
  title = "OUR STORY OF LUXURIOUS ARABIAN FRAGRANCES",
  description = "Born in Dubai, the heart of Arabian perfumery, our brand blends tradition and luxury to create unique fragrances that embody elegance and sophistication. Each scent is carefully crafted with exquisite ingredients, capturing the essence of Arabian perfume artistry and delivering an exclusive olfactory experience that lasts over time.",
  ctaHref = "/about",
  ctaLabel = "Read More",
  descriptions,
  reverse = true,
  showDivider = false,
}: AboutSectionProps) {
  const imageOrderDesktop = reverse ? "md:order-2" : "md:order-1";
  const textOrderDesktop = reverse ? "md:order-1" : "md:order-2";
  const dividerClass = showDivider
    ? reverse
      ? "md:border-r md:border-black/15"
      : "md:border-l md:border-black/15"
    : "";
  return (
    <section className="grid min-h-[680px] grid-cols-1 px-2.5 pb-15 md:grid-cols-2 md:px-5">
      {/* Image left on desktop */}
      <div
        className={`relative order-1 aspect-4/3 ${imageOrderDesktop} md:aspect-auto md:min-h-[680px]`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className={objectClassName}
          loading="lazy"
          priority={false}
          decoding="async"
        />
      </div>

      {/* Text right */}
      <div
        className={`order-2 flex flex-col justify-center px-16 py-20 ${textOrderDesktop} ${dividerClass} lg:px-20`}
      >
        <h2 className="font-garamond text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
          {title}
        </h2>
        {descriptions && descriptions.length > 0 ? (
          <div className="font-garamond mt-6 max-w-2xl text-lg/relaxed opacity-85">
            {descriptions.map((para, idx) => (
              <p key={idx} className={idx > 0 ? "mt-4" : undefined}>
                {para}
              </p>
            ))}
          </div>
        ) : (
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            {description}
          </p>
        )}

        <div className="mt-10 h-px w-full bg-black/15" />

        <div className="mt-10 flex items-center gap-6">
          <Button href={ctaHref} className="btn-luxe-contrast min-h-11">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
