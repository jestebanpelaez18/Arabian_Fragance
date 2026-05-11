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
    <section className="px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        {/* Dior-style hybrid grid: Product - Editorial - Product */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 lg:gap-8">
          
          {/* Left: Women (Product Focus) */}
          <CategoryProductCard
            href="/shop/women"
            imageSrc="/shop/bottle-women.png" // Use an image of the bottle with a transparent or pure white background
            title={labels.womenTitle}
            subtitle={labels.womenSubtitle}
            ariaLabel={labels.womenAria}
            shopNowLabel={labels.shopNow}
          />

          {/* Center: Unisex (Editorial/Lifestyle Focus - Keeps your original dramatic style) */}
          <CategoryEditorialCard
            href="/shop/unisex"
            imageSrc="/shop/hero-unisex.jpg" // Use a lifestyle or campaign image
            title={labels.unisexTitle}
            subtitle={labels.unisexSubtitle}
            ariaLabel={labels.unisexAria}
            shopNowLabel={labels.shopNow}
          />

          {/* Right: Men (Product Focus) */}
          <CategoryProductCard
            href="/shop/men"
            imageSrc="/shop/bottle-men.png" // Use an image of the bottle with a transparent or pure white background
            title={labels.menTitle}
            subtitle={labels.menSubtitle}
            ariaLabel={labels.menAria}
            shopNowLabel={labels.shopNow}
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Card for Product Focus (Left and Right columns)
// ---------------------------------------------------------------------------
type CategoryCardProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
  shopNowLabel: string;
};

function CategoryProductCard({
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
      className="group flex h-full min-h-[500px] flex-col items-center justify-between bg-white p-8 text-center transition-colors duration-500 hover:bg-stone-50"
    >
      <div className="relative w-full flex-1">
        {/* The bottle should be isolated, object-contain ensures it fits nicely */}
        <SmoothImage
          src={imageSrc}
          alt={ariaLabel ?? title}
          fill
          sizes="(min-width:768px) 33vw, 100vw"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="font-serif text-2xl text-black md:text-3xl">
          {title}
        </h2>
        <p className="font-garamond mt-2 text-base text-gray-500">
          {subtitle}
        </p>
        <span className="mt-6 inline-block border-b border-black/30 pb-1 text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors group-hover:border-black">
          {shopNowLabel}
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Card for Editorial Focus (Center column)
// ---------------------------------------------------------------------------
function CategoryEditorialCard({
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
      className="group relative block aspect-[3/4] h-full min-h-[500px] w-full overflow-hidden"
    >
      <SmoothImage
        src={imageSrc}
        alt={ariaLabel ?? title}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />

      {/* Dark overlays for text legibility */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Subtle gold border on hover */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20 transition duration-500 group-hover:ring-white/50" />

      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full p-8 text-center text-white md:p-10">
          <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="font-garamond mt-2 text-lg text-white/90">
            {subtitle}
          </p>
          <span className="mt-6 inline-block border border-white bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-white group-hover:text-black">
            {shopNowLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}