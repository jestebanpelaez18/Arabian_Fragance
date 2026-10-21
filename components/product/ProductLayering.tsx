import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import ShopifyRichText from "./ShopifyRichText";
import type { LayeringProduct } from "@/lib/shopify/get-layering-attars";

type ProductLayeringProps = {
  products: LayeringProduct[];
  description?: string | null;
  locale: Locale;
};

const TITLES = {
  en: "Layer With",
  fi: "Yhdistä tuoksuun",
  sv: "Kombinera med",
} satisfies Record<Locale, string>;

function formatPrice(product: LayeringProduct, locale: Locale): string {
  const { amount, currencyCode } = product.priceRange.minVariantPrice;

  const price = Number(amount);

  if (!Number.isFinite(price)) return "";

  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formattedAmount} ${currencyCode}`;
}

export default function ProductLayering({
  products,
  description,
  locale,
}: ProductLayeringProps) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="product-layering-heading"
      className="mt-10 md:mt-12"
    >
      <h2
        id="product-layering-heading"
        className="font-garamond! text-lg leading-normal font-normal tracking-[0.06em] text-neutral-900 uppercase"
      >
        {TITLES[locale]}
      </h2>

      {description?.trim() && (
        <div className="font-garamond mt-3 text-base leading-relaxed text-neutral-600 [&_p+p]:mt-4">
          <ShopifyRichText value={description} />
        </div>
      )}

      <ul
        role="list"
        aria-labelledby="product-layering-heading"
        tabIndex={0}
        className="mt-5 grid snap-x snap-mandatory auto-cols-[46%] grid-flow-col gap-3 overflow-x-auto pb-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:auto-cols-[31%]"
      >
        {products.map((product) => (
          <li key={product.id} className="min-w-0 snap-start">
            <Link
              href={`/${locale}/product/${product.handle}`}
              className="group block text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <div className="bg-background relative aspect-4/5 overflow-hidden">
                {product.featuredImage && (
                  <Image
                    src={product.featuredImage.url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 170px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                )}
              </div>

              <h3 className="font-magister group-hover:text-gold mt-3 text-xs leading-relaxed font-normal text-neutral-900 transition-colors">
                {product.title}
              </h3>

              <p className="mt-1.5 font-serif text-xs leading-relaxed font-light tracking-[0.03em] text-neutral-700">
                {formatPrice(product, locale)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
