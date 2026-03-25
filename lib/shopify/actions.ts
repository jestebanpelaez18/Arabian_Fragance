"use server";

import { shopifyFetch } from "@/lib/shopify/shopify";
import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";

// --- TYPES ---
export type Product = {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
};

// What we expect from Shopify's GraphQL API when fetching a single product

type TrendingData = {
  data: {
    products: {
      nodes: Product[];
    };
  };
};

type SearchData = {
  data: {
    search: {
      nodes: Product[];
    };
  };
};

const trendingProductsQuery = `
  query trendingProducts($language: LanguageCode!) @inContext(language: $language) {
    products(first: 10, sortKey: CREATED_AT, reverse: true) {
        nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
    }
  }
}
`;

const searchProductsQuery = `
  query searchProducts($query: String!, $first: Int, $language: LanguageCode!) @inContext(language: $language) {
    search(query: $query, first: $first, types: PRODUCT) {
      nodes {
        ... on Product {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function getTrendingProducts(locale: Locale) {
  try {
    const res = await shopifyFetch<TrendingData>({
      query: trendingProductsQuery,
      variables: { language: getShopifyLanguageCode(locale) },
      cache: "no-store",
    });
    const products = res.body?.data?.products?.nodes || [];
    const formattedProducts = products
      .sort(() => 0.5 - Math.random())
      .slice(0, 7);

    return formattedProducts;
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return [];
  }
}

export async function searchProductsAction(term: string, locale: Locale) {
  if (!term) return [];

  const res = await shopifyFetch<SearchData>({
    query: searchProductsQuery,
    variables: {
      query: term,
      first: 6,
      language: getShopifyLanguageCode(locale),
    },
    cache: "no-store",
  });

  if (res.error) {
    console.error("Error searching products:", res.error);
    return [];
  }

  return res.body?.data?.search?.nodes || [];
}
