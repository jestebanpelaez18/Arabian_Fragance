"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import { type Product } from "@/data/products";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";
import SectionHeader from "../ui/SectionHeader";

const TABS = [{ key: "women" }, { key: "men" }, { key: "unisex" }] as const;
type Tab = (typeof TABS)[number]["key"];

type DiscoverProduct = Product;

type DiscoverSectionProps = {
  products: DiscoverProduct[];
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
    <>
      {headerTitle && headerDescription ? (
        <SectionHeader title={headerTitle} description={headerDescription} />
      ) : null}

      <section className="w-full bg-background px-4 py-14 md:px-6 md:py-18">
        <div className="w-full">
          <div className="mb-14 flex flex-col items-center justify-center text-center">
            <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs tracking-[0.25em] uppercase">
              {TABS.map(({ key }) => {
                const isActive = key === active;
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    aria-current={isActive ? "page" : undefined}
                    className={`font-garamond relative cursor-pointer pb-2 transition-colors duration-300 ${
                      isActive
                        ? "text-gray-900 hover:text-gold"
                        : "text-gray-900/70 hover:text-gold"
                    }`}
                  >
                    {tabLabels[key]}
                    <span
                      className={`absolute right-0 bottom-0 left-0 h-px transition-colors duration-300 ${
                        isActive
                          ? "bg-gray-900/35 group-hover:bg-gold"
                          : "bg-transparent group-hover:bg-gold"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mb-16 w-full">
            <div className="grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href={`/shop/${active}`}
              className="group inline-flex min-w-max flex-col items-stretch"
            >
              <span className="font-garamond text-center text-xs tracking-[0.2em] uppercase text-gray-900 transition-colors duration-200 group-hover:text-gold">
                {labels.viewAllPrefix} {active}
              </span>
              <span className="mt-2 h-px w-full bg-gray-900/25 transition-colors duration-200 group-hover:bg-gold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}