"use client";
import { useCart, useCartReady } from "@/lib/cart/store";

export default function CartCount() {
  const ready = useCartReady();
  const count = useCart((s) => s.count());
  if (!ready || count === 0) return null;
  return (
    <span
      aria-label={`Items in bag: ${count}`}
      className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1.5 text-[10px] leading-5 font-medium text-[var(--background)] ring-1 ring-black/10"
    >
      {count}
    </span>
  );
}
