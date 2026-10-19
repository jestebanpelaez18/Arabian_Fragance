import Link from "next/link";
import ProductCardImages from "./ProductCardImages";
import { type Product } from "@/data/products";
import { i18n, type Locale } from "@/i18n-config";
import {
  formatProductDetailLabel,
  getConcentrationLevel,
  getConcentrationPercent,
  getIntensityLabel,
} from "@/lib/shopify/product-display";

const INTENSITY_STEPS = [1, 2, 3, 4, 5] as const;

type ProductCardProps = {
  p: Product;
  locale?: Locale;
  /** Set for above-the-fold cards so their image loads eagerly. */
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

  const concentrationPercent = getConcentrationPercent(p.concentration);

  const intensityLevel =
    concentrationPercent === null
      ? 0
      : (getConcentrationLevel(concentrationPercent) ?? 0);
  const detailLabel = formatProductDetailLabel(p, locale);
  const intensityLabel = getIntensityLabel(locale);

  return (
    <article
      data-testid="product-card"
      className="group flex h-full min-w-0 flex-col"
    >
      <Link
        href={href}
        aria-label={p.name}
        className="bg-background relative block aspect-4/5 w-full shrink-0 overflow-hidden"
      >
        <ProductCardImages
          name={p.name}
          primaryImage={primaryImage}
          hoverImage={hoverImage}
          priority={priority}
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col items-center px-1 text-center">
        <Link
          href={href}
          className="font-magister group-hover:text-gold text-sm leading-snug font-medium tracking-wide text-neutral-900 transition-colors duration-300"
        >
          {p.name}
        </Link>

        <p className="font-garamond mt-2 w-full text-xs leading-snug tracking-wide text-neutral-600 md:text-sm">
          {detailLabel}
        </p>

        <div className="mt-auto flex items-center justify-center gap-2.5 pt-3 text-[10px] md:text-xs">
          <span className="font-garamond tracking-[0.05em] text-neutral-500">
            {intensityLabel}
          </span>

          <span
            role="img"
            aria-label={`${intensityLevel} / ${INTENSITY_STEPS.length}`}
            className="inline-flex shrink-0 gap-1.5"
          >
            {INTENSITY_STEPS.map((step) => (
              <span
                key={step}
                aria-hidden="true"
                className={`h-[5px] w-2 ${
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
