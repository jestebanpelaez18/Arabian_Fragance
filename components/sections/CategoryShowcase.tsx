import Link from "next/link";
import SmoothImage from "@/components/ui/SmoothImage";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import type { HomeCategoryImages } from "@/lib/shopify/get-home-category-images";

type CategoryKey = keyof HomeCategoryImages;

type CategoryItem = {
  key: CategoryKey;
  href: string;
  title: string;
  subtitle: string;
  ariaLabel: string;
};

type CategoryShowcaseProps = {
  images: HomeCategoryImages;
  locale: Locale;
  headerTitle?: string;
  headerDescription?: string;
};

export default function CategoryShowcase({
  images,
  locale,
  headerTitle,
  headerDescription,
}: CategoryShowcaseProps) {
  const labels = getUiLabels(locale).sections.categoryShowcase;

  const items: CategoryItem[] = [
    {
      key: "women",
      href: `/${locale}/shop/women`,
      title: labels.womenTitle,
      subtitle: labels.womenSubtitle,
      ariaLabel: labels.womenAria,
    },
    {
      key: "unisex",
      href: `/${locale}/shop/unisex`,
      title: labels.unisexTitle,
      subtitle: labels.unisexSubtitle,
      ariaLabel: labels.unisexAria,
    },
    {
      key: "men",
      href: `/${locale}/shop/men`,
      title: labels.menTitle,
      subtitle: labels.menSubtitle,
      ariaLabel: labels.menAria,
    },
  ];

  return (
    <section
      aria-labelledby={headerTitle ? "home-categories-heading" : undefined}
      className="bg-background w-full px-5 py-12 md:py-16 xl:px-6"
    >
      {(headerTitle || headerDescription) && (
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
          {headerTitle && (
            <h2
              id="home-categories-heading"
              className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-4xl"
            >
              {headerTitle}
            </h2>
          )}

          {headerDescription && (
            <p className="font-garamond mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              {headerDescription}
            </p>
          )}
        </header>
      )}

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3 lg:gap-x-6">
        {items.map((item) => {
          const image = images[item.key];

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-label={item.ariaLabel}
              className="group flex h-full min-w-0 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <div className="bg-background relative aspect-4/5 w-full shrink-0 overflow-hidden">
                <SmoothImage
                  src={image.url}
                  alt={image.altText ?? ""}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={[
                    "transition-transform duration-700 ease-out",
                    "group-hover:scale-[1.025]",
                    "motion-reduce:transform-none motion-reduce:transition-none",
                    item.key === "unisex" ? "object-cover" : "object-contain",
                  ].join(" ")}
                />
              </div>

              <div className="flex flex-1 flex-col items-center px-2 pt-6 text-center">
                <h3 className="font-magister group-hover:text-gold text-2xl leading-tight font-normal tracking-[0.02em] text-neutral-900 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="font-garamond mt-3 max-w-sm text-base leading-relaxed text-neutral-600">
                  {item.subtitle}
                </p>

                <div className="mt-auto pt-5">
                  <span className="font-garamond group-hover:border-gold group-hover:text-gold inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300">
                    {labels.shopNow}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
