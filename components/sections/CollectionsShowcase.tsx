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
    <section className="bg-background px-4 py-16 md:py-24">
      <div className="w-full">
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
  const rowLayoutClass = isEven ? "" : "lg:[&>*:first-child]:order-last";
  const textSpacingClass = isEven
    ? "px-4 md:px-12 lg:pl-16 lg:pr-8 xl:pl-24 xl:pr-12"
    : "px-4 md:px-12 lg:pr-16 lg:pl-8 xl:pr-24 xl:pl-12";

  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${rowLayoutClass}`}
    >
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

      <div
        className={`flex w-full flex-col justify-center text-center lg:items-start lg:text-left ${textSpacingClass}`}
      >
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            {collection.subtitle}
          </span>
          <h3 className="font-serif mt-4 text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            {collection.title}
          </h3>
          <p className="font-garamond mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
            {collection.description}
          </p>
          <Link
            href={collection.href}
            className="group mt-10 inline-flex min-w-max flex-col items-stretch"
          >
            <span className="font-garamond text-left text-sm tracking-[0.15em] uppercase text-gray-900 transition-colors duration-200 group-hover:text-gold">
              {collection.buttonText}
            </span>
            <span className="mt-2 h-px w-full bg-gray-900/25 transition-colors duration-200 group-hover:bg-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
