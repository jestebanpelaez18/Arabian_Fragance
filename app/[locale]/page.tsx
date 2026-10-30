import HomeHero from "@/components/home/HomeHero";
import DiscoverSection from "@/components/sections/DiscoverSection";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import GiftHero from "@/components/sections/GiftHero";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import AboutSection from "@/components/sections/AboutSection";
import { getDictionary } from "@/dictionaries/getDictionary";
import { i18n, type Locale } from "@/i18n-config";
import { getShopifyProducts } from "@/lib/shopify/get-products";
import { getHomeCollections } from "@/lib/shopify/get-collections";
import { getHomeHero, type HomeHeroContent } from "@/lib/shopify/get-home-hero";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.store.welcome,
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const [dict, products, collections, shopifyHero] = await Promise.all([
    getDictionary(locale),
    getShopifyProducts(locale),
    getHomeCollections(locale),
    getHomeHero(locale),
  ]);

  const fallbackHero: HomeHeroContent = {
    title: dict.hero.title,
    subtitle: dict.hero.subtitle,
    desktopImage: {
      url: "/hero/brand_hero.avif",
      altText: null,
      width: 1920,
      height: 1080,
    },
    mobileImage: null,
    buttonLabel: dict.hero.ctaLabel,
    buttonHref: `/${locale}/shop`,
  };

  return (
    <div>
      <HomeHero hero={shopifyHero ?? fallbackHero} />

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
