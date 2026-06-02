import { type Product } from "@/data/products";

export type ConcentrationFamily =
  | "extrait"
  | "parfum"
  | "eau_de_parfum"
  | "eau_de_toilette"
  | "eau_de_cologne"
  | "mist";

export type Locale = "en" | "es" | "fi";

const DEFAULT_CONCENTRATION_FAMILY: ConcentrationFamily = "eau_de_parfum";
const DEFAULT_NOTE_PROFILE = "Signature Notes";

const TRANSLATION_DICTIONARIES: Record<Locale, {
  noteAdjectives: Partial<Record<NonNullable<Product["notes"]>[number], string>>;
  concentrationLabels: Record<ConcentrationFamily, string>;
  genderPrefix: Record<Product["gender"], string>;
  defaultNoteProfile: string;
}> = {
  en: {
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
    defaultNoteProfile: "Signature Notes",
  },
  es: {
    noteAdjectives: {
      Amber: "Ámbar",
      Citrus: "Cítrico",
      Spice: "Especiado",
      Sweet: "Dulce",
      Floral: "Floral",
      Woody: "Amaderado",
      Musk: "Almízcaro",
      Oud: "Oud",
      Fresh: "Fresco",
      Fruity: "Afrutado",
      Leather: "Cuero",
      Vanilla: "Vainilla",
      Smoky: "Ahumado",
    },
    concentrationLabels: {
      extrait: "Espíritu de Perfume",
      parfum: "Perfume",
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      eau_de_cologne: "Eau de Colonia",
      mist: "Bruma Corporal",
    },
    genderPrefix: {
      women: "Para Ella ",
      men: "Para Él ",
      unisex: "Unisex ",
    },
    defaultNoteProfile: "Notas Características",
  },
  fi: {
    noteAdjectives: {
      Amber: "Ambra",
      Citrus: "Sitruunainen",
      Spice: "Mausteikas",
      Sweet: "Makea",
      Floral: "Kukkea",
      Woody: "Puumainen",
      Musk: "Muski",
      Oud: "Oud",
      Fresh: "Tuore",
      Fruity: "Hedelmäinen",
      Leather: "Nahkainen",
      Vanilla: "Vanilja",
      Smoky: "Savuinen",
    },
    concentrationLabels: {
      extrait: "Parfyymi-eetteri",
      parfum: "Parfyymi",
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      eau_de_cologne: "Eau de Cologne",
      mist: "Kehön Sumu",
    },
    genderPrefix: {
      women: "Hänelle ",
      men: "Hänelle ",
      unisex: "Unisex ",
    },
    defaultNoteProfile: "Signature Notes",
  },
};

function getTranslations(locale: Locale = "en") {
  return TRANSLATION_DICTIONARIES[locale] || TRANSLATION_DICTIONARIES.en;
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

export function formatConcentrationLabel(rawConcentration?: string) {
  return CONCENTRATION_LABELS[inferConcentrationFamily(rawConcentration)];
}

export function getIntensityLevel(rawConcentration?: string) {
  const family = inferConcentrationFamily(rawConcentration);

  if (family === "extrait" || family === "parfum") return 4;
  if (family === "eau_de_parfum") return 3;
  if (family === "eau_de_toilette") return 2;
  return 1;
}

export function formatNoteProfile(notes?: Product["notes"]) {
  if (!notes || notes.length === 0) return DEFAULT_NOTE_PROFILE;

  const uniqueNotes = Array.from(
    new Set(notes.map((note) => note.trim())),
  ).filter(Boolean);

  const toDescriptor = (note: string) =>
    NOTE_ADJECTIVES[note as NonNullable<Product["notes"]>[number]] ?? note;

  if (uniqueNotes.length === 0) return DEFAULT_NOTE_PROFILE;
  if (uniqueNotes.length === 1) return `${toDescriptor(uniqueNotes[0])} Notes`;

  return `${toDescriptor(uniqueNotes[0])} and ${toDescriptor(uniqueNotes[1])} Notes`;
}

export function formatGenderPrefix(gender?: Product["gender"]) {
  if (!gender) return "";
  return GENDER_PREFIX[gender] ?? "";
}

export function formatProductDetailLabel(product: Product) {
  const genderPrefix = formatGenderPrefix(product.gender);
  const concentrationLabel = formatConcentrationLabel(product.concentration);
  const noteProfile = formatNoteProfile(product.notes);

  return `${genderPrefix}${concentrationLabel} – ${noteProfile}`;
}
