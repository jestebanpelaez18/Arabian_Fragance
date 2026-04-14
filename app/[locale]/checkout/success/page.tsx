import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/cart/ClearCartOnSuccess";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

export const dynamic = "force-dynamic";

// Next 15: searchParams es Promise<Record<string, string | string[] | undefined>>
type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: SP;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const sp = await searchParams;
  const rawOrder = sp?.order;
  const orderRef = Array.isArray(rawOrder) ? rawOrder[0] : rawOrder;

  return (
    <main className="mx-auto max-w-xl space-y-4 px-4 py-16 text-center">
      <ClearCartOnSuccess />

      <h1 className="text-3xl font-semibold">{dict.checkout.thankYou}</h1>
      <p className="text-white/80">
        {orderRef ? (
          <>
            Order <span className="font-mono">{orderRef}</span>{" "}
            {dict.checkout.orderConfirmedSuffix}
          </>
        ) : (
          dict.checkout.paymentReceived
        )}
      </p>
      <p>{dict.checkout.orderConfirmedSuffix}</p>

      <Link
        href="/shop"
        className="inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5"
      >
        {dict.checkout.continueShopping}
      </Link>
    </main>
  );
}
