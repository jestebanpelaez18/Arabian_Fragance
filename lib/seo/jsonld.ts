import type { Product } from "@/data/products";

function absUrl(pathOrUrl: string, base: string) {
  if (!pathOrUrl) return "";
  try {
    return new URL(pathOrUrl, base).toString();
  } catch {
    return pathOrUrl; // por si ya viene absoluta
  }
}

export function productJsonLd(
  p: Product,
  { siteUrl, productUrl }: { siteUrl: string; productUrl: string },
) {
  const images = (p.images?.length ? p.images : [p.image]).filter(
    Boolean,
  ) as string[];
  const absImages = images.map((i) => absUrl(i, siteUrl));
  const desc =
    p.description ??
    `Discover ${p.name}, a ${p.gender} fragrance. Notes: ${(p.notes ?? []).join(" · ") || "—"}.`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: p.name,
    image: absImages,
    description: desc,
    sku: p.sku ?? p.id,
    brand: { "@type": "Brand", name: "Arabian Fragrance" },
    category: p.gender, // opcional, pero útil
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      price: String(p.price),
      availability:
        (p.stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}
