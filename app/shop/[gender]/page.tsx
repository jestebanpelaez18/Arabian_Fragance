import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getShopifyProducts } from "@/lib/shopify/get-products"; 
import ProductCard from "@/components/shop/ProductCard";
import IntroCompact from "@/components/shop/IntroCompact";
import NoteFilterChips from "@/components/shop/NoteFilterChips";

type Gender = "women" | "men" | "unisex";
type Note = string;

const GENDERS: Gender[] = ["women", "men", "unisex"];
const COPY: Record<Gender, string> = {
  women:
    "Luminous florals with oriental warmth. Compositions crafted for elegance, sensuality and a lasting trail—unmistakably Arabian.",
  men: "Smoky woods, spice and amber facets in measured balance. Distinctive signatures designed for modern understatement.",
  unisex:
    "Refined, versatile compositions: resinous depth, airy florals and citrus lift—contemporary scents made to be shared.",
};

export function generateStaticParams() {
  return GENDERS.map((g) => ({ gender: g }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: Gender }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!GENDERS.includes(gender as Gender)) return {};
  
  const name = gender[0].toUpperCase() + gender.slice(1);
  return {
    title: `${name} Fragrances | Shop`,
    description: `Shop ${name.toLowerCase()} perfumes by Arabian Fragrance.`,
  };
}

export default async function ShopByGenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ gender: Gender }>;
  searchParams: Promise<{ notes?: string }>;
}) {
  const { gender } = await params;
  if (!GENDERS.includes(gender)) return notFound();

  const PRODUCTS = await getShopifyProducts();

  const sp = await searchParams;
  const selected = (sp.notes?.split(",").filter(Boolean) ?? []) as Note[];

  const base = PRODUCTS.filter((p: any) => p.gender === gender);
  
  const filtered = base.filter((p: any) =>
    selected.length === 0
      ? true
      : (p.notes ?? []).length > 0 &&
        selected.every((n: string) => (p.notes ?? []).includes(n)),
  );

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="w-full px-5 pt-4 pb-2 text-xs tracking-[0.08em] text-black/60 md:px-5 xl:px-6">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="text-foreground transition hover:text-[var(--gold)]"
            >
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/shop"
              className="text-foreground transition hover:text-[var(--gold)]"
            >
              Shop
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{gender}</li>
        </ol>
      </nav>

      {/* Intro */}
      <IntroCompact
        title={`${gender.toUpperCase()} FRAGRANCES`}
        count={filtered.length}
        subtitle={<>{COPY[gender]}</>}
      />

      <section className="mt-6 w-full px-5 md:mt-8 md:px-5 xl:px-6">
        <NoteFilterChips
          allNotes={["Woody", "Floral", "Amber", "Spice", "Musk", "Citrus"]}
        />
        <div className="mt-6 h-px w-full md:mt-8" />
      </section>

      {/* Grid */}
      <section className="w-full px-5 pb-12 md:px-5 xl:px-6">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {/* Añadimos el tipo 'any' o 'Product' a 'p' para evitar quejas de TS si no tienes la interfaz global */}
          {filtered.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}