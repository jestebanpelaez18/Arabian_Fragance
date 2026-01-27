import { shopifyFetch } from "@/lib/shopify/shopify";
import ProductCard from "@/components/shop/ProductCard";
import SectionDivider from "../ui/SectionDivider";

type Props = {
  currentSlug: string;
  currentNotes?: string[];
  gender?: string;
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

const cleanList = (value: string | undefined) => {
  if (!value) return [];
  const cleaned = value.replace(/[\[\]"]/g, '');
  if (cleaned.includes('|')) return cleaned.split('|').map(s => s.trim());
  if (cleaned.includes(',')) return cleaned.split(',').map(s => s.trim());
  return [cleaned];
};

export default async function RecommendedProducts({ currentSlug, currentNotes, gender }: Props) {
  // 1. Fetch de productos directo desde Shopify
  const res = await shopifyFetch({ query: recommendedQuery });
  const rawProducts = res.body?.data?.products?.edges || [];

  // 2. Normalizar y Filtrar
  const currentNotesSet = currentNotes ? new Set(currentNotes) : new Set();

  const recommended = rawProducts
    .map(({ node }: any) => ({
      id: node.id,
      slug: node.handle,
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      image: node.images?.edges?.[0]?.node?.url || "/catalog/Bottle_3.png",
      gender: node.gender?.value || "Unisex",
      notes: cleanList(node.notes?.value),
    }))
    .filter((p: any) => {
      if (p.slug === currentSlug) return false; // Excluir el actual
      const genderMatch = !gender || p.gender === gender;
      const notesMatch = p.notes.some((n: string) => currentNotesSet.has(n));
      return genderMatch || notesMatch;
    })
    .slice(0, 4);

  if (!recommended.length) return null;

  return (
    <section className="pb-12 md:pb-15">
      <SectionDivider text="You may also like" />
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 px-5 md:grid-cols-4 md:gap-x-5">
        {recommended.map((p: any) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
