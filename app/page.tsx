import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import DiscoverSection from "@/components/sections/DiscoverSection";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen">
        <Image
          className="object-cover object-center"
          src="/hero/heroPicture.jpg"
          alt="Arabian Fragance - Hero Picture"
          fill={true}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-0" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-start gap-4 text-white">
            <h1 className="font-display text-4xl md:text-6xl xl:text-7xl leading-none tracking-tight">
              DISCOVER THE
              <br />
              ESSENCE OF
              <br />
              ARABIAN
              <br />
              LUXURY
            </h1>
            <p className="font-serif text-base md:text-lg max-w-md">
              Experience exclusive fragrances from Dubai: bold, sensual, and
              unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button href="\shop" variant="primary">
                Shop Now
              </Button>
              <Button href="about" variant="secondary">
                Discover Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative min-h-full border-b-1 border-white">
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
                <h1 className="font-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  DESERD OUD
                </h1>
                <p className="font-serif text-base md:text-lg max-w-md">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/desert-oud"
                  className="underline text-sm font-medium hover:text-gray-200 transition"
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
                <h1 className="font-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  GOLDEN SANS
                </h1>
                <p className="font-serif text-base md:text-lg max-w-md">
                  Deep Smoky oud with warm amber notes
                </p>
                <Link
                  href="/collections/desert-oud"
                  className="underline text-sm font-medium hover:text-gray-200 transition"
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
                <h1 className="font-display text-3xl md:text-[32px] xl:text-[36px] leading-tight tracking-tight text-shadow-lg/30">
                  ROSE OF DUBAI
                </h1>
                <p className="font-serif text-base md:text-lg max-w-md">
                  Lush rose intertwined with saffron spice
                </p>
                <Link
                  href="/collections/desert-oud"
                  className="underline text-sm font-medium hover:text-gray-200 transition"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DiscoverSection />
    </div>
  );
}
