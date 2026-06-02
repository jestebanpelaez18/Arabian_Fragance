import type { Locale } from "@/i18n-config";
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

type TierKey = "luxury" | "premium" | "signature";

type ShopifyCollectionNode = {
  id: string;
  handle?: string;
  title?: string;
  description?: string;
  image?: {
    url?: string;
  };
};

type CollectionsOperation = {
  data?: {
    collections?: {
      edges?: Array<{
        node: ShopifyCollectionNode;
      }>;
    };
  };
};

const collectionsQuery = `
  query HomeCollections($language: LanguageCode!) @inContext(language: $language) {
    collections(first: 50) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
          }
        }
      }
    }
  }
`;

const FALLBACK_BY_TIER: Record<TierKey, HomeCollectionCard> = {
  luxury: {
    id: "luxury",
    title: "The Luxury Collection",
    subtitle: "Pure extraits & rare ingredients",
    description:
      "Our most exclusive tier. Masterfully blended using raw, aged Oud and pure floral absolutes. A true testament to the opulence of Arabian perfumery, designed for the connoisseur.",
    imageSrc: "/shop/bottle-men.png",
    href: "/collections/luxury",
    buttonText: "Discover Luxury",
  },
  premium: {
    id: "premium",
    title: "The Premium Collection",
    subtitle: "Sophisticated oriental blends",
    description:
      "The perfect equilibrium between traditional Middle Eastern depth and modern French perfumery techniques. Complex, long-lasting, and undeniably elegant.",
    imageSrc: "/shop/premium_collection.png",
    href: "/collections/premium",
    buttonText: "Explore Premium",
  },
  signature: {
    id: "signature",
    title: "The Signature Collection",
    subtitle: "Accessible everyday elegance",
    description:
      "Fresh, versatile, and instantly captivating. These are our modern classics, crafted to leave a subtle but unforgettable trail wherever you go.",
    imageSrc: "/shop/bottle-women.png",
    href: "/collections/signature",
    buttonText: "Shop Signature",
  },
};

const ORDERED_TIERS: TierKey[] = ["luxury", "premium", "signature"];

const TIER_CONFIG: Record<
  TierKey,
  {
    subtitle: string;
    buttonText: string;
    fallbackImage: string;
    handleKeywords: string[];
    titleKeywords: string[];
  }
> = {
  luxury: {
    subtitle: "Pure extraits & rare ingredients",
    buttonText: "Discover Luxury",
    fallbackImage: "/shop/bottle-men.png",
    handleKeywords: ["luxury", "luxe", "exclusive"],
    titleKeywords: ["luxury", "exclusive", "elite"],
  },
  premium: {
    subtitle: "Sophisticated oriental blends",
    buttonText: "Explore Premium",
    fallbackImage: "/shop/premium_collection.png",
    handleKeywords: ["premium", "oriental"],
    titleKeywords: ["premium", "oriental"],
  },
  signature: {
    subtitle: "Accessible everyday elegance",
    buttonText: "Shop Signature",
    fallbackImage: "/shop/bottle-women.png",
    handleKeywords: ["signature", "classic", "everyday"],
    titleKeywords: ["signature", "classic", "everyday"],
  },
};

function safeText(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function normalizeCollection(
  node: ShopifyCollectionNode,
  tier: TierKey,
): HomeCollectionCard {
  const config = TIER_CONFIG[tier];

  return {
    id: node.id,
    title: safeText(node.title, FALLBACK_BY_TIER[tier].title),
    subtitle: config.subtitle,
    description: safeText(node.description, FALLBACK_BY_TIER[tier].description),
    imageSrc: safeText(node.image?.url, config.fallbackImage),
    href: `/collections/${safeText(node.handle, tier)}`,
    buttonText: config.buttonText,
  };
}

function scoreMatch(node: ShopifyCollectionNode, tier: TierKey): number {
  const handle = node.handle?.toLowerCase() ?? "";
  const title = node.title?.toLowerCase() ?? "";
  const config = TIER_CONFIG[tier];

  let score = 0;

  for (const keyword of config.handleKeywords) {
    if (handle.includes(keyword)) score += 3;
  }

  for (const keyword of config.titleKeywords) {
    if (title.includes(keyword)) score += 1;
  }

  return score;
}

function pickCollectionForTier(
  nodes: ShopifyCollectionNode[],
  tier: TierKey,
  usedIds: Set<string>,
): ShopifyCollectionNode | null {
  const candidates = nodes
    .filter((node) => !usedIds.has(node.id))
    .map((node) => ({ node, score: scoreMatch(node, tier) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return candidates[0]?.node ?? null;
}

export async function getHomeCollections(
  locale: Locale,
): Promise<HomeCollectionCard[]> {
  try {
    const { body } = await shopifyFetch<CollectionsOperation>({
      query: collectionsQuery,
      variables: { language: getShopifyLanguageCode(locale) },
      next: { revalidate: 300, tags: ["home", "collections"] },
    });

    const nodes = body?.data?.collections?.edges?.map(({ node }) => node) ?? [];
    if (nodes.length === 0) {
      return ORDERED_TIERS.map((tier) => FALLBACK_BY_TIER[tier]);
    }

    const usedIds = new Set<string>();

    return ORDERED_TIERS.map((tier) => {
      const match = pickCollectionForTier(nodes, tier, usedIds);
      if (!match) return FALLBACK_BY_TIER[tier];

      usedIds.add(match.id);
      return normalizeCollection(match, tier);
    });
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    return ORDERED_TIERS.map((tier) => FALLBACK_BY_TIER[tier]);
  }
}
