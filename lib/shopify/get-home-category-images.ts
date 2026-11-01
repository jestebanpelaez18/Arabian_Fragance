import type { Locale } from "@/i18n-config";
import { SHOP_CATALOGS } from "@/lib/shop/catalogs";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

type CategoryImage = {
  url: string;
  altText: string | null;
};

export type HomeCategoryImages = {
  women: CategoryImage;
  unisex: CategoryImage;
  men: CategoryImage;
};

type CollectionImage = {
  image: CategoryImage | null;
} | null;

type HomeCategoryImagesOperation = {
  data?: {
    women: CollectionImage;
    unisex: CollectionImage;
    men: CollectionImage;
  };
  errors?: Array<{ message: string }>;
};

const homeCategoryImagesQuery = `
  query HomeCategoryImages(
    $language: LanguageCode!
    $women: String!
    $unisex: String!
    $men: String!
  ) @inContext(language: $language) {
    women: collection(handle: $women) {
      image {
        url
        altText
      }
    }

    unisex: collection(handle: $unisex) {
      image {
        url
        altText
      }
    }

    men: collection(handle: $men) {
      image {
        url
        altText
      }
    }
  }
`;

const FALLBACK_CATEGORY_IMAGES: HomeCategoryImages = {
  women: { url: "/shop/hero-women.jpg", altText: null },
  unisex: { url: "/shop/hero-unisex.jpg", altText: null },
  men: { url: "/shop/hero-men.jpg", altText: null },
};

export async function getHomeCategoryImages(
  locale: Locale,
): Promise<HomeCategoryImages> {
  try {
    const response = await shopifyFetch<HomeCategoryImagesOperation>({
      query: homeCategoryImagesQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        women: SHOP_CATALOGS.women.collectionHandle,
        unisex: SHOP_CATALOGS.unisex.collectionHandle,
        men: SHOP_CATALOGS.men.collectionHandle,
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["home", "collections"],
      },
    });

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length ||
      !response.body?.data
    ) {
      throw new Error(
        response.body?.errors?.map((error) => error.message).join("; ") ||
          response.error ||
          "Unable to load homepage category images from Shopify.",
      );
    }

    const { data } = response.body;
    const categoryImages = {
      women: data.women?.image,
      unisex: data.unisex?.image,
      men: data.men?.image,
    };

    for (const [category, image] of Object.entries(categoryImages)) {
      if (!image?.url) {
        console.error(
          `[Home Category Images] Missing ${category} collection image; using fallback.`,
        );
      }
    }

    return {
      women: categoryImages.women?.url
        ? categoryImages.women
        : FALLBACK_CATEGORY_IMAGES.women,
      unisex: categoryImages.unisex?.url
        ? categoryImages.unisex
        : FALLBACK_CATEGORY_IMAGES.unisex,
      men: categoryImages.men?.url
        ? categoryImages.men
        : FALLBACK_CATEGORY_IMAGES.men,
    };
  } catch (error) {
    console.error("[Home Category Images] Using fallback images:", error);

    return FALLBACK_CATEGORY_IMAGES;
  }
}
