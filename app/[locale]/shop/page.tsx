import Link from "next/link";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import NoteFilterChips from "@/components/shop/NoteFilterChips";
import { type Product } from "@/data/products";
import { normalizeProduct, type ShopifyRawProduct } from "@/lib/shopify/mapper";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

type Note = NonNullable<Product["notes"]>[number];

export default async function ShopIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ notes?: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const rawData =
    (await getShopifyProducts(locale)) as unknown as ShopifyRawProduct[];

  const PRODUCTS: Product[] = rawData.map(normalizeProduct);

  const sp = await searchParams;
  const selected = (sp.notes?.split(",").filter(Boolean) ?? []) as Note[];

  const filtered = PRODUCTS.filter((p) => {
    if (selected.length === 0) return true;

    // Verificación segura de notas
    return (
      p.notes &&
      p.notes.length > 0 &&
      selected.every((n) => p.notes!.includes(n))
    );
  });

  return (
    <main>
      <nav className="w-full px-5 pt-4 pb-2 text-xs tracking-[0.08em] text-black/60 md:px-5 xl:px-7">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="text-foreground transition hover:text-gold"
            >
              {dict.shopPage.breadcrumbHome}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{dict.shopPage.breadcrumbShop}</li>
        </ol>
      </nav>

      {/* Intro */}
      <IntroCompact
        title={dict.shopPage.title}
        count={filtered.length}
        subtitle={<>{dict.shopPage.subtitle}</>}
      />

      {/* Chips */}
      <section className="mt-6 w-full px-5 md:mt-8 md:px-5 xl:px-6">
        <NoteFilterChips
          allNotes={["Woody", "Floral", "Amber", "Spice", "Musk", "Citrus"]}
        />
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
