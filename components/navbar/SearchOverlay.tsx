"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n-config";
import {
  searchProductsAction,
  getTrendingProducts,
  type Product,
} from "@/lib/shopify/actions";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SearchState = {
  query: string;
  products: Product[];
  failed: boolean;
};

const FOCUS_CLASS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

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

function SearchProductCard({
  product,
  locale,
  onNavigate,
}: {
  product: Product;
  locale: Locale;
  onNavigate: () => void;
}) {
  const amount = Number(product.priceRange.minVariantPrice.amount);

  const price = Number.isFinite(amount)
    ? new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount)
    : "";

  return (
    <Link
      href={`/${locale}/product/${product.handle}`}
      aria-label={product.title}
      onClick={onNavigate}
      className={`group block min-w-0 text-center ${FOCUS_CLASS}`}
    >
      <div className="bg-background relative aspect-4/5 overflow-hidden">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt=""
            fill
            sizes="(min-width: 1200px) 270px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
          />
        )}
      </div>

      <h3 className="font-magister group-hover:text-gold mt-3 text-sm leading-relaxed font-normal text-neutral-900 transition-colors">
        {product.title}
      </h3>

      {price && (
        <p className="mt-1.5 font-serif text-xs leading-relaxed font-light tracking-[0.04em] text-neutral-700">
          {price} {product.priceRange.minVariantPrice.currencyCode}
        </p>
      )}
    </Link>
  );
}

function ProductSkeletons() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <div key={index} className={index === 2 ? "hidden md:block" : ""}>
          <div className="aspect-4/5 bg-black/[0.035] motion-safe:animate-pulse" />
          <div className="mx-auto mt-4 h-3 w-1/2 bg-black/[0.035]" />
          <div className="mx-auto mt-2 h-2 w-1/4 bg-black/[0.035]" />
        </div>
      ))}
    </div>
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
  const [search, setSearch] = useState<SearchState | null>(null);
  const [topProducts, setTopProducts] = useState<Product[] | null>(null);
  const [topFailed, setTopFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  const query = term.trim();
  const hasQuery = query.length >= 2;

  const searching = hasQuery && (search === null || search.query !== query);

  const searchFailed = hasQuery && search?.query === query && search.failed;

  const results = hasQuery && search?.query === query ? search.products : [];

  const featured = topProducts?.slice(0, 3) ?? [];
  const suggestions = topProducts?.slice(3, 7) ?? [];

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

  useEffect(() => {
    let cancelled = false;

    void getTrendingProducts(locale)
      .then((products) => {
        if (cancelled) return;

        setTopProducts(products);
        setTopFailed(false);
      })
      .catch(() => {
        if (cancelled) return;

        setTopFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, retry]);

  useEffect(() => {
    if (query.length < 2) return;

    let cancelled = false;

    const timer = setTimeout(() => {
      void searchProductsAction(query, locale)
        .then((products) => {
          if (cancelled) return;

          setSearch({
            query,
            products,
            failed: false,
          });
        })
        .catch(() => {
          if (cancelled) return;

          setSearch({
            query,
            products: [],
            failed: true,
          });
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, locale, retry]);

  function retryLoading() {
    if (hasQuery) {
      setSearch(null);
    } else {
      setTopFailed(false);
    }

    setRetry((value) => value + 1);
  }

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
              <div className="grid grid-cols-1 gap-8 pt-3 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:pt-5 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
                <section className="hidden min-w-0 border-r border-black/10 pr-6 md:block">
                  <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
                    {labels.suggestions}
                  </h3>

                  {topProducts === null ? (
                    <div aria-hidden="true" className="space-y-5">
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          key={index}
                          className="h-3 w-3/4 bg-black/[0.035] motion-safe:animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {suggestions.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/${locale}/product/${product.handle}`}
                            onClick={onClose}
                            className={`font-garamond hover:text-gold inline-flex min-h-10 items-center text-base leading-relaxed text-neutral-800 transition-colors ${FOCUS_CLASS}`}
                          >
                            {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="min-w-0">
                  <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
                    {labels.topProducts}
                  </h3>

                  {topProducts === null ? (
                    <ProductSkeletons />
                  ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                      {featured.map((product, index) => (
                        <div
                          key={product.id}
                          className={index === 2 ? "hidden md:block" : ""}
                        >
                          <SearchProductCard
                            product={product}
                            locale={locale}
                            onNavigate={onClose}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
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
