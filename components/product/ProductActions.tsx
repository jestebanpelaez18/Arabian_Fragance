"use client";

import Button from "@/components/ui/button";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import { useCart } from "@/lib/cart/store";

type Props = {
  product: {
    id: string;
    slug?: string;
    name: string;
    price: number;
    image?: string | null;
  };
  available: boolean;
  locale: Locale;
  appearance?: "default" | "pdp";
};

export default function ProductActions({
  product,
  available,
  locale,
  appearance = "default",
}: Props) {
  const add = useCart((state) => state.add);
  const labels = getUiLabels(locale).commerce.productDetails.purchase;

  const disabled = !available;
  const isPdp = appearance === "pdp";

  const buttonLabel = disabled ? labels.outOfStock : labels.addToBag;

  function handleAdd() {
    if (disabled) return;

    add(
      {
        id: product.id,
        slug: product.slug ?? product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? "/placeholder.png",
      },
      1,
    );
  }

  if (isPdp) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="font-garamond enabled:hover:bg-background enabled:hover:text-ink enabled:active:bg-gold-soft enabled:active:text-ink flex h-12 w-full items-center justify-center border border-black bg-black px-5 text-xs font-normal tracking-[0.14em] text-[var(--background)] uppercase transition-[background-color,color] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        {buttonLabel}
      </button>
    );
  }

  return (
    <div className="mt-8 flex gap-4">
      <Button
        type="button"
        onClick={handleAdd}
        variant="secondary"
        className="hover:text-gold rounded-full border-[var(--gold)] px-8 py-3 tracking-[0.14em] text-black hover:bg-[var(--gold-soft)]"
        disabled={disabled}
      >
        {buttonLabel}
      </Button>

      <Button
        href={`/${locale}/bag`}
        variant="secondary"
        className="text-ink/80 hover:text-ink rounded-full border-black/10 px-6 py-3"
      >
        {labels.viewBag}
      </Button>
    </div>
  );
}
