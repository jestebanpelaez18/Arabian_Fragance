import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { Product } from "@/lib/shopify/actions";
import { FOCUS_CLASS } from "@/components/navbar/search/focus-class";

export default function SearchProductCard({
  product,
  locale,
  onNavigate,
}: {
  product: Product;
  locale: Locale;
  onNavigate: () => void;
}) {
  const amount = Number(product.priceRange.minVariantPrice.amount);

  const price = Number.isFinite(amount)
    ? new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount)
    : "";

  return (
    <Link
      href={`/${locale}/product/${product.handle}`}
      aria-label={product.title}
      onClick={onNavigate}
      className={`group block min-w-0 text-center ${FOCUS_CLASS}`}
    >
      <div className="bg-background relative aspect-4/5 overflow-hidden">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt=""
            fill
            sizes="(min-width: 1200px) 270px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
          />
        )}
      </div>

      <h3 className="font-magister group-hover:text-gold mt-3 text-sm leading-relaxed font-normal text-neutral-900 transition-colors">
        {product.title}
      </h3>

      {price && (
        <p className="mt-1.5 font-serif text-xs leading-relaxed font-light tracking-[0.04em] text-neutral-700">
          {price} {product.priceRange.minVariantPrice.currencyCode}
        </p>
      )}
    </Link>
  );
}
