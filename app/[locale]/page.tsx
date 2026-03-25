import DiscoverSection from "@/components/sections/DiscoverSection";
import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import LinkSectionDivider from "@/components/ui/LinkSectionDivider";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import InvitationHero from "@/components/sections/InvitationHero";
import AboutSection from "@/components/sections/AboutSection";
import { getDictionary } from "@/dictionaries/getDictionary";
import { i18n, type Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const dictionary = await getDictionary(resolvedParams.locale);

  return {
    title: dictionary.store?.welcome ?? "Arabian Fragrance",
  };
}

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);

  return (
    <div>
      {/* ===== Main HERO ===== */}
      <LuxeHero
        title={dict.hero?.title ?? "THE ART OF ARABIAN PERFUMERY"}
        subtitle={
          dict.hero?.subtitle ??
          "Luxury fragrances inspired by Dubai’s elegance."
        }
        ctaLabel={dict.hero?.ctaLabel ?? "Shop the collection"}
        ctaHref="/shop"
        imageSrc="/hero/AFC-hero-main.avif"
        fit="cover"
        objectClassName="object-[50%_35%]"
        minH="min-h-[90svh] md:min-h-screen"
      />

      <LinkSectionDivider
        text={dict.dividers?.shop ?? "Shop the Collection"}
        href="/shop"
        ariaLabel={dict.dividers?.shop ?? "Shop the Collection"}
      />

      <CategoryShowcase />
      <DiscoverSection />

      <GiftHero
        imageSrc="/hero/gift.jpg"
        label={dict.gift?.label ?? "Exclusive Gift Collection"}
        title={dict.gift?.title ?? "Iconic Gifts"}
        description={
          dict.gift?.description ??
          "Transform any occasion into a memory with our exclusive fragrances."
        }
        ctaLabel={dict.gift?.ctaLabel ?? "Shop Now"}
        ctaHref="/shop"
        heightClassName="h-[78vh] md:h-[70vh]"
        contentAlign="center"
      />

      {/* The rest of your components go here, replacing text with dict.something */}
      <SectionDivider text={dict.dividers?.experience ?? "Experience"} />
      <ShowroomSection />

      <SectionDivider text={dict.dividers?.invitation ?? "Invitation"} />
      <InvitationHero
        imageSrc="/hero/party.jpg"
        title={dict.invitation?.title ?? "ARABIAN FRAGRANCE LAUNCH"}
        description={
          dict.invitation?.description ??
          "An exclusive evening celebrating the art of Arabian perfumery."
        }
        ctaHref="/shop"
        ctaLabel={dict.invitation?.ctaLabel ?? "Explore Now"}
        heightClassName="h-[78vh] md:h-[70vh]"
      />

      <SectionDivider text={dict.dividers?.ourStory ?? "Our Story"} />
      <AboutSection
        title={dict.about?.title ?? "OUR STORY"}
        descriptions={[
          dict.about?.description1 ??
            "Born from the heart of Arabian perfumery, our fragrances blend tradition, rare ingredients and timeless elegance.",
          dict.about?.description2 ??
            "Each scent is crafted to leave a lasting impression.",
        ]}
        reverse
        showDivider={false}
        ctaHref="/about"
        ctaLabel={dict.about?.ctaLabel ?? "Discover Our Story"}
      />
    </div>
  );
}
