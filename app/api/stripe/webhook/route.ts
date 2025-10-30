import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { decrementSafe } from "@/lib/stock/devStore";
import { hasProcessed, markProcessed } from "@/lib/orders/idempotency";

export const runtime = "nodejs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
  } catch (err: any) {
    console.error("Signature error:", err.message);
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
        const appId = (li.price?.product as any)?.metadata?.app_id as
          | string
          | undefined;
        if (!appId || qty <= 0) continue;
        await decrementSafe(appId, qty);
      }

      await markProcessed(session.id);

      console.log("✅ Paid:", {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        email: session.customer_details?.email,
        items: line.data.map((li) => ({
          qty: li.quantity,
          app_id: (li.price?.product as any)?.metadata?.app_id,
        })),
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Webhook handler error:", e);
    return new NextResponse("Handler error", { status: 500 });
  }
}
