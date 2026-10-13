import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import NoteFilterChips from "@/components/shop/NoteFilterChips";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries/getDictionary";
import { SHOP_CATALOGS, isShopSlug } from "@/lib/shop/catalogs";
import {
  getAvailablePrimaryNotes,
  productMatchesAllNotes,
  sanitizeSelectedNotes,
} from "@/lib/shop/note-filters";

type ShopPageParams = {
  locale: Locale;
  slug: string;
};

export function generateStaticParams() {
  return i18n.locales.flatMap((locale) =>
    Object.keys(SHOP_CATALOGS).map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ShopPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isShopSlug(slug)) {
    notFound();
  }

  const catalog = SHOP_CATALOGS[slug];

  return {
    title: `${catalog.title} | Arabian Fragrance`,
    ...(catalog.subtitle ? { description: catalog.subtitle } : {}),
  };
}

export default async function ShopCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<ShopPageParams>;
  searchParams: Promise<{ notes?: string }>;
}) {
  const { locale, slug } = await params;

  if (!isShopSlug(slug)) {
    notFound();
  }

  const catalog = SHOP_CATALOGS[slug];
  const dict = await getDictionary(locale);
  const products = await getShopifyProducts(locale);
  const sp = await searchParams;

  const base = products.filter(catalog.matches);
  const allNotes = getAvailablePrimaryNotes(base);

  const selected = sp.notes?.split(",").filter(Boolean) ?? [];
  const activeFilters = sanitizeSelectedNotes(selected, allNotes);

  const filtered = base.filter((product) =>
    productMatchesAllNotes(product, activeFilters),
  );

  return (
    <main>
      <IntroCompact
        title={catalog.title}
        count={filtered.length}
        countLabelSingular={dict.shopPage.countLabelSingular}
        countLabelPlural={dict.shopPage.countLabelPlural}
        subtitle={catalog.subtitle}
      />

      <section className="mt-6 w-full px-5 md:mt-8 md:px-5 xl:px-6">
        <Suspense fallback={null}>
          <NoteFilterChips allNotes={allNotes} />
        </Suspense>
        <div className="mt-6 h-px w-full md:mt-8" />
      </section>

      <section className="w-full px-5 pb-12 md:px-5 xl:px-6">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} p={product} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}
