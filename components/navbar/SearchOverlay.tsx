"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";
import SearchProductCard from "@/components/navbar/search/SearchProductCard";
import SearchSuggestions from "@/components/navbar/search/SearchSuggestions";
import { FOCUS_CLASS } from "@/components/navbar/search/focus-class";
import { useProductSearch } from "@/components/navbar/search/useProductSearch";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="m21 21-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchPanel({
  locale,
  onClose,
}: {
  locale: Locale;
  onClose: () => void;
}) {
  const labels = getUiLabels(locale).commerce.searchOverlay;
  const searchTitle = getUiLabels(locale).navbar.search;

  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [term, setTerm] = useState("");

  const query = term.trim();

  const {
    hasQuery,
    topProducts,
    topFailed,
    searching,
    searchFailed,
    results,
    retryLoading,
  } = useProductSearch(query, locale);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(frame);

      if (previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-x-0 top-16 bottom-0 z-9990 bg-black/30"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="navigation-search-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            onClose();
            return;
          }

          if (event.key !== "Tab") return;

          const panel = panelRef.current;

          if (!panel) return;

          const focusable = Array.from(
            panel.querySelectorAll<HTMLElement>(
              'input, button:not([disabled]), a[href], [tabindex="0"]',
            ),
          ).filter((element) => element.getClientRects().length > 0);

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (!first || !last) return;

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        className="bg-background fixed inset-x-0 top-16 z-9999 flex max-h-[calc(100dvh-64px)] flex-col overflow-hidden text-neutral-900 shadow-[0_12px_24px_-20px_rgba(0,0,0,0.3)]"
      >
        <h2 id="navigation-search-title" className="sr-only">
          {searchTitle}
        </h2>

        <div className="shrink-0 px-5 pt-5 pb-5 md:px-10 md:pt-8 md:pb-7">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="flex items-center gap-3 border-b border-black/20 pb-3 md:gap-5">
              <span className="text-neutral-600">
                <SearchIcon />
              </span>

              <label htmlFor="navigation-search-input" className="sr-only">
                {searchTitle}
              </label>

              <input
                ref={inputRef}
                id="navigation-search-input"
                type="search"
                value={term}
                maxLength={120}
                onChange={(event) => {
                  setTerm(event.target.value);

                  contentRef.current?.scrollTo({
                    top: 0,
                    behavior: "instant",
                  });
                }}
                placeholder={labels.inputPlaceholder}
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                aria-describedby="navigation-search-status"
                className="font-garamond min-w-0 flex-1 appearance-none bg-transparent py-1 text-xl leading-normal text-neutral-900 outline-none placeholder:text-neutral-500 md:text-2xl"
              />

              <button
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                className={`hover:text-gold -mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-neutral-700 transition-colors ${FOCUS_CLASS}`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10 md:pb-10"
        >
          <div className="mx-auto w-full max-w-[1120px]">
            <div
              id="navigation-search-status"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="font-garamond text-sm leading-relaxed text-neutral-600"
            >
              {query.length === 1 && <p className="pb-5">{labels.minimum}</p>}

              {searching && (
                <p className="py-8 text-center">{labels.searching}</p>
              )}

              {searchFailed && (
                <p className="pt-6 text-center">{labels.error}</p>
              )}

              {hasQuery &&
                !searching &&
                !searchFailed &&
                results.length === 0 && (
                  <p className="py-10 text-center text-base">
                    {labels.noResultsFor} “{query}”
                  </p>
                )}

              {!hasQuery && topFailed && (
                <p className="pt-6 text-center">{labels.error}</p>
              )}
            </div>

            {(searchFailed || (!hasQuery && topFailed)) && (
              <div className="pb-8 text-center">
                <button
                  type="button"
                  onClick={retryLoading}
                  className={`font-garamond hover:text-gold mt-3 min-h-11 text-sm underline underline-offset-4 ${FOCUS_CLASS}`}
                >
                  {labels.retry}
                </button>
              </div>
            )}

            {hasQuery && !searching && !searchFailed && results.length > 0 && (
              <section aria-label={labels.results} className="pt-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
                  {results.map((product) => (
                    <SearchProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      onNavigate={onClose}
                    />
                  ))}
                </div>
              </section>
            )}

            {!hasQuery && !topFailed && (
              <SearchSuggestions
                products={topProducts}
                locale={locale}
                labels={labels}
                onNavigate={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  if (!isOpen) return null;

  return <SearchPanel key={locale} locale={locale} onClose={onClose} />;
}
