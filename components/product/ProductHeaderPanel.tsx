import Link from "next/link";
import ProductAccordion, {
  type ProductAccordionItem,
} from "./ProductAccordion";
import ProductDescription from "./ProductDescription";
import ShopifyRichText from "./ShopifyRichText";
import ProductLayering from "./ProductLayering";
import ProductActions from "@/components/product/ProductActions";
import type { Product } from "@/data/products";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import type { LayeringProduct } from "@/lib/shopify/get-layering-attars";
import { getProductNoteGroups } from "@/lib/shop/product-note-groups";

type ProductHeaderPanelProps = {
  name: string;
  mainAccords?: string[] | null;
  price: number;
  fragranceType?: string | null;
  sizeLabel?: string | null;
  sku?: string | null;
  available: boolean;
  image: string;
  description?: string | null;
  descriptionHtml?: string | null;
  ingredients?: string | null;
  pyramid?: Product["pyramid"];
  storageInstructions?: string | null;
  applicationInstructions?: string | null;
  layeringDescription?: string | null;
  layeringProducts?: LayeringProduct[];
  isAttar?: boolean;
  variantId?: string | null;
  locale?: Locale;
  keyNotes?: string | null;
};

const LINK_CLASS =
  "hover:text-gold underline underline-offset-4 transition-colors";

export default function ProductHeaderPanel({
  name,
  mainAccords,
  price,
  fragranceType,
  sizeLabel,
  available,
  image,
  description,
  descriptionHtml,
  ingredients,
  pyramid,
  keyNotes,
  storageInstructions,
  applicationInstructions,
  layeringDescription,
  layeringProducts = [],
  isAttar = false,
  variantId,
  sku,
  locale = "en",
}: ProductHeaderPanelProps) {
  const commerce = getUiLabels(locale).commerce;
  const labels = commerce.pdpTabs;
  const productDetails = commerce.productDetails;

  const uniqueAccords = Array.from(
    new Set((mainAccords ?? []).map((accord) => accord.trim()).filter(Boolean)),
  );

  const accordSummary = uniqueAccords.slice(0, 3).join(" · ");

  const formatLabel = [fragranceType?.trim(), sizeLabel?.trim()]
    .filter(Boolean)
    .join(" · ");

  const noteGroupTitles = {
    top: labels.top,
    heart: labels.heart,
    base: labels.base,
    key: labels.keyNotes,
  };

  const noteGroups = getProductNoteGroups(pyramid, keyNotes).map((group) => ({
    ...group,
    title: noteGroupTitles[group.id],
  }));

  const hasKeyNotes = noteGroups[0]?.id === "key";

  const showLayeringProducts = layeringProducts.length > 0;

  // ShopifyRichText also renders plain text, so paragraphs are joined by blank lines.
  const displayedLayeringDescription =
    layeringDescription?.trim() ||
    (isAttar
      ? undefined
      : productDetails.perfumeLayeringDescription.join("\n\n"));

  const items: ProductAccordionItem[] = [];

  if (descriptionHtml?.trim() || description?.trim()) {
    items.push({
      id: "description",
      title: labels.descriptionTab,
      content: (
        <ProductDescription html={descriptionHtml} fallback={description} />
      ),
    });
  }

  if (uniqueAccords.length > 0) {
    items.push({
      id: "main-accords",
      title: productDetails.mainAccords,
      content: (
        <p className="font-garamond text-base leading-[1.9] text-neutral-600">
          {uniqueAccords.join(" · ")}
        </p>
      ),
    });
  }

  if (noteGroups.length > 0) {
    items.push({
      id: "notes",
      title: hasKeyNotes ? labels.keyNotes : labels.notesTab,
      content: hasKeyNotes ? (
        <p className="font-garamond text-base leading-relaxed text-neutral-600">
          {noteGroups[0].values.join(" · ")}
        </p>
      ) : (
        <dl className="space-y-4">
          {noteGroups.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-[100px_minmax(0,1fr)] gap-4"
            >
              <dt className="text-ink font-semibold">{group.title}</dt>

              <dd className="text-neutral-600">{group.values.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  if (ingredients?.trim()) {
    items.push({
      id: "ingredients",
      title: labels.ingredientsTab,
      content: <p className="whitespace-pre-line">{ingredients}</p>,
    });
  }

  if (applicationInstructions?.trim()) {
    items.push({
      id: "application",
      title: productDetails.application,
      content: <ShopifyRichText value={applicationInstructions} />,
    });
  }

  if (isAttar) {
    items.push({
      id: "layering",
      title: commerce.layeringGuide.title,
      content: (
        <div className="space-y-4">
          {commerce.layeringGuide.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {!showLayeringProducts && layeringDescription?.trim() && (
            <ShopifyRichText value={layeringDescription} />
          )}
        </div>
      ),
    });
  }

  if (storageInstructions?.trim()) {
    items.push({
      id: "care",
      title: labels.packagingTab,
      content: <p className="whitespace-pre-line">{storageInstructions}</p>,
    });
  }

  items.push({
    id: "policies",
    title: labels.policiesTab,
    content: (
      <ul className="space-y-3">
        <li>
          <Link
            href={`/${locale}/policies/shipping-policy`}
            className={LINK_CLASS}
          >
            {productDetails.shipping}
          </Link>
        </li>

        <li>
          <Link
            href={`/${locale}/policies/refund-policy`}
            className={LINK_CLASS}
          >
            {productDetails.returns}
          </Link>
        </li>
      </ul>
    ),
  });

  return (
    <aside className="min-w-0 lg:sticky lg:top-[132px] lg:col-span-6 lg:self-start">
      <div className="mx-auto w-full lg:max-w-[560px] lg:px-6 lg:pt-10 xl:pt-12">
        <header>
          <h1 className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[32px]">
            {name}
          </h1>

          {(accordSummary || formatLabel) && (
            <div className="mt-3">
              {accordSummary && (
                <p className="font-garamond text-base leading-relaxed text-neutral-600">
                  {accordSummary}
                </p>
              )}

              {formatLabel && (
                <p
                  className={[
                    "font-garamond text-sm leading-relaxed tracking-[0.03em] text-neutral-600",
                    accordSummary ? "mt-1.5" : "",
                  ].join(" ")}
                >
                  {formatLabel}
                </p>
              )}
            </div>
          )}
        </header>

        <p className="mt-5 font-serif text-lg font-light tracking-[0.06em] text-neutral-900">
          {price} EUR
        </p>

        <div className="mt-6">
          <ProductActions
            product={{
              id: variantId ?? sku ?? name,
              name,
              price,
              image,
            }}
            available={available}
            appearance="pdp"
          />
        </div>

        <p className="font-garamond mt-3 text-center text-xs leading-relaxed tracking-[0.03em] text-neutral-500">
          {commerce.productHeader.sameDayDispatch}
        </p>

        <div className="mt-8">
          <ProductAccordion items={items} />
        </div>

        {showLayeringProducts && (
          <ProductLayering
            products={layeringProducts}
            description={displayedLayeringDescription}
            locale={locale}
          />
        )}
      </div>
    </aside>
  );
}
