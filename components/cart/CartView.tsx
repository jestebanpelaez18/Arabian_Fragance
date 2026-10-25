"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart, type CartItem } from "@/lib/cart/store";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { getLocaleFromPathname, getUiLabels } from "@/lib/i18n/uiLabels";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY ?? "EUR";

const FREE_SHIPPING_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 80,
);

const FOCUS_CLASS =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

type CartLabels = ReturnType<typeof getUiLabels>["commerce"]["cart"];

type CartViewProps = {
  compact?: boolean;
  onNavigate?: () => void;
};

function FreeShippingBar({
  total,
  threshold,
  labels,
  formatMoney,
}: {
  total: number;
  threshold: number;
  labels: CartLabels;
  formatMoney: (amount: number) => string;
}) {
  if (!Number.isFinite(threshold) || threshold <= 0) return null;

  const progress = Math.min(100, Math.max(0, (total / threshold) * 100));

  const remaining = Math.max(0, threshold - total);

  return (
    <div className="mt-5">
      <p
        aria-live="polite"
        aria-atomic="true"
        className="font-garamond text-sm leading-relaxed text-neutral-600"
      >
        {remaining > 0 ? (
          <>
            {labels.addForFreeShipping}{" "}
            <span className="font-serif text-xs text-neutral-900">
              {formatMoney(remaining)}
            </span>{" "}
            {labels.freeShippingSuffix}
          </>
        ) : (
          <span className="text-neutral-900">
            {labels.freeShippingUnlocked}
          </span>
        )}
      </p>

      <div
        aria-hidden="true"
        className="mt-2.5 h-[2px] w-full overflow-hidden bg-black/10"
      >
        <div
          className="bg-gold h-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function CartItemRow({
  item,
  updateQty,
  remove,
  labels,
  formatMoney,
}: {
  item: CartItem;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  labels: CartLabels;
  formatMoney: (amount: number) => string;
}) {
  const disableMinus = item.qty <= 1;

  const quantityButtonClass = [
    "hover:text-gold inline-flex h-11 w-11 shrink-0",
    "items-center justify-center text-base transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-30",
    FOCUS_CLASS,
  ].join(" ");

  return (
    <li className="grid grid-cols-[80px_minmax(0,1fr)] items-start gap-x-4 py-6 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-x-5">
      <div className="bg-background relative aspect-4/5 overflow-hidden">
        <Image
          fill
          sizes="(min-width: 640px) 112px, 80px"
          src={item.image || "/catalog/Bottle_3.png"}
          alt={item.name || labels.productImageAltFallback}
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col items-start">
        <p className="font-magister text-sm leading-relaxed font-normal tracking-[0.02em] text-neutral-900">
          {item.name}
        </p>

        <p className="mt-2 font-serif text-sm font-light tracking-[0.04em] text-neutral-800 tabular-nums">
          {formatMoney(item.price * item.qty)}
        </p>

        <div className="mt-4 flex w-full flex-wrap items-center justify-start gap-x-5 gap-y-2">
          <div className="inline-flex items-center border border-black/15">
            <button
              type="button"
              className={quantityButtonClass}
              onClick={() => updateQty(item.id, item.qty - 1)}
              aria-label={`${labels.decreaseItemAriaPrefix} ${item.name}`}
              disabled={disableMinus}
            >
              <span aria-hidden="true">−</span>
            </button>

            <span
              aria-live="polite"
              aria-atomic="true"
              className="min-w-6 text-center font-serif text-xs tabular-nums"
            >
              {item.qty}
            </span>

            <button
              type="button"
              className={quantityButtonClass}
              onClick={() => updateQty(item.id, item.qty + 1)}
              aria-label={`${labels.increaseItemAriaPrefix} ${item.name}`}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`${labels.removeItemAriaPrefix} ${item.name}`}
            className={[
              "font-garamond hover:text-gold min-h-11",
              "text-sm text-neutral-500 underline",
              "decoration-black/20 underline-offset-4 transition-colors",
              FOCUS_CLASS,
            ].join(" ")}
          >
            {labels.remove}
          </button>
        </div>
      </div>
    </li>
  );
}

