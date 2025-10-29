import Stripe from "stripe";
import { ClearCartOnSuccess } from "@/components/cart/ClearCartOnSuccess";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const id = searchParams?.session_id;
  if (!id) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">Payment received</h1>
        <p>Session not found. If you already paid, please check your email.</p>
      </main>
    );
  }
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items.data.price.product"],
  });

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <ClearCartOnSuccess sessionId={id} />
      <h1 className="font-playfair-display text-3xl">Thank you!</h1>
      <p className="mt-3 text-white/80">
        Your order was placed successfully. A confirmation email is on its way.
      </p>
      <a
        href="/shop"
        className="mt-8 inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5"
      >
        Continue shopping
      </a>
    </main>
  );
}
