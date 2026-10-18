import { cache } from "react";
import type { Locale } from "@/i18n-config";
import { shopifyFetch } from "@/lib/shopify/shopify";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";

export type ShopifyCollectionContent = {
  handle: string;
  title: string;
  description: string;
};

type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollectionContent | null;
  };
};

const collectionContentQuery = `
  query CollectionContent(
    $handle: String!
    $language: LanguageCode!
  ) @inContext(language: $language) {
    collection(handle: $handle) {
      handle
      title
      description
    }
  }
`;

export const getShopifyCollection = cache(
  async (
    locale: Locale,
    handle: string,
  ): Promise<ShopifyCollectionContent | null> => {
    const { body } = await shopifyFetch<ShopifyCollectionOperation>({
      query: collectionContentQuery,
      variables: {
        handle,
        language: getShopifyLanguageCode(locale),
      },
      next: {
        revalidate: 300,
        tags: ["collections"],
      },
    });

    const collection = body?.data?.collection;

    if (!collection) return null;

    return {
      handle: collection.handle,
      title: collection.title.trim(),
      description: collection.description.trim(),
    };
  },
);
