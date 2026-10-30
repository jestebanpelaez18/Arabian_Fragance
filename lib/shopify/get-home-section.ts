import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { shopifyFetch } from "@/lib/shopify/shopify";

export type HomeSectionContent = {
  title: string;
  description: string;
};

type TextField = {
  value: string;
} | null;

type HomeSectionOperation = {
  data?: {
    metaobject: {
      title: TextField;
      description: TextField;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const homeSectionQuery = `
  query HomeSection(
    $language: LanguageCode!
    $handle: String!
  ) @inContext(language: $language) {
    metaobject(handle: { type: "home_section", handle: $handle }) {
      title: field(key: "title") {
        value
      }

      description: field(key: "description") {
        value
      }
    }
  }
`;

export async function getHomeSection(
  locale: Locale,
  handle: string,
): Promise<HomeSectionContent | null> {
  try {
    const response = await shopifyFetch<HomeSectionOperation>({
      query: homeSectionQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
        handle,
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["home", "home-sections", `home-section:${handle}`],
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
          "Unable to load homepage section from Shopify.",
      );
    }

    const entry = response.body?.data?.metaobject;

    if (!entry) {
      throw new Error(
        `Home section home_section/${handle} was not returned. Check its handle, Active status and Storefront access.`,
      );
    }

    const title = entry.title?.value.trim() ?? "";

    if (!title) {
      throw new Error(`Home section ${handle} requires a title.`);
    }

    return {
      title,
      description: entry.description?.value.trim() ?? "",
    };
  } catch (error) {
    console.error(`[Home Section: ${handle}] Using fallback content:`, error);

    return null;
  }
}
