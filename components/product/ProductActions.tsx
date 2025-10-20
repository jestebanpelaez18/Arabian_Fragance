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
        className="text-ink hover:text-ink rounded-full border-[var(--gold)] px-8 py-3 tracking-[0.14em] hover:bg-[var(--gold-soft)]"
      >
        Add to Bag
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
