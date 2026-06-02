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

type TierCopy = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
};

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

const TIER_COPY_BY_LOCALE: Record<Locale, Record<TierKey, TierCopy>> = {
  en: {
    luxury: {
      title: "The Luxury Collection",
      subtitle: "Pure extraits & rare ingredients",
      description:
        "Our most exclusive tier. Masterfully blended using raw, aged Oud and pure floral absolutes. A true testament to the opulence of Arabian perfumery, designed for the connoisseur.",
      buttonText: "Discover Luxury",
    },
    premium: {
      title: "The Premium Collection",
      subtitle: "Sophisticated oriental blends",
      description:
        "The perfect equilibrium between traditional Middle Eastern depth and modern French perfumery techniques. Complex, long-lasting, and undeniably elegant.",
      buttonText: "Explore Premium",
    },
    signature: {
      title: "The Signature Collection",
      subtitle: "Accessible everyday elegance",
      description:
        "Fresh, versatile, and instantly captivating. These are our modern classics, crafted to leave a subtle but unforgettable trail wherever you go.",
      buttonText: "Shop Signature",
    },
  },
  fi: {
    luxury: {
      title: "Luxury-kokoelma",
      subtitle: "Puhtaat ekstraktit ja harvinaiset raaka-aineet",
      description:
        "Eksklusiivisin tasomme. Mestarisekoituksia kypsytetysta oudista ja puhtaista kukkaisabsoluuteista. Arabialaisen parfymitaiteen ylellisyytta parhaimmillaan.",
      buttonText: "Tutustu Luxuryyn",
    },
    premium: {
      title: "Premium-kokoelma",
      subtitle: "Hienostuneet orientaaliset sekoitukset",
      description:
        "Tasapaino perinteisen lahi-idan syvyyden ja modernien ranskalaisten parfymitekniikoiden valilla. Monivivahteinen, pitkaikainen ja elegantti.",
      buttonText: "Tutustu Premiumiin",
    },
    signature: {
      title: "Signature-kokoelma",
      subtitle: "Arjen saavutettavaa eleganssia",
      description:
        "Raikkaita, monipuolisia ja valittomasti lumoavia tuoksuja. Moderneja klassikoitamme, jotka jattavat hienovaraisen mutta unohtumattoman jaljen.",
      buttonText: "Osta Signaturea",
    },
  },
  sv: {
    luxury: {
      title: "Luxury-kollektionen",
      subtitle: "Rena extrakt och sallsynta ingredienser",
      description:
        "Var mest exklusiva niva. Mastsakert blandad med lagrad oud och rena blomabsoluter. Ett uttryck for arabisk parfymkonst och opulens.",
      buttonText: "Utforska Luxury",
    },
    premium: {
      title: "Premium-kollektionen",
      subtitle: "Sofistikerade orientaliska blandningar",
      description:
        "Den perfekta balansen mellan traditionell mellanostern-djup och moderna franska parfymtekniker. Komplex, langvarig och elegant.",
      buttonText: "Utforska Premium",
    },
    signature: {
      title: "Signature-kollektionen",
      subtitle: "Tillganglig elegans for varje dag",
      description:
        "Frascha, mangsidiga och direkt fangslande. Vara moderna klassiker som lamnar ett subtilt men oforglomligt spar.",
      buttonText: "Handla Signature",
    },
  },
};

const ORDERED_TIERS: TierKey[] = ["luxury", "premium", "signature"];

const TIER_CONFIG: Record<
  TierKey,
  {
    fallbackImage: string;
    handleKeywords: string[];
    titleKeywords: string[];
  }
> = {
  luxury: {
    fallbackImage: "/shop/bottle-men.png",
    handleKeywords: ["luxury", "luxe", "exclusive"],
    titleKeywords: ["luxury", "exclusive", "elite"],
  },
  premium: {
    fallbackImage: "/shop/premium_collection.png",
    handleKeywords: ["premium", "oriental"],
    titleKeywords: ["premium", "oriental"],
  },
  signature: {
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
  locale: Locale,
): HomeCollectionCard {
  const config = TIER_CONFIG[tier];
  const copy = TIER_COPY_BY_LOCALE[locale][tier];

  return {
    id: node.id,
    title: safeText(node.title, copy.title),
    subtitle: copy.subtitle,
    description: safeText(node.description, copy.description),
    imageSrc: safeText(node.image?.url, config.fallbackImage),
    href: `/collections/${safeText(node.handle, tier)}`,
    buttonText: copy.buttonText,
  };
}

function getLocalizedFallbackByTier(
  locale: Locale,
): Record<TierKey, HomeCollectionCard> {
  const copy = TIER_COPY_BY_LOCALE[locale] ?? TIER_COPY_BY_LOCALE.en;

  return {
    luxury: {
      id: "luxury",
      title: copy.luxury.title,
      subtitle: copy.luxury.subtitle,
      description: copy.luxury.description,
      imageSrc: "/shop/bottle-men.png",
      href: "/collections/luxury",
      buttonText: copy.luxury.buttonText,
    },
    premium: {
      id: "premium",
      title: copy.premium.title,
      subtitle: copy.premium.subtitle,
      description: copy.premium.description,
      imageSrc: "/shop/premium_collection.png",
      href: "/collections/premium",
      buttonText: copy.premium.buttonText,
    },
    signature: {
      id: "signature",
      title: copy.signature.title,
      subtitle: copy.signature.subtitle,
      description: copy.signature.description,
      imageSrc: "/shop/bottle-women.png",
      href: "/collections/signature",
      buttonText: copy.signature.buttonText,
    },
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
  const fallbackByTier = getLocalizedFallbackByTier(locale);

  try {
    const { body } = await shopifyFetch<CollectionsOperation>({
      query: collectionsQuery,
      variables: { language: getShopifyLanguageCode(locale) },
      next: { revalidate: 300, tags: ["home", "collections"] },
    });

    const nodes = body?.data?.collections?.edges?.map(({ node }) => node) ?? [];
    if (nodes.length === 0) {
      return ORDERED_TIERS.map((tier) => fallbackByTier[tier]);
    }

    const usedIds = new Set<string>();

    return ORDERED_TIERS.map((tier) => {
      const match = pickCollectionForTier(nodes, tier, usedIds);
      if (!match) return fallbackByTier[tier];

      usedIds.add(match.id);
      return normalizeCollection(match, tier, locale);
    });
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    return ORDERED_TIERS.map((tier) => fallbackByTier[tier]);
  }
}
