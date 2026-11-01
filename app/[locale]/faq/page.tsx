import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n-config";
import { shopifyFetch } from "@/lib/shopify/shopify";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";
import { sanitizeShopifyHtml } from "@/lib/sanitize-shopify-html";

interface FaqPage {
  id: string;
  title: string;
  body: string;
}

interface FaqOperation {
  data?: {
    page: FaqPage | null;
  };
  errors?: Array<{
    message: string;
  }>;
}

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const faqQuery = `
  query FaqPage($language: LanguageCode!)
  @inContext(language: $language) {
    page(handle: "faq") {
      id
      title
      body
    }
  }
`;

const getFaqPage = cache(async (locale: Locale): Promise<FaqPage | null> => {
  const response = await shopifyFetch<FaqOperation>({
    query: faqQuery,
    variables: {
      language: getShopifyLanguageCode(locale),
    },
    next: {
      revalidate: 300,
      tags: ["pages", "faq"],
    },
  });

  const { body } = response;

  if (
    response.error ||
    response.status >= 400 ||
    body?.errors?.length ||
    !body?.data
  ) {
    console.error(
      "Could not load the FAQ page from Shopify.",
      response.error ?? body?.errors,
    );

    throw new Error("Could not load the FAQ page.");
  }

  const page = body.data.page;

  if (!page?.title.trim() || !page.body.trim()) {
    return null;
  }

  return page;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const page = await getFaqPage(locale);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  const page = await getFaqPage(locale);

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground w-full">
      <article className="mx-auto px-5 pt-12 pb-16 md:px-6 md:pt-16 md:pb-24">
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <h1 className="font-magister text-[30px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[44px]">
            {page.title}
          </h1>

          <div className="bg-gold/50 mx-auto mt-6 h-px w-12" />
        </header>

        <div
          className="policy-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeShopifyHtml(page.body),
          }}
        />
      </article>
    </div>
  );
}
