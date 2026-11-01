import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type ShowroomPageImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShowroomPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: ShowroomPageImage;
  heroMobileImage: ShowroomPageImage | null;
  locationTitle: string;
  locationText: string;
  locationImage: ShowroomPageImage;
  address: string;
  openingHours: string;
  phone: string;
  email: string;
};

type MetaobjectField = {
  key: string;
  value: string | null;
  reference: {
    image?: ShowroomPageImage | null;
  } | null;
};

type ShowroomPageOperation = {
  data?: {
    metaobject: {
      fields: MetaobjectField[];
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const showroomPageQuery = `
  query ShowroomPage($language: LanguageCode!)
  @inContext(language: $language) {
    metaobject(
      handle: {
        type: "showroom_page"
        handle: "helsinki"
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

export async function getShowroomPage(
  locale: Locale,
): Promise<ShowroomPageContent | null> {
  try {
    const response = await shopifyFetch<ShowroomPageOperation>({
      query: showroomPageQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["showroom-page", "showroom-page:helsinki"],
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
          "Unable to load Showroom Page from Shopify.",
      );
    }

    const entry = response.body?.data?.metaobject;

    if (!entry) {
      throw new Error(
        "Metaobject showroom_page/helsinki was not returned. Check its handle, Active status and Storefront access.",
      );
    }

    const fields = new Map(entry.fields.map((field) => [field.key, field]));

    function getText(key: string): string {
      return fields.get(key)?.value?.trim() ?? "";
    }

    function requireText(key: string): string {
      const value = getText(key);

      if (!value) {
        throw new Error(`Showroom Page requires text in "${key}".`);
      }

      return value;
    }

    function getImage(key: string): ShowroomPageImage | null {
      const image = fields.get(key)?.reference?.image;

      return image?.url ? image : null;
    }

    function requireImage(key: string): ShowroomPageImage {
      const image = getImage(key);

      if (!image) {
        throw new Error(`Showroom Page requires an image in "${key}".`);
      }

      return image;
    }

    return {
      heroTitle: requireText("hero_title"),
      heroSubtitle: getText("hero_subtitle"),
      heroImage: requireImage("hero_image"),
      heroMobileImage: getImage("hero_mobile_image"),
      locationTitle: requireText("location_title"),
      locationText: getText("location_text"),
      locationImage: requireImage("location_image"),
      address: getText("address"),
      openingHours: getText("opening_hours"),
      phone: getText("phone"),
      email: getText("email"),
    };
  } catch (error) {
    console.error("[Showroom Page] Using fallback content:", error);

    return null;
  }
}
