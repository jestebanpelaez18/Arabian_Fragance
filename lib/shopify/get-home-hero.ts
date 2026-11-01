import { i18n, type Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

type HomeHeroImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type HomeHeroContent = {
  title: string;
  subtitle: string;
  desktopImage: HomeHeroImage;
  mobileImage: HomeHeroImage | null;
  buttonLabel: string;
  buttonHref: string;
};

type TextField = {
  value: string;
} | null;

type ImageField = {
  reference: {
    image: HomeHeroImage | null;
  } | null;
} | null;

type HomeHeroOperation = {
  data?: {
    metaobject: {
      title: TextField;
      subtitle: TextField;
      desktopImage: ImageField;
      mobileImage: ImageField;
      buttonLabel: TextField;
      buttonLink: TextField;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const homeHeroQuery = `
  query HomeHero($language: LanguageCode!)
  @inContext(language: $language) {
    metaobject(handle: { type: "home_hero", handle: "homepage" }) {
      title: field(key: "title") {
        value
      }

      subtitle: field(key: "subtitle") {
        value
      }

      buttonLabel: field(key: "button_label") {
        value
      }

      buttonLink: field(key: "button_link") {
        value
      }

      desktopImage: field(key: "desktop_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }

      mobileImage: field(key: "mobile_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

function localizeButtonLink(rawLink: string, locale: Locale): string {
  const link = rawLink.trim();

  if (!link.startsWith("/") || link.startsWith("//") || /[\\\s]/.test(link)) {
    throw new Error(
      "Home Hero button_link must be an internal path, e.g. /shop.",
    );
  }

  const url = new URL(link, "https://storefront.invalid");
  const segments = url.pathname.split("/");

  if (i18n.locales.some((language) => language === segments[1])) {
    segments.splice(1, 1);
  }

  const pathname = segments.join("/");

  return `/${locale}${pathname === "/" ? "" : pathname}${url.search}${url.hash}`;
}

export async function getHomeHero(
  locale: Locale,
): Promise<HomeHeroContent | null> {
  try {
    const response = await shopifyFetch<HomeHeroOperation>({
      query: homeHeroQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["home", "home-hero"],
      },
    });

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length
    ) {
      throw new Error(
        response.body?.errors?.map((error) => error.message).join("; ") ||
          response.error ||
          "Unable to load Home Hero from Shopify.",
      );
    }

    const entry = response.body?.data?.metaobject;

    if (!entry) {
      throw new Error(
        "Home Hero home_hero/homepage was not returned. Check its handle, Active status and Storefront access.",
      );
    }

    const title = entry.title?.value.trim() ?? "";
    const desktopImage = entry.desktopImage?.reference?.image;
    const buttonLabel = entry.buttonLabel?.value.trim() ?? "";
    const buttonLink = entry.buttonLink?.value.trim() ?? "";

    if (!title || !desktopImage?.url || !buttonLabel || !buttonLink) {
      throw new Error(
        "Home Hero requires title, desktop_image, button_label and button_link.",
      );
    }

    return {
      title,
      subtitle: entry.subtitle?.value.trim() ?? "",
      desktopImage,
      mobileImage: entry.mobileImage?.reference?.image ?? null,
      buttonLabel,
      buttonHref: localizeButtonLink(buttonLink, locale),
    };
  } catch (error) {
    console.error("[Home Hero] Using fallback content:", error);

    return null;
  }
}
