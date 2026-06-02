import { type Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";

export type ConcentrationFamily =
  | "extrait"
  | "parfum"
  | "eau_de_parfum"
  | "eau_de_toilette"
  | "eau_de_cologne"
  | "mist";

const DEFAULT_CONCENTRATION_FAMILY: ConcentrationFamily = "eau_de_parfum";

type ProductDisplayLabels = {
  defaultNoteProfile: string;
  noteSuffix: string;
  andWord: string;
  intensityLabel: string;
  noteAdjectives: Partial<
    Record<NonNullable<Product["notes"]>[number], string>
  >;
  concentrationLabels: Record<ConcentrationFamily, string>;
  genderPrefix: Record<Product["gender"], string>;
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
      extrait: "Esprit de Parfum",
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
      Sweet: "Sot",
      Floral: "Blommig",
      Woody: "Traig",
      Musk: "Myskig",
      Oud: "Oud",
      Fresh: "Frasch",
      Fruity: "Fruktig",
      Leather: "Lader",
      Vanilla: "Vanilj",
      Smoky: "Rokig",
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
      women: "For henne ",
      men: "For honom ",
      unisex: "Unisex ",
    },
  },
};

function getProductDisplayLabels(locale: Locale = i18n.defaultLocale) {
  return (
    PRODUCT_DISPLAY_LABELS[locale] ?? PRODUCT_DISPLAY_LABELS[i18n.defaultLocale]
  );
}

function normalizeConcentration(rawConcentration?: string) {
  return rawConcentration?.trim().toLowerCase() ?? "";
}

function extractConcentrationPercent(rawConcentration?: string) {
  const normalized = normalizeConcentration(rawConcentration);
  if (!normalized) return null;

  const percentageMatch = normalized.match(/(\d+(?:[.,]\d+)?)/);
  if (!percentageMatch) return null;

  const parsed = Number(percentageMatch[1].replace(",", "."));
  return Number.isNaN(parsed) ? null : parsed;
}

function getFamilyFromPercent(percent: number): ConcentrationFamily {
  if (percent >= 30) return "extrait";
  if (percent >= 22) return "parfum";
  if (percent >= 15) return "eau_de_parfum";
  if (percent >= 8) return "eau_de_toilette";
  if (percent >= 3) return "eau_de_cologne";
  return "mist";
}

export function inferConcentrationFamily(
  rawConcentration?: string,
): ConcentrationFamily {
  const normalized = normalizeConcentration(rawConcentration);
  if (!normalized) return DEFAULT_CONCENTRATION_FAMILY;

  const explicitPercent = extractConcentrationPercent(normalized);
  if (explicitPercent !== null) {
    return getFamilyFromPercent(explicitPercent);
  }

  if (normalized.includes("extrait")) return "extrait";
  if (normalized.includes("eau de parfum") || normalized.includes("edp")) {
    return "eau_de_parfum";
  }
  if (normalized.includes("eau de toilette") || normalized.includes("edt")) {
    return "eau_de_toilette";
  }
  if (
    normalized.includes("eau de cologne") ||
    normalized.includes("edc") ||
    normalized.includes("cologne")
  ) {
    return "eau_de_cologne";
  }
  if (normalized.includes("parfum") || normalized.includes("perfume")) {
    return "parfum";
  }
  if (normalized.includes("mist") || normalized.includes("splash")) {
    return "mist";
  }

  return DEFAULT_CONCENTRATION_FAMILY;
}

export function formatConcentrationLabel(
  rawConcentration?: string,
  locale: Locale = i18n.defaultLocale,
) {
  return getProductDisplayLabels(locale).concentrationLabels[
    inferConcentrationFamily(rawConcentration)
  ];
}

export function getIntensityLevel(rawConcentration?: string) {
  const family = inferConcentrationFamily(rawConcentration);

  if (family === "extrait" || family === "parfum") return 4;
  if (family === "eau_de_parfum") return 3;
  if (family === "eau_de_toilette") return 2;
  return 1;
}

export function formatNoteProfile(
  notes?: Product["notes"],
  locale: Locale = i18n.defaultLocale,
) {
  const labels = getProductDisplayLabels(locale);

  if (!notes || notes.length === 0) return labels.defaultNoteProfile;

  const uniqueNotes = Array.from(
    new Set(notes.map((note) => note.trim())),
  ).filter(Boolean);

  const toDescriptor = (note: string) =>
    labels.noteAdjectives[note as NonNullable<Product["notes"]>[number]] ??
    note;

  if (uniqueNotes.length === 0) return labels.defaultNoteProfile;
  if (uniqueNotes.length === 1) {
    return `${toDescriptor(uniqueNotes[0])} ${labels.noteSuffix}`;
  }

  return `${toDescriptor(uniqueNotes[0])} ${labels.andWord} ${toDescriptor(uniqueNotes[1])} ${labels.noteSuffix}`;
}

export function formatGenderPrefix(
  gender?: Product["gender"],
  locale: Locale = i18n.defaultLocale,
) {
  if (!gender) return "";
  return getProductDisplayLabels(locale).genderPrefix[gender] ?? "";
}

export function formatProductDetailLabel(
  product: Product,
  locale: Locale = i18n.defaultLocale,
) {
  const genderPrefix = formatGenderPrefix(product.gender, locale);
  const concentrationLabel = formatConcentrationLabel(
    product.concentration,
    locale,
  );
  const noteProfile = formatNoteProfile(product.notes, locale);

  return `${genderPrefix}${concentrationLabel} – ${noteProfile}`;
}

export function getIntensityLabel(locale: Locale = i18n.defaultLocale) {
  return getProductDisplayLabels(locale).intensityLabel;
}
