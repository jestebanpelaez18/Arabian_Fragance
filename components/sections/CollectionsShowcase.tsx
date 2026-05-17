import Link from "next/link";
import type { HomeCollectionCard } from "@/lib/shopify/get-collections";
import SmoothImage from "../ui/SmoothImage";

type CollectionsShowcaseProps = {
  collections: HomeCollectionCard[];
};

export default function CollectionsShowcase({
  collections,
}: CollectionsShowcaseProps) {
  return (
    <section className="bg-background px-4 py-16 md:px-8 lg:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-3xl tracking-wide text-gray-900 md:text-5xl">
            Our Collections
          </h2>
          <p className="font-garamond mt-4 text-lg text-gray-500">
            Discover the three tiers of olfactory excellence.
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {collections.map((collection, index) => (
            <CollectionRow
              key={collection.id}
              collection={collection}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type CollectionRowProps = {
  collection: HomeCollectionCard;
  isEven: boolean;
};

function CollectionRow({ collection, isEven }: CollectionRowProps) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        isEven ? "" : "lg:[&>*:first-child]:order-last"
      }`}
    >
      {/* Columna de la Imagen */}
      <div className="w-full">
        <Link
          href={collection.href}
          className="group relative block aspect-4/5 w-full overflow-hidden bg-background"
        >
          <SmoothImage
            src={collection.imageSrc}
            alt={collection.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Columna del Texto: Alineado a la cuadrícula sin paddings inventados */}
      <div className="flex w-full flex-col justify-center text-center lg:items-start lg:text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          {collection.subtitle}
        </span>
        <h3 className="font-serif mt-4 text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
          {collection.title}
        </h3>
        <p className="font-garamond mt-6 max-w-md text-base leading-relaxed text-gray-600 md:text-lg">
          {collection.description}
        </p>
        <Link
          href={collection.href}
          className="mt-10 inline-block border-b border-gray-900 pb-1 text-sm font-medium tracking-[0.15em] uppercase text-gray-900 transition-colors hover:border-gray-500 hover:text-gray-500"
        >
          {collection.buttonText}
        </Link>
      </div>
    </div>
  );
}