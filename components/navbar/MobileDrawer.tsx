"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";

type MobileView = "root" | "shop" | "language";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  sv: "Svenska",
};

export default function MobileDrawer({
  openMobile,
  setOpenMobile,
  mobileView,
  setMobileView,
  viewIndex,
  title,
}: {
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  mobileView: MobileView;
  setMobileView: Dispatch<SetStateAction<MobileView>>;
  viewIndex: number;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const localeSegment = pathname?.split("/")[1];
  const currentLocale = i18n.locales.includes(localeSegment as Locale)
    ? (localeSegment as Locale)
    : i18n.defaultLocale;

  const buildLocalizedPath = (nextLocale: Locale) => {
    const segments = (pathname || "/").split("/");
    if (i18n.locales.includes(segments[1] as Locale)) {
      segments[1] = nextLocale;
      return segments.join("/") || "/";
    }
    return `/${nextLocale}${pathname?.startsWith("/") ? pathname : `/${pathname}`}`;
  };

  const handleLanguageChange = (nextLocale: Locale) => {
    document.cookie = `USER_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const nextPath = buildLocalizedPath(nextLocale);
    const query = searchParams?.toString();

    router.push(query ? `${nextPath}?${query}` : nextPath);
    setOpenMobile(false);
    setMobileView("root");
  };

  return (
    <div
      aria-hidden={!openMobile}
      className={`fixed inset-x-0 bottom-0 top-16 z-[10000] lg:hidden ${
        openMobile ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        aria-label="Close menu"
        onClick={() => setOpenMobile(false)}
        className={`absolute inset-0 z-10 bg-black/45 duration-300 motion-safe:transition-opacity ${
          openMobile ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        // CRITICAL FIX: Changed h-[100dvh] to h-full so it perfectly fits the space under the Navbar
        className={`absolute left-0 top-0 z-20 flex h-full w-[88vw] max-w-[380px] flex-col overscroll-contain border-r border-black/5 bg-[var(--background)] shadow-2xl duration-300 ease-out will-change-transform motion-safe:transition-transform ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } `}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/5 px-4">
          {mobileView !== "root" ? (
            <button
              onClick={() => setMobileView("root")}
              className="-m-2 p-2 text-[#1a1a1a]/85 transition-opacity hover:opacity-70"
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          ) : (
            <span className="h-8 w-8" />
          )}
          
          <span className="font-bodoni text-xs tracking-[0.2em] text-[#1a1a1a] uppercase">
            {title || "Menu"}
          </span>
          <span className="h-8 w-8" />
        </div>

        {/* Sliding Content Container */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex h-full w-[200%] duration-300 ease-out motion-safe:transition-transform"
            style={{ transform: `translateX(-${viewIndex * 100}%)` }}
          >
            
            {/* PANEL 1: ROOT CATEGORIES */}
            <section className="flex h-full min-w-full flex-col overflow-y-auto px-6 pt-8 pb-24">
              
              <div className="space-y-7 flex-1">
                <button
                  className="font-bodoni group flex w-full items-center justify-between text-left text-lg tracking-[0.1em] text-[#1a1a1a] uppercase"
                  onClick={() => setMobileView("shop")}
                >
                  <span>Perfumes</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="opacity-50 transition-opacity group-hover:opacity-100">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </svg>
                </button>

                <Link href="/oils" onClick={() => setOpenMobile(false)} className="font-bodoni block text-lg tracking-[0.1em] text-[#1a1a1a] uppercase">Oils & Attars</Link>
                <Link href="/body" onClick={() => setOpenMobile(false)} className="font-bodoni block text-lg tracking-[0.1em] text-[#1a1a1a] uppercase">Bath & Body</Link>
                <Link href="/home-fragrance" onClick={() => setOpenMobile(false)} className="font-bodoni block text-lg tracking-[0.1em] text-[#1a1a1a] uppercase">Home</Link>
                <Link href="/product/discovery-set" onClick={() => setOpenMobile(false)} className="font-bodoni block text-lg tracking-[0.1em] text-[#1a1a1a] uppercase">Discovery</Link>
                <Link href="/about" onClick={() => setOpenMobile(false)} className="font-bodoni block text-lg tracking-[0.1em] text-[#1a1a1a] uppercase">House of Arabian</Link>
              </div>

              {/* LOCALIZATION FOOTER */}
              <div className="mt-12 border-t border-black/5 pt-6">
                <ul className="space-y-6">
                  {/* Language Button */}
                  <li>
                    <button 
                      onClick={() => setMobileView("language")}
                      className="group flex w-full items-center justify-between text-left"
                    >
                      <span className="font-bodoni text-[10px] font-bold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">Language</span>
                      <div className="flex items-center gap-2">
                        <span className="font-garamond text-base tracking-widest text-[#1a1a1a] capitalize transition-colors group-hover:text-[#C9A46A]">{LANGUAGE_LABELS[currentLocale]}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="opacity-30"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" /></svg>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
              
            </section>

            {/* PANEL 2: DYNAMIC SUB-MENUS */}
            <section className="h-full min-w-full overflow-y-auto px-6 pt-8 pb-24">
              
              {/* SHOP SUB-MENU */}
              {mobileView === "shop" && (
                <>
                  <div className="mb-10">
                    <p className="font-bodoni mb-5 text-[10px] font-bold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">By Category</p>
                    <ul className="space-y-4">
                      <li><Link href="/shop?gender=women" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">Women's Perfumes</Link></li>
                      <li><Link href="/shop?gender=men" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">Men's Perfumes</Link></li>
                      <li><Link href="/shop?gender=unisex" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">Universal Perfumes</Link></li>
                      <li className="pt-2"><Link href="/shop" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg font-semibold text-[#1a1a1a] underline underline-offset-4 decoration-black/20">Shop All</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bodoni mb-5 text-[10px] font-bold tracking-[0.2em] text-[#1a1a1a]/50 uppercase">By Collection</p>
                    <ul className="space-y-4">
                      <li><Link href="/collections/luxury" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">The Luxury Collection</Link></li>
                      <li><Link href="/collections/premium" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">The Premium Collection</Link></li>
                      <li><Link href="/collections/signature" onClick={() => setOpenMobile(false)} className="font-garamond block text-lg text-[#1a1a1a]">The Signature Collection</Link></li>
                    </ul>
                  </div>
                </>
              )}
              {/* LANGUAGE SUB-MENU */}
              {mobileView === "language" && (
                <ul className="space-y-6 font-garamond tracking-[0.05em] capitalize">
                  {i18n.locales.map((locale) => {
                    const isActive = locale === currentLocale;

                    return (
                      <li key={locale}>
                        <button
                          onClick={() => handleLanguageChange(locale)}
                          className={`block w-full text-left text-2xl hover:text-[#C9A46A] ${
                            isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"
                          }`}
                          aria-current={isActive ? "true" : undefined}
                        >
                          {LANGUAGE_LABELS[locale]}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

            </section>
          </div>
        </div>
      </aside>
    </div>
  );
}