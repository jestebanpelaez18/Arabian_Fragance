import { shopifyFetch } from "@/lib/shopify/shopify";
import ProductCard from "@/components/shop/ProductCard";
import { normalizeProduct, type ShopifyRawProduct } from "@/lib/shopify/mapper";
import type { Product } from "@/data/products";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import type { Locale } from "@/i18n-config";
import { getShopifyLanguageCode } from "@/lib/shopify/locale";

type Props = {
  currentSlug: string;
  currentNotes?: string[];
  gender?: string;
  locale?: Locale;
};

type ProductEdge = {
  node: ShopifyRawProduct;
};

type RecommendedProductsOperation = {
  data: {
    products: {
      edges: ProductEdge[];
    };
  };
};

const recommendedQuery = `
  query GetRecommendations(
    $language: LanguageCode!
  ) @inContext(language: $language) {
    products(first: 10, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          productType

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }

          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }

          notes: metafield(
            namespace: "custom"
            key: "main_accord"
          ) {
            value
          }

          gender: metafield(
            namespace: "custom"
            key: "gender"
          ) {
            value
          }

          concentration: metafield(
            namespace: "custom"
            key: "concentration"
          ) {
            value
          }
        }
      }
    }
  }
`;

export default async function RecommendedProducts({
  currentSlug,
  currentNotes,
  gender,
  locale = "en",
}: Props) {
  const labels = getUiLabels(locale).commerce.recommended;

  const response = await shopifyFetch<RecommendedProductsOperation>({
    query: recommendedQuery,
    variables: {
      language: getShopifyLanguageCode(locale),
    },
  });

  const edges = response.body?.data?.products?.edges ?? [];

  const candidates: Product[] = edges.map(({ node }) => normalizeProduct(node));

  const currentNotesSet = new Set(currentNotes ?? []);

  const recommended = candidates
    .filter((product) => {
      if (product.slug === currentSlug) return false;

      const genderMatch = !gender || product.gender === gender;

      const notesMatch =
        product.notes?.some((note) => currentNotesSet.has(note)) ?? false;

      return genderMatch || notesMatch;
    })
    .slice(0, 4);

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
