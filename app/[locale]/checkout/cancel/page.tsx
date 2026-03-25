import Link from "next/link";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CancelPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-playfair-display text-3xl">
        {dict.checkout.cancelTitle}
      </h1>
      <p className="mt-3 text-black/80">{dict.checkout.cancelDescription}</p>
      <Link
        href="/bag"
        className="mt-8 inline-block rounded-full px-6 py-3 ring-1 ring-white/15 hover:bg-white/5"
      >
        {dict.checkout.reviewBag}
      </Link>
    </main>
  );
}
