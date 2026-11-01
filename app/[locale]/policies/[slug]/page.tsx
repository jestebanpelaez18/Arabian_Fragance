import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/shopify";
import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { sanitizeShopifyHtml } from "@/lib/sanitize-shopify-html";

interface Policy {
  id: string;
  title: string;
  body: string;
}

type ShopPolicies = {
  privacyPolicy: Policy | null;
  termsOfService: Policy | null;
  refundPolicy: Policy | null;
  shippingPolicy: Policy | null;
};

type PolicyOperation = {
  data?: {
    shop?: ShopPolicies;
    page?: Policy | null;
  };
  errors?: Array<{ message: string }>;
};

interface PageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

const POLICY_MAP: Record<string, keyof ShopPolicies> = {
  "privacy-policy": "privacyPolicy",
  "terms-conditions": "termsOfService",
  "refund-policy": "refundPolicy",
  "shipping-policy": "shippingPolicy",
};

const POLICY_SLUGS = [...Object.keys(POLICY_MAP), "cookies-policy"];

const policiesQuery = `
  query ShopPolicies($language: LanguageCode!)
  @inContext(language: $language) {
    shop {
      privacyPolicy {
        id
        title
        body
      }

      termsOfService {
        id
        title
        body
      }

      refundPolicy {
        id
        title
        body
      }

      shippingPolicy {
        id
        title
        body
      }
    }
  }
`;

const cookiesPageQuery = `
  query CookiesPolicy($language: LanguageCode!)
  @inContext(language: $language) {
    page(handle: "cookies-policy") {
      id
      title
      body
    }
  }
`;

const getPolicy = cache(
  async (slug: string, locale: Locale): Promise<Policy | null> => {
    if (!POLICY_SLUGS.includes(slug)) {
      return null;
    }

    const isCookiesPolicy = slug === "cookies-policy";

    const response = await shopifyFetch<PolicyOperation>({
      query: isCookiesPolicy ? cookiesPageQuery : policiesQuery,
      variables: {
        language: getShopifyLanguageCode(locale),
      },
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["policies", `policy:${slug}`],
      },
    });

    if (
      response.error ||
      response.status >= 400 ||
      response.body?.errors?.length ||
      !response.body?.data
    ) {
      throw new Error(
        response.body?.errors?.map((error) => error.message).join("; ") ||
          response.error ||
          `Unable to load policy "${slug}" from Shopify.`,
      );
    }

    const data = response.body.data;

    const policy = isCookiesPolicy ? data.page : data.shop?.[POLICY_MAP[slug]];

    if (!policy?.title.trim() || !policy.body.trim()) {
      return null;
    }

    return policy;
  },
);

export function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const policy = await getPolicy(slug, locale);

  if (!policy) {
    return {};
  }

  return {
    title: policy.title,
  };
}

export default async function PolicyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const policy = await getPolicy(slug, locale);

  if (!policy) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground w-full">
      <article className="mx-auto px-5 pt-12 pb-16 md:px-6 md:pt-16 md:pb-24">
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <h1 className="font-magister text-[30px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[44px]">
            {policy.title}
          </h1>

          <div className="bg-gold/50 mx-auto mt-6 h-px w-12" />
        </header>

        <div
          className="policy-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeShopifyHtml(policy.body),
          }}
        />
      </article>
    </div>
  );
}
