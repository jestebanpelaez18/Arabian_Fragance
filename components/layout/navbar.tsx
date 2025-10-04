"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MobileView = "root" | "perfumes" | "collections";

export default function Navbar() {
  // --- State ---
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openShop, setOpenShop] = useState(false);

  // Close drawer with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMobile(false);
    };
    if (openMobile) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMobile]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  // Desktop mega-menu hover intent
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

  // Index for sliding inner views (0=root, 1=perfumes, 2=collections)
  const viewIndex =
    mobileView === "root" ? 0 : mobileView === "perfumes" ? 1 : 2;
  const title =
    mobileView === "perfumes"
      ? "Perfumes"
      : mobileView === "collections"
        ? "Collections"
        : "";

  return (
    <>
      {/* ===== HEADER (desktop unchanged) ===== */}
      <header className="sticky top-0 z-[9999] border-b border-white/10 bg-[var(--background)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]">
        <nav className="w-full px-5 md:px-8 xl:px-12">
          <div className="grid h-14 grid-cols-[44px_1fr_44px] items-center lg:grid-cols-[auto_1fr_auto]">
            {/* Left (desktop) */}
            <div className="hidden items-center gap-8 justify-self-start lg:flex">
              <div
                className="relative"
                onPointerEnter={openShopNow}
                onPointerLeave={closeShopSoon}
              >
                <span className="pointer-events-none absolute top-full right-0 left-0 h-2" />
                <button
                  className="nav-link relative text-white before:absolute before:top-full before:right-0 before:left-0 before:h-2 before:content-['']"
                  aria-haspopup="true"
                  aria-expanded={openShop}
                  aria-controls="shop-panel"
                >
                  Shop
                </button>

                {/* Mega-menu (desktop) */}
                <div
                  id="shop-panel"
                  className={`fixed top-14 right-0 left-0 z-[9990] transition-[opacity,visibility] duration-150 ${
                    openShop ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                  role="dialog"
                  aria-hidden={!openShop}
                >
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
                            src="/collections/collection-desert-oud.jpg"
                            alt="Arabian Fragrance - Collection: Desert Oud"
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
                {/* /Mega-menu */}
              </div>

              <Link href="/collections" className="nav-link text-white">
                Collections
              </Link>
              <Link href="/about" className="nav-link text-white">
                About
              </Link>
            </div>

            {/* Burger / X (mobile) */}
            <div className="col-start-1 flex items-center justify-self-start lg:hidden">
              <button
                aria-label={openMobile ? "Close menu" : "Open menu"}
                aria-expanded={openMobile}
                onClick={() => {
                  const toOpen = !openMobile;
                  setOpenMobile(toOpen);
                  if (toOpen) setMobileView("root");
                }}
                className="p-2 text-white/90"
              >
                {openMobile ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Brand (center) */}
            <div className="justify-self-center">
              <Link
                href="/"
                className="brand text-[18px] text-white/95 md:text-[20px]"
              >
                ARABIAN FRAGRANCE
              </Link>
            </div>

            {/* Right (desktop) */}
            <div className="hidden items-center justify-end gap-6 text-white lg:flex">
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

            {/* Right spacer (mobile symmetry) */}
            <div className="justify-self-end lg:hidden" aria-hidden="true">
              <span className="block h-6 w-6" />
            </div>
          </div>
        </nav>
      </header>

      {/* ===== MOBILE DRAWER (overlay fade + panel slide) ===== */}
      <div
        aria-hidden={!openMobile}
        className={`fixed inset-x-0 top-14 bottom-0 z-[10000] lg:hidden ${
          openMobile ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <button
          aria-label="Close menu"
          onClick={() => setOpenMobile(false)}
          className={`absolute inset-0 z-10 bg-black/45 duration-300 motion-safe:transition-opacity ${
            openMobile ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sliding panel */}
        <aside
          className={`absolute top-0 left-0 z-20 flex h-[100dvh] w-[88vw] max-w-[380px] flex-col overscroll-contain border-r border-white/10 bg-[var(--background)] text-white shadow-2xl duration-300 ease-out will-change-transform motion-safe:transition-transform ${openMobile ? "translate-x-0" : "-translate-x-full"} `}
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer header (Back + centered title). Close "X" removed. */}
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            {mobileView !== "root" ? (
              <button
                onClick={() => setMobileView("root")}
                className="-m-2 p-2 text-white/85"
                aria-label="Back"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            ) : (
              <span className="h-8 w-8" />
            )}

            <span className="text-xs tracking-[0.18em] text-white/60 uppercase">
              {title}
            </span>

            {/* Right placeholder keeps the title centered */}
            <span className="h-8 w-8" />
          </div>

          {/* Inner sliding views: root, perfumes, collections */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex h-full w-[300%] duration-300 ease-out motion-safe:transition-transform"
              style={{ transform: `translateX(-${viewIndex * 100}%)` }}
            >
              {/* Root */}
              <section className="h-full min-w-full space-y-5 overflow-y-auto px-4 py-5">
                <button
                  className="nav-link block text-left text-white"
                  onClick={() => setMobileView("perfumes")}
                >
                  Perfumes
                </button>
                <button
                  className="nav-link block text-left text-white"
                  onClick={() => setMobileView("collections")}
                >
                  Collections
                </button>
                <Link
                  href="/gift-ideas"
                  onClick={() => setOpenMobile(false)}
                  className="nav-link block text-white"
                >
                  Gift Ideas
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpenMobile(false)}
                  className="nav-link block text-white"
                >
                  About
                </Link>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-white/85">
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
              </section>

              {/* Perfumes */}
              <section className="h-full min-w-full overflow-y-auto px-4 py-5">
                <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                  Perfumes
                </p>
                <ul className="space-y-3 text-white/90">
                  <li>
                    <Link
                      href="/shop"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Shop All
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=women"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Women Perfumes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=men"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Men Perfumes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop?gender=unisex"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Unisex
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Collections */}
              <section className="h-full min-w-full overflow-y-auto px-4 py-5">
                <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
                  Collections
                </p>
                <ul className="space-y-3 text-white/90">
                  <li>
                    <Link
                      href="/collections"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      View All Collections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/desert-oud"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Desert Oud
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/golden-sands"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Golden Sands
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections/rose-of-dubai"
                      onClick={() => setOpenMobile(false)}
                      className="nav-link block"
                    >
                      Rose of Dubai
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
