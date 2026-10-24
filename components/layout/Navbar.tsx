"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MAIN_LINKS } from "@/lib/shop/navigation";
import NavRight from "@/components/navbar/NavRight";
import NavCenter from "@/components/navbar/NavCenter";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import SearchOverlay from "@/components/navbar/SearchOverlay";
import LocalizationMenu from "@/components/navbar/LocalizationMenu";
import DesktopPerfumeMenu from "@/components/navbar/DesktopPerfumeMenu";
import { NAV_LINK_CLASS } from "@/components/navbar/nav-link-class";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type MobileView = "root" | "shop" | "language";

const MOBILE_VIEW_INDEX: Record<MobileView, number> = {
  root: 0,
  shop: 1,
  language: 1,
};

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).navbar;
  const [navigationReady, setNavigationReady] = useState(false);

  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openSearch, setOpenSearch] = useState(false);
  const [openPerfumes, setOpenPerfumes] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const isProductPage = pathname?.startsWith(`/${locale}/product/`) ?? false;

  const showNavbar =
    isProductPage || openMobile || openSearch || openPerfumes || isVisible;

  const mobileTitle =
    mobileView === "shop"
      ? labels.mobileShopTitle
      : mobileView === "language"
        ? labels.mobileLanguageTitle
        : "";

  const showPerfumes = openPerfumes && !openSearch && !openMobile;

  useEffect(() => {
    if (!openMobile && !openSearch) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMobile, openSearch]);

  useEffect(() => {
    if (isProductPage || openMobile || openSearch || openPerfumes) {
      return;
    }

    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (currentScrollY === previousScrollY) return;

      const scrollingUp = currentScrollY < previousScrollY;

      setIsVisible(currentScrollY <= 130 || scrollingUp);
      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isProductPage, openMobile, openSearch, openPerfumes]);

  useEffect(() => {
    setOpenSearch(false);
    setOpenMobile(false);
    setOpenPerfumes(false);
    setMobileView("root");
    setIsVisible(true);
    setNavigationReady(true);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpenSearch(false);
      setOpenMobile(false);
      setOpenPerfumes(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closePerfumes = () => {
    setOpenPerfumes(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
    setOpenMobile(false);
    setOpenPerfumes(false);
  };

  const handleMobileToggle = () => {
    setOpenSearch(false);
    setOpenPerfumes(false);

    if (!openMobile) {
      setMobileView("root");
    }

    setOpenMobile((previous) => !previous);
  };

  return (
    <>
      <header
        data-navigation-ready={navigationReady ? "true" : "false"}
        className={[
          "bg-background fixed top-0 z-9900 w-full",
          "border-b border-black/5 text-neutral-900",
          "transition-transform duration-500 ease-in-out",
          "motion-reduce:transition-none",
          showNavbar ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div className="grid h-16 grid-cols-3 items-center px-5 md:px-8">
          <div className="flex min-w-0 items-center justify-start">
            <button
              type="button"
              className="hover:text-gold -ml-2 inline-flex h-11 w-11 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
              onClick={handleMobileToggle}
              aria-label={openMobile ? labels.mobileCloseMenu : labels.openMenu}
              aria-expanded={openMobile}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    openMobile
                      ? "M6 6l12 12M6 18L18 6"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <Suspense fallback={null}>
              <LocalizationMenu />
            </Suspense>
          </div>

          <NavCenter />

          <NavRight onOpenSearch={handleOpenSearch} />
        </div>

        <nav className="relative hidden h-[52px] items-center justify-center gap-9 border-t border-black/5 lg:flex xl:gap-11">
          <DesktopPerfumeMenu
            locale={locale}
            isOpen={showPerfumes}
            hoverDisabled={openSearch}
            onOpenChange={setOpenPerfumes}
            onTriggerClick={() => setOpenSearch(false)}
          />

          {MAIN_LINKS.map(({ path, label }) => {
            const href = `/${locale}${path}`;

            return (
              <Link
                key={path}
                href={href}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    closePerfumes();
                  }
                }}
                onFocus={closePerfumes}
                aria-current={pathname === href ? "page" : undefined}
                className={NAV_LINK_CLASS}
              >
                {labels[label]}
              </Link>
            );
          })}
        </nav>
      </header>

      <Suspense fallback={null}>
        <MobileDrawer
          openMobile={openMobile}
          setOpenMobile={setOpenMobile}
          mobileView={mobileView}
          setMobileView={setMobileView}
          viewIndex={MOBILE_VIEW_INDEX[mobileView]}
          title={mobileTitle}
        />
      </Suspense>

      <SearchOverlay isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
