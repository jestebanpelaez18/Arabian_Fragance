import Link from "next/link";
import type { Locale } from "@/i18n-config";
import type { Product } from "@/lib/shopify/actions";
import SearchProductCard from "@/components/navbar/search/SearchProductCard";
import { FOCUS_CLASS } from "@/components/navbar/search/focus-class";

type Props = {
  /** `null` while the products are still loading. */
  products: Product[] | null;
  locale: Locale;
  labels: { suggestions: string; topProducts: string };
  onNavigate: () => void;
};

function ProductSkeletons() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <div key={index} className={index === 2 ? "hidden md:block" : ""}>
          <div className="aspect-4/5 bg-black/[0.035] motion-safe:animate-pulse" />
          <div className="mx-auto mt-4 h-3 w-1/2 bg-black/[0.035]" />
          <div className="mx-auto mt-2 h-2 w-1/4 bg-black/[0.035]" />
        </div>
      ))}
    </div>
  );
}

export default function SearchSuggestions({
  products,
  locale,
  labels,
  onNavigate,
}: Props) {
  const featured = products?.slice(0, 3) ?? [];
  const suggestions = products?.slice(3, 7) ?? [];

  return (
    <div className="grid grid-cols-1 gap-8 pt-3 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:pt-5 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
      <section className="hidden min-w-0 border-r border-black/10 pr-6 md:block">
        <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
          {labels.suggestions}
        </h3>

        {products === null ? (
          <div aria-hidden="true" className="space-y-5">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-3 w-3/4 bg-black/[0.035] motion-safe:animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {suggestions.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/${locale}/product/${product.handle}`}
                  onClick={onNavigate}
                  className={`font-garamond hover:text-gold inline-flex min-h-10 items-center text-base leading-relaxed text-neutral-800 transition-colors ${FOCUS_CLASS}`}
                >
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="min-w-0">
        <h3 className="font-garamond! mb-5 text-sm leading-normal font-normal tracking-[0.12em] text-neutral-500 uppercase">
          {labels.topProducts}
        </h3>

        {products === null ? (
          <ProductSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {featured.map((product, index) => (
              <div
                key={product.id}
                className={index === 2 ? "hidden md:block" : ""}
              >
                <SearchProductCard
                  product={product}
                  locale={locale}
                  onNavigate={onNavigate}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
