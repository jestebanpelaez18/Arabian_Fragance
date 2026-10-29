import type { Locale } from "@/i18n-config";

type Metafield = { value: string } | null;

export type SearchableFields = {
  title: string;
  handle: string;
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
  const aliasGroup = NOTE_ALIASES.find((aliases) =>
    aliases.some((alias) => normalize(alias) === queryWord),
  );

  const queryAliases = aliasGroup?.map(normalize) ?? [queryWord];

  return field.some((word) =>
    queryAliases.some((alias) => word.startsWith(alias)),
  );
}

function scoreProduct(
  product: SearchableFields,
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

/** Returns the products matching `term`, best match first. */
export function rankProducts<T extends SearchableFields>(
  products: T[],
  term: string,
  locale: Locale,
): T[] {
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
    .map(({ product }) => product);
}
