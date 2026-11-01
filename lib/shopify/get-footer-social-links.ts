import { shopifyFetch } from "@/lib/shopify/shopify";

export type FooterSocialLink = {
  label: string;
  href: string;
};

type FooterSocialOperation = {
  data?: {
    menu: {
      items: Array<{
        title: string;
        url: string | null;
      }>;
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const footerSocialQuery = `
  query FooterSocial {
    menu(handle: "footer-social") {
      items {
        title
        url
      }
    }
  }
`;

export async function getFooterSocialLinks(): Promise<FooterSocialLink[]> {
  try {
    const response = await shopifyFetch<FooterSocialOperation>({
      query: footerSocialQuery,
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["footer", "footer-social"],
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
          "Unable to load footer social links.",
      );
    }

    const menu = response.body?.data?.menu;

    if (!menu) {
      throw new Error(
        'Menu "footer-social" was not returned. Check its handle and Storefront content access.',
      );
    }

    return menu.items.flatMap((item) => {
      const label = item.title.trim();

      if (!label || !item.url) return [];

      try {
        const url = new URL(item.url);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
          return [];
        }

        return [{ label, href: url.href }];
      } catch {
        return [];
      }
    });
  } catch (error) {
    console.error("[Footer Social] Links unavailable:", error);

    return [];
  }
}
