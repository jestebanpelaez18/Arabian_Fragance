import PdpTabs from "./PdpTabs";
import ProductActions from "@/components/product/ProductActions";
import type { Product } from "@/data/products";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";

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
  storage_instructions?: string | null;
  variantId?: string | null;
  locale?: Locale;
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
  storage_instructions,
  variantId,
  locale = "en",
}: ProductHeaderPanelProps) {
  const labels = getUiLabels(locale).commerce.productHeader;

  return (
    <aside className="md:col-span-5">
      <div className="md:sticky md:top-24">
        <header className="border-b border-black/10 pb-8">
          <h1 className="font-garamond text-[42px] leading-[1.08] md:text-[56px]">
            {name}
          </h1>
          <p className="font-playfair-display mt-3 text-sm tracking-[0.18em] text-black/70 uppercase">
            {notes?.length ? notes.join(" | ") : ""}
          </p>
        </header>

        <section className="font-playfair-display pt-10">
          <div className="text-[34px] tracking-tight md:text-[38px]">
            {price} EUR
          </div>
          {volumeMl && (
            <div className="mt-1.5 text-sm text-black/70">/ {volumeMl} ml</div>
          )}
        </section>

        <dl className="mt-10 grid grid-cols-[180px_minmax(0,1fr)] gap-x-10 gap-y-6 text-[15px]">
          <div className="contents">
            <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
              {labels.concentration}
            </dt>
            <dd className="leading-7 text-black/90">Eau de Parfum</dd>
          </div>

          <div className="contents">
            <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
              {labels.size}
            </dt>
            <dd className="leading-7 text-black/90">
              <span className="inline-block border-b border-black/80 pb-0.5">
                {volumeMl ?? 100} ml
              </span>
            </dd>
          </div>

          <div className="contents">
            <dt className="tracking-[0.18em] whitespace-nowrap text-black/60 uppercase">
              {labels.dispatch}
            </dt>
            <dd className="text-gold/90 leading-7">{labels.sameDayDispatch}</dd>
          </div>
        </dl>

        <div className="mt-10 [&_a]:hidden [&_button]:h-14 [&_button]:w-full [&_button]:rounded-full [&_button]:bg-black [&_button]:text-sm [&_button]:tracking-[0.18em] [&_button]:text-[var(--background)] [&_button]:hover:opacity-90 [&_button:nth-of-type(2)]:hidden [&_div]:border-0 [&_div]:shadow-none [&_div]:ring-0 [&_form]:m-0 [&_form]:border-0 [&_form]:p-0 [&_form]:shadow-none [&_form]:ring-0">
          <ProductActions
            product={{ id: variantId ?? sku ?? name, name, price, image }}
            stock={stock}
          />
        </div>

        <PdpTabs
          description={description}
          details={{
            concentration: "Eau de Parfum",
            sizeLabel: `${volumeMl ?? 100} ml`,
            sku: sku ?? null,
          }}
          notes={notes ?? undefined}
          policies={[...labels.policies.map((line) => `• ${line}`)]}
          ingredients={ingredients ?? undefined}
          pyramid={pyramid}
          storage_instructions={storage_instructions}
        />
      </div>
    </aside>
  );
}
