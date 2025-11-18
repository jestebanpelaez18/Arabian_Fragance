"use client";

import { useEffect, useRef, useState } from "react";
import NavLeft from "@/components/navbar/NavLeft";
import NavCenter from "@/components/navbar/NavCenter";
import NavRight from "@/components/navbar/NavRight";
import MobileDrawer from "@/components/navbar/MobileDrawer";

type MobileView = "root" | "shop";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openShop, setOpenShop] = useState(false);

  // ESC key closes mobile drawer and mega-menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMobile(false);
        setOpenShop(false);
        setMobileView("root");
      }
    };
    if (openMobile || openShop) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMobile, openShop]);

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
      <header className="z-header sticky top-0 border-b border-white/10 bg-[var(--background)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]">
        <nav className="w-full px-5 pb-3 py-3 md:px-5">
          <div className="grid h-9 md:h-8 grid-cols-[44px_1fr_44px] items-center">
            <NavLeft
              openMobile={openMobile}
              setOpenMobile={setOpenMobile}
              setMobileView={setMobileView}
              openShop={openShop}
              setOpenShop={setOpenShop}
              openShopNow={openShopNow}
              closeShopSoon={closeShopSoon}
            />
            <NavCenter />
            <NavRight
              openShop={openShop}
              setOpenShop={setOpenShop}
              openShopNow={openShopNow}
              closeShopSoon={closeShopSoon}
            />
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
    </>
  );
}
