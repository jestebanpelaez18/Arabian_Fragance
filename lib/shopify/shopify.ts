interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, any>;
}

interface ShopifyFetchResult {
  status: number;
  body: any;
  error?: string;
}

export async function shopifyFetch({ query, variables }: ShopifyFetchParams): Promise<ShopifyFetchResult> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !key) {
    throw new Error('Missing: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  }

  // Correct URL for the API
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data',
      body: null
    };
  }
}