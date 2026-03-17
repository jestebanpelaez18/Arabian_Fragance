export default function CancelPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-playfair-display text-3xl">Checkout canceled</h1>
      <p className="mt-3 text-black/80">
        No worries — your items are still in the bag.
      </p>
      <a
        href="/bag"
        className="mt-8 inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5"
      >
        Review your bag
      </a>
    </main>
  );
}
