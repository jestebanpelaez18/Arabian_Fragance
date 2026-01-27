import { shopifyFetch } from "@/lib/shopify/shopify";
import { normalizeProduct, type ShopifyRawProduct } from "@/lib/shopify/mapper";

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

type ProductEdge = {
  node: ShopifyRawProduct;
};

type ShopifyProductsOperation = {
  data: {
    products: {
      edges: ProductEdge[];
    };
  };
};

export async function getShopifyProducts() {
  const { body } = await shopifyFetch<ShopifyProductsOperation>({
    query: allProductsQuery,
  });

  const edges = body?.data?.products?.edges || [];

  return edges.map(({ node }) => normalizeProduct(node));
}
