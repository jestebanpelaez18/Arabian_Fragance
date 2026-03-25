import type { Locale } from "@/i18n-config";

export type ShopifyLanguageCode = "EN" | "FI" | "SV";

const SHOPIFY_LANGUAGE_BY_LOCALE: Record<Locale, ShopifyLanguageCode> = {
  en: "EN",
  fi: "FI",
  sv: "SV",
};

export function getShopifyLanguageCode(locale: Locale): ShopifyLanguageCode {
  return SHOPIFY_LANGUAGE_BY_LOCALE[locale] ?? "EN";
}
