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
    <section className="bg-bordeaux w-full text-white">
      <div className="w-full px-5">
        <div className="flex items-center justify-between py-4">
          <h2 className="font-playfair-display text-2xl tracking-wide md:text-3xl">
            DISCOVER AF
          </h2>
          <Link
            href="/shop"
            className="hidden underline decoration-2 underline-offset-4 hover:opacity-80 sm:block"
          >
            Shop All
          </Link>
        </div>
      </div>
      <div className="w-full px-5 py-4">
        <nav className="flex gap-6 text-sm md:text-base">
          {TABS.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                aria-current={isActive ? "page" : undefined}
                className={`relative pb-1 transition-colors ${
                  isActive
                    ? "text-white after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[2px] after:bg-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="w-full px-5 pb-5">
        <div className="grid grid-cols-2 items-stretch gap-x-2.5 gap-y-16 md:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
