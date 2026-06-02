import { type Product } from "@/data/products";

type Note = NonNullable<Product["notes"]>[number];
type Gender = NonNullable<Product["gender"]>;

const GENDERS: Gender[] = ["women", "men", "unisex"];

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
  description?: string;
  price?: string | number;
  priceRange?: { minVariantPrice: { amount: string } };
  image?: string;
  images?: { edges: { node: { url: string } }[] };
  gender?: { value: string } | string;
  notes?: { value: string } | string[] | string;
  concentration?: { value: string } | string;
}

export function normalizeProduct(p: ShopifyRawProduct): Product {
  const name = p.title || p.name || "Arabian Fragrance";

  let price = 0;
  if (p.price) {
    price = Number(p.price);
  } else if (p.priceRange?.minVariantPrice?.amount) {
    price = Number(p.priceRange.minVariantPrice.amount);
  }

  const images = (p.images?.edges ?? [])
    .map((edge) => edge.node?.url)
    .filter((url): url is string => Boolean(url));

  let image = "/catalog/Bottle_3.png";
  if (p.image) {
    image = p.image;
  } else if (images[0]) {
    image = images[0];
  }

  let rawGender: string | undefined;

  if (
    typeof p.gender === "object" &&
    p.gender !== null &&
    "value" in p.gender
  ) {
    rawGender = p.gender.value;
  } else if (typeof p.gender === "string") {
    rawGender = p.gender;
  }

  const normalizedRawGender = rawGender
    ?.toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, " ");

  const tokenCandidates = normalizedRawGender
    ? normalizedRawGender
        .split(/[\/,|]/)
        .map((token) => token.trim())
        .filter(Boolean)
    : [];

  const mappedGender =
    NORMALIZED_GENDER_BY_VALUE[normalizedRawGender ?? ""] ??
    tokenCandidates
      .map((token) => NORMALIZED_GENDER_BY_VALUE[token])
      .find(Boolean);

  const gender: Gender =
    mappedGender ??
    (normalizedRawGender &&
    (GENDERS as readonly string[]).includes(normalizedRawGender)
      ? (normalizedRawGender as Gender)
      : "unisex");

  let notes: Note[] = [];
  const rawNotes = p.notes;

  if (Array.isArray(rawNotes)) {
    notes = rawNotes as Note[];
  } else if (typeof rawNotes === "string") {
    notes = [rawNotes] as Note[];
  } else if (
    typeof rawNotes === "object" &&
    rawNotes !== null &&
    "value" in rawNotes
  ) {
    try {
      const parsed = JSON.parse(rawNotes.value);
      notes = Array.isArray(parsed)
        ? (parsed as Note[])
        : ([rawNotes.value] as Note[]);
    } catch {
      notes = rawNotes.value.includes(",")
        ? (rawNotes.value.split(",").map((s) => s.trim()) as Note[])
        : ([rawNotes.value] as Note[]);
    }
  }

  let concentration: string | undefined;
  if (
    typeof p.concentration === "object" &&
    p.concentration !== null &&
    "value" in p.concentration
  ) {
    concentration = p.concentration.value?.trim();
  } else if (typeof p.concentration === "string") {
    concentration = p.concentration.trim();
  }

  if (!concentration) {
    concentration = p.productType?.trim();
  }

  return {
    id: p.id,
    slug: p.handle || p.slug || "product",
    name,
    price,
    concentration,
    gender,
    image,
    images,
    notes,
    description: p.description || "",
    status: "active",
  };
}
