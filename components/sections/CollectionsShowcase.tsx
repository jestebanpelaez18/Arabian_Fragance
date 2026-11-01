import Link from "next/link";
import SmoothImage from "@/components/ui/SmoothImage";
import type { HomeCollectionCard } from "@/lib/shopify/get-collections";

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
  if (collections.length === 0) return null;

  return (
    <section
      aria-labelledby={headerTitle ? "home-collections-heading" : undefined}
      className="bg-background w-full px-5 py-12 md:py-16 xl:px-6"
    >
      {(headerTitle || headerDescription) && (
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          {headerTitle && (
            <h2
              id="home-collections-heading"
              className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-4xl"
            >
              {headerTitle}
            </h2>
          )}

          {headerDescription && (
            <p className="font-garamond mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
              {headerDescription}
            </p>
          )}
        </header>
      )}

      <div className="flex flex-col gap-14 md:gap-20">
        {collections.map((collection, index) => (
          <article
            key={collection.id}
            aria-labelledby={`home-collection-${index}`}
            className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-12"
          >
            <Link
              href={collection.href}
              aria-label={collection.title}
              className={[
                "group bg-background relative block aspect-4/5 w-full overflow-hidden",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                index % 2 === 1 ? "lg:order-2" : "",
              ].join(" ")}
            >
              <SmoothImage
                src={collection.imageSrc}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </Link>

            <div className="px-2 text-center md:px-8 lg:px-10">
              <div className="mx-auto flex max-w-lg flex-col items-center">
                <h3
                  id={`home-collection-${index}`}
                  className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[34px] lg:text-[40px]"
                >
                  {collection.title}
                </h3>

                {collection.subtitle && (
                  <p className="font-garamond mt-5 text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg">
                    {collection.subtitle}
                  </p>
                )}

                <Link
                  href={collection.href}
                  className="font-garamond hover:border-gold hover:text-gold mt-7 inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:mt-8"
                >
                  {collection.buttonText}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
