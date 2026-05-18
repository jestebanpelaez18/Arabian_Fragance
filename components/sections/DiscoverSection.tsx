"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import { type Product } from "@/data/products";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

const TABS = [{ key: "women" }, { key: "men" }, { key: "unisex" }] as const;
type Tab = (typeof TABS)[number]["key"];

type DiscoverProduct = Product;

export default function DiscoverSection({
  products,
}: {
  products: DiscoverProduct[];
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).sections.discover;
  const [active, setActive] = useState<Tab>("women");

  const tabLabels: Record<Tab, string> = {
    women: labels.womenTab,
    men: labels.menTab,
    unisex: labels.unisexTab,
  };

  const filtered: DiscoverProduct[] = useMemo(() => {
    const byBestSeller = (a: DiscoverProduct, b: DiscoverProduct) =>
      Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false);

    return products
      .filter((p) => p.gender === active)
      .sort(byBestSeller)
      .slice(0, 4);
  }, [active, products]);

  return (
    // EL ARREGLO DEL PADDING: Ancho total exacto (w-full px-4 md:px-6) sin max-w restrictivos
    <section className="w-full bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="w-full">
        
        {/* Navigation Tabs - Clean typography minimal look like Dior */}
        <div className="mb-14 flex flex-col items-center justify-center text-center">
          <nav className="flex items-center justify-center gap-10 text-xs tracking-[0.25em] uppercase">
            {TABS.map(({ key }) => {
              const isActive = key === active;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-serif pb-2 transition-colors duration-300 cursor-pointer relative ${
                    isActive
                      ? "text-gray-900 font-medium"
                      : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tabLabels[key]}
                  {isActive && (
                    <span className="absolute right-0 bottom-0 left-0 h-px bg-gray-950 animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Products Grid: 4 columns stretched fully sideways with minimal gaps */}
        <div className="mb-16 w-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>

        {/* View All CTA Link - Fixed to matching luxury editorial design */}
        <div className="text-center">
          <Link
            href={`/shop/${active}`}
            className="font-serif inline-block border-b border-gray-900 pb-1 text-xs tracking-[0.2em] uppercase text-gray-900 transition-colors duration-300 hover:border-gray-400 hover:text-gray-400"
          >
            {labels.viewAllPrefix} {active}
          </Link>
        </div>

      </div>
    </section>
  );
}