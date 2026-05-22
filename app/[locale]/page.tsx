import DiscoverSection from "@/components/sections/DiscoverSection";
import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import AboutSection from "@/components/sections/AboutSection";
import { getDictionary } from "@/dictionaries/getDictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getHomeCollections } from "@/lib/shopify/get-collections";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import SectionHeader from "@/components/ui/SectionHeader";
import QuickNav from "@/components/layout/QuickNav";

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
  const products = await getShopifyProducts(resolvedParams.locale);
  const collections = await getHomeCollections(resolvedParams.locale);

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
      <QuickNav />
      <SectionHeader
        title="The Art of Essence"
        description="A curated selection of olfactory expressions crafted to define identity, blending heritage techniques with contemporary luxury."
      />

      <CategoryShowcase />
      <CollectionsShowcase collections={collections} />

      <SectionHeader
        title="La Collection Privée"
        description="Explore our signatures in their definitive forms. Compositions born from rare ingredients, tailored for those who seek an unforgettable trail."
      />
      <DiscoverSection products={products} />

      <GiftHero
        imageSrc="/hero/the_discovery_section.jpg"
        title={dict.gift?.title ?? "Iconic Gifts"}
        description={
          dict.gift?.description ??
          "Transform any occasion into a memory with our exclusive fragrances."
        }
        ctaLabel={dict.gift?.ctaLabel ?? "Shop Now"}
        ctaHref="/shop"
      />

      <ShowroomSection />
      <AboutSection
        title={dict.about?.title ?? "OUR STORY"}
        descriptions={[
          dict.about?.description1 ??
            "Born from the heart of Arabian perfumery, our fragrances blend tradition, rare ingredients and timeless elegance.",
          dict.about?.description2 ??
            "Each scent is crafted to leave a lasting impression.",
        ]}
        reverse
        ctaHref="/about"
        ctaLabel={dict.about?.ctaLabel ?? "Discover Our Story"}
      />
    </div>
  );
}
