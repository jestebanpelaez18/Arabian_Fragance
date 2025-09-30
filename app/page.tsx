import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";
import DiscoverSection from "@/components/sections/DiscoverSection";
import PhotoMosaicCarousel from "@/components/sections/PhotoMosaicCarousel";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-[90vh] md:min-h-screen">
        <Image
          src="/hero/heroPicture.jpg"
          alt="Discover Arabian Luxury"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm tracking-[0.2em] uppercase opacity-70 md:text-base">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl leading-tight tracking-wide text-shadow-lg/30 md:text-6xl lg:text-7xl">
            DISCOVER THE ESSENCE
            <br />
            OF ARABIAN LUXURY
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg opacity-90 text-shadow-lg/30 md:text-xl">
            Experience fragrances from Dubai: bold, sensual and unforgettable.
          </p>
          <div className="mt-10">
            <Button
              href="/shop"
              variant="secondary"
              className="font-roboto rounded-full border border-white/80 px-10 py-3 text-sm transition hover:bg-white hover:text-[var(--bordeaux)] md:text-base"
            >
              Discover Now
            </Button>
          </div>
        </div>
      </section>
      <section className="relative min-h-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          <div className="relative aspect-[3/4]">
            <Image
              src="/collections/collection-desert-oud.jpg"
              alt="Arabian Fragrance - Collection Desert Oud"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-2 px-6 pb-8 text-white md:px-12 xl:px-16">
                <h1 className="font-playfair-display text-3xl leading-tight tracking-tight text-shadow-lg/30 md:text-[32px] xl:text-[36px]">
                  DESERT OUD
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
              src="/collections/collection-golden-sands.jpg"
              alt="Arabian Fragrance - Collection Golden Sands"
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
              src="/collections/collection-rose-dubai.jpg"
              alt="Arabian Fragrance - Collection Rose of Dubai"
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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <span className="font-garamond mb-4 text-sm tracking-[0.25em] text-white/70 uppercase">
            Exclusive Gift Collection
          </span>
          <h1 className="font-playfair-display max-w-3xl text-4xl leading-tight tracking-[-0.01em] text-white text-shadow-lg/30 md:text-5xl xl:text-6xl">
            GIFT THE ESSENCE OF LUXURY
          </h1>
          <p className="font-garamond mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Transform any occasion into a memory with our exclusive fragrances.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
          <div className="h-px w-16 bg-white/30" />
          <Button
            href="/shop"
            variant="secondary"
            className="font-roboto hover:text-bordeaux rounded-full border border-white/70 px-8 py-3 shadow-sm transition hover:bg-white"
          >
            Shop Gifts
          </Button>
        </div>
      </section>
      <section className="grid min-h-[680px] grid-cols-1 px-5 py-2.5 md:grid-cols-2">
        <div className="bg-bordeaux flex flex-col justify-center border-r border-white/20 px-16 py-20 text-white lg:px-20">
          <span className="mb-6 font-serif text-xs/relaxed tracking-[0.2em] uppercase opacity-70">
            Experience
          </span>
          <h2 className="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            DISCOVER OUR LUXURIOUS HELSINKI SHOWROOM
          </h2>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Step into a world of elegance and sophistication at our Helsinki
            showroom. Immerse yourself in the captivating scents of Arabian
            Fragrance and find your perfect signature scent.
          </p>
          <div className="mt-10 h-px w-full bg-white/15" />
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-playfair-display text-[15px] tracking-[0.08em] uppercase">
                Helsinki Showroom
              </h3>
              <p className="font-garamond mt-2 text-base/relaxed opacity-80">
                Visit us to explore our exquisite fragrance collection in a
                luxurious setting.
              </p>
            </div>
            <div>
              <h3 className="font-playfair-display text-[15px] tracking-[0.08em] uppercase">
                Book Your Visit
              </h3>
              <p className="font-garamond mt-2 text-base/relaxed opacity-80">
                Join us at our address: Helsinki city center
              </p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <Button
              variant="secondary"
              className="font-lato rounded-full px-6 py-3 shadow-sm shadow-black/5 transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-black/10"
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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-sm tracking-[0.25em] text-white/70 uppercase">
            Invitation
          </span>
          <h1 className="font-playfair-display max-w-3xl text-4xl leading-tight tracking-[-0.01em] text-white text-shadow-lg/30 md:text-5xl xl:text-6xl">
            ARABIAN FRAGANCE PARTY AWAITS YOU
          </h1>
          <p className="font-garamond mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Join us for an unforgettable evening filled with elegance and
            allure. Experience the essence of Arabian luxury as we unveil our
            exquisite fragrance collection
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
          <div className="h-px w-16 bg-white/30" />
          <Button
            href="/shop"
            variant="secondary"
            className="hover:text-bordeaux rounded-full border border-white/70 px-8 py-3 shadow-sm transition hover:bg-white"
          >
            Explore Now
          </Button>
        </div>
      </section>
      <section className="grid min-h-[680px] grid-cols-1 px-5 py-2.5 md:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 bg-black/0 lg:bg-black/0" />
          <Image
            src="/hero/story.jpg"
            alt="Helsinki showroom"
            fill
            className="object-cover object-[50%_35%]"
            priority
          />
        </div>
        <div className="bg-bordeaux flex flex-col justify-center border-r border-white/20 px-16 py-20 text-white lg:px-20">
          <span className="font-garamond mb-6 text-xs/relaxed tracking-[0.2em] uppercase opacity-70">
            About Arabian Fragance
          </span>
          <h2 className="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            OUR STORY OF LUXURIOUS ARABIAN FRAGANCES
          </h2>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Born in Dubai, the heart of Arabian perfumery, our brand blends
            tradition and luxury to create unique fragrances that embody
            elegance and sophistication. Each scent is carefully crafted with
            exquisite ingredients, capturing the essence of Arabian perfume
            artistry and delivering an exclusive olfactory experience that lasts
            over time.
          </p>
          <div className="mt-10 h-px w-full bg-white/15" />
          <div className="mt-10 flex items-center gap-6">
            <Button
              href="/about"
              variant="secondary"
              className="rounded-full px-6 py-3 shadow-sm shadow-black/5 transition hover:-translate-y-[1px] hover:shadow-lg hover:shadow-black/10"
            >
              Read More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
