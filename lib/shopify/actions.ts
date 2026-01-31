'use server';

import { shopifyFetch } from '@/lib/shopify/shopify';

const searchProductsQuery = `
  query searchProducts($query: String!, $first: Int) {
    search(query: $query, first: $first, types: PRODUCT) {
      nodes {
        ... on Product {
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
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function searchProductsAction(term: string) {
  if (!term) return [];

  const res = await shopifyFetch<any>({
    query: searchProductsQuery,
    variables: {
      query: term,
      first: 6,
    },
    cache: 'no-store',
  });

  if (res.error) {
    console.error("Error searching products:", res.error);
    return [];
  }

  console.log(`✅ Búsqueda para "${term}": ${res.body?.data?.search?.nodes.length} resultados.`);
  return res.body?.data?.search?.nodes || [];
}