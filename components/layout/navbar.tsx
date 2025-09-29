"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openShop, setOpenShop] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMobile(false);
    };
    if (openMobile) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMobile]);

  const closeTimer = useRef<number | null>(null);
  const openShopNow = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenShop(true);
  };
  const closeShopSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenShop(false), 120);
  };

  return (
    <header
      className="sticky top-0 z-[9999]
                 bg-[var(--background)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]
                 border-b border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      <nav className="w-full px-5 md:px-8 xl:px-12">
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center">
          <div className="hidden lg:flex items-center gap-8 justify-self-start">
            <div
              className="relative"
              onPointerEnter={openShopNow}
              onPointerLeave={closeShopSoon}
            >
              <span className="pointer-events-none absolute left-0 right-0 top-full h-2" />

              <button
                className="nav-link text-white relative
                           before:absolute before:left-0 before:right-0 before:top-full before:h-2 before:content-['']"
                aria-haspopup="true"
                aria-expanded={openShop}
                aria-controls="shop-panel"
              >
                Shop
              </button>
              <div
                id="shop-panel"
                className={`fixed left-0 right-0 top-14 z-[9990]
                            transition-[opacity,visibility] duration-150
                            ${openShop ? "opacity-100 visible" : "opacity-0 invisible"}`}
                role="dialog"
                aria-hidden={!openShop}
              >
                <div>
                  <div className="w-[min(92vw,980px)] rounded-lg border border-white/10 bg-[var(--background)] shadow-2xl">
                    <div className="grid grid-cols-12 gap-8 p-8">
                      <div className="col-span-8 grid grid-cols-2 gap-8">
                        <div>
                          <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                            Shop
                          </p>
                          <ul className="space-y-3 text-white/90">
                            <li>
                              <Link
                                href="/shop"
                                className="nav-link inline-block"
                              >
                                Shop All
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/shop?gender=women"
                                className="nav-link inline-block"
                              >
                                Women Perfumes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/shop?gender=men"
                                className="nav-link inline-block"
                              >
                                Men Perfumes
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/shop?gender=unisex"
                                className="nav-link inline-block"
                              >
                                Unisex
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                            Collections
                          </p>
                          <ul className="space-y-3 text-white/90">
                            <li>
                              <Link
                                href="/collections"
                                className="nav-link inline-block"
                              >
                                View All Collections
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collections/desert-oud"
                                className="nav-link inline-block"
                              >
                                Desert Oud
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collections/golden-sands"
                                className="nav-link inline-block"
                              >
                                Golden Sands
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collections/rose-of-dubai"
                                className="nav-link inline-block"
                              >
                                Rose of Dubai
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-span-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10">
                          <Image
                            src="/collections/Coleccion1.jpg"
                            alt="Arabian Fragrance - Collection 1"
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/collections" className="nav-link text-white">
              Collections
            </Link>
            <Link href="/about" className="nav-link text-white">
              About
            </Link>
          </div>

          {/* CENTER: brand */}
          <div className="justify-self-center">
            <Link
              href="/"
              className="brand text-[18px] md:text-[20px] text-white/95"
            >
              ARABIAN FRAGRANCE
            </Link>
          </div>

          {/* RIGHT (desktop) */}
          <div className="hidden lg:flex items-center justify-end gap-6 text-white">
            <Link href="/search" className="nav-link">
              Search
            </Link>
            <Link href="/account" className="nav-link">
              Account
            </Link>
            <Link href="/bag" className="nav-link">
              Bag
            </Link>
          </div>

          {/* BURGER (mobile) */}
          <div className="lg:hidden flex items-center justify-self-end">
            <button
              aria-label="Open menu"
              onClick={() => setOpenMobile(true)}
              className="p-2 text-white/90"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* DRAWER MOBILE */}
      {openMobile && (
        <div className="fixed inset-0 z-[10000] lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpenMobile(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside
            className="absolute left-0 top-0 h-full w-[86vw] max-w-[360px]
                       bg-[var(--background)] text-white border-r border-white/10 shadow-xl
                       flex flex-col"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setOpenMobile(false)}
                className="brand text-base"
              >
                ARABIAN FRAGRANCE
              </Link>
              <button
                aria-label="Close"
                onClick={() => setOpenMobile(false)}
                className="p-2 -m-2 text-white/85"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
              <details className="[&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none nav-link text-white">
                  Shop
                </summary>
                <ul className="mt-3 ml-3 space-y-3 text-white/90">
                  <li>
                    <Link
                      href="/shop"
                      onClick={() => setOpenMobile(false)}
                      className="block nav-link"
                    >
                      Shop All
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=women"
                      onClick={() => setOpenMobile(false)}
                      className="block nav-link"
                    >
                      Women Perfumes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=men"
                      onClick={() => setOpenMobile(false)}
                      className="block nav-link"
                    >
                      Men Perfumes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=unisex"
                      onClick={() => setOpenMobile(false)}
                      className="block nav-link"
                    >
                      Unisex
                    </Link>
                  </li>
                </ul>
              </details>

              <Link
                href="/collections"
                onClick={() => setOpenMobile(false)}
                className="block nav-link text-white"
              >
                Collections
              </Link>
              <Link
                href="/about"
                onClick={() => setOpenMobile(false)}
                className="block nav-link text-white"
              >
                About
              </Link>
            </nav>

            <div className="px-4 py-4 border-t border-white/10 space-y-3 text-white/85">
              <Link
                href="/search"
                onClick={() => setOpenMobile(false)}
                className="block"
              >
                Search
              </Link>
              <Link
                href="/account"
                onClick={() => setOpenMobile(false)}
                className="block"
              >
                Account
              </Link>
              <Link
                href="/bag"
                onClick={() => setOpenMobile(false)}
                className="block"
              >
                Bag
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
