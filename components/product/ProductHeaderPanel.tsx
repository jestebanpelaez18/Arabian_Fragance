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

type ProductHeaderPanelProps = {
  name: string;
  mainAccords?: string[] | null;
  price: number;
  fragranceType?: string | null;
  sizeLabel?: string | null;
  sku?: string | null;
  stock: number;
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
};

const LINK_CLASS =
  "hover:text-gold underline underline-offset-4 transition-colors";

const EXTRA_LABELS = {
  en: {
    mainAccords: "Main Accords",
    application: "The Art of Application",
    layering: "The Art of Layering",
    shipping: "Shipping",
    returns: "Returns & refunds",
  },
  fi: {
    mainAccords: "Tuoksun pääsoinnut",
    application: "Tuoksun käyttö",
    layering: "Tuoksujen kerrostaminen",
    shipping: "Toimitus",
    returns: "Palautukset ja hyvitykset",
  },
  sv: {
    mainAccords: "Doftackord",
    application: "Konsten att applicera",
    layering: "Konsten att kombinera dofter",
    shipping: "Leverans",
    returns: "Returer och återbetalningar",
  },
} satisfies Record<
  Locale,
  {
    mainAccords: string;
    application: string;
    layering: string;
    shipping: string;
    returns: string;
  }
>;

const PERFUME_LAYERING_DESCRIPTIONS = {
  en: "Explore perfume oils selected to layer with this fragrance.",
  fi: "Tutustu hajusteöljyihin, jotka on valittu yhdistettäväksi tähän tuoksuun.",
  sv: "Upptäck parfymoljor utvalda för att kombineras med denna doft.",
} satisfies Record<Locale, string>;

export default function ProductHeaderPanel({
  name,
  mainAccords,
  price,
  fragranceType,
  sizeLabel,
  stock,
  image,
  description,
  descriptionHtml,
  ingredients,
  pyramid,
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
  const extraLabels = EXTRA_LABELS[locale];

  const uniqueAccords = Array.from(
    new Set((mainAccords ?? []).map((accord) => accord.trim()).filter(Boolean)),
  );

  const accordSummary = uniqueAccords.slice(0, 3).join(" · ");

  const formatLabel = [fragranceType?.trim(), sizeLabel?.trim()]
    .filter(Boolean)
    .join(" · ");

  const noteGroups = [
    {
      id: "top",
      title: labels.top,
      values: pyramid?.top ?? [],
    },
    {
      id: "heart",
      title: labels.heart,
      values: pyramid?.heart ?? [],
    },
    {
      id: "base",
      title: labels.base,
      values: pyramid?.base ?? [],
    },
  ].filter((group) => group.values.length > 0);

  const showLayeringProducts = layeringProducts.length > 0;

  const displayedLayeringDescription =
    layeringDescription?.trim() ||
    (isAttar ? undefined : PERFUME_LAYERING_DESCRIPTIONS[locale]);

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
      title: extraLabels.mainAccords,
      content: (
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
          {uniqueAccords.map((accord) => (
            <li key={accord}>{accord}</li>
          ))}
        </ul>
      ),
    });
  }

  if (noteGroups.length > 0) {
    items.push({
      id: "notes",
      title: labels.notesTab,
      content: (
        <dl className="space-y-4">
          {noteGroups.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-[100px_minmax(0,1fr)] gap-4"
            >
              <dt className="text-neutral-900">{group.title}</dt>
              <dd>{group.values.join(" · ")}</dd>
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
      title: extraLabels.application,
      content: <ShopifyRichText value={applicationInstructions} />,
    });
  }

  // Keep text-only layering advice in the accordion when
  // no linked products are available.
  if (isAttar && !showLayeringProducts && layeringDescription?.trim()) {
    items.push({
      id: "layering",
      title: extraLabels.layering,
      content: <ShopifyRichText value={layeringDescription} />,
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
            {extraLabels.shipping}
          </Link>
        </li>

        <li>
          <Link
            href={`/${locale}/policies/refund-policy`}
            className={LINK_CLASS}
          >
            {extraLabels.returns}
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
            stock={stock}
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
