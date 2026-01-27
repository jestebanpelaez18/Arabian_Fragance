import { shopifyFetch } from "@/lib/shopify/shopify";
import ProductCard from "@/components/shop/ProductCard";
import SectionDivider from "../ui/SectionDivider";
import { normalizeProduct, type ShopifyRawProduct } from "@/lib/shopify/mapper";
import { type Product } from "@/data/products";

type Props = {
  currentSlug: string;
  currentNotes?: string[];
  gender?: string;
};

interface ProductEdge {
  node: ShopifyRawProduct;
}
type RecommendedProductsOperation = {
  data: {
    products: {
      edges: ProductEdge[];
    };
  };
};

const recommendedQuery = `
  query GetRecommendations {
    products(first: 10, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          notes: metafield(namespace: "custom", key: "main_accord") { value }
          gender: metafield(namespace: "custom", key: "gender") { value }
        }
      }
    }
  }
`;

export default async function RecommendedProducts({
  currentSlug,
  currentNotes,
  gender,
}: Props) {
  const res = await shopifyFetch<RecommendedProductsOperation>({
    query: recommendedQuery,
  });

  const edges = res.body?.data?.products?.edges || [];

  const rawNodes = edges.map((edge) => edge.node);
  const candidates: Product[] = rawNodes.map(normalizeProduct);

  const currentNotesSet = currentNotes ? new Set(currentNotes) : new Set();

  const recommended = candidates
    .filter((p) => {
      if (p.slug === currentSlug) return false;

      const genderMatch = !gender || p.gender === gender;

      const notesMatch =
        p.notes &&
        p.notes.length > 0 &&
        p.notes.some((n) => currentNotesSet.has(n));

      return genderMatch || notesMatch;
    })
    .slice(0, 4);

  if (!recommended.length) return null;

  return (
    <section className="pb-12 md:pb-15">
      <SectionDivider text="You may also like" />
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 px-5 md:grid-cols-4 md:gap-x-5">
        {recommended.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
