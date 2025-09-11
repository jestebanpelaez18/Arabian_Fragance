import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import DiscoverSection from "@/components/sections/DiscoverSection";
import PhotoMosaicCarousel from "@/components/sections/PhotoMosaicCarousel";

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
      <PhotoMosaicCarousel />
      <section className="relative min-h-screen md:min-h-[90vh]">
        <Image
          src="/hero/gift.jpg"
          alt="Gift the essence of luxury"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <span className="uppercase tracking-[0.25em] text-sm text-white/70 mb-4">
            Exclusive Gift Collection
          </span>
          <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-tight tracking-[-0.01em] text-white max-w-3xl text-shadow-lg/30">
            GIFT THE ESSENCE OF LUXURY
          </h1>
          <p className="mt-6 font-serif text-lg md:text-xl text-white/85 max-w-xl">
            Transform any occasion into a memory with our exclusive fragrances.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="h-px w-16 bg-white/30" />
          <Button
            href="/shop"
            variant="secondary"
            className="rounded-full px-8 py-3 border border-white/70 hover:bg-white hover:text-bordeaux transition shadow-sm"
          >
            Shop Gifts
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[680px] py-2.5 px-5">
        <div className="bg-bordeaux text-white py-20 px-16 lg:px-20 flex flex-col justify-center border-r border-white/20">
          <span className="font-serif uppercase tracking-[0.2em] text-xs/relaxed opacity-70 mb-6">
            Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-[-0.01em]">
            DISCOVER OUR LUXURIOUS HELSINKI SHOWROOM
          </h2>
          <p className="mt-6 font-serif text-lg/relaxed opacity-85 max-w-lg">
            Step into a world of elegance and sophistication at our Helsinki
            showroom. Immerse yourself in the captivating scents of Arabian
            Fragrance and find your perfect signature scent.
          </p>
          <div className="mt-10 h-px w-full bg-white/15" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-[15px] uppercase tracking-[0.08em]">
                Helsinki Showroom
              </h3>
              <p className="mt-2 font-serif text-base/relaxed opacity-80">
                Visit us to explore our exquisite fragrance collection in a
                luxurious setting.
              </p>
            </div>
            <div>
              <h3 className="font-display text-[15px] uppercase tracking-[0.08em]">
                Book Your Visit
              </h3>
              <p className="mt-2 font-serif text-base/relaxed opacity-80">
                Join us at our address: Helsinki city center
              </p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <div className="h-px w-16 bg-white/30" />
            <Button
              variant="secondary"
              className="rounded-full px-6 py-3 shadow-sm shadow-black/5 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-[1px] transition"
            >
              Book your visit
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-black/0 lg:bg-black/0" />
          <Image
            src="/hero/shop.jpg"
            alt="Helsinki showroom"
            fill
            className="object-cover object-[50%_35%]"
            priority
          />
        </div>
      </section>
      <section className="relative min-h-screen md:min-h-[90vh]">
        <Image
          src="/hero/party.jpg"
          alt="Gift the essence of luxury"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <span className="uppercase tracking-[0.25em] text-sm text-white/70 mb-4">
            Invitation
          </span>
          <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-tight tracking-[-0.01em] text-white max-w-3xl text-shadow-lg/30">
           ARABIAN FRAGANCE PARTY AWAITS YOU
          </h1>
          <p className="mt-6 font-serif text-lg md:text-xl text-white/85 max-w-xl">
            Join us for an unforgettable evening filled with elegance and allure. Experience the essence of Arabian luxury as we unveil our exquisite fragrance collection
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="h-px w-16 bg-white/30" />
          <Button
            href="/shop"
            variant="secondary"
            className="rounded-full px-8 py-3 border border-white/70 hover:bg-white hover:text-bordeaux transition shadow-sm"
          >
            Explore Now
          </Button>
        </div>
      </section>
    </div>
  );
}
