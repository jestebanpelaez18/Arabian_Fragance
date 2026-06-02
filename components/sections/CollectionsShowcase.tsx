import Link from "next/link";
import type { HomeCollectionCard } from "@/lib/shopify/get-collections";
import SmoothImage from "../ui/SmoothImage";
import SectionHeader from "../ui/SectionHeader";

type CollectionsShowcaseProps = {
  collections: HomeCollectionCard[];
  headerTitle?: string;
  headerDescription?: string;
};

export default function CollectionsShowcase({
  collections,
  headerTitle,
  headerDescription,
}: CollectionsShowcaseProps) {
  return (
    <>
      <SectionHeader
        title={headerTitle ?? "Our Collections"}
        description={
          headerDescription ??
          "Discover the three tiers of olfactory excellence."
        }
      />
      <section className="bg-background px-4 py-14 md:px-6 md:py-18">
        <div className="w-full">
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
    </>
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
          className="group bg-background relative block aspect-4/5 w-full overflow-hidden"
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
          <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            {collection.subtitle}
          </span>
          <h3 className="mt-4 font-serif text-3xl leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            {collection.title}
          </h3>
          <p className="font-garamond mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
            {collection.description}
          </p>
          <Link
            href={collection.href}
            className="group mt-10 inline-flex min-w-max flex-col items-stretch"
          >
            <span className="font-garamond group-hover:text-gold text-center text-sm tracking-[0.15em] text-gray-900 uppercase transition-colors duration-200 lg:text-left">
              {collection.buttonText}
            </span>
            <span className="group-hover:bg-gold mt-2 h-px w-full bg-gray-900/25 transition-colors duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
