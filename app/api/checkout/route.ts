import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/shopify";

// Input type from client
type CartItem = {
  id: string;
  qty: number;
};

// Output structure from Shopify GraphQL
interface CartCreateOperation {
  data: {
    cartCreate: {
      cart: {
        checkoutUrl: string;
      } | null;
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
}

export async function POST(req: Request) {
  try {
    // Cast the incoming JSON to our specific type
    const body = (await req.json()) as CartItem[];

    if (!body || !Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const lineItems = body.map((item) => ({
      merchandiseId: item.id,
      quantity: item.qty,
    }));

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

    // Pass the Interface to the generic function
    const response = await shopifyFetch<CartCreateOperation>({
      query: cartCreateMutation,
      variables: { lines: lineItems },
    });

    const { data } = response.body;

    // Check for errors returned by Shopify logic
    if (data?.cartCreate?.userErrors && data.cartCreate.userErrors.length > 0) {
      console.error("Shopify Cart Errors:", data.cartCreate.userErrors);
      return NextResponse.json(
        { error: "Error creating checkout with Shopify" },
        { status: 500 },
      );
    }

    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Failed to retrieve checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
