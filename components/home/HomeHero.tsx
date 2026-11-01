import { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { HomeHeroContent } from "@/lib/shopify/get-home-hero";

type HomeHeroProps = {
  hero: HomeHeroContent;
};

export default function HomeHero({ hero }: HomeHeroProps) {
  const mobileImage = hero.mobileImage ?? hero.desktopImage;

  const desktopWidth = hero.desktopImage.width ?? 1920;
  const desktopHeight = hero.desktopImage.height ?? 1080;

  const mobileWidth = mobileImage.width ?? 800;
  const mobileHeight = mobileImage.height ?? 1000;

  const commonImageProps = {
    alt: "",
    sizes: "100vw",
    quality: 90,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };

  const { props: desktopProps } = getImageProps({
    ...commonImageProps,
    src: hero.desktopImage.url,
    width: desktopWidth,
    height: desktopHeight,
  });

  const { props: mobileProps } = getImageProps({
    ...commonImageProps,
    src: mobileImage.url,
    width: mobileWidth,
    height: mobileHeight,
  });

  const imageStyle = {
    "--hero-mobile-ratio": `${mobileWidth} / ${mobileHeight}`,
    "--hero-desktop-ratio": `${desktopWidth} / ${desktopHeight}`,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="home-hero-heading"
      data-testid="home-hero"
      className="bg-background relative isolate w-full overflow-hidden"
    >
      <div
        style={imageStyle}
        className="relative aspect-[var(--hero-mobile-ratio)] w-full md:aspect-[var(--hero-desktop-ratio)]"
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={mobileProps.srcSet}
            sizes={mobileProps.sizes}
          />

          <img
            {...desktopProps}
            alt=""
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </picture>

        <div className="pointer-events-none absolute inset-0 hidden bg-black/40 md:block" />
      </div>

      <div className="relative px-5 py-9 text-center md:absolute md:inset-0 md:z-10 md:flex md:items-center md:justify-center md:px-8 md:py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-neutral-900 md:text-white">
          <h1
            id="home-hero-heading"
            className="font-magister max-w-[20ch] text-[30px] leading-[1.15] font-normal tracking-[0.02em] md:text-[44px] lg:text-[56px]"
          >
            {hero.title}
          </h1>

          {hero.subtitle && (
            <p className="font-garamond mt-4 max-w-lg text-base leading-relaxed whitespace-pre-line text-neutral-600 md:mt-5 md:text-lg md:text-white/90">
              {hero.subtitle}
            </p>
          )}

          <Link
            href={hero.buttonHref}
            className="font-garamond hover:border-gold hover:bg-gold mt-7 inline-flex min-h-12 items-center justify-center border border-neutral-900 px-8 py-3 text-xs tracking-[0.16em] text-neutral-900 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:mt-8 md:border-white md:px-10 md:text-white"
          >
            {hero.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
