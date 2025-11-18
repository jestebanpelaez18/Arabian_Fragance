"use client";
import { useCart, useCartReady } from "@/lib/cart/store";

export default function CartCount() {
  const ready = useCartReady();
  const count = useCart((s) => s.count());
  if (!ready || count === 0) return null;

  return (
    <span
      className="ml-1 inline-flex items-center"
      role="status"
      aria-live="polite"
    >
      {/* Visually-hidden text for screen readers */}
      <span className="sr-only">Items in bag: {count}</span>

      {/* Small gold dot (mobile + desktop) */}
      <span className="inline-flex items-center">
        <span
          className="block h-2 w-2 rounded-full bg-[var(--gold)] ring-1 ring-black/10 md:h-1.5 md:w-1.5"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
