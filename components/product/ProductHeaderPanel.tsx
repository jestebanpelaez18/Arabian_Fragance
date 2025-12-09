import PriceBlock from "./ProductHeaderComponents/PriceBlock";
import DetailsGrid from "./ProductHeaderComponents/DetailGrids";
import ActionsWrapper from "./ProductHeaderComponents/ActionsWrapper";
import PdpTabs from "./PdpTabs";
import type { Product } from "@/data/products";

type ProductHeaderPanelProps = {
  name: string;
  notes?: string[] | null;
  price: number;
  volumeMl?: number | null;
  sku?: string | null;
  stock: number;
  image: string;
  description?: string | null;
  ingredients?: string | null;
  pyramid?: Product["pyramid"];
};

export default function ProductHeaderPanel({
  name,
  notes,
  price,
  volumeMl,
  sku,
  stock,
  image,
  description,
  ingredients,
  pyramid,
}: ProductHeaderPanelProps) {
  return (
    <aside className="md:col-span-5">
      <div className="md:sticky md:top-24">
        <header className="border-b border-white/10 pb-8">
          <h1 className="font-garamond text-[42px] leading-[1.08] md:text-[56px]">
            {name}
          </h1>
          <p className="font-playfair-display mt-3 text-sm tracking-[0.18em] text-white/70 uppercase">
            {notes?.length ? notes.join(" | ") : ""}
          </p>
        </header>

        <PriceBlock price={price} volumeMl={volumeMl ?? undefined} />

        <DetailsGrid
          concentration="Eau de Parfum"
          sizeLabel={`${volumeMl ?? 100} ml`}
          dispatchLabel="Same-day dispatch"
        />

        <ActionsWrapper
          product={{ id: sku ?? name, name, price, image }}
          stock={stock}
        />

        <PdpTabs
          description={description}
          details={{
            concentration: "Eau de Parfum",
            sizeLabel: `${volumeMl ?? 100} ml`,
            sku: sku ?? null,
          }}
          notes={notes ?? undefined}
          policies={[
            "• VAT included. Shipping from Helsinki.",
            "• Free shipping in the EU from €80.",
            "• Returns within 14 days.",
          ]}
          ingredients={ingredients ?? undefined}
          pyramid={pyramid}
        />
      </div>
    </aside>
  );
}
