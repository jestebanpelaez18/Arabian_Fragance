"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MAIN_LINKS, PERFUME_SECTIONS } from "@/lib/shop/navigation";
import NavRight from "@/components/navbar/NavRight";
import NavCenter from "@/components/navbar/NavCenter";
import MobileDrawer from "@/components/navbar/MobileDrawer";
import SearchOverlay from "@/components/navbar/SearchOverlay";
import LocalizationMenu from "@/components/navbar/LocalizationMenu";
import FeaturedNavigationPerfume from "@/components/navbar/FeaturedNavigationPerfume";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type MobileView = "root" | "shop" | "language";

const MOBILE_VIEW_INDEX: Record<MobileView, number> = {
  root: 0,
  shop: 1,
  language: 1,
};

const NAV_LINK_CLASS =
  "font-garamond inline-flex min-h-11 items-center py-2 text-sm font-normal tracking-[0.16em] text-neutral-900 uppercase transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).navbar;
  const [navigationReady, setNavigationReady] = useState(false);

  const perfumeMenuRef = useRef<HTMLDivElement>(null);
  const perfumeButtonRef = useRef<HTMLButtonElement>(null);

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

      const focusIsInPerfumeMenu =
        document.activeElement !== null &&
        perfumeMenuRef.current?.contains(document.activeElement);

      setOpenSearch(false);
      setOpenMobile(false);
      setOpenPerfumes(false);

      if (focusIsInPerfumeMenu) {
        perfumeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!openPerfumes) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !perfumeMenuRef.current?.contains(event.target)
      ) {
        setOpenPerfumes(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openPerfumes]);

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
          <div
            ref={perfumeMenuRef}
            className="flex h-full items-center"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && !openSearch) {
                setOpenPerfumes(true);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") {
                closePerfumes();
              }
            }}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget;

              if (
                !(nextTarget instanceof Node) ||
                !event.currentTarget.contains(nextTarget)
              ) {
                closePerfumes();
              }
            }}
          >
            <button
              ref={perfumeButtonRef}
              type="button"
              aria-expanded={showPerfumes}
              aria-controls="desktop-perfume-menu"
              className={NAV_LINK_CLASS}
              onClick={(event) => {
                setOpenSearch(false);

                if (event.detail === 0) {
                  // Keyboard activation toggles the menu.
                  setOpenPerfumes((previous) => !previous);
                } else {
                  // A pointer click keeps the hovered menu open.
                  setOpenPerfumes(true);
                }
              }}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown") return;

                event.preventDefault();
                setOpenPerfumes(true);

                requestAnimationFrame(() => {
                  perfumeMenuRef.current
                    ?.querySelector<HTMLAnchorElement>(
                      "#desktop-perfume-menu a",
                    )
                    ?.focus();
                });
              }}
            >
              {labels.perfumes}
            </button>

            <div
              id="desktop-perfume-menu"
              aria-hidden={!showPerfumes}
              inert={!showPerfumes}
              className={[
                "bg-background absolute top-full left-0 z-9999 w-full",
                "border-t border-black/10",
                "shadow-[0_10px_18px_-18px_rgba(0,0,0,0.25)]",
                "max-h-[calc(100dvh-116px)] overflow-y-auto overscroll-contain",
                "transition-[opacity,visibility] duration-200 ease-out",
                "motion-reduce:transition-none",
                showPerfumes
                  ? "visible opacity-100"
                  : "pointer-events-none invisible opacity-0",
              ].join(" ")}
            >
              <div className="mx-auto grid w-full max-w-[1040px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_208px] items-start gap-x-14 px-10 py-9 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_240px] xl:gap-x-20 xl:py-10">
                {PERFUME_SECTIONS.map(({ title, links }) => (
                  <div key={title} className="min-w-0">
                    <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
                      {labels[title]}
                    </h3>

                    <ul className="space-y-1">
                      {links.map(({ path, label, emphasized }) => {
                        const href = `/${locale}${path}`;

                        return (
                          <li
                            key={path}
                            className={emphasized ? "pt-3" : undefined}
                          >
                            <Link
                              href={href}
                              onClick={closePerfumes}
                              aria-current={
                                pathname === href ? "page" : undefined
                              }
                              className={[
                                "font-garamond inline-flex min-h-10 items-center",
                                "text-base leading-relaxed font-normal text-neutral-900",
                                "hover:text-gold transition-colors duration-200",
                                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                                emphasized
                                  ? "underline decoration-black/20 underline-offset-4"
                                  : "",
                              ].join(" ")}
                            >
                              {labels[label]}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                <FeaturedNavigationPerfume
                  locale={locale}
                  active={showPerfumes}
                  onNavigate={closePerfumes}
                />
              </div>
            </div>
          </div>

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
