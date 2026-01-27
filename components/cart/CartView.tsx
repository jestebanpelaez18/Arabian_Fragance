"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/lib/cart/store";
import CheckoutButton from "@/components/checkout/CheckoutButton";

// Configurable currency/locale via env
const LOCALE = process.env.NEXT_PUBLIC_LOCALE ?? "en-IE";
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY ?? "EUR";
const FREE_SHIPPING_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 80,
);

const fmtCurrency = (n: number) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
  }).format(n);

// --- Component: Free Shipping Progress Bar ---
function FreeShippingBar({
  total,
  threshold,
}: {
  total: number;
  threshold: number;
}) {
  const progress = useMemo(
    () => Math.min(100, Math.max(0, (total / threshold) * 100)),
    [total, threshold],
  );
  const remaining = Math.max(0, threshold - total);

  return (
    <div className="mt-6 mb-6" aria-live="polite">
      <div className="mb-2 flex justify-between text-xs">
        {remaining > 0 ? (
          <span className="text-black/70">
            Add <strong>{fmtCurrency(remaining)}</strong> for free shipping
          </span>
        ) : (
          <span className="font-medium text-green-700">
            You got free shipping!
          </span>
        )}
        <span className="text-black/50">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// --- Component: Cart Item Row ---
function CartItemRow({
  it,
  updateQty,
  remove,
}: {
  it: {
    id: string;
    name: string;
    price: number;
    qty: number;
    image?: string | null;
  };
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  const disableMinus = it.qty <= 1;

  return (
    <li key={it.id} className="flex items-center gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-black/10 bg-gray-100">
        <Image
          fill
          sizes="80px"
          src={it.image ?? "/catalog/Bottle_3.png"}
          alt={it.name || "Product image"}
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="font-medium">{it.name}</div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <button
            className={`flex h-7 w-7 items-center justify-center rounded ring-1 ring-black/10 transition-colors ${
              disableMinus
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-black/5"
            }`}
            onClick={() =>
              !disableMinus && updateQty(it.id, Math.max(1, it.qty - 1))
            }
            aria-label={`Decrease ${it.name}`}
            disabled={disableMinus}
          >
            −
          </button>
          <span className="w-8 text-center tabular-nums" aria-live="polite">
            {it.qty}
          </span>
          <button
            className="flex h-7 w-7 items-center justify-center rounded ring-1 ring-black/10 transition-colors hover:bg-black/5"
            onClick={() => updateQty(it.id, it.qty + 1)}
            aria-label={`Increase ${it.name}`}
          >
            +
          </button>
          <button
            className="ml-4 text-xs text-black/60 underline underline-offset-4 transition-colors hover:text-black"
            onClick={() => remove(it.id)}
            aria-label={`Remove ${it.name}`}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="font-medium tabular-nums">
        {fmtCurrency(it.price * it.qty)}
      </div>
    </li>
  );
}

export default function CartView({ compact = false }: { compact?: boolean }) {
  const { items, subtotal, updateQty, remove } = useCart();

  // Recompute total when items change
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
        <p className="mt-2 text-black/70">
          Discover our fragrances and add your favorites.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center rounded-full px-6 ring-1 ring-black/10 transition-colors hover:bg-black/5"
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

      {/* List */}
      <ul className="divide-y divide-black/10">
        {items.map((it) => (
          <CartItemRow
            key={it.id}
            it={it}
            updateQty={updateQty}
            remove={remove}
          />
        ))}
      </ul>

      {/* Subtotal */}
      <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
        <div className="text-sm text-black/70">Subtotal</div>
        <div className="text-lg font-semibold tabular-nums">
          {fmtCurrency(total)}
        </div>
      </div>

      {/* Free shipping progress */}
      <FreeShippingBar total={total} threshold={FREE_SHIPPING_THRESHOLD} />

      <p className="mt-2 mb-4 text-xs text-black/60">
        VAT included. Shipping calculated at checkout.
      </p>

      {/* Checkout */}
      <div className="mt-2">
        <CheckoutButton className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 font-medium text-white transition-colors hover:bg-gray-800">
          Checkout
        </CheckoutButton>
      </div>
    </div>
  );
}
