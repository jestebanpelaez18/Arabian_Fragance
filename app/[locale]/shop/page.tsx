import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getShopifyCollection } from "@/lib/shopify/get-collection";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import ShopFilters from "@/components/shop/ShopFilters";
import { isPerfume, SHOP_INDEX_COLLECTION_HANDLE } from "@/lib/shop/catalogs";
import { getDictionary } from "@/dictionaries/getDictionary";
import ShopEmptyState from "@/components/shop/ShopEmptyState";
import type { Locale } from "@/i18n-config";
import {
  filterCatalog,
  type CatalogSearchParams,
} from "@/lib/shop/catalog-filters";

// Cards visible without scrolling (first row on desktop, two rows on mobile).
const PRIORITY_CARD_COUNT = 4;

export default async function ShopIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<CatalogSearchParams & { gender?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  const legacyGender = sp.gender?.toLowerCase();

  if (
    legacyGender === "women" ||
    legacyGender === "men" ||
    legacyGender === "unisex"
  ) {
    redirect(`/${locale}/shop/${legacyGender}`);
  }

  const [dict, products, collection] = await Promise.all([
    getDictionary(locale),
    getShopifyProducts(locale),
    getShopifyCollection(locale, SHOP_INDEX_COLLECTION_HANDLE),
  ]);

  const base = products.filter(isPerfume);

  const { filtered, allNotes, availableGenders, availableCollections } =
    filterCatalog(base, sp, {
      allowGender: true,
      allowCollection: true,
    });

  const title = collection?.title || dict.shopPage.title;

  const subtitle = collection?.description || dict.shopPage.subtitle;

  return (
    <main>
      <IntroCompact title={title} subtitle={subtitle} />

      <section className="w-full px-5 py-4 xl:px-6">
        <Suspense fallback={null}>
          <ShopFilters
            allNotes={allNotes}
            availableGenders={availableGenders}
            availableCollections={availableCollections}
            count={filtered.length}
            labels={dict.shopPage}
          />
        </Suspense>
      </section>

      <section className="w-full px-5 pb-12 xl:px-6">
        {filtered.length === 0 ? (
          <ShopEmptyState
            title={dict.shopPage.emptyTitle}
            description={dict.shopPage.emptyDescription}
          />
        ) : (
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
        )}
      </section>
    </main>
  );
}
