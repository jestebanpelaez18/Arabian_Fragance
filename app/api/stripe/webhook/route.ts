import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { decrementSafe } from "@/lib/stock/devStore";
import { hasProcessed, markProcessed } from "@/lib/orders/idempotency";

export const runtime = "nodejs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function isProductObject(
  product: string | Stripe.Product | Stripe.DeletedProduct | null | undefined,
): product is Stripe.Product {
  return (
    typeof product === "object" &&
    product !== null &&
    "metadata" in product &&
    !product.deleted
  );
}

export async function POST(req: Request) {
  const sig = (await headers()).get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof (err as any).message === "string"
        ? (err as any).message
        : "Unknown signature error";

    console.error("Signature error:", errorMessage, err);
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
        let appId: string | undefined;

        if (isProductObject(product)) {
          appId = product.metadata.app_id;
        }

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
          const product = li.price?.product;
          // Usa el Type Guard de nuevo (Solución al Error 3)
          const appId = isProductObject(product)
            ? product.metadata.app_id
            : undefined;

          return {
            qty: li.quantity,
            app_id: appId,
          };
        }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook handler error:", e);
    return new NextResponse("Handler error", { status: 500 });
  }
}
