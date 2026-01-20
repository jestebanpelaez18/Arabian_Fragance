import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/shopify";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Recibimos [{ id: "...", qty: 1 }]

    if (!body || !Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // 1. Transformamos los datos para Shopify
    // Shopify necesita: { merchandiseId: "gid://shopify/ProductVariant/...", quantity: X }
    const lineItems = body.map((item) => ({
      merchandiseId: item.id, // IMPORTANTE: Esto debe ser el Variant ID, no el SKU
      quantity: item.qty,
    }));

    // 2. La mutación para crear el carrito
    const cartCreateMutation = `
      mutation createCart($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // 3. Enviamos a Shopify
    const response = await shopifyFetch({
      query: cartCreateMutation,
      variables: { lines: lineItems },
    });

    const { data } = response.body;

    // 4. Manejo de errores de Shopify
    if (data?.cartCreate?.userErrors?.length > 0) {
      console.error("Shopify Cart Errors:", data.cartCreate.userErrors);
      return NextResponse.json(
        { error: "Error creating checkout with Shopify" },
        { status: 500 }
      );
    }

    // 5. ¡Éxito! Devolvemos la URL
    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
    
    return NextResponse.json({ url: checkoutUrl });

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}