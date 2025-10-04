"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<"root" | "shop">("root");
  const [openShop, setOpenShop] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMobile(false); };
    if (openMobile) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMobile]);

  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openMobile]);

  const closeTimer = useRef<number | null>(null);
  const openShopNow = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } setOpenShop(true); };
  const closeShopSoon = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setOpenShop(false), 120); };

  return (
    <>
      {/* ===== HEADER (igual que lo tienes) ===== */}
      <header className="sticky top-0 z-[9999] border-b border-white/10 bg-[var(--background)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]">
        <nav className="w-full px-5 md:px-8 xl:px-12">
          <div className="grid h-14 grid-cols-[44px_1fr_44px] lg:grid-cols-[auto_1fr_auto] items-center">
            {/* IZQ desktop */}
            <div className="hidden lg:flex items-center gap-8 justify-self-start">
              <div className="relative" onPointerEnter={openShopNow} onPointerLeave={closeShopSoon}>
                <span className="pointer-events-none absolute top-full left-0 right-0 h-2" />
                <button className="nav-link relative text-white before:absolute before:top-full before:left-0 before:right-0 before:h-2 before:content-['']" aria-haspopup="true" aria-expanded={openShop} aria-controls="shop-panel">Shop</button>
                {/* Mega-menu desktop (sin cambios) */}
                <div id="shop-panel" className={`fixed top-14 left-0 right-0 z-[9990] transition-[opacity,visibility] duration-150 ${openShop ? "visible opacity-100" : "invisible opacity-0"}`} role="dialog" aria-hidden={!openShop}>
                  <div className="w-[min(92vw,980px)] rounded-lg border border-white/10 bg-[var(--background)] shadow-2xl">
                    <div className="grid grid-cols-12 gap-8 p-8">
                      <div className="col-span-8 grid grid-cols-2 gap-8">
                        <div>
                          <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Shop</p>
                          <ul className="space-y-3 text-white/90">
                            <li><Link href="/shop" className="nav-link inline-block">Shop All</Link></li>
                            <li><Link href="/shop?gender=women" className="nav-link inline-block">Women Perfumes</Link></li>
                            <li><Link href="/shop?gender=men" className="nav-link inline-block">Men Perfumes</Link></li>
                            <li><Link href="/shop?gender=unisex" className="nav-link inline-block">Unisex</Link></li>
                          </ul>
                        </div>
                        <div>
                          <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Collections</p>
                          <ul className="space-y-3 text-white/90">
                            <li><Link href="/collections" className="nav-link inline-block">View All Collections</Link></li>
                            <li><Link href="/collections/desert-oud" className="nav-link inline-block">Desert Oud</Link></li>
                            <li><Link href="/collections/golden-sands" className="nav-link inline-block">Golden Sands</Link></li>
                            <li><Link href="/collections/rose-of-dubai" className="nav-link inline-block">Rose of Dubai</Link></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10">
                          <Image src="/collections/collection-desert-oud.jpg" alt="Arabian Fragrance - Collection: Desert Oud" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" priority />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Mega-menu */}
              </div>

              <Link href="/collections" className="nav-link text-white">Collections</Link>
              <Link href="/about" className="nav-link text-white">About</Link>
            </div>

            {/* BURGER móvil */}
            <div className="lg:hidden col-start-1 flex items-center justify-self-start">
              <button aria-label="Open menu" onClick={() => { setOpenMobile(true); setMobileView("root"); }} className="p-2 text-white/90">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Marca centrada */}
            <div className="justify-self-center">
              <Link href="/" className="brand text-[18px] md:text-[20px] text-white/95">ARABIAN FRAGRANCE</Link>
            </div>

            {/* Derecha desktop */}
            <div className="hidden lg:flex items-center justify-end gap-6 text-white">
              <Link href="/search" className="nav-link">Search</Link>
              <Link href="/account" className="nav-link">Account</Link>
              <Link href="/bag" className="nav-link">Bag</Link>
            </div>

            {/* Espaciador derecho móvil */}
            <div className="lg:hidden justify-self-end" aria-hidden="true">
              <span className="block w-6 h-6" />
            </div>
          </div>
        </nav>
      </header>

      {/* ===== DRAWER MÓVIL: FUERA DEL HEADER ===== */}
      {openMobile && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-[10000] lg:hidden">
          {/* Overlay */}
          <button
            aria-label="Close menu"
            onClick={() => setOpenMobile(false)}
            className="absolute inset-0 z-10 bg-black/45"
          />
          {/* Panel */}
          <aside
            className="absolute top-0 left-0 z-20 h-full w-[88vw] max-w-[380px] flex flex-col overscroll-contain border-r border-white/10 bg-[var(--background)] text-white shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header del drawer */}
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              {mobileView === "shop" ? (
                <button onClick={() => setMobileView("root")} className="-m-2 p-2 text-white/85" aria-label="Back">←</button>
              ) : (
                <span />
              )}
              <button aria-label="Close" onClick={() => setOpenMobile(false)} className="-m-2 p-2 text-white/85">✕</button>
            </div>

            {/* Contenido deslizante root <-> shop */}
            <div className="relative flex-1 overflow-hidden">
              <div className={`flex h-full w-[200%] transition-transform duration-300 ease-out ${mobileView === "root" ? "translate-x-0" : "-translate-x-1/2"}`}>
                {/* ROOT */}
                <section className="min-w-full h-full overflow-y-auto px-4 py-5 space-y-5">
                  <button className="nav-link block text-left text-white" onClick={() => setMobileView("shop")}>Shop</button>
                  <Link href="/collections" onClick={() => setOpenMobile(false)} className="nav-link block text-white">Collections</Link>
                  <Link href="/about" onClick={() => setOpenMobile(false)} className="nav-link block text-white">About</Link>
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-white/85">
                    <Link href="/search"  onClick={() => setOpenMobile(false)} className="block">Search</Link>
                    <Link href="/account" onClick={() => setOpenMobile(false)} className="block">Account</Link>
                    <Link href="/bag"     onClick={() => setOpenMobile(false)} className="block">Bag</Link>
                  </div>
                </section>

                {/* SHOP */}
                <section className="min-w-full h-full overflow-y-auto px-4 py-5">
                  <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Shop</p>
                  <ul className="space-y-3 text-white/90">
                    <li><Link href="/shop"              onClick={() => setOpenMobile(false)} className="nav-link block">Shop All</Link></li>
                    <li><Link href="/shop?gender=women" onClick={() => setOpenMobile(false)} className="nav-link block">Women Perfumes</Link></li>
                    <li><Link href="/shop?gender=men"   onClick={() => setOpenMobile(false)} className="nav-link block">Men Perfumes</Link></li>
                    <li><Link href="/shop?gender=unisex"onClick={() => setOpenMobile(false)} className="nav-link block">Unisex</Link></li>
                  </ul>
                </section>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
