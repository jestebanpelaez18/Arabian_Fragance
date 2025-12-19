"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { PRODUCTS, type Product } from "@/data/products";

const TABS = [
  { label: "WOMEN", key: "women" },
  { label: "MEN", key: "men" },
  { label: "UNISEX", key: "unisex" },
] as const;
type Tab = (typeof TABS)[number]["key"];

export default function DiscoverSection() {
  const [active, setActive] = useState<Tab>("women");

  const filtered: Product[] = useMemo(() => {
    const byBestSeller = (a: Product, b: Product) =>
      Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false);

    if (active === "women") {
      return PRODUCTS.filter((p) => p.gender === "women")
        .sort(byBestSeller)
        .slice(0, 4);
    }
    if (active === "men") {
      return PRODUCTS.filter((p) => p.gender === "men")
        .sort(byBestSeller)
        .slice(0, 4);
    }
    return PRODUCTS.filter((p) => p.gender === "unisex")
      .sort(byBestSeller)
      .slice(0, 4);
  }, [active]);

  return (
    <section className="w-full">
      <div className="flex w-full flex-col items-center justify-center px-5 py-12 text-center md:px-5 md:py-14 xl:px-6">
        {/* Tabs */}
        <nav className="my-8 flex flex-wrap justify-center gap-8 text-[12px] md:text-sm">
          {TABS.map(({ label, key }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "font-garamond ease-luxe relative pb-3 tracking-[0.24em] uppercase transition-colors",
                  isActive
                    ? "text-ink after:bg-gold after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-px"
                    : "hover:text-gold text-black/60",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Grid */}
      <div className="w-full px-5 pb-8 md:px-5 md:pb-12 xl:px-6">
        <div className="grid grid-cols-2 items-stretch gap-x-2.5 gap-y-16 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
      <div className="w-full px-5 pb-12 text-center md:px-8 md:pb-16 xl:px-12">
        <Link
          href={`/shop/${active}`}
          className="font-garamond link-gold ease-luxe inline-block text-[12px] tracking-[0.18em] uppercase opacity-80 md:text-[13px]"
        >
          View all {active}
        </Link>
      </div>
    </section>
  );
}
