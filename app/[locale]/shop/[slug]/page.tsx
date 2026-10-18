import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getShopifyCollection } from "@/lib/shopify/get-collection";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import ShopFilters from "@/components/shop/ShopFilters";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries/getDictionary";
import {
  COLLECTION_HANDLES,
  SHOP_CATALOGS,
  isShopSlug,
  type ShopSlug,
} from "@/lib/shop/catalogs";
import { getCatalogCountLabels } from "@/lib/shop/catalog-labels";
import {
  filterCatalog,
  type CatalogSearchParams,
} from "@/lib/shop/catalog-filters";

type ShopPageParams = {
  locale: Locale;
  slug: string;
};

// Shopify content wins; local text is the fallback.
async function getCatalogContent(locale: Locale, slug: ShopSlug) {
  const catalog = SHOP_CATALOGS[slug];

  const collection = catalog.collectionHandle
    ? await getShopifyCollection(locale, catalog.collectionHandle)
    : null;

  return {
    title: collection?.title || catalog.title,
    subtitle: collection?.description || catalog.subtitle,
  };
}

// Cards visible without scrolling (first row on desktop, two rows on mobile).
const PRIORITY_CARD_COUNT = 4;

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
  const { locale, slug } = await params;

  if (!isShopSlug(slug)) {
    notFound();
  }

  const content = await getCatalogContent(locale, slug);

  return {
    title: `${content.title} | Arabian Fragrance`,
    ...(content.subtitle ? { description: content.subtitle } : {}),
  };
}

export default async function ShopCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<ShopPageParams>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const { locale, slug } = await params;

  if (!isShopSlug(slug)) {
    notFound();
  }

  const catalog = SHOP_CATALOGS[slug];

  const [dict, products, sp, content] = await Promise.all([
    getDictionary(locale),
    getShopifyProducts(locale),
    searchParams,
    getCatalogContent(locale, slug),
  ]);

  const base = products.filter(catalog.matches);

  // A gender catalog can be refined by collection, and vice versa.
  const isGenderCatalog =
    slug === "women" || slug === "men" || slug === "unisex";
  const isCollectionCatalog = slug in COLLECTION_HANDLES;

  const { filtered, allNotes, availableGenders, availableCollections } =
    filterCatalog(base, sp, {
      allowGender: isCollectionCatalog,
      allowCollection: isGenderCatalog,
    });

  const countLabels = getCatalogCountLabels(locale, slug, dict.shopPage);

  const filterLabels = {
    ...dict.shopPage,
    ...countLabels,
  };

  return (
    <main>
      <IntroCompact title={content.title} subtitle={content.subtitle} />

      <section className="w-full px-5 py-4 xl:px-6">
        <Suspense fallback={null}>
          <ShopFilters
            allNotes={allNotes}
            availableGenders={availableGenders}
            availableCollections={availableCollections}
            count={filtered.length}
            labels={filterLabels}
          />
        </Suspense>
      </section>

      <section className="w-full px-5 pb-12 xl:px-6">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              p={product}
              locale={locale}
              priority={index < PRIORITY_CARD_COUNT}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
