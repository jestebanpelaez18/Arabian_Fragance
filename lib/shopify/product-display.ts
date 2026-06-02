import { type Product } from "@/data/products";

export type ConcentrationFamily =
  | "extrait"
  | "parfum"
  | "eau_de_parfum"
  | "eau_de_toilette"
  | "eau_de_cologne"
  | "mist";

const DEFAULT_CONCENTRATION_FAMILY: ConcentrationFamily = "eau_de_parfum";
const DEFAULT_NOTE_PROFILE = "Signature Notes";

const NOTE_ADJECTIVES: Partial<
  Record<NonNullable<Product["notes"]>[number], string>
> = {
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
};

const CONCENTRATION_LABELS: Record<ConcentrationFamily, string> = {
  extrait: "Esprit de Parfum",
  parfum: "Parfum",
  eau_de_parfum: "Eau de Parfum",
  eau_de_toilette: "Eau de Toilette",
  eau_de_cologne: "Eau de Cologne",
  mist: "Body Mist",
};

const GENDER_PREFIX: Record<Product["gender"], string> = {
  women: "For Her ",
  men: "For Him ",
  unisex: "Unisex ",
};

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
