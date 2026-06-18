import Link from "next/link";
import ProductCardImages from "./ProductCardImages";
import { type Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";
import {
  formatProductDetailLabel,
  getIntensityLabel,
  getIntensityLevel,
} from "@/lib/shopify/product-display";

const INTENSITY_STEPS = [1, 2, 3, 4] as const;

type ProductCardProps = {
  p: Product;
  locale?: Locale;
  priority?: boolean;
};

export default function ProductCard({
  p,
  locale = i18n.defaultLocale,
  priority = false,
}: ProductCardProps) {
  const href = `/product/${p.slug ?? p.id}`;

  const uniqueImages = Array.from(new Set((p.images ?? []).filter(Boolean)));
  const primaryImage = uniqueImages[0] || p.image || "/catalog/Bottle_3.png";
  const hoverImage = uniqueImages[1] ?? null;

  const intensityLevel = getIntensityLevel(p.concentration);
  const detailLabel = formatProductDetailLabel(p, locale);
  const intensityLabel = getIntensityLabel(locale);

  return (
    <article data-testid="product-card" className="group flex flex-col">
      <Link
        href={href}
        aria-label={p.name}
        className="bg-background relative block aspect-4/5 w-full overflow-hidden"
      >
        <ProductCardImages
          name={p.name}
          primaryImage={primaryImage}
          hoverImage={hoverImage}
          priority={priority}
        />
      </Link>

      <div className="mt-4 flex flex-col items-center px-1 text-center">
        <Link
          href={href}
          className="font-magister group-hover:text-gold text-sm leading-snug font-medium tracking-wide text-neutral-900 transition-colors duration-300 md:text-sm"
        >
          {p.name}
        </Link>

        <p className="font-garamond mt-2 max-w-[300px] text-xs leading-snug tracking-wide text-neutral-600 md:max-w-[320px] md:text-sm">
          {detailLabel}
        </p>

        <div className="mt-3 flex items-center gap-2.5 text-[10px] md:text-xs">
          <span className="font-garamond tracking-[0.05em] text-neutral-500">
            {intensityLabel}
          </span>
          <span className="inline-flex gap-1.5">
            {INTENSITY_STEPS.map((step) => (
              <span
                key={step}
                className={`h-[5px] w-2 transition-colors duration-500 ${
                  step <= intensityLevel ? "bg-gold" : "bg-neutral-200"
                }`}
              />
            ))}
          </span>
        </div>

        <p className="mt-3 font-serif text-xs font-light tracking-[0.06em] text-neutral-800 md:text-sm">
          {p.price} EUR
        </p>
      </div>
    </article>
  );
}