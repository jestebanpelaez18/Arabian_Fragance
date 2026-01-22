// lib/shopify/get-products.ts
import { shopifyFetch } from "@/lib/shopify/shopify";

const allProductsQuery = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id 
              }
            }
          }
          gender: metafield(namespace: "custom", key: "gender") { value }
          notes: metafield(namespace: "custom", key: "main_accord") { value }
        }
      }
    }
  }
`;

const cleanList = (value: string | undefined) => {
  if (!value) return [];
  let cleaned = value.replace(/[\[\]"]/g, '');
  if (cleaned.includes('|')) return cleaned.split('|').map(s => s.trim());
  if (cleaned.includes(',')) return cleaned.split(',').map(s => s.trim());
  return [cleaned];
};

export async function getShopifyProducts() {
  const { body } = await shopifyFetch({ query: allProductsQuery });
  const edges = body?.data?.products?.edges || [];

  return edges.map(({ node }: any) => {
    return {
      // 1. Aquí mapeamos los datos para que tu ProductCard sea feliz
      id: node.variants?.edges?.[0]?.node?.id || node.id, 
      
      slug: node.handle, // Asignamos el handle al slug
      
      handle: node.handle,
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      image: node.images?.edges?.[0]?.node?.url || "/catalog/Bottle_3.png",
      gender: node.gender?.value?.toLowerCase() || "unisex", 
      notes: cleanList(node.notes?.value),
      available: node.availableForSale
    };
  });
}