"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { PRODUCTS, type Product } from "@/data/products";

const TABS = ["Best Sellers", "Women", "Men", "Unisex"] as const;
type Tab = (typeof TABS)[number];

export default function DiscoverSection() {
  const [active, setActive] = useState<Tab>("Best Sellers");

  const filtered: Product[] = useMemo(() => {
    const byBestSeller = (a: Product, b: Product) =>
      Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false);

    switch (active) {
      case "Best Sellers": {
        const pool = PRODUCTS.filter((p) => p.bestSeller);
        return pool.sort(byBestSeller).slice(0, 4);
      }
      case "Women":
        return PRODUCTS.filter((p) => p.gender === "women")
          .sort(byBestSeller)
          .slice(0, 4);
      case "Men":
        return PRODUCTS.filter((p) => p.gender === "men")
          .sort(byBestSeller)
          .slice(0, 4);
      case "Unisex":
        return PRODUCTS.filter((p) => p.gender === "unisex")
          .sort(byBestSeller)
          .slice(0, 4);
    }
  }, [active]);

  return (
    <section className="w-full bg-[var(--background)]">
      <div className="w-full px-5 md:px-5 xl:px-6">
        <div className="flex items-end justify-between py-8 md:py-8">
          <div>
            <span className="font-garamond mb-6 block text-xs tracking-[0.22em] uppercase opacity-70">
              Our Creations
            </span>
            <h2 className="font-playfair-display text-3xl leading-[1.1] tracking-[-0.01em] md:text-4xl">
              DISCOVER AF
            </h2>
          </div>
          <Link
            href="/shop"
            className="hiddenunderline decoration-2 underline-offset-4 hover:opacity-85 md:block"
          >
            Shop All
          </Link>
        </div>

        {/* Tabs */}
        <nav className="mb-6 flex flex-wrap gap-6 text-[13px] md:text-sm">
          {TABS.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative pb-2 tracking-[0.18em] uppercase transition-colors",
                  isActive
                    ? "after:absolute after:right-0 after:-bottom-[2px] after:left-0 after:h-[1px] after:bg-black"
                    : "text-black/70 hover:text-gold",
                ].join(" ")}
              >
                {t}
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
      {active !== "Best Sellers" && (
        <div className="-mt-4 w-full px-5 pb-10 text-center md:px-8 xl:px-12">
          <Link
            href={`/shop/${active.toLowerCase()}`}
            className="underline decoration-2 underline-offset-4 hover:opacity-85"
          >
            View all {active.toLowerCase()}
          </Link>
        </div>
      )}
    </section>
  );
}
