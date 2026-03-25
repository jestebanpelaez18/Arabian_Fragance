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
  aboutPage: {
    heroTitle: string;
    heroSubtitle: string;
    discoverDivider: string;
    storyTitle: string;
    storyDescriptions: string[];
    quote: string;
    experienceDivider: string;
    perfumesTitle: string;
    perfumesDescriptions: string[];
    fullImageParagraph: string;
  };
  shopPage: {
    breadcrumbHome: string;
    breadcrumbShop: string;
    title: string;
    subtitle: string;
  };
  showroomPage: {
    dividerFinland: string;
    dividerExperience: string;
    dividerBookExperience: string;
    location: {
      city: string;
      description: string[];
      hours: string[];
      address: string[];
      imageAlt: string;
    };
    experienceTitle: string;
    services: Array<{
      title: string;
      description: string;
    }>;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
  };
  checkout: {
    cancelTitle: string;
    cancelDescription: string;
    reviewBag: string;
    paymentReceived: string;
    sessionNotFound: string;
    thankYou: string;
    orderConfirmedSuffix: string;
    confirmationSentPrefix: string;
    yourEmailFallback: string;
    summary: string;
    productFallback: string;
    total: string;
    continueShopping: string;
  };
  contactPage: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    customerCareTitle: string;
    customerCareDescription: string;
    headquartersTitle: string;
    headquartersCityCountry: string;
    headquartersAddress: string;
    pressWholesaleTitle: string;
    pressWholesaleDescription: string;
    pressWholesaleCta: string;
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
