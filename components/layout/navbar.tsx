"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavRight from "@/components/navbar/NavRight";
import NavCenter from "../navbar/NavCenter";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import SearchOverlay from "@/components/navbar/SearchOverlay";
import SmoothImage from "@/components/ui/SmoothImage";

type MobileView = "root" | "shop";

export default function Navbar() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openSearch, setOpenSearch] = useState(false);

  // AUTO-CLOSE ON NAVIGATION
  useEffect(() => {
    setOpenSearch(false);
    setOpenMobile(false);
  }, [pathname]);

  // CONTROL FUNCTIONS (Mutual Exclusion)
  const handleOpenSearch = () => {
    setOpenSearch(true);
    setOpenMobile(false);
  };

  const handleMobileToggle = () => {
    setOpenMobile((prev) => {
      if (!prev) setOpenSearch(false); // If opening mobile, close search
      return !prev;
    });
  };

  return (
    <>
      <header className="fixed top-0 z-[9900] w-full border-b border-black/5 bg-[var(--background)] text-[var(--foreground)]">
        {/* --- ROW 1: UTILS, LOGO & ICONS --- */}
        <div className="grid h-16 grid-cols-3 items-center px-5 md:px-8">
          {/* Left: Mobile Hamburger OR Desktop Utils */}
          <div className="flex items-center justify-start">
            {/* Mobile Menu Button (Visible only on small screens) */}
            <button
              className="p-2 lg:hidden"
              onClick={handleMobileToggle}
              aria-label="Open Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Desktop Utils (Visible only on large screens) */}
            <div className="font-garamond hidden items-center gap-4 text-xs tracking-widest uppercase lg:flex">
              <button className="transition-colors hover:text-[#C9A46A]">
                EUR €
              </button>
              <span className="opacity-30">|</span>
              <button className="transition-colors hover:text-[#C9A46A]">
                EN
              </button>
            </div>
          </div>

          {/* Center: Logo */}
          <NavCenter />

          {/* Right: Search, Account, Cart */}
          {/* We pass our smart handleOpenSearch down to NavRight */}
          <NavRight onOpenSearch={handleOpenSearch} />
        </div>

        {/* --- ROW 2: DESKTOP NAVIGATION CATEGORIES --- */}
        <nav className="relative hidden items-center justify-center gap-10 border-t border-black/5 py-3 lg:flex">
          {/* 1. PERFUMES ITEM WITH DROPDOWN */}
          {/* The 'group' class allows the child dropdown to appear on hover */}
          <div className="group h-full">
            <button className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]">
              Perfumes
            </button>

            {/* THE DROPDOWN PANEL (Amouage Style) */}
            {/* Absolute positioning, hides by default, shows on group hover */}
            <div className="invisible absolute top-full left-0 z-[9999] w-full border-t border-black/5 bg-[var(--background)] opacity-0 shadow-md transition-all duration-300 group-hover:visible group-hover:opacity-100">
              {/* Container to align content with the rest of the navbar */}
              <div className="mx-auto flex max-w-7xl justify-center gap-24 px-12 py-10">
                {/* Column 1: By Gender */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-bodoni mb-2 text-xs font-bold tracking-[0.15em] text-black/50 uppercase">
                    By Category
                  </h3>
                  <Link
                    href="/shop?gender=women"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    Women's Perfumes
                  </Link>
                  <Link
                    href="/shop?gender=men"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    Men's Perfumes
                  </Link>
                  <Link
                    href="/shop?gender=unisex"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    Universal Perfumes
                  </Link>
                  <Link
                    href="/shop"
                    className="font-garamond mt-2 text-sm font-semibold text-black transition-colors hover:text-[#C9A46A]"
                  >
                    Shop All
                  </Link>
                </div>

                {/* Column 2: By Collection */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-bodoni mb-2 text-xs font-bold tracking-[0.15em] text-black/50 uppercase">
                    By Collection
                  </h3>
                  <Link
                    href="/collections/luxury"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    The Luxury Collection
                  </Link>
                  <Link
                    href="/collections/premium"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    The Premium Collection
                  </Link>
                  <Link
                    href="/collections/signature"
                    className="font-garamond text-sm text-black transition-colors hover:text-[#C9A46A]"
                  >
                    The Signature Collection
                  </Link>
                </div>

                {/* Column 3: Featured Image (Optional, very Amouage/Dior) */}
                <div className="relative hidden h-64 w-48 overflow-hidden rounded-sm bg-white ring-1 ring-black/5 xl:block">
                  <SmoothImage
                    src="/catalog/Bottle_3.png"
                    alt="Featured Perfume"
                    fill
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. OILS & ATTARS */}
          <Link
            href="/oils"
            className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
          >
            Oils & Attars
          </Link>

          {/* 3. BATH & BODY (You can add a similar group-hover dropdown here) */}
          <Link
            href="/body"
            className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
          >
            Bath & Body
          </Link>

          {/* 4. HOME */}
          <Link
            href="/home-fragrance"
            className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
          >
            Home
          </Link>

          {/* 5. DISCOVERY */}
          <Link
            href="/product/discovery-set"
            className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
          >
            Discovery
          </Link>

          {/* 6. HOUSE OF ARABIAN */}
          <Link
            href="/about"
            className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
          >
            House of Arabian
          </Link>
        </nav>
      </header>

      {/* --- OVERLAYS & MENUS --- */}
      <MobileDrawer
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        mobileView={mobileView}
        setMobileView={setMobileView}
        viewIndex={mobileView === "root" ? 0 : 1}
        title={mobileView === "shop" ? "Shop" : ""}
      />

      <SearchOverlay isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
