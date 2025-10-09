import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, type Gender } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import GenderIntro from "@/components/shop/GenderIntro";

const GENDERS: Gender[] = ["women", "men", "unisex"];

// Pre-render de rutas válidas
export function generateStaticParams() {
  return GENDERS.map((g) => ({ gender: g }));
}

// ⚠️ Next 15: params puede ser Promise -> hay que await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: Gender }>;
}): Promise<Metadata> {
  const { gender } = await params; // <-- await
  if (!GENDERS.includes(gender)) return {};
  const name = gender[0].toUpperCase() + gender.slice(1);
  return {
    title: `${name} Fragrances | Shop`,
    description: `Shop ${name.toLowerCase()} perfumes by Arabian Fragrance.`,
  };
}

// ⚠️ Next 15: también await aquí
export default async function ShopByGenderPage({
  params,
}: {
  params: Promise<{ gender: Gender }>;
}) {
  const { gender } = await params; // <-- await
  if (!GENDERS.includes(gender)) return notFound();

  const items = PRODUCTS.filter((p) => p.gender === gender);

  return (
    <main>
      {/* 1) Intro compacto (título + copy) */}
      <GenderIntro gender={gender} />

      {/* 2) Breadcrumbs + tabs */}
      <nav className="w-full px-5 md:px-8 xl:px-12 pt-2 pb-6 text-white/80">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/" className="link-gold">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="link-gold">Shop</Link></li>
          <li>/</li>
          <li className="opacity-100 capitalize">{gender}</li>
        </ol>
        <div className="mt-3 flex gap-4 text-xs uppercase tracking-[0.18em]">
          <Link href="/shop/women"  className={`nav-link ${gender==="women"?"opacity-100":""}`}>Women</Link>
          <Link href="/shop/men"    className={`nav-link ${gender==="men"?"opacity-100":""}`}>Men</Link>
          <Link href="/shop/unisex" className={`nav-link ${gender==="unisex"?"opacity-100":""}`}>Unisex</Link>
        </div>
      </nav>

      {/* 3) Grid de productos */}
      <section className="w-full px-5 pb-5 md:px-8 xl:px-12">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

