"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { Product } from "@/data/products";

type Crumb = { label: string; href?: string; current?: boolean };

type GenderTab = "All" | "Women" | "Men" | "Unisex";
type SortKey = "best" | "price-asc" | "price-desc";

export default function CollectionClient({
  items,
  breadcrumbs,
}: {
  items: Product[];
  breadcrumbs?: Crumb[];
}) {
  const [tab, setTab] = useState<GenderTab>("All");
  const [sort, setSort] = useState<SortKey>("best");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const visible = useMemo(() => {
    let list = items;

    if (tab !== "All") {
      const key = tab.toLowerCase() as Product["gender"];
      list = list.filter((p) => p.gender === key);
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller),
        );
    }
    return list;
  }, [items, tab, sort]);

  function clearAll() {
    setTab("All");
    setSort("best");
  }

  return (
    <section className="text-white">
      <div className="flex w-full items-center justify-between gap-4 px-5 py-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm opacity-80 transition hover:opacity-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 6h18M6 12h12M10 18h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filters &amp; Sort
        </button>
      </div>

      <div className="w-full px-5 pb-5">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {visible.map((p) => (
            <article key={p.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white ring-1 ring-black/10">
                <Image
                  src={p.image ?? "/placeholder.png"}
                  alt={p.name}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.02] md:p-10 lg:p-12"
                />
              </div>
              <div className="mt-2.5">
                <h3 className="font-garamond min-h-[1.5rem] text-base leading-snug font-light tracking-[0.02em] md:text-lg">
                  {p.name}
                </h3>
                <p className="font-carlito mt-2.5 text-xs">{p.price} EUR</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          <aside className="bg-bordeaux absolute top-0 right-0 flex h-full w-full flex-col border-l border-white/10 text-white shadow-xl sm:w-[420px] md:w-[480px]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-medium">Filters &amp; Sort</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearAll}
                  className="text-sm underline decoration-1 underline-offset-4 opacity-80 hover:opacity-100"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="-m-2 p-2 opacity-80 hover:opacity-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
              <section>
                <h3 className="mb-4 text-base font-medium">Sort by</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { id: "best", label: "Best Selling" },
                    { id: "price-asc", label: "Price, Low To High" },
                    { id: "price-desc", label: "Price, High To Low" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={opt.id}
                        checked={sort === (opt.id as SortKey)}
                        onChange={() => setSort(opt.id as SortKey)}
                        className="accent-current"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-base font-medium">Filter by</h3>
                <div className="space-y-3 text-sm">
                  {(["All", "Women", "Men", "Unisex"] as const).map((g) => (
                    <label
                      key={g}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={tab === g}
                        onChange={() => setTab(g)}
                        className="accent-current"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded border border-white/20 py-2 transition hover:border-white/40"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
