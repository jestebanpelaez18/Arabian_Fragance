"use server";

import { shopifyFetch } from "@/lib/shopify/shopify";
import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";

export type Product = {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: {
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
};

type Metafield = { value: string } | null;

type SearchProduct = Product & {
  productType?: string | null;
  gender?: Metafield;
  mainAccords?: Metafield;
  topNotes?: Metafield;
  heartNotes?: Metafield;
  baseNotes?: Metafield;
  keyNotes?: Metafield;
  fragranceType?: Metafield;
  collections?: {
    nodes: Array<{
      handle: string;
      title: string;
    }>;
  };
};

type ProductsResponse<T> = {
  data?: {
    products?: {
      nodes: T[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const PRODUCT_FIELDS = `
  id
  title
  handle
  availableForSale
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
    width
    height
  }
`;

const trendingProductsQuery = `
  query NavigationTopProducts($language: LanguageCode!)
  @inContext(language: $language) {
    products(first: 7, sortKey: BEST_SELLING) {
      nodes {
        ${PRODUCT_FIELDS}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const catalogQuery = `
  query NavigationSearchCatalog(
    $language: LanguageCode!
    $after: String
  ) @inContext(language: $language) {
    products(first: 100, after: $after, sortKey: TITLE) {
      nodes {
        ${PRODUCT_FIELDS}
        productType

        collections(first: 20) {
          nodes {
            handle
            title
          }
        }

        gender: metafield(namespace: "custom", key: "gender") {
          value
        }
        mainAccords: metafield(namespace: "custom", key: "main_accord") {
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
        fragranceType: metafield(
          namespace: "custom"
          key: "fragrance_type"
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

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function words(value: string): string[] {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function readValues(field?: Metafield): string[] {
  const value = field?.value?.trim();

  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }

    if (typeof parsed === "string") {
      return [parsed];
    }
  } catch {
    // Single-line and multiline metafields can contain ordinary text.
  }

  return value
    .split(/[,|•·;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const GENDER_ALIASES = [
  [
    "women",
    "woman",
    "female",
    "ladies",
    "her",
    "nainen",
    "naiset",
    "naisille",
    "dam",
    "damer",
    "henne",
  ],
  [
    "men",
    "man",
    "male",
    "him",
    "miehet",
    "mies",
    "miehille",
    "herr",
    "herrar",
    "honom",
  ],
  ["unisex", "uni"],
];

const NOTE_ALIASES = [
  ["woody", "wood", "woods", "puinen", "puu", "traig", "tra"],
  ["floral", "florals", "flower", "flowers", "kukkainen", "blommig"],
  ["amber", "ambery", "ambra", "meripihka", "meripihkainen", "ambradoftande"],
  [
    "citrus",
    "citrusy",
    "sitrus",
    "sitruksinen",
    "sitrushedelmainen",
    "citrusdoftande",
  ],
  ["spice", "spicy", "mausteinen", "kryddig"],
  ["musk", "musky", "myski", "myskinen", "mysk", "myskig"],
  ["leather", "nahka", "nahkainen", "lader"],
  ["vanilla", "vanilja", "vaniljainen", "vanilj"],
  ["sweet", "makea", "sot"],
  ["fresh", "raikas", "frasch"],
  ["fruity", "fruit", "hedelmainen", "fruktig"],
  ["smoky", "smoke", "savua", "savuisuus", "savunomainen", "rokig"],
  ["powdery", "puuterinen", "pudrig"],
  ["earthy", "maanlaheinen", "jordig"],
  ["tobacco", "tupakka", "tobak"],
];

const TYPE_ALIASES = [
  [
    "perfume",
    "perfumes",
    "fragrance",
    "fragrances",
    "hajuvesi",
    "hajuvedet",
    "parfym",
    "parfymer",
  ],
  [
    "attar",
    "attars",
    "tola",
    "tolas",
    "oil",
    "oils",
    "perfume oil",
    "hajusteoljy",
    "parfymolja",
  ],
  ["body mist", "body mists", "mist", "mists", "vartalosuihke", "kroppsspray"],
  [
    "discovery set",
    "discovery",
    "sample set",
    "samples",
    "naytepakkaus",
    "provset",
  ],
];

const IGNORED_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "of",
  "by",
  "note",
  "notes",
  "collection",
  "collections",
  "ja",
  "och",
]);

function expandAliases(value: string, groups: string[][]): string {
  const normalized = normalize(value);

  const group = groups.find((aliases) =>
    aliases.some((alias) => normalize(alias) === normalized),
  );

  return group ? group.join(" ") : value;
}

function matchesWord(field: string[], queryWord: string): boolean {
  return field.some((word) => word.startsWith(queryWord));
}

function scoreProduct(
  product: SearchProduct,
  queryWords: string[],
  normalizedQuery: string,
): number {
  const title = normalize(product.title);

  const titleWords = words(`${product.title} ${product.handle}`);

  const noteWords = words(
    [
      ...readValues(product.mainAccords),
      ...readValues(product.topNotes),
      ...readValues(product.heartNotes),
      ...readValues(product.baseNotes),
      ...readValues(product.keyNotes),
    ]
      .filter((note) => !/^not disclosed\b/i.test(note.trim()))
      .map((note) => expandAliases(note, NOTE_ALIASES))
      .join(" "),
  );

  const genderWords = words(
    expandAliases(product.gender?.value ?? "", GENDER_ALIASES),
  );

  const typeWords = words(
    [
      expandAliases(product.productType ?? "", TYPE_ALIASES),
      product.fragranceType?.value ?? "",
    ].join(" "),
  );

  const collectionWords = words(
    (product.collections?.nodes ?? [])
      .map((collection) => `${collection.title} ${collection.handle}`)
      .join(" "),
  );

  const fields = [
    { values: titleWords, weight: 50 },
    { values: noteWords, weight: 20 },
    { values: collectionWords, weight: 15 },
    { values: typeWords, weight: 10 },
    { values: genderWords, weight: 10 },
  ];

  let score = 0;

  for (const queryWord of queryWords) {
    const matchedWeights = fields
      .filter((field) => matchesWord(field.values, queryWord))
      .map((field) => field.weight);

    // Every meaningful word must match some part of the product.
    if (matchedWeights.length === 0) return 0;

    score += Math.max(...matchedWeights);
  }

  if (title === normalizedQuery) {
    score += 200;
  } else if (title.startsWith(normalizedQuery)) {
    score += 100;
  } else if (title.includes(normalizedQuery)) {
    score += 50;
  }

  return score;
}

function toProduct(product: SearchProduct): Product {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    availableForSale: product.availableForSale,
    priceRange: product.priceRange,
    featuredImage: product.featuredImage,
  };
}

async function getSearchCatalog(locale: Locale): Promise<SearchProduct[]> {
  const products = new Map<string, SearchProduct>();
  const visitedCursors = new Set<string>();

  let after: string | null = null;

  while (true) {
    const response: {
      status: number;
      body: ProductsResponse<SearchProduct>;
      error?: string;
    } = await shopifyFetch<ProductsResponse<SearchProduct>>({
      query: catalogQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        after,
      },
      next: {
        revalidate: 300,
        tags: ["products", "collections"],
      },
    });

    const connection:
      | {
          nodes: SearchProduct[];
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
          };
        }
      | undefined = response.body?.data?.products;

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length ||
      !connection
    ) {
      console.error("Unable to load the navigation search catalog.");
      throw new Error("Unable to search products.");
    }

    for (const product of connection.nodes) {
      products.set(product.id, product);
    }

    if (!connection.pageInfo.hasNextPage) {
      break;
    }

    const cursor: string | null = connection.pageInfo.endCursor;

    if (!cursor || visitedCursors.has(cursor)) {
      throw new Error("Invalid search catalog pagination.");
    }

    visitedCursors.add(cursor);
    after = cursor;
  }

  return Array.from(products.values());
}

export async function getTrendingProducts(locale: Locale): Promise<Product[]> {
  const response = await shopifyFetch<ProductsResponse<Product>>({
    query: trendingProductsQuery,
    variables: {
      language: getShopifyLanguageCode(locale),
    },
    next: {
      revalidate: 300,
      tags: ["products"],
    },
  });

  const products = response.body?.data?.products?.nodes;

  if (
    response.error ||
    response.status >= 400 ||
    response.body?.errors?.length ||
    !products
  ) {
    throw new Error("Unable to load products.");
  }

  return products;
}

export async function searchProductsAction(
  term: string,
  locale: Locale,
): Promise<Product[]> {
  const normalizedQuery = normalize(term.trim().slice(0, 120));

  if (normalizedQuery.length < 2) return [];

  const queryWords = Array.from(
    new Set(words(normalizedQuery).filter((word) => !IGNORED_WORDS.has(word))),
  );

  if (queryWords.length === 0) return [];

  const paddedQuery = ` ${normalizedQuery} `;

  // Prefer the longest matching phrase, e.g. "perfume oil" over "perfume".
  const requestedTypeAliases = TYPE_ALIASES.map((aliases) =>
    aliases.map(normalize),
  )
    .map((aliases) => ({
      aliases,
      match: Math.max(
        0,
        ...aliases
          .filter((alias) => paddedQuery.includes(` ${alias} `))
          .map((alias) => alias.length),
      ),
    }))
    .filter(({ match }) => match > 0)
    .sort((first, second) => second.match - first.match)[0]?.aliases;

  const products = await getSearchCatalog(locale);

  return products
    .filter(
      (product) =>
        !requestedTypeAliases ||
        requestedTypeAliases.includes(normalize(product.productType ?? "")),
    )
    .map((product) => ({
      product,
      score: scoreProduct(product, queryWords, normalizedQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (first, second) =>
        second.score - first.score ||
        first.product.title.localeCompare(second.product.title, locale),
    )
    .map(({ product }) => toProduct(product));
}
