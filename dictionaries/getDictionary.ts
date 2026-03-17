import type { Locale } from "@/i18n-config";

type Dictionary = {
  hero: {
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  dividers: {
    shop: string;
    experience: string;
    invitation: string;
    ourStory: string;
  };
  gift: {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  invitation: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    ctaLabel: string;
  };
  store: {
    welcome: string;
    shop_now: string;
  };
  product: {
    add_to_cart: string;
    sold_out: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((module) => module.default as Dictionary),
  fi: () => import("./fi.json").then((module) => module.default as Dictionary),
  sv: () => import("./sv.json").then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};