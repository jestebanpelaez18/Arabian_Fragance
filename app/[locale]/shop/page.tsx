import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import ShopFilters from "@/components/shop/ShopFilters";
import { isPerfume } from "@/lib/shop/catalogs";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";
import {
  filterCatalog,
  type CatalogSearchParams,
} from "@/lib/shop/catalog-filters";

export default async function ShopIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<CatalogSearchParams & { gender?: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const sp = await searchParams;

  const legacyGender = sp.gender?.toLowerCase();

  if (
    legacyGender === "women" ||
    legacyGender === "men" ||
    legacyGender === "unisex"
  ) {
    redirect(`/${locale}/shop/${legacyGender}`);
  }

  const products = await getShopifyProducts(locale);
  const base = products.filter(isPerfume);

  const { filtered, allNotes, availableGenders, availableCollections } =
    filterCatalog(base, sp, {
      allowGender: true,
      allowCollection: true,
    });

  return (
    <main>
      <IntroCompact
        title={dict.shopPage.title}
        subtitle={dict.shopPage.subtitle}
      />

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
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} p={product} locale={locale} />
          ))}
        </div>
      </section>
    </main>
  );
}
