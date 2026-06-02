"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SmoothImage from "../ui/SmoothImage";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";
import SectionHeader from "../ui/SectionHeader";

type CategoryTheme = "light" | "dark";

type CategoryItem = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
  theme: CategoryTheme;
};

type CategoryShowcaseProps = {
  headerTitle?: string;
  headerDescription?: string;
};

export default function CategoryShowcase({
  headerTitle,
  headerDescription,
}: CategoryShowcaseProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.categoryShowcase;

  const categoryItems: CategoryItem[] = [
    {
      href: "/shop/women",
      imageSrc: "/shop/bottle-women.png",
      title: labels.womenTitle,
      subtitle: labels.womenSubtitle,
      ariaLabel: labels.womenAria,
      theme: "light",
    },
    {
      href: "/shop/unisex",
      imageSrc: "/shop/hero-unisex.jpg",
      title: labels.unisexTitle,
      subtitle: labels.unisexSubtitle,
      ariaLabel: labels.unisexAria,
      theme: "dark",
    },
    {
      href: "/shop/men",
      imageSrc: "/shop/bottle-men.png",
      title: labels.menTitle,
      subtitle: labels.menSubtitle,
      ariaLabel: labels.menAria,
      theme: "light",
    },
  ];

  return (
    <>
      {headerTitle && headerDescription ? (
        <SectionHeader title={headerTitle} description={headerDescription} />
      ) : null}

      <section className="bg-background px-4 py-14 md:px-6 md:py-18">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 lg:gap-8">
            {categoryItems.map((item) => (
              <CategoryCard
                key={item.href}
                href={item.href}
                imageSrc={item.imageSrc}
                title={item.title}
                subtitle={item.subtitle}
                ariaLabel={item.ariaLabel}
                shopNowLabel={labels.shopNow}
                theme={item.theme}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type CategoryCardProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
  shopNowLabel: string;
  theme?: CategoryTheme;
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

  const ringClass = isLight
    ? "ring-black/5 group-hover:ring-black/20"
    : "ring-white/10 group-hover:ring-white/40";
  const titleClass = isLight ? "text-gray-900" : "text-white";
  const subtitleClass = isLight ? "text-gray-600" : "text-white/90";
  const buttonClass = isLight
    ? "border-gray-900 text-gray-900 group-hover:bg-gray-900 group-hover:text-white"
    : "border-white text-white group-hover:bg-white group-hover:text-black";

  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? title}
      className="group relative block aspect-4/5 w-full overflow-hidden"
    >
      <SmoothImage
        src={imageSrc}
        alt={ariaLabel ?? title}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </>
      )}

      <div
        className={`pointer-events-none absolute inset-0 ring-1 transition duration-500 ${ringClass}`}
      />

      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto w-full p-8 text-center md:p-10">
          <h2
            className={`font-serif text-3xl leading-tight md:text-4xl ${titleClass}`}
          >
            {title}
          </h2>
          <p
            className={`font-garamond mt-3 text-sm md:text-base ${subtitleClass}`}
          >
            {subtitle}
          </p>
          <span
            className={`mt-8 inline-block border bg-transparent px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase transition-colors ${buttonClass}`}
          >
            {shopNowLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
