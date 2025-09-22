import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import CollectionClient from "@/components/shop/CollectionClient";
import { PRODUCTS } from "@/data/products";
import {
  COLLECTIONS,
  COLLECTION_PRODUCTS,
  type CollectionSlug,
} from "@/data/collections";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const c = COLLECTIONS.find((x) => x.slug === collection);
  return c
    ? { title: `${c.name} | Collections`, description: `Explore ${c.name}.` }
    : {};
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: CollectionSlug }>;
}) {
  const { collection } = await params;
  const current = COLLECTIONS.find((c) => c.slug === collection);
  if (!current) return notFound();

  const ids = COLLECTION_PRODUCTS[current.slug] ?? [];
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <main>
      <section className="relative min-h-[90vh] md:min-h-screen">
        <Image
          src={current.hero.image}
          alt={`${current.name} Collection`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[0.2em] text-sm md:text-base opacity-70 mb-4">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide text-shadow-lg/30">
            {current.name.toUpperCase()}
          </h1>
          {current.hero.subtitle && (
            <p className="font-garamond mt-6 max-w-2xl text-lg md:text-xl opacity-90 text-shadow-lg/30">
              {current.hero.subtitle}
            </p>
          )}
        </div>
      </section>
      <CollectionClient items={items} />
    </main>
  );
}
