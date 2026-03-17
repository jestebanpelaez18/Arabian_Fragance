// app/checkout/success/page.tsx
import Stripe from "stripe";
import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/cart/ClearCartOnSuccess";

export const dynamic = "force-dynamic";

async function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing at runtime");
  return new Stripe(key);
}

// Next 15: searchParams es Promise<Record<string, string | string[] | undefined>>
type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = await searchParams;
  const raw = sp?.session_id;
  const id = Array.isArray(raw) ? raw[0] : raw;

  if (!id) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">Payment received</h1>
        <p>Session not found. If you already paid, please check your email.</p>
      </main>
    );
  }

  const stripe = await getStripe();
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items.data.price.product"],
  });

  return (
    <main className="mx-auto max-w-xl space-y-4 px-4 py-16 text-center">
      <ClearCartOnSuccess sessionId={id} />

      <h1 className="text-3xl font-semibold">Thank you!</h1>
      <p className="text-white/80">
        Order <span className="font-mono">{session.id}</span> confirmed.
      </p>
      <p>
        A confirmation email was sent to{" "}
        <strong>{session.customer_details?.email ?? "your email"}</strong>.
      </p>

      <div className="mx-auto max-w-md rounded-lg border border-white/10 p-4 text-left">
        <h2 className="mb-2 font-medium">Summary</h2>
        <ul className="space-y-1">
          {(session.line_items?.data ?? []).map((li) => {
            const prod = li.price?.product as Stripe.Product;
            return (
              <li key={li.id} className="flex items-center justify-between">
                <span>{prod?.name ?? "Product"}</span>
                <span>x{li.quantity}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <span>Total</span>
          <span className="font-semibold">
            {(session.amount_total ?? 0) / 100}{" "}
            {session.currency?.toUpperCase()}
          </span>
        </div>
      </div>

      <Link
        href="/shop"
        className="inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5"
      >
        Continue shopping
      </Link>
    </main>
  );
}
