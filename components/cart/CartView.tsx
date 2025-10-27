"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/store";
import CheckoutButton from "@/components/checkout/CheckoutButton";

const fmtEUR = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    n,
  );

export default function CartView({ compact = false }: { compact?: boolean }) {
  const { items, subtotal, updateQty, remove, clear } = useCart();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div
        className={
          compact
            ? "p-6 text-center"
            : "mx-auto max-w-4xl px-4 py-16 text-center"
        }
      >
        <h1 className="text-xl font-semibold">Your bag is empty</h1>
        <p className="mt-2 text-sm text-white/70">
          Discover our fragrances and add your favorites.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center rounded-full px-6 ring-1 ring-white/15 hover:bg-white/5"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className={compact ? "p-6" : "mx-auto max-w-5xl px-4 py-10"}>
      {!compact && (
        <h1 className="font-playfair-display mb-6 text-2xl">Your Bag</h1>
      )}

      <ul className="divide-y divide-white/10">
        {items.map((it) => (
          <li key={it.id} className="flex items-center gap-4 py-4">
            <img
              src={it.image ?? "/placeholder.png"}
              alt=""
              className="h-20 w-20 rounded-md object-cover ring-1 ring-white/10"
            />
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <button
                  className="h-7 w-7 rounded ring-1 ring-white/15 hover:bg-white/5"
                  onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}
                  aria-label={`Decrease ${it.name}`}
                >
                  −
                </button>
                <span className="w-8 text-center tabular-nums">{it.qty}</span>
                <button
                  className="h-7 w-7 rounded ring-1 ring-white/15 hover:bg-white/5"
                  onClick={() => updateQty(it.id, it.qty + 1)}
                  aria-label={`Increase ${it.name}`}
                >
                  +
                </button>
                <button
                  className="ml-4 text-xs text-white/60 underline underline-offset-4 hover:text-white/80"
                  onClick={() => remove(it.id)}
                  aria-label={`Remove ${it.name}`}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="font-medium tabular-nums">
              {fmtEUR(it.price * it.qty)}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <div className="text-sm text-white/70">Subtotal</div>
        <div className="text-lg font-semibold tabular-nums">
          {fmtEUR(total)}
        </div>
      </div>

      {/* Free shipping (e.g. > €80) */}
      <p className="mt-2 text-xs text-white/60">
        VAT included. Free EU shipping on orders over €80.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <CheckoutButton className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[var(--background)] hover:opacity-90">
          Checkout
        </CheckoutButton>
        <button
          onClick={() => clear()}
          className="h-12 rounded-full px-5 ring-1 ring-white/15 hover:bg-white/5"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
