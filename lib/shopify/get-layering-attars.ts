import type { Locale } from "@/i18n-config";
import { isAttar } from "@/lib/shop/catalogs";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { withOriginalProductTypes } from "@/lib/shopify/product-types";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type LayeringProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type LayeringCandidate = LayeringProduct & {
  productType: string;
  layeringProducts?: {
    value: string;
  } | null;
};

type LayeringOperation = {
  data?: {
    products: {
      nodes: LayeringCandidate[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const layeringQuery = `
  query LayeringCandidates(
    $language: LanguageCode!
    $after: String
  ) @inContext(language: $language) {
    products(first: 100, after: $after, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        productType

        featuredImage {
          url
          altText
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }

        layeringProducts: metafield(
          namespace: "custom"
          key: "layering_products"
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

function readProductReferences(value?: string): string[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export async function getLayeringAttars(
  perfumeId: string,
  locale: Locale,
): Promise<LayeringProduct[]> {
  const matches = new Map<string, LayeringProduct>();
  const visitedCursors = new Set<string>();

  let after: string | null = null;

  while (true) {
    const response: {
      status: number;
      body: LayeringOperation;
      error?: string;
    } = await shopifyFetch<LayeringOperation>({
      query: layeringQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        after,
      },
      next: {
        revalidate: 300,
        tags: ["products"],
      },
    });

    const connection = response.body?.data?.products;

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length ||
      !connection
    ) {
      throw new Error("Unable to load layering products from Shopify.");
    }

    const candidates = await withOriginalProductTypes(connection.nodes, locale);

    for (const product of candidates) {
      if (!isAttar(product) || product.id === perfumeId) {
        continue;
      }

      const referencedIds = readProductReferences(
        product.layeringProducts?.value,
      );

      if (!referencedIds.includes(perfumeId)) {
        continue;
      }

      matches.set(product.id, {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        priceRange: product.priceRange,
      });
    }

    if (!connection.pageInfo.hasNextPage) {
      break;
    }

    const cursor: string | null = connection.pageInfo.endCursor;

    if (!cursor || visitedCursors.has(cursor)) {
      throw new Error("Invalid Shopify layering pagination.");
    }

    visitedCursors.add(cursor);
    after = cursor;
  }

  return Array.from(matches.values());
}
