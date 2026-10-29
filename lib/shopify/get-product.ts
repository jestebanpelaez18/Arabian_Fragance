import type { Locale } from "@/i18n-config";
import type { LayeringProduct } from "@/lib/shopify/get-layering-attars";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { withOriginalProductTypes } from "@/lib/shopify/product-types";
import { shopifyFetch } from "@/lib/shopify/shopify";

type ShopifyMetafield = {
  value: string;
};

type LayeringReference = LayeringProduct & {
  __typename: "Product";
};

type ShopifyProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  productType: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText?: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        sku?: string | null;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  ingredients?: ShopifyMetafield | null;
  notes?: ShopifyMetafield | null;
  topNotes?: ShopifyMetafield | null;
  heartNotes?: ShopifyMetafield | null;
  baseNotes?: ShopifyMetafield | null;
  keyNotes?: ShopifyMetafield | null;
  gender?: ShopifyMetafield | null;
  fragranceType?: ShopifyMetafield | null;
  size?: ShopifyMetafield | null;
  concentration?: ShopifyMetafield | null;
  storageInstructions?: ShopifyMetafield | null;
  applicationInstructions?: ShopifyMetafield | null;
  layeringDescription?: ShopifyMetafield | null;
  layeringProducts?: {
    references?: {
      nodes: LayeringReference[];
    } | null;
  } | null;
};

type SingleProductOperation = {
  data?: {
    product: ShopifyProduct | null;
  };
  errors?: Array<{ message: string }>;
};

type AllProductsOperation = {
  data?: {
    products: {
      edges: {
        node: {
          handle: string;
        };
      }[];
    };
  };
};

const singleProductQuery = `
  query SingleProduct(
    $handle: String!
    $language: LanguageCode!
  ) @inContext(language: $language) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      productType
      availableForSale

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      images(first: 2) {
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
            sku
            price {
              amount
              currencyCode
            }
          }
        }
      }

      ingredients: metafield(namespace: "custom", key: "ingredients") {
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
      keyNotes: metafield(namespace: "custom", key: "key_notes") {
        value
      }
      gender: metafield(namespace: "custom", key: "gender") {
        value
      }
      fragranceType: metafield(namespace: "custom", key: "fragrance_type") {
        value
      }
      size: metafield(namespace: "custom", key: "size") {
        value
      }
      concentration: metafield(namespace: "custom", key: "concentration") {
        value
      }
      storageInstructions: metafield(
        namespace: "custom"
        key: "storage_instructions"
      ) {
        value
      }
      applicationInstructions: metafield(
        namespace: "custom"
        key: "application_instructions"
      ) {
        value
      }
      layeringDescription: metafield(
        namespace: "custom"
        key: "layering_description"
      ) {
        value
      }
      layeringProducts: metafield(
        namespace: "custom"
        key: "layering_products"
      ) {
        references(first: 20) {
          nodes {
            __typename
            ... on Product {
              id
              handle
              title
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
            }
          }
        }
      }
    }
  }
`;

const allProductHandlesQuery = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export async function getShopifyProductByHandle(
  handle: string,
  locale: Locale,
) {
  const response = await shopifyFetch<SingleProductOperation>({
    query: singleProductQuery,
    variables: {
      handle,
      language: getShopifyLanguageCode(locale),
    },
  });

  if (response.body?.errors?.length) {
    throw new Error(
      response.body.errors.map((error) => error.message).join("; "),
    );
  }

  if (response.error || response.status >= 400 || !response.body?.data) {
    throw new Error("Unable to load the product from Shopify.");
  }

  const product = response.body.data.product;

  if (!product) {
    return null;
  }

  const products = await withOriginalProductTypes([product], locale);

  return products[0] ?? null;
}

export async function getShopifyProductHandles() {
  const response = await shopifyFetch<AllProductsOperation>({
    query: allProductHandlesQuery,
  });

  return (
    response.body?.data?.products?.edges.map(({ node }) => node.handle) ?? []
  );
}
