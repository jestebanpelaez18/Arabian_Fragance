import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductActions from "@/components/product/ProductActions"; // ⬅️ nuevo

type Params = { slug: string };

export function generateStaticParams() {
  return PRODUCTS.filter(p => p.status !== "draft").map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find(x => x.slug === slug);
  if (!p) return {};
  const title = `${p.name} | Arabian Fragrance`;
  const desc = `Discover ${p.name}, a ${p.gender} fragrance. Notes: ${(p.notes ?? []).join(", ") || "—"}.`;
  const img = p.image || p.images?.[0] || "/placeholder.png";
  return {
    title,
    description: desc,
    openGraph: {
      type: "website",
      title,
      description: desc,
      images: [img],
      siteName: "Arabian Fragrance",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [img],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = PRODUCTS.find(x => x.slug === slug);
  if (!p) return notFound();

  const img = p.images?.[0] || p.image || "/placeholder.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: (p.images && p.images.length ? p.images : [img]),
    description: `Notes: ${(p.notes ?? []).join(", ") || ""}`.trim(),
    sku: p.sku ?? p.id,
    brand: { "@type": "Brand", name: "Arabian Fragrance" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: p.price,
      availability: (p.stock ?? 0) > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
      url: `https://your-domain.com/product/${p.slug}`,
      itemCondition: "http://schema.org/NewCondition",
    },
  };

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="w-full px-5 pt-4 pb-2 text-xs tracking-[0.08em] text-white/60 md:px-5 xl:px-7">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="text-foreground hover:text-[var(--gold)] transition">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="text-foreground hover:text-[var(--gold)] transition">Shop</Link></li>
          <li>/</li>
          <li className="text-foreground">{p.name}</li>
        </ol>
      </nav>

      {/* Layout PDP */}
      <section className="grid grid-cols-1 gap-8 px-5 py-10 md:grid-cols-2 md:px-8 xl:px-12">
        {/* Galería */}
        <div className="order-2 md:order-1">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white ring-1 ring-black/10">
            <Image
              src={img}
              alt={p.name}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-contain p-8 md:p-10 lg:p-12"
              priority
            />
          </div>

          {p.images && p.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {p.images.slice(0, 4).map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-sm bg-white ring-1 ring-black/10">
                  <Image src={src} alt={`${p.name} ${i + 1}`} fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info + CTA (CTA en Client Component) */}
        <div className="order-1 md:order-2 flex flex-col">
          <span className="mb-3 text-xs uppercase tracking-[0.18em] text-white/70">{p.gender}</span>
          <h1 className="font-playfair-display text-3xl tracking-[-0.01em] text-foreground md:text-4xl">{p.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl text-foreground">{p.price} EUR</span>
            {p.volumeMl && <span className="text-sm text-[var(--muted)]">/ {p.volumeMl} ml</span>}
          </div>

          {p.notes?.length ? (
            <div className="mt-6">
              <h3 className="text-sm uppercase tracking-[0.18em] text-white/70">Notes</h3>
              <p className="font-garamond mt-2 text-lg text-[var(--muted)]">{p.notes.join(" · ")}</p>
            </div>
          ) : null}

          {/* ⬇️ Acciones interactivas en Client Component */}
          <ProductActions
            product={{ id: p.id, name: p.name, price: p.price, image: img }}
          />

          <ul className="mt-8 space-y-2 text-sm text-white/70">
            <li>• VAT included. Ships from Helsinki.</li>
            <li>• Free shipping on EU orders over €80.</li>
            <li>• 14-day returns.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
