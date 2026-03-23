"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  sv: "Svenska",
};

export default function LocalizationMenu() {
  const [activeMenu, setActiveMenu] = useState<"currency" | "language" | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);
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
    if (nextLocale === currentLocale) {
      setActiveMenu(null);
      return;
    }

    document.cookie = `USER_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    const nextPath = buildLocalizedPath(nextLocale);
    const query = searchParams?.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
    setActiveMenu(null);
  };

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CLOSE ON ESCAPE KEY
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = (menu: "currency" | "language") => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div
      ref={menuRef}
      className="font-garamond relative hidden items-center gap-4 text-xs tracking-widest text-[#1a1a1a] uppercase lg:flex"
    >
      {/* --- LANGUAGE SELECTOR --- */}
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => toggleMenu("language")}
          className={`py-2 transition-colors hover:text-[#C9A46A] ${
            activeMenu === "language" ? "text-[#C9A46A]" : ""
          }`}
          aria-expanded={activeMenu === "language"}
        >
          {currentLocale.toUpperCase()}
        </button>

        {/* LANGUAGE DROPDOWN PANEL (Centered) */}
        <div
          className={`absolute top-[85%] left-1/2 z-50 mt-1 w-28 -translate-x-1/2 border border-black/5 bg-background py-2 shadow-sm transition-all duration-200 ${
            activeMenu === "language"
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          {/* Changed text inside to match the elegance of Garamond with slight tracking */}
          <ul className="font-garamond flex flex-col text-center text-sm tracking-[0.05em] capitalize">
            {i18n.locales.map((locale) => {
              const isActive = locale === currentLocale;

              return (
                <li key={locale}>
                  <button
                    onClick={() => handleLanguageChange(locale)}
                    className={`w-full px-2 py-1.5 transition-colors hover:bg-black/5 hover:text-[#C9A46A] ${
                      isActive ? "text-[#C9A46A]" : ""
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {LANGUAGE_LABELS[locale]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
