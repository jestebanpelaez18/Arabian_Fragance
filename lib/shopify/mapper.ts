import { type Product, VALID_NOTES } from "@/data/products";

type Note = NonNullable<Product["notes"]>[number];
type Gender = NonNullable<Product["gender"]>;

// Shopify translates the notes metafield under @inContext(language), so the
// Finnish values are mapped back to the canonical notes used by the filters.
const NOTE_TRANSLATIONS: Partial<Record<Note, string[]>> = {
  Woody: ["puinen", "puu"],
  Floral: ["kukkainen"],
  Amber: ["ambra", "meripihka"],
  Citrus: ["sitrus", "sitruksinen", "sitrushedelmäinen"],
  Sweet: ["makea"],
  Fresh: ["raikas"],
  Fruity: ["hedelmäinen"],
  Earthy: ["maanläheinen"],
  Powdery: ["puuterinen"],
  Leather: ["nahka", "nahkainen"],
  Tobacco: ["tupakka"],
  Vanilla: ["vanilja", "vaniljainen"],
  Smoky: ["savua", "savuisuus", "savunomainen"],
};

const NOTE_BY_NORMALIZED_VALUE = new Map<string, Note>([
  ...VALID_NOTES.map((note) => [note.toLowerCase(), note] as const),
  ...Object.entries(NOTE_TRANSLATIONS).flatMap(([note, aliases]) =>
    aliases.map((alias) => [alias, note as Note] as const),
  ),
]);

const NORMALIZED_GENDER_BY_VALUE: Record<string, Gender> = {
  women: "women",
  woman: "women",
  female: "women",
  ladies: "women",
  nainen: "women",
  naiset: "women",
  dam: "women",
  damer: "women",

  men: "men",
  man: "men",
  male: "men",
  miehet: "men",
  mies: "men",
  herr: "men",
  herrar: "men",

  unisex: "unisex",
  uni: "unisex",
};

export interface ShopifyRawProduct {
  id: string;
  handle?: string;
  slug?: string;
  title?: string;
  name?: string;
  productType?: string;
  collections?: {
    edges: {
      node: {
        handle: string;
      };
    }[];
  };
  description?: string;
  price?: string | number;
  priceRange?: { minVariantPrice: { amount: string } };
  image?: string;
  images?: { edges: { node: { url: string } }[] };
  gender?: { value: string } | string;
  notes?: { value: string } | string[] | string;
  topNotes?: { value: string } | string[] | string;
  heartNotes?: { value: string } | string[] | string;
  baseNotes?: { value: string } | string[] | string;
  concentration?: { value: string } | string;
  fragranceType?: { value: string } | string;
}

export function parseShopifyListField(
  field?: { value: string } | string[] | string | null,
): string[] {
  if (!field) return [];

  const splitRawText = (value: string) => {
    const cleaned = value.replace(/[\[\]"]/g, "").trim();
    if (!cleaned) return [];
    if (cleaned.includes("|")) {
      return cleaned.split("|").map((s) => s.trim());
    }
    if (cleaned.includes("•")) {
      return cleaned.split("•").map((s) => s.trim());
    }
    if (cleaned.includes("·")) {
      return cleaned.split("·").map((s) => s.trim());
    }
    if (cleaned.includes(",")) {
      return cleaned.split(",").map((s) => s.trim());
    }
    return [cleaned];
  };

  if (Array.isArray(field)) {
    return field.map((s) => s.trim()).filter(Boolean);
  }

  if (typeof field === "string") {
    return splitRawText(field).filter(Boolean);
  }

  if (typeof field === "object" && field !== null && "value" in field) {
    try {
      const parsed = JSON.parse(field.value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fall back to plain text parsing below.
    }

    return splitRawText(field.value).filter(Boolean);
  }

  return [];
}

export function normalizeToKnownNote(value: string): Note | undefined {
  return NOTE_BY_NORMALIZED_VALUE.get(value.trim().toLowerCase());
}

export function normalizeGender(
  field?: { value: string } | string | null,
): Gender {
  const rawGender = typeof field === "string" ? field : field?.value;

  const normalized = rawGender
    ?.toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, " ");

  if (!normalized) return "unisex";

  const tokens = normalized
    .split(/[\/,|]/)
    .map((token) => token.trim())
    .filter(Boolean);

  return (
    NORMALIZED_GENDER_BY_VALUE[normalized] ??
    tokens.map((token) => NORMALIZED_GENDER_BY_VALUE[token]).find(Boolean) ??
    "unisex"
  );
}

export function normalizeProduct(p: ShopifyRawProduct): Product {
  const name = p.title || p.name || "Arabian Fragrance";

  let price = 0;
  if (p.price) {
    price = Number(p.price);
  } else if (p.priceRange?.minVariantPrice?.amount) {
    price = Number(p.priceRange.minVariantPrice.amount);
  }

  const images = Array.from(
    new Set(
      (p.images?.edges ?? [])
        .map((edge) => edge.node?.url)
        .filter((url): url is string => Boolean(url)),
    ),
  );

  let image = "/catalog/Bottle_3.png";
  if (p.image) {
    image = p.image;
  } else if (images[0]) {
    image = images[0];
  }

  const gender = normalizeGender(p.gender);

  let notes = parseShopifyListField(p.notes);

  if (notes.length === 0) {
    notes = [
      ...parseShopifyListField(p.topNotes),
      ...parseShopifyListField(p.heartNotes),
      ...parseShopifyListField(p.baseNotes),
    ];
  }

  const normalizedNotes = Array.from(
    new Set(
      notes
        .map(normalizeToKnownNote)
        .filter((note): note is Note => note !== undefined),
    ),
  );

  const concentration =
    (typeof p.concentration === "string"
      ? p.concentration
      : p.concentration?.value
    )?.trim() || undefined;

  const fragranceType =
    (typeof p.fragranceType === "string"
      ? p.fragranceType
      : p.fragranceType?.value
    )?.trim() || undefined;

  return {
    id: p.id,
    slug: p.handle || p.slug || "product",
    name,
    productType: p.productType?.trim() || undefined,
    collectionHandles: Array.from(
      new Set(
        (p.collections?.edges ?? [])
          .map(({ node }) => node.handle.trim())
          .filter(Boolean),
      ),
    ),
    price,
    concentration,
    fragranceType,
    gender,
    image,
    images,
    notes: normalizedNotes,
    description: p.description || "",
    status: "active",
  };
}
