import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import { COLLECTION_HANDLES } from "@/lib/shop/catalogs";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type HomeCollectionCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  href: string;
  buttonText: string;
};

type TierKey = keyof typeof COLLECTION_HANDLES;

type TextField = {
  value: string;
} | null;

type ShopifyCollectionNode = {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
  } | null;
  subtitle: TextField;
  buttonLabel: TextField;
  products: {
    nodes: Array<{
      featuredImage: {
        url: string;
      } | null;
    }>;
  };
};

type CollectionsOperation = {
  data?: Record<TierKey, ShopifyCollectionNode | null>;
  errors?: Array<{ message: string }>;
};

const ORDERED_TIERS: TierKey[] = ["luxury", "premium", "essential"];

const FALLBACK_COLLECTIONS: Record<
  Locale,
  Record<TierKey, { title: string; imageSrc: string }>
> = {
  en: {
    luxury: { title: "Luxury Collection", imageSrc: "/shop/bottle-men.png" },
    premium: {
      title: "Premium Collection",
      imageSrc: "/shop/premium_collection.png",
    },
    essential: {
      title: "Essential Collection",
      imageSrc: "/shop/bottle-women.png",
    },
  },
  fi: {
    luxury: { title: "Luxury-kokoelma", imageSrc: "/shop/bottle-men.png" },
    premium: {
      title: "Premium-kokoelma",
      imageSrc: "/shop/premium_collection.png",
    },
    essential: {
      title: "Essential-kokoelma",
      imageSrc: "/shop/bottle-women.png",
    },
  },
  sv: {
    luxury: {
      title: "Luxury-kollektionen",
      imageSrc: "/shop/bottle-men.png",
    },
    premium: {
      title: "Premium-kollektionen",
      imageSrc: "/shop/premium_collection.png",
    },
    essential: {
      title: "Essential-kollektionen",
      imageSrc: "/shop/bottle-women.png",
    },
  },
};

const COLLECTION_FIELDS = `
  id
  title
  description

  image {
    url
  }

  subtitle: metafield(namespace: "custom", key: "home_subtitle") {
    value
  }

  buttonLabel: metafield(namespace: "custom", key: "home_button_label") {
    value
  }

  products(first: 1) {
    nodes {
      featuredImage {
        url
      }
    }
  }
`;

const collectionsQuery = `
  query HomeCollections(
    $language: LanguageCode!
    $luxury: String!
    $premium: String!
    $essential: String!
  ) @inContext(language: $language) {
    luxury: collection(handle: $luxury) {
      ${COLLECTION_FIELDS}
    }

    premium: collection(handle: $premium) {
      ${COLLECTION_FIELDS}
    }

    essential: collection(handle: $essential) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export async function getHomeCollections(
  locale: Locale,
): Promise<HomeCollectionCard[]> {
  const defaultButtonLabel =
    getUiLabels(locale).sections.categoryShowcase.shopNow;

  const createFallback = (tier: TierKey): HomeCollectionCard => ({
    id: tier,
    title: FALLBACK_COLLECTIONS[locale][tier].title,
    subtitle: "",
    description: "",
    imageSrc: FALLBACK_COLLECTIONS[locale][tier].imageSrc,
    href: `/${locale}/shop/${tier}`,
    buttonText: defaultButtonLabel,
  });

  try {
    const response = await shopifyFetch<CollectionsOperation>({
      query: collectionsQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        luxury: COLLECTION_HANDLES.luxury,
        premium: COLLECTION_HANDLES.premium,
        essential: COLLECTION_HANDLES.essential,
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
          "Unable to load homepage collections from Shopify.",
      );
    }

    return ORDERED_TIERS.map((tier) => {
      const collection = response.body.data?.[tier];

      if (!collection) {
        console.error(
          `Homepage collection not found: ${COLLECTION_HANDLES[tier]}; using fallback.`,
        );
        return createFallback(tier);
      }

      const imageSrc =
        collection.image?.url ||
        collection.products.nodes[0]?.featuredImage?.url;

      if (!imageSrc) {
        console.error(
          `Missing homepage collection image: ${COLLECTION_HANDLES[tier]}; using fallback.`,
        );
      }

      return {
        id: collection.id,
        title: collection.title,
        subtitle: collection.subtitle?.value.trim() ?? "",
        description: collection.description,
        imageSrc: imageSrc ?? createFallback(tier).imageSrc,
        href: `/${locale}/shop/${tier}`,
        buttonText: collection.buttonLabel?.value.trim() || defaultButtonLabel,
      };
    });
  } catch (error) {
    console.error("[Home Collections] Using fallback collections:", error);

    return ORDERED_TIERS.map(createFallback);
  }
}
