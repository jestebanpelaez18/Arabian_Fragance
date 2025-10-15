"use client";

import Button from "@/components/ui/button";

type Props = {
  product: { id: string; name: string; price: number; image?: string };
};

export default function ProductActions({ product }: Props) {
  const handleAdd = () => {
    // TODO: integrar con tu store de carrito (Zustand/Context):
    // useCart().add({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image })
    alert(`TODO: add "${product.name}" to bag`);
  };

  return (
    <div className="mt-8 flex gap-4">
      {/* CTA principal */}
      <Button
        onClick={handleAdd}
        variant="secondary"
        className="
          rounded-full px-8 py-3 tracking-[0.14em]
          border-[var(--gold)] text-ink
          hover:bg-[var(--gold-soft)] hover:text-ink
        "
      >
        Add to Bag
      </Button>

      <Button
        href="/bag"
        variant="secondary"
        className="
          rounded-full px-6 py-3
          border-black/10 text-ink/80 hover:text-ink
        "
      >
        View Bag
      </Button>
    </div>
  );
}

