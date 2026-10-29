import type { Locale } from "@/i18n-config";
import { shopifyFetch } from "@/lib/shopify/shopify";

type ProductWithType = {
  id: string;
  productType: string;
};

type ProductTypesOperation = {
  data?: {
    nodes: Array<ProductWithType | null>;
  };
  errors?: Array<{ message: string }>;
};

const productTypesQuery = `
  query OriginalProductTypes($ids: [ID!]!) @inContext(language: EN) {
    nodes(ids: $ids) {
      ... on Product {
        id
        productType
      }
    }
  }
`;

export async function withOriginalProductTypes<T extends ProductWithType>(
  products: T[],
  locale: Locale,
): Promise<T[]> {
  if (locale === "en" || products.length === 0) {
    return products;
  }

  const ids = Array.from(new Set(products.map((product) => product.id)));
  const originalTypes = new Map<string, string>();

  for (let index = 0; index < ids.length; index += 100) {
    const response = await shopifyFetch<ProductTypesOperation>({
      query: productTypesQuery,
      variables: {
        ids: ids.slice(index, index + 100),
      },
      next: {
        revalidate: 300,
        tags: ["products"],
      },
    });

    const nodes = response.body?.data?.nodes;
    const hasErrors =
      response.error || response.status >= 400 || response.body?.errors?.length;

    if (hasErrors || !nodes) {
      console.error(
        "Unable to load original Shopify product types; using localized values.",
        response.error ?? response.body?.errors,
      );
    }

    for (const node of nodes ?? []) {
      if (node) {
        originalTypes.set(node.id, node.productType);
      }
    }
  }

  const missingIds: string[] = [];

  const localizedProducts = products.map((product) => {
    const productType = originalTypes.get(product.id);

    if (productType === undefined) {
      missingIds.push(product.id);

      return product;
    }

    return {
      ...product,
      productType,
    };
  });

  if (missingIds.length > 0) {
    console.error(
      "Missing original Shopify product types; using localized values.",
      missingIds,
    );
  }

  return localizedProducts;
}
