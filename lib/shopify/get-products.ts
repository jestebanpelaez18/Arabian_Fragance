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
          gender: metafield(namespace: "custom", key: "gender") { value }
          notes: metafield(namespace: "custom", key: "main_accord") { value }
          topNotes: metafield(namespace: "custom", key: "top_notes") { value }
          heartNotes: metafield(namespace: "custom", key: "hearth_notes") { value }
          baseNotes: metafield(namespace: "custom", key: "base_notes") { value }
          concentration: metafield(namespace: "custom", key: "concentration") { value }
          fragranceType: metafield(namespace: "custom", key: "fragrance_type") { value }
        }
      }
    }
  }
`;

// Classification uses the original English product types in every locale.
// IDs connect these values to the corresponding translated products.
const productTypesQuery = `
  query ProductTypes($ids: [ID!]!) @inContext(language: EN) {
    nodes(ids: $ids) {
      ... on Product {
        id
        productType
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

type ShopifyProductTypesOperation = {
  data?: {
    nodes: Array<{
      id: string;
      productType: string;
    } | null>;
  };
};

async function getOriginalProductTypes(
  ids: string[],
): Promise<Map<string, string>> {
  const { body } = await shopifyFetch<ShopifyProductTypesOperation>({
    query: productTypesQuery,
    variables: { ids },
    next: {
      revalidate: 300,
      tags: ["products"],
    },
  });

  const nodes = body?.data?.nodes;

  const productTypes = new Map<string, string>();

  // On failure the translated type is kept, so the page still renders.
  for (const node of nodes ?? []) {
    if (node) {
      productTypes.set(node.id, node.productType.trim());
    }
  }

  return productTypes;
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

  // English products already contain the original classification.
  if (locale === "en") {
    return edges.map(({ node }) => normalizeProduct(node));
  }

  const originalProductTypes = await getOriginalProductTypes(
    edges.map(({ node }) => node.id),
  );

  return edges.map(({ node }) =>
    normalizeProduct({
      ...node,
      productType: originalProductTypes.get(node.id) ?? node.productType,
    }),
  );
}
