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
    switch (active) {
      case "Best Sellers":
        return PRODUCTS.filter((p) => p.bestSeller);
      case "Women":
        return PRODUCTS.filter((p) => p.gender === "women");
      case "Men":
        return PRODUCTS.filter((p) => p.gender === "men");
      case "Unisex":
        return PRODUCTS.filter((p) => p.gender === "unisex");
    }
  }, [active]);

  return (
    <section>
      <div className="bg-bordeaux text-white border-y border-white/60">
        <div className="px-6 md:px-12 xl:px-16 py-3 flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl tracking-wide">
            DISCOVER AF
          </h2>
          <span className="hidden md:block uppercase tracking-widest text-xs md:text-sm">
            [Best Sellers] Fragrances Minis Sets
          </span>
        </div>
      </div>
      <div className="px-6 md:px-12 xl:px-16 py-5 flex items-end justify-between">
        <nav className="flex flex-wrap gap-6 text-base">
          {TABS.map((t) => {
            const activeTab = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                aria-current={activeTab ? "page" : undefined}
                className={
                  activeTab
                    ? "underline underline-offset-4 decoration-2"
                    : "text-black/60 hover:text-black"
                }
              >
                {t}
              </button>
            );
          })}
        </nav>
        <Link
          href="/shop"
          className="hidden sm:block underline underline-offset-4 decoration-2 hover:opacity-80"
        >
          Shop All
        </Link>
      </div>

      <div className="px-6 md:px-12 xl:px-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
