"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import DiscoverSection from "@/components/sections/DiscoverSection";
import PhotoMosaicCarousel from "@/components/sections/PhotoMosaicCarousel";

export default function Home() {
  return (
    <div>
      {/* ===== HERO principal ===== */}
      <section className="grain relative min-h-[90svh] md:min-h-screen">
        <Image
          src="/hero/heroPicture.jpg"
          alt="Discover Arabian Luxury"
          fill
          sizes="100vw"
          className="ease-luxe object-cover object-[50%_22%] md:object-[50%_35%]"
          priority
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-transparent" />
        <div className="overlay-amber absolute inset-0" />

        <div className="safe-area absolute inset-0 flex flex-col items-center justify-center px-6 pt-14 text-center text-white md:pt-0">
          <p className="mb-4 text-sm tracking-[0.2em] uppercase opacity-70 md:text-base">
            Introducing
          </p>
          <h1 className="font-playfair-display text-shadow-soft text-4xl leading-tight tracking-[0.08em] md:text-6xl lg:text-7xl">
            DISCOVER THE ESSENCE
            <br />
            OF ARABIAN LUXURY
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Experience fragrances from Dubai: bold, sensual and unforgettable.
          </p>
          <div className="mt-10">
            <Button
              href="/shop"
              variant="secondary"
              className="btn-luxe min-h-11"
            >
              Discover Now
            </Button>
          </div>
        </div>
      </section>

      <section className="relative min-h-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {/* Women Perfumes */}
          <Link
            href="/shop/women"
            prefetch
            className="group card-luxe relative block aspect-[3/4]"
          >
            <Image
              src="/shop/hero-women.jpg"
              alt="Arabian Fragrance - Women perfumes"
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="ease-luxe object-cover transition-transform duration-500 group-active:scale-[0.99]"
              loading="lazy"
              priority={false}
              decoding="async"
            />
            <div className="absolute inset-0 z-10 flex items-end bg-black/30 md:bg-transparent">
              <div className="mx-auto w-full max-w-7xl px-6 pb-8 text-white md:px-12 xl:px-16">
                <h2 className="font-playfair-display text-shadow-soft text-3xl leading-tight tracking-tight md:text-[32px] xl:text-[36px]">
                  SHOP FOR HER
                </h2>
                <p className="font-garamond mt-1 max-w-md text-lg md:text-xl">
                  Deep smoky oud with warm amber notes
                </p>
                <span className="font-roboto link-gold mt-2 inline-block text-sm font-medium underline">
                  Shop now
                </span>
              </div>
            </div>
          </Link>

          {/* Golden Sands */}
          <Link
            href="/shop/men"
            prefetch
            className="group card-luxe relative block aspect-[3/4]"
          >
            <Image
              src="/shop/hero-men.jpg"
              alt="Arabian Fragrance - Shop men"
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="ease-luxe object-cover transition-transform duration-500 group-active:scale-[0.99]"
              loading="lazy"
              priority={false}
              decoding="async"
            />
            <div className="absolute inset-0 z-10 flex items-end bg-black/30 md:bg-transparent">
              <div className="mx-auto w-full max-w-7xl px-6 pb-8 text-white md:px-12 xl:px-16">
                <h2 className="font-playfair-display text-shadow-soft text-3xl leading-tight tracking-tight md:text-[32px] xl:text-[36px]">
                  SHOP FOR HIM
                </h2>
                <p className="font-garamond mt-1 max-w-md text-lg md:text-xl">
                  Sun-warmed amber with desert spice
                </p>
                <span className="font-roboto link-gold mt-2 inline-block text-sm font-medium underline">
                  Shop now
                </span>
              </div>
            </div>
          </Link>

          {/* Rose of Dubai */}
          <Link
            href="/shop/unisex"
            prefetch
            className="group card-luxe relative block aspect-[3/4]"
          >
            <Image
              src="/shop/hero-unisex.jpg"
              alt="Arabian Fragrance - Unisex perfumes"
              fill
              sizes="(min-width:768px) 33vw, 100vw"
              className="ease-luxe object-cover transition-transform duration-500 group-active:scale-[0.99]"
              loading="lazy"
              priority={false}
              decoding="async"
            />
            <div className="absolute inset-0 z-10 flex items-end bg-black/30 md:bg-transparent">
              <div className="mx-auto w-full max-w-7xl px-6 pb-8 text-white md:px-12 xl:px-16">
                <h2 className="font-playfair-display text-shadow-soft text-3xl leading-tight tracking-tight md:text-[32px] xl:text-[36px]">
                  UNISEX
                </h2>
                <p className="font-garamond mt-1 max-w-md text-lg md:text-xl">
                  Lush rose intertwined with saffron spice
                </p>
                <span className="font-roboto link-gold mt-2 inline-block text-sm font-medium underline">
                  Shop now
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== Secciones personalizadas ===== */}
      <DiscoverSection />
      <PhotoMosaicCarousel />

      {/* ===== Gift hero ===== */}
      <section className="relative h-[78vh] overflow-hidden md:h-[70vh]">
        <Image
          src="/hero/gift.jpg"
          alt="Gift the essence of luxury"
          fill
          sizes="100vw"
          className="scale-[1.06] object-cover object-center"
          priority={false}
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Degradado fuerte abajo para legibilidad */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

        {/* Contenido en el tercio inferior */}
        <div className="absolute inset-x-0 bottom-0 px-8 pb-14 text-center text-white md:px-16 md:pb-16 lg:px-32 xl:px-48">
          <span className="font-garamond mb-3 block text-[11px] tracking-[0.34em] uppercase opacity-75">
            Exclusive Gift Collection
          </span>

          <h2 className="font-playfair-display mx-auto max-w-4xl text-4xl leading-[1.15] tracking-[-0.015em] md:text-[44px] lg:text-[50px]">
            GIFT THE ESSENCE OF LUXURY
          </h2>

          <p className="font-garamond mx-auto mt-3 max-w-2xl text-[15px] opacity-90 md:mt-4 md:text-lg">
            Transform any occasion into a memory with our exclusive fragrances.
          </p>

          <div className="mt-7">
            <Button
              href="/shop"
              variant="secondary"
              className="rounded-full border border-white/70 bg-white/10 px-8 py-3 text-[13px] tracking-[0.14em] backdrop-blur-sm transition hover:bg-white hover:text-[var(--background)]"
            >
              Shop Gifts
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Showroom (texto izq en desktop, imagen der) ===== */}
      <section className="grid min-h-[680px] grid-cols-1 px-5 py-3 md:grid-cols-2">
        {/* Imagen arriba en mobile, derecha en desktop */}
        <div className="relative order-1 aspect-[4/3] md:order-2 md:aspect-auto md:min-h-[680px]">
          <Image
            src="/hero/shop.jpg"
            alt="Helsinki showroom"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-[50%_35%]"
            loading="lazy"
            priority={false}
            decoding="async"
          />
        </div>

        {/* Texto */}
        <div className="bg-bordeaux order-2 flex flex-col justify-center border-b border-black/20 px-16 py-20  md:order-1 md:border-r md:border-b-0 lg:px-20">
          <span className="mb-6 font-serif text-xs tracking-[0.2em] uppercase opacity-70">
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
            <Button className="btn-luxe min-h-11">Book your visit</Button>
          </div>
        </div>
      </section>

      {/* ===== Party hero ===== */}
      <section className="relative h-[78vh] overflow-hidden md:h-[70vh]">
        <Image
          src="/hero/party.jpg"
          alt="A special invitation"
          fill
          sizes="100vw"
          className="scale-[1.06] object-cover object-center"
          priority={false}
          quality={90}
        />

        {/* Overlay + degradado fuerte abajo para legibilidad */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

        {/* Contenido en el tercio inferior */}
        <div className="absolute inset-x-0 bottom-0 px-8 pb-14 text-center text-white md:px-16 md:pb-16 lg:px-32 xl:px-48">
          <span className="mb-3 block text-[11px] tracking-[0.34em] uppercase opacity-75">
            Invitation
          </span>

          <h2 className="font-playfair-display mx-auto max-w-4xl text-4xl leading-[1.15] tracking-[-0.015em] md:text-[44px] lg:text-[50px]">
            ARABIAN FRAGANCE LAUNCH PARTY
          </h2>

          <p className="font-garamond mx-auto mt-3 max-w-2xl text-[15px] opacity-90 md:mt-4 md:text-lg">
            Join us for an unforgettable evening filled with elegance and
            allure. Experience the essence of Arabian luxury as we unveil our
            exquisite fragrance collection.
          </p>

          <div className="mt-7">
            <Button
              href="/shop"
              variant="secondary"
              className="rounded-full border border-white/70 bg-white/10 px-8 py-3 text-[13px] tracking-[0.14em] backdrop-blur-sm transition hover:bg-white hover:text-[var(--background)]"
            >
              Explore Now
            </Button>
          </div>
        </div>
      </section>

      <section className="grid min-h-[680px] grid-cols-1 px-2.5 py-2.5 md:grid-cols-2 md:px-5">
        <div className="relative order-1 aspect-[4/3] md:order-1 md:aspect-auto md:min-h-[680px]">
          <Image
            src="/hero/story.jpg"
            alt="Our Story"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover object-[50%_35%]"
            loading="lazy"
            priority={false}
            decoding="async"
          />
        </div>

        <div className="bg-bordeaux order-2 flex flex-col justify-center px-16 py-20 md:order-2 md:border-l md:border-white/20 lg:px-20">
          <span className="font-garamond mb-6 text-xs/relaxed tracking-[0.2em] uppercase opacity-70">
            About Arabian Fragance
          </span>
          <h2 className="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            OUR STORY OF LUXURIOUS ARABIAN FRAGRANCES
          </h2>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Born in Dubai, the heart of Arabian perfumery, our brand blends
            tradition and luxury to create unique fragrances that embody
            elegance and sophistication. Each scent is carefully crafted with
            exquisite ingredients, capturing the essence of Arabian perfume
            artistry and delivering an exclusive olfactory experience that lasts
            over time.
          </p>

          <div className="mt-10 h-px w-full bg-black/15" />

          <div className="mt-10 flex items-center gap-6">
            <Button href="/about" className="btn-luxe min-h-11">
              Read More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
