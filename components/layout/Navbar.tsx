"use client";

import { MAIN_LINKS, PERFUME_SECTIONS } from "@/lib/shop/navigation";
import { Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavRight from "@/components/navbar/NavRight";
import NavCenter from "../navbar/NavCenter";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import SearchOverlay from "@/components/navbar/SearchOverlay";
import SmoothImage from "@/components/ui/SmoothImage";
import LocalizationMenu from "@/components/navbar/LocalizationMenu";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type MobileView = "root" | "shop" | "language";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).navbar;

  const isProductPage = pathname?.startsWith(`/${locale}/product/`) ?? false;

  const [openMobile, setOpenMobile] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("root");
  const [openSearch, setOpenSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const showNavbar = isProductPage || openMobile || openSearch || isVisible;

  // Lock page scroll while a menu or the search is open.
  useEffect(() => {
    if (!openMobile && !openSearch) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMobile, openSearch]);

  // Keep the navbar visible on product pages; elsewhere hide it on scroll
  // down and show it on scroll up.
  useEffect(() => {
    if (isProductPage || openMobile || openSearch) return;

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
  }, [pathname, isProductPage, openMobile, openSearch]);

  // Close menus on navigation.
  useEffect(() => {
    setOpenSearch(false);
    setOpenMobile(false);
  }, [pathname]);

  // Close menus with Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSearch(false);
        setOpenMobile(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenSearch = () => {
    setOpenSearch(true);
    setOpenMobile(false);
  };

  const handleMobileToggle = () => {
    if (!openMobile) {
      setOpenSearch(false);
    }

    setOpenMobile((previous) => !previous);
  };

  return (
    <>
      <header
        className={`bg-background fixed top-0 z-9900 w-full border-b border-black/5 text-[#1a1a1a] transition-transform duration-700 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="grid h-16 grid-cols-3 items-center px-5 md:px-8">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="p-2 transition-opacity hover:opacity-70 lg:hidden"
              onClick={handleMobileToggle}
              aria-label={labels.openMenu}
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
                  d="M4 6h16M4 12h16M4 18h16"
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

        <nav className="relative hidden items-center justify-center gap-10 border-t border-black/5 py-3 lg:flex">
          <div className="group h-full">
            <button
              type="button"
              className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
            >
              {labels.perfumes}
            </button>

            <div className="bg-background invisible absolute top-full left-0 z-9999 w-full border-t border-black/5 opacity-0 shadow-md transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="mx-auto flex max-w-7xl justify-center gap-24 px-12 py-10">
                {PERFUME_SECTIONS.map(({ title, links }) => (
                  <div key={title} className="flex flex-col gap-4">
                    <h3 className="mb-2 text-xs font-bold tracking-[0.15em] text-black/50 uppercase">
                      {labels[title]}
                    </h3>

                    {links.map(({ path, label, emphasized }) => (
                      <Link
                        key={path}
                        href={`/${locale}${path}`}
                        className={`font-garamond text-sm text-black transition-colors hover:text-[#C9A46A] ${
                          emphasized ? "mt-2 font-semibold" : ""
                        }`}
                      >
                        {labels[label]}
                      </Link>
                    ))}
                  </div>
                ))}

                <div className="relative hidden h-64 w-48 overflow-hidden rounded-sm bg-white ring-1 ring-black/5 xl:block">
                  <SmoothImage
                    src="/catalog/Bottle_3.png"
                    alt={labels.featuredPerfumeAlt}
                    fill
                    sizes="192px"
                    className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {MAIN_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              href={`/${locale}${path}`}
              className="font-bodoni py-2 text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A46A]"
            >
              {labels[label]}
            </Link>
          ))}
        </nav>
      </header>

      <Suspense fallback={null}>
        <MobileDrawer
          openMobile={openMobile}
          setOpenMobile={setOpenMobile}
          mobileView={mobileView}
          setMobileView={setMobileView}
          viewIndex={mobileView === "root" ? 0 : 1}
          title={
            mobileView === "shop"
              ? labels.mobileShopTitle
              : mobileView === "language"
                ? labels.mobileLanguageTitle
                : ""
          }
        />
      </Suspense>

      <SearchOverlay isOpen={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
