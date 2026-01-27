// 1. Tipamos las variables de entrada como 'unknown' (seguro) en lugar de 'any'
interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

// 2. Usamos un Genérico <T> para el resultado.
// Por defecto es 'unknown', obligando a quien lo use a definir el tipo o hacer un cast.
interface ShopifyFetchResult<T = unknown> {
  status: number;
  body: T;
  error?: string;
}

// 3. La función acepta un tipo <T> opcional
export async function shopifyFetch<T = unknown>({
  query,
  variables,
}: ShopifyFetchParams): Promise<ShopifyFetchResult<T>> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !key) {
    throw new Error(
      "Missing: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      // JSON.stringify acepta cualquier objeto, así que esto es seguro
      body: JSON.stringify({ query, variables }),
    });

    return {
      status: result.status,
      // Casteamos el JSON al tipo genérico T
      body: (await result.json()) as T,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
      // @ts-expect-error - forzamos null aunque T no lo sea, para manejo de errores
      body: null,
    };
  }
}
