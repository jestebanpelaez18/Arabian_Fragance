// app/api/stripe/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { decrementSafe } from "@/lib/stock/devStore";
import { hasProcessed, markProcessed } from "@/lib/orders/idempotency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// lazy init de Stripe (evita fallo en build CI si no hay env)
let _stripe: Stripe | null = null;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY missing at runtime");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

// Type guard sin warnings
function isProductObject(
  product: string | Stripe.Product | Stripe.DeletedProduct | null | undefined,
): product is Stripe.Product {
  return (
    typeof product === "object" &&
    product !== null &&
    "metadata" in product && // propiedad de Product
    !("deleted" in product) // si tiene 'deleted', es DeletedProduct
  );
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message?: unknown }).message === "string"
  ) {
    return (err as { message: string }).message;
  }
  return "Unknown signature error";
}

export async function POST(req: Request) {
  const sig = (await headers()).get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: unknown) {
    console.error("Signature error:", getErrorMessage(err), err);
    return new NextResponse("Bad signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (await hasProcessed(session.id)) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      const line = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      for (const li of line.data) {
        const qty = li.quantity ?? 0;
        const product = li.price?.product;
        const appId = isProductObject(product)
          ? product.metadata.app_id
          : undefined;
        if (!appId || qty <= 0) continue;
        await decrementSafe(appId, qty);
      }

      await markProcessed(session.id);

      console.log("✅ Paid:", {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        email: session.customer_details?.email,
        items: line.data.map((li) => {
          const p = li.price?.product;
          const appId = isProductObject(p) ? p.metadata.app_id : undefined;
          return { qty: li.quantity, app_id: appId };
        }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook handler error:", e);
    return new NextResponse("Handler error", { status: 500 });
  }
}
