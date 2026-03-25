"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SmoothImage from "../ui/SmoothImage";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

export default function CategoryShowcase() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.categoryShowcase;

  return (
    <section className="relative min-h-full">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        {/* Women Perfumes */}
        <CategoryCard
          href="/shop/women"
          imageSrc="/shop/hero-women.jpg"
          title={labels.womenTitle}
          subtitle={labels.womenSubtitle}
          ariaLabel={labels.womenAria}
          shopNowLabel={labels.shopNow}
        />

        {/* Men Perfumes */}
        <CategoryCard
          href="/shop/men"
          imageSrc="/shop/hero-men.jpg"
          title={labels.menTitle}
          subtitle={labels.menSubtitle}
          ariaLabel={labels.menAria}
          shopNowLabel={labels.shopNow}
        />

        {/* Unisex */}
        <CategoryCard
          href="/shop/unisex"
          imageSrc="/shop/hero-unisex.jpg"
          title={labels.unisexTitle}
          subtitle={labels.unisexSubtitle}
          ariaLabel={labels.unisexAria}
          shopNowLabel={labels.shopNow}
        />
      </div>
    </section>
  );
}

type CategoryCardProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
  shopNowLabel: string;
};

function CategoryCard({
  href,
  imageSrc,
  title,
  subtitle,
  ariaLabel,
  shopNowLabel,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      prefetch
      aria-label={ariaLabel ?? title}
      className="group card-luxe relative block aspect-3/4 overflow-hidden"
    >
      {/* Background image */}
      <SmoothImage
        src={imageSrc}
        alt={ariaLabel ?? title}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className="ease-luxe object-cover transition-transform duration-700 group-hover:scale-[1.03] group-active:scale-[0.99]"
        loading="lazy"
        priority={false}
        decoding="async"
      />

      {/* Luxe overlays: subtle dark for legibility + amber glow + grain */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/10" />
      <div className="overlay-amber absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Soft gold border highlight on hover */}
      <div className="ring-navbar-border group-hover:ring-gold/50 pointer-events-none absolute inset-0 ring-1 transition duration-500" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end">
        {/* gradient bottom to top for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 via-black/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 text-white md:px-12 xl:px-16">
          <h2 className="font-playfair-display text-shadow-soft text-3xl leading-tight tracking-tight md:text-[32px] xl:text-[36px]">
            {title}
          </h2>
          <p className="font-garamond mt-1 max-w-md text-lg opacity-95 md:text-xl">
            {subtitle}
          </p>
          <span className="font-roboto link-gold mt-2 inline-block text-sm font-medium">
            {shopNowLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
