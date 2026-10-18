import { type Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";

export type ConcentrationFamily =
  | "extrait"
  | "parfum"
  | "eau_de_parfum"
  | "eau_de_toilette"
  | "eau_de_cologne"
  | "mist";

type ProductNote = NonNullable<Product["notes"]>[number];
type ProductGender = NonNullable<Product["gender"]>;

type ProductDisplayLabels = {
  defaultNoteProfile: string;
  noteSuffix: string;
  andWord: string;
  intensityLabel: string;
  noteAdjectives: Partial<Record<ProductNote, string>>;
  concentrationLabels: Record<ConcentrationFamily, string>;
  genderPrefix: Record<ProductGender, string>;
};

const PRODUCT_DISPLAY_LABELS: Record<Locale, ProductDisplayLabels> = {
  en: {
    defaultNoteProfile: "Signature Notes",
    noteSuffix: "Notes",
    andWord: "and",
    intensityLabel: "Intensity",
    noteAdjectives: {
      Amber: "Ambery",
      Citrus: "Citrusy",
      Spice: "Spicy",
      Sweet: "Sweet",
      Floral: "Floral",
      Woody: "Woody",
      Musk: "Musky",
      Oud: "Oud",
      Fresh: "Fresh",
      Fruity: "Fruity",
      Leather: "Leather",
      Vanilla: "Vanilla",
      Smoky: "Smoky",
    },
    concentrationLabels: {
      extrait: "Extrait de Parfum",
      parfum: "Parfum",
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      eau_de_cologne: "Eau de Cologne",
      mist: "Body Mist",
    },
    genderPrefix: {
      women: "For Her ",
      men: "For Him ",
      unisex: "Unisex ",
    },
  },
  fi: {
    defaultNoteProfile: "Tunnusomaiset nuotit",
    noteSuffix: "nuotit",
    andWord: "ja",
    intensityLabel: "Voimakkuus",
    noteAdjectives: {
      Amber: "Meripihkainen",
      Citrus: "Sitruksinen",
      Spice: "Mausteinen",
      Sweet: "Makea",
      Floral: "Kukkainen",
      Woody: "Puinen",
      Musk: "Myskinen",
      Oud: "Oud",
      Fresh: "Raikas",
      Fruity: "Hedelmäinen",
      Leather: "Nahkainen",
      Vanilla: "Vaniljainen",
      Smoky: "Savuinen",
    },
    concentrationLabels: {
      extrait: "Parfyymiuute",
      parfum: "Parfyymi",
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      eau_de_cologne: "Eau de Cologne",
      mist: "Body Mist",
    },
    genderPrefix: {
      women: "Naisille ",
      men: "Miehille ",
      unisex: "Unisex ",
    },
  },
  sv: {
    defaultNoteProfile: "Signaturnoter",
    noteSuffix: "noter",
    andWord: "och",
    intensityLabel: "Intensitet",
    noteAdjectives: {
      Amber: "Ambradoftande",
      Citrus: "Citrusdoftande",
      Spice: "Kryddig",
      Sweet: "Söt",
      Floral: "Blommig",
      Woody: "Träig",
      Musk: "Myskig",
      Oud: "Oud",
      Fresh: "Fräsch",
      Fruity: "Fruktig",
      Leather: "Läder",
      Vanilla: "Vanilj",
      Smoky: "Rökig",
    },
    concentrationLabels: {
      extrait: "Parfymextrakt",
      parfum: "Parfym",
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      eau_de_cologne: "Eau de Cologne",
      mist: "Body Mist",
    },
    genderPrefix: {
      women: "För henne ",
      men: "För honom ",
      unisex: "Unisex ",
    },
  },
};

const FRAGRANCE_TYPE_FAMILIES: Record<string, ConcentrationFamily> = {
  extrait: "extrait",
  "extrait de parfum": "extrait",
  parfum: "parfum",
  perfume: "parfum",
  "eau de parfum": "eau_de_parfum",
  edp: "eau_de_parfum",
  "eau de toilette": "eau_de_toilette",
  edt: "eau_de_toilette",
  "eau de cologne": "eau_de_cologne",
  edc: "eau_de_cologne",
  cologne: "eau_de_cologne",
  "body mist": "mist",
  mist: "mist",
};

function getProductDisplayLabels(
  locale: Locale = i18n.defaultLocale,
): ProductDisplayLabels {
  return (
    PRODUCT_DISPLAY_LABELS[locale] ?? PRODUCT_DISPLAY_LABELS[i18n.defaultLocale]
  );
}

/**
 * Reads the name configured in Shopify's Fragrance Type field.
 * The percentage is not used to infer this name.
 */
export function formatFragranceTypeLabel(
  rawFragranceType?: string,
  locale: Locale = i18n.defaultLocale,
): string {
  const value = rawFragranceType?.trim();
  if (!value) return "";

  const normalized = value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  const family = Object.prototype.hasOwnProperty.call(
    FRAGRANCE_TYPE_FAMILIES,
    normalized,
  )
    ? FRAGRANCE_TYPE_FAMILIES[normalized]
    : undefined;

  // Preserve other types, such as Attar, as configured in Shopify.
  if (!family) return value;

  return getProductDisplayLabels(locale).concentrationLabels[family];
}

/**
 * Reads a percentage from Shopify's Concentration field.
 * Accepts "25%", "25 %" and plain numeric values such as "25".
 */
export function getConcentrationPercent(
  rawConcentration?: string,
): number | null {
  const value = rawConcentration?.trim();
  if (!value) return null;

  const match = value.match(/^(\d+(?:[.,]\d+)?)\s*%?$/);
  if (!match) return null;

  const percent = Number(match[1].replace(",", "."));

  if (!Number.isFinite(percent) || percent <= 0 || percent > 100) {
    return null;
  }

  return percent;
}

/**
 * AFC visual scale for concentration percentages.
 * This is not a measurement of projection, longevity or intensity.
 */
export function getConcentrationLevel(
  percent: number,
): 1 | 2 | 3 | 4 | 5 | null {
  if (!Number.isFinite(percent) || percent <= 0 || percent > 100) {
    return null;
  }

  if (percent >= 30) return 5;
  if (percent >= 22) return 4;
  if (percent >= 15) return 3;
  if (percent >= 10) return 2;

  return 1;
}

export function formatNoteProfile(
  notes?: Product["notes"],
  locale: Locale = i18n.defaultLocale,
): string {
  const labels = getProductDisplayLabels(locale);

  if (!notes || notes.length === 0) {
    return labels.defaultNoteProfile;
  }

  const uniqueNotes = Array.from(
    new Set(notes.map((note) => note.trim())),
  ).filter(Boolean);

  if (uniqueNotes.length === 0) {
    return labels.defaultNoteProfile;
  }

  const toDescriptor = (note: string): string =>
    labels.noteAdjectives[note as ProductNote] ?? note;

  if (uniqueNotes.length === 1) {
    return `${toDescriptor(uniqueNotes[0])} ${labels.noteSuffix}`;
  }

  return `${toDescriptor(uniqueNotes[0])} ${labels.andWord} ${toDescriptor(
    uniqueNotes[1],
  )} ${labels.noteSuffix}`;
}

export function formatGenderPrefix(
  gender?: Product["gender"],
  locale: Locale = i18n.defaultLocale,
): string {
  if (!gender) return "";

  return getProductDisplayLabels(locale).genderPrefix[gender] ?? "";
}

export function formatProductDetailLabel(
  product: Product,
  locale: Locale = i18n.defaultLocale,
): string {
  const genderPrefix = formatGenderPrefix(product.gender, locale).trim();

  const fragranceTypeLabel = formatFragranceTypeLabel(
    product.fragranceType,
    locale,
  );

  const noteProfile = formatNoteProfile(product.notes, locale);

  const productHeading = [genderPrefix, fragranceTypeLabel]
    .filter(Boolean)
    .join(" ");

  return [productHeading, noteProfile].filter(Boolean).join(" – ");
}

export function getIntensityLabel(locale: Locale = i18n.defaultLocale): string {
  return getProductDisplayLabels(locale).intensityLabel;
}
