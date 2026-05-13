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
    <section className="bg-[#f9f6f0] px-4 py-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        {/* Unified 3-column grid */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 lg:gap-8">
          <CategoryCard
            href="/shop/women"
            imageSrc="/shop/bottle-women.png"
            title={labels.womenTitle}
            subtitle={labels.womenSubtitle}
            ariaLabel={labels.womenAria}
            shopNowLabel={labels.shopNow}
            theme="light" // <-- Texto negro, sin sombras sucias
          />

          <CategoryCard
            href="/shop/unisex"
            imageSrc="/shop/hero-unisex.jpg"
            title={labels.unisexTitle}
            subtitle={labels.unisexSubtitle}
            ariaLabel={labels.unisexAria}
            shopNowLabel={labels.shopNow}
            theme="dark" // <-- Texto blanco con degradado para legibilidad
          />

          <CategoryCard
            href="/shop/men"
            imageSrc="/shop/bottle-men.png"
            title={labels.menTitle}
            subtitle={labels.menSubtitle}
            ariaLabel={labels.menAria}
            shopNowLabel={labels.shopNow}
            theme="light" // <-- Texto negro, sin sombras sucias
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Unified Card Component with Light/Dark Theme Support
// ---------------------------------------------------------------------------
type CategoryCardProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
  shopNowLabel: string;
  theme?: "light" | "dark";
};

function CategoryCard({
  href,
  imageSrc,
  title,
  subtitle,
  ariaLabel,
  shopNowLabel,
  theme = "dark",
}: CategoryCardProps) {
  const isLight = theme === "light";

  return (
    <Link
      href={href}
      prefetch
      aria-label={ariaLabel ?? title}
      className="group relative block aspect-[3/4] min-h-[500px] w-full overflow-hidden"
    >
      <SmoothImage
        src={imageSrc}
        alt={ariaLabel ?? title}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
          isLight ? "object-bottom" : "object-center"
        }`}
        loading="lazy"
      />
      {/* Overlays: ONLY apply dark gradient if theme is dark */}
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </>
      )}

      {/* Subtle border on hover (adapts to theme) */}
      <div
        className={`pointer-events-none absolute inset-0 ring-1 transition duration-500 ${isLight ? "ring-black/5 group-hover:ring-black/20" : "ring-white/10 group-hover:ring-white/40"}`}
      />

      {/* Text Content (Adapts to theme) */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full p-8 text-center md:p-10">
          <h2
            className={`font-serif text-3xl leading-tight md:text-4xl ${isLight ? "text-gray-900" : "text-white"}`}
          >
            {title}
          </h2>
          <p
            className={`font-garamond mt-3 text-sm md:text-base ${isLight ? "text-gray-600" : "text-white/90"}`}
          >
            {subtitle}
          </p>
          <span
            className={`mt-8 inline-block border bg-transparent px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase transition-colors ${
              isLight
                ? "border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white"
                : "border-white text-white group-hover:bg-white group-hover:text-black"
            }`}
          >
            {shopNowLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
