"use client";

import DiscoverSection from "@/components/sections/DiscoverSection";
import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import LinkSectionDivider from "@/components/ui/LinkSectionDivider";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import InvitationHero from "@/components/sections/InvitationHero";
import AboutSection from "@/components/sections/AboutSection";

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
      <SectionDivider text="Our Story" />
      <AboutSection
        title="OUR STORY"
        descriptions={[
          "Born from the heart of Arabian perfumery, our fragrances blend tradition, rare ingredients and timeless elegance.",
          "Each scent is crafted to leave a lasting impression.",
        ]}
        reverse
        showDivider={false}
        ctaHref="/about"
        ctaLabel="Discover Our Story"
      />
    </div>
  );
}
