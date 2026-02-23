"use client";

import { useEffect, useRef, useState } from "react";
import NavLeft from "@/components/navbar/NavLeft";
import NavCenter from "@/components/navbar/NavCenter";
import NavRight from "@/components/navbar/NavRight";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import { usePathname } from "next/navigation";
import SearchOverlay from "./SearchOverlay";

type MobileView = "root" | "shop";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openShop, setOpenShop] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const pathname = usePathname();

  // Close menu on channge of route
  useEffect(() => {
    setOpenMobile(false);
    setOpenSearch(false);
  }, [pathname]);

  // ESC key closes mobile drawer and mega-menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMobile(false);
        setOpenShop(false);
        setOpenSearch(false);
        setMobileView("root");
      }
    };
    if (openMobile || openShop || openSearch)
      document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMobile, openShop, openSearch]);

  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  // Mega-menu desktop: hover intent
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

  const viewIndex = mobileView === "root" ? 0 : 1;
  const title = mobileView === "shop" ? "Shop" : "";

  return (
    <>
      <header className="z-header navbar border-navbar-border sticky top-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]">
        <nav className="w-full px-5 py-3 md:px-5">
          <div className="grid h-9 grid-cols-[44px_1fr_44px] items-center md:h-8">
            <NavLeft
              openMobile={openMobile}
              setOpenMobile={setOpenMobile}
              setMobileView={setMobileView}
              openShop={openShop}
              openShopNow={openShopNow}
              closeShopSoon={closeShopSoon}
            />
            <NavCenter />
            <NavRight onOpenSearch={() => setOpenSearch(true)} />
          </div>
        </nav>
      </header>
      <MobileDrawer
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        mobileView={mobileView}
        setMobileView={setMobileView}
        viewIndex={viewIndex}
        title={title}
      />
      <SearchOverlay isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
