export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-playfair-display text-3xl">Thank you!</h1>
      <p className="mt-3 text-white/80">
        Your order was placed successfully. A confirmation email is on its way.
      </p>
      <a href="/shop" className="mt-8 inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5">
        Continue shopping
      </a>
    </main>
  );
}
