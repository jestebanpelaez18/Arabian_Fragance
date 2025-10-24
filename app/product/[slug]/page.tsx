import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductActions from "@/components/product/ProductActions";
import PdpTabs from "@/components/product/PdpTabs";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import Script from "next/script";
import { productJsonLd } from "@/lib/seo/jsonld";

type Params = { slug: string };

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.status !== "draft").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.name} | Arabian Fragrance`;
  const desc =
    p.description ??
    `Discover ${p.name}, a ${p.gender} fragrance. Notes: ${(p.notes ?? []).join(" · ") || "—"}.`;
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

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return notFound();

  const img = p.images?.[0] || p.image || "/placeholder.png";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const productUrl = `${siteUrl}/product/${slug}`;

  const jsonLd = productJsonLd(p, { siteUrl, productUrl });

  return (
    <main className="bg-background text-foreground">
      <Script
        id="jsonld-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1600px] px-3 md:px-6 lg:px-8">
        <nav className="pt-6 pb-4 text-xs tracking-[0.08em] text-white/60">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-[var(--gold)]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/shop"
                className="transition hover:text-[var(--gold)]"
              >
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{p.name}</li>
          </ol>
        </nav>
      </div>

      {/* Layout: imagen 7/12, panel 5/12 */}
      <section className="mx-auto w-full max-w-[1600px] px-3 pb-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* IZQUIERDA: imagen grande, sin marcos */}
          <div className="md:col-span-7">
            <div className="relative h-[min(88vh,980px)] w-full">
              <Image
                src={img}
                alt={p.name}
                fill
                className="object-contain object-left"
                sizes="(min-width:1536px) 900px, (min-width:1024px) 58vw, 100vw"
                quality={96}
                priority
              />
            </div>
          </div>

          {/* DERECHA: panel de compra */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <header className="border-b border-white/10 pb-8">
                <h1 className="font-playfair-display text-[42px] leading-[1.08] md:text-[56px]">
                  {p.name}
                </h1>
                <p className="mt-3 text-sm tracking-[0.18em] text-white/70 uppercase">
                  {p.notes?.length ? "  " + p.notes.join(" | ") : ""}
                </p>
              </header>

              {/* Precio + ficha alineada */}
              <section className="pt-10">
                <div className="text-[34px] font-light tracking-tight md:text-[38px]">
                  {p.price} EUR
                </div>
                {p.volumeMl && (
                  <div className="mt-1.5 text-sm text-white/70">
                    / {p.volumeMl} ml
                  </div>
                )}

                <dl className="mt-10 grid grid-cols-[180px_minmax(0,1fr)] gap-x-10 gap-y-6 text-[15px]">
                  <div className="contents">
                    <dt className="tracking-[0.18em] whitespace-nowrap text-white/60 uppercase">
                      Concentration
                    </dt>
                    <dd className="leading-7 text-white/90">Parfum</dd>
                  </div>

                  <div className="contents">
                    <dt className="tracking-[0.18em] whitespace-nowrap text-white/60 uppercase">
                      Size
                    </dt>
                    <dd className="leading-7 text-white/90">
                      <span className="inline-block border-b border-white/80 pb-[2px]">
                        {p.volumeMl ?? 100} ml
                      </span>
                    </dd>
                  </div>

                  <div className="contents">
                    <dt className="tracking-[0.18em] whitespace-nowrap text-white/60 uppercase">
                      Dispatch
                    </dt>
                    <dd className="leading-7 text-[var(--gold)]/90">
                      Same-day dispatch
                    </dd>
                  </div>
                </dl>

                {/* Tus botones (ProductActions) estilizados desde fuera */}
                <div className="/* elimina cualquier borde/sombra/padding del contenedor interno */ /* botones/links con look premium */ /* oculta cualquier link tipo “View Bag” si fuese <a> */ /* si el componente renderiza 2 botones, oculta el 2º */ mt-10 [&_a]:hidden [&_button]:h-14 [&_button]:w-full [&_button]:rounded-full [&_button]:bg-white [&_button]:text-sm [&_button]:tracking-[0.18em] [&_button]:text-[var(--background)] [&_button]:hover:opacity-90 [&_button:nth-of-type(2)]:hidden [&_div]:border-0 [&_div]:shadow-none [&_div]:ring-0 [&_form]:m-0 [&_form]:border-0 [&_form]:p-0 [&_form]:shadow-none [&_form]:ring-0">
                  <ProductActions
                    product={{
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: img,
                    }}
                    stock={p.stock ?? 0}
                  />
                </div>
              </section>

              {/* Tabs clicables (Client Component) */}
              <PdpTabs
                description={p.description}
                details={{
                  concentration: "Eau de Parfum",
                  sizeLabel: `${p.volumeMl ?? 100} ml`,
                  sku: p.sku ?? null,
                }}
                notes={p.notes as string[] | undefined}
                policies={[
                  "• VAT included. Ships from Helsinki.",
                  "• Free shipping on EU orders over €80.",
                  "• 14-day returns.",
                ]}
                ingredients={p.ingredients ?? undefined}
                pyramid={p.pyramid}
              />
            </div>
          </aside>
        </div>
      </section>
      <RecommendedProducts
        currentSlug={p.slug}
        currentNotes={p.notes}
        gender={p.gender}
      />
    </main>
  );
}
