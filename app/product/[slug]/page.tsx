import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductJsonLd from "@/components/product/ProductJsonLd";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductImage from "@/components/product/ProductImage";
import { productJsonLd } from "@/lib/seo/jsonld";
import ProductHeaderPanel from "@/components/product/ProductHeaderPanel";

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
      <ProductJsonLd json={jsonLd} />
      <ProductBreadcrumbs current={p.name} />

      {/* Layout: imagen 7/12, panel 5/12 */}
      <section className="mx-auto w-full max-w-[1600px] px-5 py-10">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* LEFT: large image, no frames */}
          <div className="md:col-span-7">
            <ProductImage src={img} alt={p.name} />
          </div>
          {/* Right: purchase panel */}
          <ProductHeaderPanel
            name={p.name}
            notes={p.notes}
            price={p.price}
            volumeMl={p.volumeMl}
            sku={p.sku}
            stock={p.stock ?? 0}
            image={img}
            description={p.description}
            ingredients={p.ingredients}
            pyramid={p.pyramid}
          />
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
