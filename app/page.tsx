"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import DiscoverSection from "@/components/sections/DiscoverSection";
import PhotoMosaicCarousel from "@/components/sections/PhotoMosaicCarousel";
import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import LinkSectionDivider from "@/components/ui/LinkSectionDivider";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import InvitationHero from "@/components/sections/InvitationHero";

export default function Home() {
  return (
    <div>
      {/* ===== HERO principal ===== */}
      <LuxeHero
        title="THE ART OF ARABIAN PERFUMERY"
        subtitle="Luxury fragrances inspired by Dubai’s elegance."
        ctaLabel="Shop the collection"
        ctaHref="/shop"
        imageSrc="/hero/AFC-hero-main.avif"
        fit="cover"
        objectClassName="object-[50%_35%]"
        minH="min-h-[90svh] md:min-h-screen"
      />
      <LinkSectionDivider
        text="Shop the Collection"
        href="/shop"
        ariaLabel="Shop the Collection"
      />
      <CategoryShowcase />
      <DiscoverSection />
      <GiftHero
        imageSrc="/hero/gift.jpg"
        label="Exclusive Gift Collection"
          title="Iconic Gifts"
          description="Transform any occasion into a memory with our exclusive fragrances."
          ctaLabel="Shop Now"
        ctaHref="/shop"
        heightClassName="h-[78vh] md:h-[70vh]"
          contentAlign="center"
      />
      <SectionDivider text="Experience" />
      <ShowroomSection />
      <SectionDivider text="Invitation" />
      <InvitationHero
        imageSrc="/hero/party.jpg"
        title="ARABIAN FRAGRANCE LAUNCH"
        description="An exclusive evening celebrating the art of Arabian perfumery."
        ctaHref="/shop"
        ctaLabel="Explore Now"
        heightClassName="h-[78vh] md:h-[70vh]"
      />

      <section className="grid min-h-[680px] grid-cols-1 px-2.5 py-2.5 md:grid-cols-2 md:px-5">
        <div className="relative order-1 aspect-4/3 md:order-1 md:aspect-auto md:min-h-[680px]">
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

        <div className="order-2 flex flex-col justify-center px-16 py-20 md:order-2 md:border-l md:border-white/20 lg:px-20">
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
