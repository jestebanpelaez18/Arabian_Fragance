import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import NoteFilterChips from "@/components/shop/NoteFilterChips";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { type Product } from "@/data/products";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";
import {
  getAvailablePrimaryNotes,
  productMatchesAllNotes,
  sanitizeSelectedNotes,
} from "@/lib/shop/note-filters";

export default async function ShopIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ notes?: string; gender?: string }>;
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

  const PRODUCTS: Product[] = await getShopifyProducts(locale);
  const allNotes = getAvailablePrimaryNotes(PRODUCTS);

  const selected = sp.notes?.split(",").filter(Boolean) ?? [];
  const activeFilters = sanitizeSelectedNotes(selected, allNotes);
  const filtered = PRODUCTS.filter((product) =>
    productMatchesAllNotes(product, activeFilters),
  );

  return (
    <main>
      <Breadcrumbs
        items={[
          { label: dict.shopPage.breadcrumbHome, href: "/" },
          { label: dict.shopPage.breadcrumbShop },
        ]}
      />
      
      {/* Intro */}
      <IntroCompact
        title={dict.shopPage.title}
        count={filtered.length}
        countLabelSingular={dict.shopPage.countLabelSingular}
        countLabelPlural={dict.shopPage.countLabelPlural}
        subtitle={<>{dict.shopPage.subtitle}</>}
      />

      {/* Chips */}
      <section className="mt-6 w-full px-5 md:mt-8">
        <Suspense fallback={null}>
          <NoteFilterChips allNotes={allNotes} />
        </Suspense>
        {/* Separation between filter and products */}
        <div className="mt-6 h-px w-full md:mt-8" />
      </section>

      {/* Grid */}
      <section className="w-full px-5 pb-12 md:px-5 xl:px-6">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {/* Al ser filtered un array de Product, ProductCard no se queja */}
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
