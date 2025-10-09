// app/shop/page.tsx
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import ShopIntro from "@/components/shop/ShopIntro";

export const metadata = {
  title: "Shop | Arabian Fragrance",
  description: "Shop perfumes by gender.",
};

export default function ShopIndexPage() {
  return (
    <main>
      {/* Breadcrumbs + tabs */}
      <nav className="w-full px-5 md:px-8 xl:px-12 pt-6 text-white/80">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/" className="link-gold">Home</Link></li>
          <li>/</li>
          <li className="opacity-100">Shop</li>
        </ol>
        {/* <div className="mt-3 flex gap-4 text-xs uppercase tracking-[0.18em]">
          <Link href="/shop/women"  className="nav-link">Women</Link>
          <Link href="/shop/men"    className="nav-link">Men</Link>
          <Link href="/shop/unisex" className="nav-link">Unisex</Link>
        </div> */}
      </nav>

      {/* Intro compacto para Shop All */}
      <ShopIntro />

      {/* Grid All */}
      <section className="w-full px-5 md:px-8 xl:px-12 pb-12">
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-16 md:gap-x-5 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}


