import DiscoverSection from "@/components/sections/DiscoverSection";
import LuxeHero from "@/components/ui/LuxeHero";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import AboutSection from "@/components/sections/AboutSection";
import { getDictionary } from "@/dictionaries/getDictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getHomeCollections } from "@/lib/shopify/get-collections";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
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
    title: dictionary.store.welcome,
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
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        ctaLabel={dict.hero.ctaLabel}
        ctaHref="/shop"
        imageSrc="/hero/brand_hero.avif"
        fit="cover"
        objectClassName="object-[50%_35%]"
        minH="min-h-[90svh] md:min-h-screen"
      />
      <QuickNav />
      <CategoryShowcase
        headerTitle={dict.homeSections.artOfEssence.title}
        headerDescription={dict.homeSections.artOfEssence.description}
      />
      <CollectionsShowcase
        collections={collections}
        headerTitle={dict.homeSections.collections.title}
        headerDescription={dict.homeSections.collections.description}
      />

      <DiscoverSection
        products={products}
        headerTitle={dict.homeSections.privateCollection.title}
        headerDescription={dict.homeSections.privateCollection.description}
      />

      <GiftHero
        imageSrc="/hero/the_discovery_section.jpg"
        title={dict.gift.title}
        description={dict.gift.description}
        ctaLabel={dict.gift.ctaLabel}
        ctaHref="/shop"
      />

      <ShowroomSection />
      <AboutSection
        title={dict.about.title}
        descriptions={[dict.about.description1, dict.about.description2]}
        reverse
        ctaHref="/about"
        ctaLabel={dict.about.ctaLabel}
      />
    </div>
  );
}