export default function CartView({
  compact = false,
  onNavigate,
}: CartViewProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const labels = getUiLabels(locale).commerce.cart;

  const { items, subtotal, updateQty, remove } = useCart();
  const total = subtotal();

  const formatter = new Intl.NumberFormat(
    process.env.NEXT_PUBLIC_LOCALE ?? locale,
    {
      style: "currency",
      currency: CURRENCY,
    },
  );

  const formatMoney = (amount: number) => formatter.format(amount);

  if (items.length === 0) {
    const emptyContent = (
      <>
        <p className="font-garamond text-xl leading-relaxed text-neutral-900">
          {labels.emptyTitle}
        </p>

        <p className="font-garamond mt-3 max-w-xs text-base leading-relaxed text-neutral-600">
          {labels.emptyDescription}
        </p>

        <Link
          href={`/${locale}/shop`}
          onClick={onNavigate}
          className={[
            "font-garamond mt-7 inline-flex min-h-12",
            "w-full max-w-[240px] items-center justify-center",
            "border border-neutral-900 px-6 text-xs",
            "tracking-[0.14em] text-neutral-900 uppercase",
            "transition-colors hover:bg-neutral-900 hover:text-white",
            FOCUS_CLASS,
          ].join(" ")}
        >
          {labels.shopNow}
        </Link>
      </>
    );

    if (compact) {
      return (
        <div className="flex min-h-0 flex-1 overflow-y-auto px-6 py-10">
          <div className="m-auto flex w-full flex-col items-center text-center">
            {emptyContent}
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto flex min-h-[55dvh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
        <h1 className="font-magister mb-8 text-3xl font-normal">
          {labels.bagTitle}
        </h1>

        {emptyContent}
      </div>
    );
  }

  return (
    <div
      className={
        compact
          ? "flex min-h-0 flex-1 flex-col"
          : "mx-auto w-full max-w-[1200px] px-5 pt-10 pb-16 md:px-8 md:pt-14 md:pb-24"
      }
    >
      {!compact && (
        <h1 className="font-magister mb-8 text-center text-3xl font-normal tracking-[0.02em] md:mb-12 md:text-4xl">
          {labels.bagTitle}
        </h1>
      )}

      <div
        className={
          compact
            ? "flex min-h-0 flex-1 flex-col"
            : "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16"
        }
      >
        <div
          className={
            compact
              ? "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7"
              : "min-w-0"
          }
        >
          <ul className="divide-y divide-black/10">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                updateQty={updateQty}
                remove={remove}
                labels={labels}
                formatMoney={formatMoney}
              />
            ))}
          </ul>
        </div>

        <div
          className={
            compact
              ? "bg-background max-h-[55dvh] shrink-0 overflow-y-auto border-t border-black/10 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7 sm:pt-6 sm:pb-7"
              : "border-t border-black/10 pt-6 lg:sticky lg:top-[140px]"
          }
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-garamond text-base text-neutral-700">
              {labels.subtotal}
            </p>

            <p className="font-serif text-lg font-light tracking-[0.04em] text-neutral-900 tabular-nums">
              {formatMoney(total)}
            </p>
          </div>

          <FreeShippingBar
            total={total}
            threshold={FREE_SHIPPING_THRESHOLD}
            labels={labels}
            formatMoney={formatMoney}
          />

          <p className="font-garamond mt-4 text-sm leading-relaxed text-neutral-500">
            {labels.vatIncludedNote}
          </p>

          <div className="mt-5">
            <CheckoutButton
              className={[
                "font-garamond inline-flex min-h-12 w-full",
                "items-center justify-center border border-neutral-900",
                "bg-neutral-900 px-6 py-3 text-sm",
                "tracking-[0.14em] text-white uppercase",
                "transition-colors duration-200",
                "hover:border-gold hover:bg-gold",
                "active:border-gold-strong active:bg-gold-strong",
                "disabled:cursor-wait disabled:opacity-60",
                FOCUS_CLASS,
              ].join(" ")}
            >
              {labels.checkout}
            </CheckoutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
