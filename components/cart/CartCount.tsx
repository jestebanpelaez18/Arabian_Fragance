"use client";
import { useCart, useCartReady } from "@/lib/cart/store";

export default function CartCount() {
  const ready = useCartReady();
  const count = useCart(s => s.count());
  if (!ready || count === 0) return null;
  return (
    <span
      aria-label={`Items in bag: ${count}`}
      className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-medium leading-5 ring-1 ring-black/10 bg-[var(--gold)] text-[var(--background)]"
    >
      {count}
    </span>
  );
}

