import { type Product } from "@/data/products";

type Note = NonNullable<Product["notes"]>[number];
type Gender = NonNullable<Product["gender"]>;

const GENDERS: Gender[] = ["women", "men", "unisex"];

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

  // --- ARREGLO DEL GÉNERO ---
  let rawGender: string | undefined;

  // 1. Extraemos el valor
  if (
    typeof p.gender === "object" &&
    p.gender !== null &&
    "value" in p.gender
  ) {
    rawGender = p.gender.value;
  } else if (typeof p.gender === "string") {
    rawGender = p.gender;
  }

  // 2. Limpiamos: Minúsculas y quitamos espacios (ESTO FALTABA)
  if (rawGender) {
    rawGender = rawGender.toLowerCase().trim();
  }

  // 3. Comparamos
  const gender: Gender =
    rawGender && (GENDERS as readonly string[]).includes(rawGender)
      ? (rawGender as Gender)
      : "unisex"; // Si falla, se va a unisex (aquí es donde estaba cayendo)

  // --- FIN ARREGLO ---

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
