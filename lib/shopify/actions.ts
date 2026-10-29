"use server";

import type { Locale } from "@/i18n-config";
import { rankProducts, type SearchableFields } from "@/lib/shop/search";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

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
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

type SearchProduct = Product & SearchableFields;

type ProductsResponse<T> = {
  data?: {
    products?: {
      nodes: T[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const PRODUCT_FIELDS = `
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
`;

const trendingProductsQuery = `
  query NavigationTopProducts($language: LanguageCode!)
  @inContext(language: $language) {
    products(first: 7, sortKey: BEST_SELLING) {
      nodes {
        ${PRODUCT_FIELDS}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const catalogQuery = `
  query NavigationSearchCatalog(
    $language: LanguageCode!
    $after: String
  ) @inContext(language: $language) {
    products(first: 100, after: $after, sortKey: TITLE) {
      nodes {
        ${PRODUCT_FIELDS}
        productType

        collections(first: 20) {
          nodes {
            handle
            title
          }
        }

        gender: metafield(namespace: "custom", key: "gender") {
          value
        }
        mainAccords: metafield(namespace: "custom", key: "main_accord") {
          value
        }
        topNotes: metafield(namespace: "custom", key: "top_notes") {
          value
        }
        heartNotes: metafield(namespace: "custom", key: "hearth_notes") {
          value
        }
        baseNotes: metafield(namespace: "custom", key: "base_notes") {
          value
        }
        keyNotes: metafield(namespace: "custom", key: "key_notes") {
          value
        }
        fragranceType: metafield(
          namespace: "custom"
          key: "fragrance_type"
        ) {
          value
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function toProduct(product: SearchProduct): Product {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    availableForSale: product.availableForSale,
    priceRange: product.priceRange,
    featuredImage: product.featuredImage,
  };
}

async function getSearchCatalog(locale: Locale): Promise<SearchProduct[]> {
  const products = new Map<string, SearchProduct>();
  const visitedCursors = new Set<string>();

  let after: string | null = null;

  while (true) {
    const response: {
      status: number;
      body: ProductsResponse<SearchProduct>;
      error?: string;
    } = await shopifyFetch<ProductsResponse<SearchProduct>>({
      query: catalogQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        after,
      },
      next: {
        revalidate: 300,
        tags: ["products", "collections"],
      },
    });

    const connection:
      | {
          nodes: SearchProduct[];
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
          };
        }
      | undefined = response.body?.data?.products;

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length ||
      !connection
    ) {
      throw new Error("Unable to load the navigation search catalog.");
    }

    for (const product of connection.nodes) {
      products.set(product.id, product);
    }

    if (!connection.pageInfo.hasNextPage) {
      break;
    }

    const cursor: string | null = connection.pageInfo.endCursor;

    if (!cursor || visitedCursors.has(cursor)) {
      throw new Error("Invalid search catalog pagination.");
    }

    visitedCursors.add(cursor);
    after = cursor;
  }

  return Array.from(products.values());
}

function mergeOriginalClassification(
  localizedProducts: SearchProduct[],
  originalProducts: SearchProduct[],
): SearchProduct[] {
  const originalsById = new Map(
    originalProducts.map((product) => [product.id, product]),
  );

  return localizedProducts.map((product) => {
    const original = originalsById.get(product.id);

    if (!original) {
      throw new Error(
        `Missing original search classification for ${product.id}.`,
      );
    }

    return {
      ...product,
      productType: original.productType,
      gender: original.gender,
      mainAccords: original.mainAccords,
      topNotes: original.topNotes,
      heartNotes: original.heartNotes,
      baseNotes: original.baseNotes,
      keyNotes: original.keyNotes,
      fragranceType: original.fragranceType,
      collections: {
        nodes: [
          ...(original.collections?.nodes ?? []),
          ...(product.collections?.nodes ?? []),
        ],
      },
    };
  });
}

export async function getTrendingProducts(locale: Locale): Promise<Product[]> {
  const response = await shopifyFetch<ProductsResponse<Product>>({
    query: trendingProductsQuery,
    variables: {
      language: getShopifyLanguageCode(locale),
    },
    next: {
      revalidate: 300,
      tags: ["products"],
    },
  });

  const products = response.body?.data?.products?.nodes;

  if (
    response.error ||
    response.status >= 400 ||
    response.body?.errors?.length ||
    !products
  ) {
    throw new Error("Unable to load products.");
  }

  return products;
}

export async function searchProductsAction(
  term: string,
  locale: Locale,
): Promise<Product[]> {
  if (locale === "en") {
    const products = await getSearchCatalog(locale);

    return rankProducts(products, term, locale).map(toProduct);
  }

  const [localizedProducts, originalProducts] = await Promise.all([
    getSearchCatalog(locale),
    getSearchCatalog("en"),
  ]);

  const products = mergeOriginalClassification(
    localizedProducts,
    originalProducts,
  );

  return rankProducts(products, term, locale).map(toProduct);
}
