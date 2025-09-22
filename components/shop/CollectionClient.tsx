"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

type GenderTab = "All" | "Women" | "Men" | "Unisex";
type SortKey = "best" | "price-asc" | "price-desc";

export default function CollectionClient({ items }: { items: Product[] }) {
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
          (a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller)
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
      <div className="w-full px-4 md:px-8 xl:px-12 py-4 flex items-center justify-between gap-4">
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {(["All", "Women", "Men", "Unisex"] as const).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-full border transition
                ${active ? "opacity-100" : "opacity-70 hover:opacity-100"}
                border-current`}
                aria-pressed={active}
              >
                {t}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3 6h18M6 12h12M10 18h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filters & Sort
        </button>
      </div>

      <div className="w-full px-4 md:px-8 xl:px-12 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-10 gap-y-16">
          {visible.map((p) => (
            <article key={p.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] bg-white ring-1 ring-black/10 rounded-sm overflow-hidden">
                <Image
                  src={p.image ?? "/placeholder.png"}
                  alt={p.name}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-contain p-8 md:p-10 lg:p-12 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5">
                <h3 className="font-playfair-display text-base md:text-lg leading-snug tracking-[0.02em] min-h-[2.5rem]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm opacity-70">€{p.price}</p>
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
          <aside
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] md:w-[480px]
                            bg-bordeaux text-white shadow-xl
                            border-l border-white/10
                            flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-medium">Filters &amp; Sort</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearAll}
                  className="underline underline-offset-4 decoration-1 opacity-80 hover:opacity-100 text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 -m-2 opacity-80 hover:opacity-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              <section>
                <h3 className="text-base font-medium mb-4">Sort by</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { id: "best", label: "Best Selling" },
                    { id: "price-asc", label: "Price, Low To High" },
                    { id: "price-desc", label: "Price, High To Low" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 cursor-pointer"
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
                <h3 className="text-base font-medium mb-4">Filter by</h3>
                <div className="space-y-3 text-sm">
                  {(["All", "Women", "Men", "Unisex"] as const).map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-3 cursor-pointer"
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
            <div className="px-6 py-4 border-t border-white/10">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded border border-white/20 hover:border-white/40 transition"
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
