import ProductCard from "@/components/shop/ProductCard";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import { getRecommendedProducts } from "@/lib/shop/recommendations";
import { getShopifyProducts } from "@/lib/shopify/get-products";

type Props = {
  currentSlug: string;
  locale?: Locale;
};

const RECOMMENDATION_COUNT = 4;

export default async function RecommendedProducts({
  currentSlug,
  locale = "en",
}: Props) {
  const labels = getUiLabels(locale).commerce.recommended;

  const products = await getShopifyProducts(locale);
  const currentProduct = products.find(
    (product) => product.slug === currentSlug,
  );

  if (!currentProduct) return null;

  const recommended = getRecommendedProducts(
    products,
    currentProduct,
    RECOMMENDATION_COUNT,
  );

  if (recommended.length === 0) return null;

  return (
    <section
      aria-labelledby="recommended-products-heading"
      className="bg-background w-full px-5 pt-8 pb-14 md:pt-10 md:pb-20"
    >
      <h2
        id="recommended-products-heading"
        className="font-garamond! text-center text-base leading-normal font-normal tracking-[0.06em] text-neutral-900 uppercase md:text-lg"
      >
        {labels.title}
      </h2>

      <div className="mt-7 grid grid-cols-2 gap-x-2.5 gap-y-12 md:mt-8 md:gap-x-5 lg:grid-cols-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} p={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}
