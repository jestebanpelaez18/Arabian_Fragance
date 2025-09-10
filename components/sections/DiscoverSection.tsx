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
    <section className="bg-bordeaux text-white w-full">
      <div className="w-full px-2 md:px-4 xl:px-6 border-b border-white/60">
        <div className="flex items-center justify-between py-3">
          <h2 className="font-display text-2xl md:text-3xl tracking-wide">
            DISCOVER AF
          </h2>
        </div>
      </div>
  
      <div className="w-full px-2 md:px-4 xl:px-6 py-5 flex items-end justify-between">
        <nav className="flex flex-wrap gap-6 text-base">
          {TABS.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "underline underline-offset-4 decoration-2"
                    : "text-gray-400/60 hover:text-black"
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
  
      <div className="w-full px-2 md:px-4 xl:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
  
}
