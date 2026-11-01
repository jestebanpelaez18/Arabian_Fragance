import Link from "next/link";
import SmoothImage from "@/components/ui/SmoothImage";

type GiftHeroProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function GiftHero({
  imageSrc,
  imageAlt = "",
  title,
  description,
  ctaLabel,
  ctaHref,
}: GiftHeroProps) {
  return (
    <section
      aria-labelledby="home-discovery-heading"
      className="bg-background w-full px-5 py-12 md:py-16 xl:px-6"
    >
      <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        <h2
          id="home-discovery-heading"
          className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-4xl"
        >
          {title}
        </h2>

        {description && (
          <p className="font-garamond mt-4 text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg">
            {description}
          </p>
        )}

        <Link
          href={ctaHref}
          className="font-garamond hover:border-gold hover:text-gold mt-7 inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:mt-8"
        >
          {ctaLabel}
        </Link>
      </header>

      <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-video">
        <SmoothImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={88}
        />
      </div>
    </section>
  );
}
