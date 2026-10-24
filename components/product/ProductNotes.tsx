import type { Product } from "@/data/products";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import { getProductNoteGroups } from "@/lib/shop/product-note-groups";

type ProductNotesProps = {
  pyramid?: Product["pyramid"];
  keyNotes?: string | null;
  locale: Locale;
};

// Full class names so Tailwind can detect them.
const COLUMNS_CLASS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export default function ProductNotes({
  pyramid,
  keyNotes,
  locale,
}: ProductNotesProps) {
  const commerce = getUiLabels(locale).commerce;
  const labels = commerce.productDetails.notes;

  const groupTitles = {
    top: labels.top,
    heart: labels.heart,
    base: labels.base,
    key: commerce.pdpTabs.keyNotes,
  };

  const groups = getProductNoteGroups(pyramid, keyNotes);

  if (groups.length === 0) return null;

  return (
    <section
      aria-labelledby="product-notes-heading"
      className="bg-background w-full px-5 pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <h2
          id="product-notes-heading"
          className="font-magister text-center text-[28px] leading-tight font-normal text-neutral-900 md:text-[34px]"
        >
          {labels.title}
        </h2>

        <div
          className={[
            "mt-14 grid grid-cols-1 items-start gap-y-12",
            "md:mt-20 md:gap-x-12 lg:mt-24 lg:gap-x-20",
            COLUMNS_CLASS[Math.min(groups.length, 3)],
          ].join(" ")}
        >
          {groups.map((group) => (
            <div
              key={group.id}
              className={[
                "mx-auto w-full text-center",
                group.id === "key" ? "max-w-[720px]" : "max-w-[340px]",
              ].join(" ")}
            >
              <h3 className="font-garamond! text-base leading-normal font-medium tracking-[0.08em] text-neutral-600 uppercase">
                {groupTitles[group.id]}
              </h3>

              <p className="font-garamond mt-5 text-2xl leading-relaxed font-normal text-neutral-900 lg:text-[28px]">
                {group.values.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
