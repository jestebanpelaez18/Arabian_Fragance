"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";
import { MAIN_LINKS, PERFUME_SECTIONS } from "@/lib/shop/navigation";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type MobileView = "root" | "shop" | "language";

type Props = {
  openMobile: boolean;
  setOpenMobile: Dispatch<SetStateAction<boolean>>;
  mobileView: MobileView;
  setMobileView: Dispatch<SetStateAction<MobileView>>;
  viewIndex: number;
  title: string;
};

const FOCUS_CLASS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={back ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DrawerLink({
  href,
  current,
  onNavigate,
  children,
  emphasized = false,
}: {
  href: string;
  current: boolean;
  onNavigate: () => void;
  children: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
      className={[
        "font-garamond flex min-h-11 items-center",
        "text-lg leading-relaxed font-normal",
        "hover:text-gold transition-colors duration-200",
        FOCUS_CLASS,
        current ? "text-gold" : "text-neutral-900",
        emphasized ? "underline decoration-black/20 underline-offset-4" : "",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function MobileDrawer({
  openMobile,
  setOpenMobile,
  mobileView,
  setMobileView,
  viewIndex,
  title,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dialogRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const currentLocale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(currentLocale).navbar;
  const isRoot = mobileView === "root";

  const closeDrawer = () => {
    setOpenMobile(false);
  };

  useEffect(() => {
    if (!openMobile) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenMobile(false);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]',
        ),
      ).filter(
        (element) =>
          !element.closest("[inert]") && element.getClientRects().length > 0,
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const activeIsFocusable = focusable.some((element) => element === active);

      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      if (event.shiftKey && (!activeIsFocusable || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!activeIsFocusable || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [openMobile, setOpenMobile]);

  useEffect(() => {
    if (!openMobile) return;

    const frame = requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [mobileView, openMobile]);

  const handleLanguageChange = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) {
      closeDrawer();
      return;
    }

    document.cookie =
      `USER_LOCALE=${nextLocale}; path=/; ` + "max-age=31536000; samesite=lax";

    const segments = (pathname || "/").split("/");

    if (i18n.locales.includes(segments[1] as Locale)) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const nextPath = segments.join("/") || `/${nextLocale}`;
    const query = searchParams.toString();

    closeDrawer();
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  return (
    <div
      aria-hidden={!openMobile}
      inert={!openMobile}
      className={[
        "fixed inset-x-0 top-16 bottom-0 z-10000 overflow-hidden lg:hidden",
        openMobile ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={labels.mobileCloseMenu}
        onClick={closeDrawer}
        className={[
          "absolute inset-0 z-10 bg-black/35",
          "transition-opacity duration-300 motion-reduce:transition-none",
          openMobile ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal={openMobile ? true : undefined}
        aria-labelledby="mobile-navigation-title"
        tabIndex={-1}
        className={[
          "bg-background absolute inset-y-0 left-0 z-20",
          "flex w-[88vw] max-w-[380px] min-w-0 flex-col",
          "border-r border-black/10 outline-none",
          "transition-transform duration-300 ease-out",
          "motion-reduce:transition-none",
          openMobile ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="grid h-14 shrink-0 grid-cols-[44px_minmax(0,1fr)_44px] items-center border-b border-black/10 px-3">
          {!isRoot ? (
            <button
              type="button"
              onClick={() => setMobileView("root")}
              aria-label={labels.mobileBack}
              className={`hover:text-gold flex h-11 w-11 items-center justify-center text-neutral-700 ${FOCUS_CLASS}`}
            >
              <Chevron back />
            </button>
          ) : (
            <span aria-hidden="true" />
          )}

          <span
            ref={titleRef}
            id="mobile-navigation-title"
            tabIndex={-1}
            className="font-garamond text-center text-sm leading-normal font-normal tracking-[0.12em] text-neutral-700 uppercase outline-none"
          >
            {title || labels.mobileMenuTitle}
          </span>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label={labels.mobileCloseMenu}
            className={`hover:text-gold flex h-11 w-11 items-center justify-center text-neutral-700 ${FOCUS_CLASS}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateX(-${viewIndex * 100}%)`,
            }}
          >
            <section
              aria-hidden={!isRoot}
              inert={!isRoot}
              className="flex h-full w-full min-w-0 shrink-0 flex-col overflow-y-auto overscroll-contain px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setMobileView("shop")}
                  className={[
                    "font-garamond flex min-h-12 w-full items-center justify-between gap-4",
                    "text-left text-lg font-normal tracking-[0.08em] text-neutral-900 uppercase",
                    "hover:text-gold transition-colors",
                    FOCUS_CLASS,
                  ].join(" ")}
                >
                  <span>{labels.perfumes}</span>
                  <Chevron />
                </button>

                {MAIN_LINKS.map(({ path, label }) => {
                  const href = `/${currentLocale}${path}`;

                  return (
                    <Link
                      key={path}
                      href={href}
                      onClick={closeDrawer}
                      aria-current={pathname === href ? "page" : undefined}
                      className={[
                        "font-garamond flex min-h-12 items-center",
                        "text-lg font-normal tracking-[0.08em] uppercase",
                        "hover:text-gold transition-colors",
                        FOCUS_CLASS,
                        pathname === href ? "text-gold" : "text-neutral-900",
                      ].join(" ")}
                    >
                      {labels[label]}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-10">
                <button
                  type="button"
                  onClick={() => setMobileView("language")}
                  className={[
                    "flex min-h-14 w-full items-center justify-between gap-4",
                    "border-t border-black/10 pt-4 text-left",
                    "hover:text-gold transition-colors",
                    FOCUS_CLASS,
                  ].join(" ")}
                >
                  <span className="font-garamond text-sm tracking-[0.1em] text-neutral-500 uppercase">
                    {labels.language}
                  </span>

                  <span className="font-garamond flex items-center gap-3 text-base">
                    {labels.languageNames[currentLocale]}
                    <Chevron />
                  </span>
                </button>
              </div>
            </section>

            <section
              aria-hidden={isRoot}
              inert={isRoot}
              className="h-full w-full min-w-0 shrink-0 overflow-y-auto overscroll-contain px-6 pt-7 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              {mobileView === "shop" &&
                PERFUME_SECTIONS.map(({ title: sectionTitle, links }) => (
                  <div key={sectionTitle} className="mb-9 last:mb-0">
                    <h2 className="font-garamond! mb-3 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
                      {labels[sectionTitle]}
                    </h2>

                    <ul className="space-y-1">
                      {links.map(({ path, label, emphasized }) => {
                        const href = `/${currentLocale}${path}`;

                        return (
                          <li
                            key={path}
                            className={emphasized ? "pt-3" : undefined}
                          >
                            <DrawerLink
                              href={href}
                              current={pathname === href}
                              onNavigate={closeDrawer}
                              emphasized={emphasized}
                            >
                              {labels[label]}
                            </DrawerLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

              {mobileView === "language" && (
                <ul className="space-y-2">
                  {i18n.locales.map((locale) => {
                    const active = locale === currentLocale;

                    return (
                      <li key={locale}>
                        <button
                          type="button"
                          onClick={() => handleLanguageChange(locale)}
                          aria-current={active ? "true" : undefined}
                          className={[
                            "font-garamond flex min-h-12 w-full items-center",
                            "text-left text-xl leading-relaxed",
                            "hover:text-gold transition-colors",
                            FOCUS_CLASS,
                            active ? "text-gold" : "text-neutral-900",
                          ].join(" ")}
                        >
                          {labels.languageNames[locale]}
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
