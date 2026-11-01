import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type AboutPageImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type AboutPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: AboutPageImage;
  heroMobileImage: AboutPageImage | null;
  storyTitle: string;
  storyText: string;
  storyImage: AboutPageImage;
  fragrancesTitle: string;
  fragrancesText: string;
  fragrancesImage: AboutPageImage;
  closingText: string;
  closingImage: AboutPageImage;
};

type MetaobjectField = {
  key: string;
  value: string | null;
  reference: {
    image?: AboutPageImage | null;
  } | null;
};

type AboutPageOperation = {
  data?: {
    metaobject: {
      fields: MetaobjectField[];
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const aboutPageQuery = `
  query AboutPage($language: LanguageCode!)
  @inContext(language: $language) {
    metaobject(
      handle: {
        type: "about_page"
        handle: "our-story"
      }
    ) {
      fields {
        key
        value

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

export async function getAboutPage(
  locale: Locale,
): Promise<AboutPageContent | null> {
  try {
    const response = await shopifyFetch<AboutPageOperation>({
      query: aboutPageQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["about-page", "about-page:our-story"],
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
          "Unable to load About Page from Shopify.",
      );
    }

    const entry = response.body?.data?.metaobject;

    if (!entry) {
      throw new Error(
        "Metaobject about_page/our-story was not returned. Check its handle, Active status and Storefront access.",
      );
    }

    const fields = new Map(entry.fields.map((field) => [field.key, field]));

    function getText(key: string): string {
      return fields.get(key)?.value?.trim() ?? "";
    }

    function requireText(key: string): string {
      const value = getText(key);

      if (!value) {
        throw new Error(`About Page requires text in "${key}".`);
      }

      return value;
    }

    function getImage(key: string): AboutPageImage | null {
      const image = fields.get(key)?.reference?.image;

      return image?.url ? image : null;
    }

    function requireImage(key: string): AboutPageImage {
      const image = getImage(key);

      if (!image) {
        throw new Error(`About Page requires an image in "${key}".`);
      }

      return image;
    }

    return {
      heroTitle: requireText("hero_title"),
      heroSubtitle: getText("hero_subtitle"),
      heroImage: requireImage("hero_image"),
      heroMobileImage: getImage("hero_mobile_image"),
      storyTitle: requireText("story_title"),
      storyText: requireText("story_text"),
      storyImage: requireImage("story_image"),
      fragrancesTitle: requireText("fragrances_title"),
      fragrancesText: requireText("fragrances_text"),
      fragrancesImage: requireImage("fragrances_image"),
      closingText: requireText("closing_text"),
      closingImage: requireImage("closing_image"),
    };
  } catch (error) {
    console.error("[About Page] Using fallback content:", error);

    return null;
  }
}
