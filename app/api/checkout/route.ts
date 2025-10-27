import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Util: busca el producto del server por id (o slug si quieres)
function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

// Convierte euros (number) → cents (integer)
function eurToCents(n: number) {
  return Math.round(n * 100);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const items: Array<{ id: string; qty: number }> = Array.isArray(body)
      ? body
      : [];

    if (!items.length) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    // Valida y construye line_items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const it of items) {
      const p = findProduct(it.id);
      if (!p || !p.price || (p.status && p.status === "draft")) continue;

      const qty = Math.max(1, Math.floor(it.qty || 1));

      if (p.stripe_price_id) {
        // Opción A: ya tienes un Price creado en Stripe
        line_items.push({
          price: p.stripe_price_id,
          quantity: qty,
        });
      } else {
        // Opción B: precio dinámico desde tu catálogo (en euros → cents)
        line_items.push({
          quantity: qty,
          price_data: {
            currency: "EUR",
            unit_amount: eurToCents(p.price),
            product_data: {
              name: p.name,
              images: p.images?.length ? p.images : p.image ? [p.image] : [],
              metadata: {
                id: p.id,
                slug: p.slug,
              },
            },
          },
        });
      }
    }

    if (!line_items.length) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,

      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout/cancel`,

      metadata: {
        source: "arabian-fragrance",
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
