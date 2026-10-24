"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import {
  getNavigationPerfumes,
  type NavigationPerfume,
} from "@/lib/shopify/get-navigation-perfumes";

type Props = {
  locale: Locale;
  active: boolean;
  onNavigate: () => void;
};

const selectionByLocale = new Map<Locale, Promise<NavigationPerfume | null>>();

function loadSelection(locale: Locale): Promise<NavigationPerfume | null> {
  const existing = selectionByLocale.get(locale);

  if (existing) return existing;

  const request = getNavigationPerfumes(locale)
    .then((products) => {
      if (products.length === 0) return null;

      return products[Math.floor(Math.random() * products.length)];
    })
    .catch((error) => {
      selectionByLocale.delete(locale);
      console.error("Unable to load the navigation perfume:", error);

      return null;
    });

  selectionByLocale.set(locale, request);

  return request;
}

export default function FeaturedNavigationPerfume({
  locale,
  active,
  onNavigate,
}: Props) {
  const [selection, setSelection] = useState<{
    locale: Locale;
    product: NavigationPerfume | null;
  } | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;

    void loadSelection(locale).then((product) => {
      if (!cancelled) {
        setSelection({ locale, product });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [active, locale]);

  const product = selection?.locale === locale ? selection.product : null;

  if (!product) {
    return <div aria-hidden="true" className="aspect-4/5 w-full" />;
  }

  return (
    <Link
      href={`/${locale}/product/${product.handle}`}
      onClick={onNavigate}
      aria-label={product.name}
      className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      <div className="bg-background relative aspect-4/5 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 240px, 208px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
        />
      </div>

      <p className="font-magister group-hover:text-gold mt-3 text-center text-sm leading-relaxed font-normal text-neutral-900 transition-colors">
        {product.name}
      </p>
    </Link>
  );
}
