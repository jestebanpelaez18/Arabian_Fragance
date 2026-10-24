import { useEffect, useState } from "react";
import type { Locale } from "@/i18n-config";
import {
  getTrendingProducts,
  searchProductsAction,
  type Product,
} from "@/lib/shopify/actions";

type SearchState = {
  query: string;
  products: Product[];
  failed: boolean;
};

const SEARCH_DEBOUNCE_MS = 300;

/** Loads the suggested products and the debounced results for `query`. */
export function useProductSearch(query: string, locale: Locale) {
  const [search, setSearch] = useState<SearchState | null>(null);
  const [topProducts, setTopProducts] = useState<Product[] | null>(null);
  const [topFailed, setTopFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  const hasQuery = query.length >= 2;
  const isCurrent = hasQuery && search?.query === query;

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
    }, SEARCH_DEBOUNCE_MS);

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

  return {
    hasQuery,
    topProducts,
    topFailed,
    searching: hasQuery && !isCurrent,
    searchFailed: isCurrent && search.failed,
    results: isCurrent ? search.products : [],
    retryLoading,
  };
}
