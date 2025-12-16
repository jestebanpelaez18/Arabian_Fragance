"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { useCart } from "@/lib/cart/store";

type Props = {
  product: {
    id: string;
    slug?: string;
    name: string;
    price: number;
    image?: string | null;
  };
  stock?: number;
};

export default function ProductActions({ product, stock = 0 }: Props) {
  const add = useCart((s) => s.add);
  const getQty = useCart((s) => s.getQty);
  const [busy, setBusy] = useState(false);

  const inBag = getQty(product.id);
  const available = Math.max(0, (stock ?? 0) - inBag);
  const disabled = available <= 0 || busy;

  function handleAdd() {
    try {
      setBusy(true);
      add(
        {
          id: product.id,
          slug: product.slug ?? product.id,
          name: product.name,
          price: product.price, // euros
          image: product.image ?? "/placeholder.png",
        },
        1,
      );
      // TODO: show toast here if needed
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 flex gap-4">
      <Button
        onClick={handleAdd}
        variant="secondary"
        className="hover:text-gold rounded-full border-[var(--gold)] px-8 py-3 tracking-[0.14em] text-black hover:bg-[var(--gold-soft)]"
        disabled={disabled}
        aria-live="polite"
      >
        {disabled ? "Out of stock" : busy ? "Adding..." : "Add to Bag"}
      </Button>

      <Button
        href="/bag"
        variant="secondary"
        className="text-ink/80 hover:text-ink rounded-full border-black/10 px-6 py-3"
      >
        View Bag
      </Button>
    </div>
  );
}
