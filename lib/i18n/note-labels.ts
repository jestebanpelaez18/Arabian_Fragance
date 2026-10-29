import type { Note } from "@/data/products";
import type { Locale } from "@/i18n-config";

const NOTE_LABELS = {
  en: {
    Woody: "Woody",
    Floral: "Floral",
    Amber: "Amber",
    Spice: "Spicy",
    Musk: "Musk",
    Citrus: "Citrus",
    Sweet: "Sweet",
    Fresh: "Fresh",
    Fruity: "Fruity",
    Aquatic: "Aquatic",
    Gourmand: "Gourmand",
    Earthy: "Earthy",
    Herbal: "Herbal",
    Powdery: "Powdery",
    Leather: "Leather",
    Tobacco: "Tobacco",
    Vanilla: "Vanilla",
    Oud: "Oud",
    Smoky: "Smoky",
  },
  fi: {
    Woody: "Puinen",
    Floral: "Kukkainen",
    Amber: "Ambra",
    Spice: "Mausteinen",
    Musk: "Myski",
    Citrus: "Sitrus",
    Sweet: "Makea",
    Fresh: "Raikas",
    Fruity: "Hedelmäinen",
    Aquatic: "Vesimäinen",
    Gourmand: "Gourmand",
    Earthy: "Maanläheinen",
    Herbal: "Yrttinen",
    Powdery: "Puuterinen",
    Leather: "Nahka",
    Tobacco: "Tupakka",
    Vanilla: "Vanilja",
    Oud: "Oud",
    Smoky: "Savuinen",
  },
  sv: {
    Woody: "Träig",
    Floral: "Blommig",
    Amber: "Ambra",
    Spice: "Kryddig",
    Musk: "Mysk",
    Citrus: "Citrus",
    Sweet: "Söt",
    Fresh: "Frisk",
    Fruity: "Fruktig",
    Aquatic: "Akvatisk",
    Gourmand: "Gourmand",
    Earthy: "Jordig",
    Herbal: "Örtig",
    Powdery: "Pudrig",
    Leather: "Läder",
    Tobacco: "Tobak",
    Vanilla: "Vanilj",
    Oud: "Oud",
    Smoky: "Rökig",
  },
} satisfies Record<Locale, Record<Note, string>>;

export function getNoteLabel(note: string, locale: Locale): string {
  const labels: Readonly<Record<string, string>> = NOTE_LABELS[locale];

  return labels[note] ?? note;
}
