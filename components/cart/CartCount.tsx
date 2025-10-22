"use client";
import { useCart } from "@/lib/cart/store";

export default function CartCount() {
  const count = useCart((s) => s.count());
  if (count === 0) return null;
  return (
    <span
      aria-label={`Items in bag: ${count}`}
      className="
      inline-flex h-5 min-w-4 items-center justify-center rounded-full px-2
      text-[10px] font-small tabular-nums text-white/90
      border border-white/20 bg-white/5 backdrop-blur-[2px]
      shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]
    "
    >
      {count}
    </span>
  );
}
