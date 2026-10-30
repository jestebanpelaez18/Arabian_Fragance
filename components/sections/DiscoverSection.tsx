"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/data/products";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

const TABS = ["women", "men", "unisex"] as const;

type Tab = (typeof TABS)[number];

type DiscoverSectionProps = {
  products: Product[];
  headerTitle?: string;
  headerDescription?: string;
};

export default function DiscoverSection({
  products,
  headerTitle,
  headerDescription,
}: DiscoverSectionProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.discover;
  const [selectedTab, setSelectedTab] = useState<Tab>("women");

  const tabLabels: Record<Tab, string> = {
    women: labels.womenTab,
    men: labels.menTab,
    unisex: labels.unisexTab,
  };

  const availableTabs = TABS.filter((tab) =>
    products.some((product) => product.gender === tab),
  );

  const active = availableTabs.includes(selectedTab)
    ? selectedTab
    : (availableTabs[0] ?? "women");

  const filtered = useMemo(
    () =>
      products
        .filter((product) => product.gender === active)
        .sort(
          (a, b) =>
            Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false),
        )
        .slice(0, 4),
    [active, products],
  );

  if (availableTabs.length === 0) return null;

  return (
    <section
      aria-labelledby={headerTitle ? "home-featured-heading" : undefined}
      className="bg-background w-full px-5 py-12 md:py-16 xl:px-6"
    >
      {(headerTitle || headerDescription) && (
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
          {headerTitle && (
            <h2
              id="home-featured-heading"
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

      <div
        role="group"
        aria-label={headerTitle}
        className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:mb-12 md:gap-x-12"
      >
        {availableTabs.map((tab) => {
          const isActive = tab === active;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              aria-pressed={isActive}
              className={[
                "font-garamond hover:text-gold relative cursor-pointer",
                "border-b pb-2 text-xs tracking-[0.16em] uppercase",
                "transition-colors duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-black",
                isActive
                  ? "border-neutral-900/40 text-neutral-900"
                  : "border-transparent text-neutral-500",
              ].join(" ")}
            >
              {tabLabels[tab]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} p={product} locale={locale} />
        ))}
      </div>

      <div className="mt-10 text-center md:mt-12">
        <Link
          href={`/${locale}/shop/${active}`}
          className="font-garamond hover:border-gold hover:text-gold inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          {labels.viewAllPrefix} {tabLabels[active]}
        </Link>
      </div>
    </section>
  );
}
