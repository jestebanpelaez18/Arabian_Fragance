import Image from "next/image";
import Link from "next/link";

export default function collectionPage() {
  return (
    <div>
      <section className="relative min-h-[90vh] md:min-h-screen">
        <Image
          src="/hero/story.jpg"
          alt="Perfume Collection Page"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm tracking-[0.2em] uppercase opacity-70 md:text-base">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl leading-tight tracking-wide text-shadow-lg/30 md:text-6xl lg:text-7xl">
            EXPLORE OUR
            <br />
            EXQUISITE
            <br />
            FRAGANCE
            <br />
            COLLECTIONS
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg opacity-90 text-shadow-lg/30 md:text-xl">
            Dive into a world where each fragrance tells a story. Discover the
            artistry behind our luxurious perfume lines, crafted to evoke
            emotion and elegance.
          </p>
        </div>
      </section>
      <section className="bg-bordeaux w-full text-white">
        <div className="w-full px-4 md:px-6 xl:px-10">
          <div className="flex items-center justify-between py-4">
            <h2 className="font-playfair-display text-2xl tracking-wide md:text-3xl">
              SHOP OUR COLLECTION
            </h2>
          </div>
        </div>
      </section>
      <section className="relative min-h-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          <div className="relative aspect-[3/4]">
            <Image
              src="/collections/Coleccion1.jpg"
              alt="Arabian Fragrance - Collection 1"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-2 px-6 pb-8 text-white md:px-12 xl:px-16">
                <h1 className="font-playfair-display text-3xl leading-tight tracking-tight text-shadow-lg/30 md:text-[32px] xl:text-[36px]">
                  DESERD OUD
                </h1>
                <p className="font-garamond max-w-md text-lg md:text-xl">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/desert-oud"
                  className="font-roboto text-sm font-medium underline transition hover:text-gray-200"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src="/collections/Coleccion2.jpg"
              alt="Arabian Fragrance - Collection 2"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-2 px-6 pb-8 text-white md:px-12 xl:px-16">
                <h1 className="font-playfair-display text-3xl leading-tight tracking-tight text-shadow-lg/30 md:text-[32px] xl:text-[36px]">
                  GOLDEN SANDS
                </h1>
                <p className="font-garamond max-w-md text-lg md:text-xl">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/golden-sands"
                  className="font-roboto text-sm font-medium underline transition hover:text-gray-200"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src="/collections/Coleccion3.jpg"
              alt="Arabian Fragrance - Collection 3"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-2 px-6 pb-8 text-white md:px-12 xl:px-16">
                <h1 className="font-playfair-display text-3xl leading-tight tracking-tight text-shadow-lg/30 md:text-[32px] xl:text-[36px]">
                  ROSE OF DUBAI
                </h1>
                <p className="font-garamond max-w-md text-lg md:text-xl">
                  Lush rose intertwined with saffron spice
                </p>
                <Link
                  href="/collections/rose-of-dubai"
                  className="font-roboto text-sm font-medium underline transition hover:text-gray-200"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
