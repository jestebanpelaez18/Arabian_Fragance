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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[0.2em] text-sm md:text-base opacity-70 mb-4">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide text-shadow-lg/30">
            EXPLORE OUR
            <br />
            EXQUISITE
            <br />
            FRAGANCE
            <br />
            COLLECTIONS
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg md:text-xl opacity-90 text-shadow-lg/30">
            Dive into a world where each fragrance tells a story. Discover the
            artistry behind our luxurious perfume lines, crafted to evoke
            emotion and elegance.
          </p>
        </div>
      </section>
      <section className="bg-bordeaux text-white w-full">
        <div className="w-full px-4 md:px-6 xl:px-10">
          <div className="flex items-center justify-between py-4">
            <h2 className="font-playfair-display text-2xl md:text-3xl tracking-wide">
              SHOP OUR COLLECTION
            </h2>
          </div>
        </div>
      </section>
      <section className="relative min-h-full ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
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
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-start gap-2 text-white pb-8">
                <h1 className="font-playfair-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  DESERD OUD
                </h1>
                <p className="font-garamond text-lg md:text-xl max-w-md">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/desert-oud"
                  className="font-roboto underline text-sm font-medium hover:text-gray-200 transition"
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
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-start gap-2 text-white pb-8">
                <h1 className="font-playfair-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  GOLDEN SANDS
                </h1>
                <p className="font-garamond text-lg md:text-xl max-w-md">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/golden-sands"
                  className="font-roboto underline text-sm font-medium hover:text-gray-200 transition"
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
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-start gap-2 text-white pb-8">
                <h1 className="font-playfair-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  ROSE OF DUBAI
                </h1>
                <p className="font-garamond text-lg md:text-xl max-w-md">
                  Lush rose intertwined with saffron spice
                </p>
                <Link
                  href="/collections/rose-of-dubai"
                  className="font-roboto underline text-sm font-medium hover:text-gray-200 transition"
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
