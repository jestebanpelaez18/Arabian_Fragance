import type { Locale } from "@/i18n-config";
import type { ShopSlug } from "@/lib/shop/catalogs";

type CountLabels = {
  countLabelSingular: string;
  countLabelPlural: string;
};

type CategoryCountLabels = {
  attar: CountLabels;
  bodyMist: CountLabels;
  discovery: CountLabels;
};

const CATEGORY_COUNT_LABELS: Record<Locale, CategoryCountLabels> = {
  en: {
    attar: {
      countLabelSingular: "Attar",
      countLabelPlural: "Attars",
    },
    bodyMist: {
      countLabelSingular: "Body Mist",
      countLabelPlural: "Body Mists",
    },
    discovery: {
      countLabelSingular: "Discovery Set",
      countLabelPlural: "Discovery Sets",
    },
  },
  fi: {
    attar: {
      countLabelSingular: "Tuoksuöljy",
      countLabelPlural: "Tuoksuöljyä",
    },
    bodyMist: {
      countLabelSingular: "Vartalosuihke",
      countLabelPlural: "Vartalosuihketta",
    },
    discovery: {
      countLabelSingular: "Tutustumissetti",
      countLabelPlural: "Tutustumissettiä",
    },
  },
  sv: {
    attar: {
      countLabelSingular: "Parfymolja",
      countLabelPlural: "Parfymoljor",
    },
    bodyMist: {
      countLabelSingular: "Body Mist",
      countLabelPlural: "Body Mists",
    },
    discovery: {
      countLabelSingular: "Discovery Set",
      countLabelPlural: "Discovery Sets",
    },
  },
};

export function getCatalogCountLabels(
  locale: Locale,
  slug: ShopSlug,
  defaultLabels: CountLabels,
): CountLabels {
  const labels = CATEGORY_COUNT_LABELS[locale];

  switch (slug) {
    case "tolas":
      return labels.attar;

    case "body-mists":
      return labels.bodyMist;

    case "discovery":
      return labels.discovery;

    default:
      return defaultLabels;
  }
}
