import { shopifyFetch } from "@/lib/shopify/shopify";
import { normalizeProduct, type ShopifyRawProduct } from "@/lib/shopify/mapper";
import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";

const allProductsQuery = `
  query AllProducts($language: LanguageCode!) @inContext(language: $language) {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          productType

          collections(first: 20) {
            edges {
              node {
                handle
              }
            }
          }

          availableForSale

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }

          images(first: 8) {
            edges {
              node {
                url
                altText
              }
            }
          }

          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }

          gender: metafield(namespace: "custom", key: "gender") {
            value
          }

          notes: metafield(namespace: "custom", key: "main_accord") {
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

          concentration: metafield(namespace: "custom", key: "concentration") {
            value
          }

          fragranceType: metafield(namespace: "custom", key: "fragrance_type") {
            value
          }
        }
      }
    }
  }
`;

// Filters use the original classification values in every language.
// Include the note pyramid because the mapper uses it when main_accord is empty.
const productClassificationQuery = `
  query ProductClassification($ids: [ID!]!) @inContext(language: EN) {
    nodes(ids: $ids) {
      ... on Product {
        id
        productType

        gender: metafield(namespace: "custom", key: "gender") {
          value
        }

        notes: metafield(namespace: "custom", key: "main_accord") {
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
      }
    }
  }
`;

type ShopifyProductsOperation = {
  data?: {
    products?: {
      edges: Array<{
        node: ShopifyRawProduct;
      }>;
    };
  };
};

type ShopifyMetafield = {
  value: string;
} | null;

type ProductClassification = {
  id: string;
  productType: string;
  gender: ShopifyMetafield;
  notes: ShopifyMetafield;
  topNotes: ShopifyMetafield;
  heartNotes: ShopifyMetafield;
  baseNotes: ShopifyMetafield;
};

type ShopifyProductClassificationOperation = {
  data?: {
    nodes: Array<ProductClassification | null>;
  };
  errors?: Array<{ message: string }>;
};

async function getOriginalProductClassification(
  ids: string[],
): Promise<Map<string, ProductClassification>> {
  const response = await shopifyFetch<ShopifyProductClassificationOperation>({
    query: productClassificationQuery,
    variables: { ids },
    next: {
      revalidate: 300,
      tags: ["products"],
    },
  });
  const { body } = response;

  const nodes = body?.data?.nodes;
  const hasErrors =
    response.error || response.status >= 400 || body?.errors?.length;

  if (hasErrors || !nodes) {
    console.error(
      "Could not load original Shopify product classification.",
      response.error ?? body?.errors,
    );
  }

  const classification = new Map<string, ProductClassification>();

  for (const node of nodes ?? []) {
    if (node) {
      classification.set(node.id, node);
    }
  }

  return classification;
}

export async function getShopifyProducts(locale: Locale) {
  const { body } = await shopifyFetch<ShopifyProductsOperation>({
    query: allProductsQuery,
    variables: {
      language: getShopifyLanguageCode(locale),
    },
    next: {
      revalidate: 300,
      tags: ["home", "products"],
    },
  });

  const edges = body?.data?.products?.edges ?? [];

  if (edges.length === 0) {
    return [];
  }

  if (locale === "en") {
    return edges.map(({ node }) => normalizeProduct(node));
  }

  const ids = edges.map(({ node }) => node.id);
  const originalClassification = await getOriginalProductClassification(ids);
  const missingClassifications: string[] = [];

  const products = edges.map(({ node }) => {
    const classification = originalClassification.get(node.id);

    if (!classification) {
      missingClassifications.push(node.id);
    }

    return normalizeProduct({
      ...node,
      productType: classification?.productType.trim() || node.productType,
      gender: classification?.gender ?? node.gender,
      notes: classification?.notes ?? node.notes,
      topNotes: classification?.topNotes ?? node.topNotes,
      heartNotes: classification?.heartNotes ?? node.heartNotes,
      baseNotes: classification?.baseNotes ?? node.baseNotes,
    });
  });

  if (missingClassifications.length > 0) {
    console.error(
      "Missing original Shopify classification for products; using localized values.",
      missingClassifications,
    );
  }

  return products;
}
