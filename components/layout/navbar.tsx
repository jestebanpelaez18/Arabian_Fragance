"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavRight from "@/components/navbar/NavRight";
import NavCenter from "../navbar/NavCenter";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import SearchOverlay from "@/components/layout/SearchOverlay";

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
      <header className="fixed top-0 z-[9900] w-full bg-[#F2F0EB] text-[#1a1a1a] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Utils (Visible only on large screens) */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-garamond tracking-widest uppercase">
              <button className="hover:text-[#C9A46A] transition-colors">EUR €</button>
              <span className="opacity-30">|</span>
              <button className="hover:text-[#C9A46A] transition-colors">EN</button>
            </div>
          </div>

          {/* Center: Logo */}
          <NavCenter />

          {/* Right: Search, Account, Cart */}
          {/* We pass our smart handleOpenSearch down to NavRight */}
          <NavRight onOpenSearch={handleOpenSearch} />
        </div>

        {/* --- ROW 2: DESKTOP NAVIGATION CATEGORIES --- */}
        {/* Hidden on mobile (they go in MobileDrawer), visible on Desktop */}
        <nav className="hidden lg:flex items-center justify-center gap-10 py-3 border-t border-black/5">
          <Link href="/shop" className="font-bodoni text-xs tracking-[0.2em] uppercase hover:text-[#C9A46A] transition-colors">
            Perfumes
          </Link>
          <Link href="/collections" className="font-bodoni text-xs tracking-[0.2em] uppercase hover:text-[#C9A46A] transition-colors">
            Collections
          </Link>
          <Link href="/body" className="font-bodoni text-xs tracking-[0.2em] uppercase hover:text-[#C9A46A] transition-colors">
            Body
          </Link>
          <Link href="/house" className="font-bodoni text-xs tracking-[0.2em] uppercase hover:text-[#C9A46A] transition-colors">
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

      <SearchOverlay 
        isOpen={openSearch} 
        onClose={() => setOpenSearch(false)} 
      />
    </>
  );
}