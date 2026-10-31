import { i18n, type Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type HomePromotionContent = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

type TextField = {
  value: string;
} | null;

type HomePromotionOperation = {
  data?: {
    metaobject: {
      title: TextField;
      description: TextField;
      buttonLabel: TextField;
      buttonLink: TextField;
      image: {
        reference: {
          image?: {
            url: string;
            altText: string | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const homePromotionQuery = `
  query HomePromotion(
    $language: LanguageCode!
    $handle: String!
  ) @inContext(language: $language) {
    metaobject(
      handle: {
        type: "home_promotion"
        handle: $handle
      }
    ) {
      title: field(key: "title") {
        value
      }

      description: field(key: "description") {
        value
      }

      buttonLabel: field(key: "button_label") {
        value
      }

      buttonLink: field(key: "button_link") {
        value
      }

      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

function localizeInternalPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[\\\s]/.test(path)) {
    throw new Error(
      "Home promotion button_link must be an internal path, such as /shop/discovery.",
    );
  }

  const url = new URL(path, "https://storefront.invalid");
  const segments = url.pathname.split("/");
  const existingLocale = i18n.locales.find(
    (language) => segments[1] === language,
  );

  if (existingLocale) {
    segments.splice(1, 1);
  }

  const pathname = segments.join("/");

  return `/${locale}${pathname === "/" ? "" : pathname}${url.search}${url.hash}`;
}

export async function getHomePromotion(
  locale: Locale,
  handle: string,
): Promise<HomePromotionContent | null> {
  try {
    const response = await shopifyFetch<HomePromotionOperation>({
      query: homePromotionQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        handle,
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["home", "home-promotions", `home-promotion:${handle}`],
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
          "Unable to load homepage promotion from Shopify.",
      );
    }

    const entry = response.body?.data?.metaobject;

    if (!entry) {
      throw new Error(
        `Home promotion home_promotion/${handle} was not returned. Check its handle, Active status and Storefront access.`,
      );
    }

    const title = entry.title?.value.trim() ?? "";
    const description = entry.description?.value.trim() ?? "";
    const ctaLabel = entry.buttonLabel?.value.trim() ?? "";
    const buttonLink = entry.buttonLink?.value.trim() ?? "";
    const image = entry.image?.reference?.image;

    if (!title || !ctaLabel || !buttonLink || !image?.url) {
      throw new Error(
        `Home promotion ${handle} requires a title, image, button label and button link.`,
      );
    }

    return {
      title,
      description,
      imageSrc: image.url,
      imageAlt: image.altText ?? "",
      ctaLabel,
      ctaHref: localizeInternalPath(buttonLink, locale),
    };
  } catch (error) {
    console.error(`[Home Promotion: ${handle}] Using fallback content:`, error);

    return null;
  }
}
