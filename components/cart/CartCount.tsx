"use client";
import { useCart, useCartReady } from "@/lib/cart/store";

export default function CartCount() {
  const ready = useCartReady();
  const count = useCart((s) => s.count());
  if (!ready || count === 0) return null;

  return (
    <span className="ml-1 inline-flex items-center" role="status" aria-live="polite">
      {/* Visually-hidden text for screen readers */}
      <span className="sr-only">Items in bag: {count}</span>

      {/* Mobile: small gold dot */}
      <span className="md:hidden inline-flex items-center">
        <span className="block w-2 h-2 rounded-full bg-[var(--gold)] ring-1 ring-black/10" aria-hidden="true" />
      </span>

      {/* Desktop: badge with count */}
      <span className="hidden md:inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1.5 text-[10px] leading-5 font-medium text-[var(--background)] ring-1 ring-black/10">
        {count}
      </span>
    </span>
  );
}
