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
import { getHomeCategoryImages } from "@/lib/shopify/get-home-category-images";
import { getHomeSection } from "@/lib/shopify/get-home-section";
import { getHomeHero, type HomeHeroContent } from "@/lib/shopify/get-home-hero";
import { getHomePromotion } from "@/lib/shopify/get-home-promotion";

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

  const [
    dict,
    products,
    collections,
    shopifyHero,
    categoryImages,
    shopifyCategoryHeader,
    shopifyCollectionsHeader,
    shopifyFeaturedHeader,
    shopifyDiscoveryPromotion,
    shopifyShowroomPromotion,
    shopifyAboutPromotion,
  ] = await Promise.all([
    getDictionary(locale),
    getShopifyProducts(locale),
    getHomeCollections(locale),
    getHomeHero(locale),
    getHomeCategoryImages(locale),
    getHomeSection(locale, "categories"),
    getHomeSection(locale, "collections"),
    getHomeSection(locale, "featured"),
    getHomePromotion(locale, "discovery"),
    getHomePromotion(locale, "showroom"),
    getHomePromotion(locale, "about"),
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

  const categoryHeader = shopifyCategoryHeader ?? {
    title: dict.homeSections.artOfEssence.title,
    description: dict.homeSections.artOfEssence.description,
  };

  const collectionsHeader = shopifyCollectionsHeader ?? {
    title: dict.homeSections.collections.title,
    description: dict.homeSections.collections.description,
  };

  const featuredHeader = shopifyFeaturedHeader ?? {
    title: dict.homeSections.privateCollection.title,
    description: dict.homeSections.privateCollection.description,
  };

  const discoveryPromotion = shopifyDiscoveryPromotion ?? {
    title: dict.gift.title,
    description: dict.gift.description,
    imageSrc: "/hero/the_discovery_section.jpg",
    imageAlt: "",
    ctaLabel: dict.gift.ctaLabel,
    ctaHref: `/${locale}/shop/discovery`,
  };

  return (
    <div>
      <HomeHero hero={shopifyHero ?? fallbackHero} />

      <CategoryShowcase
        images={categoryImages}
        locale={locale}
        headerTitle={categoryHeader.title}
        headerDescription={categoryHeader.description}
      />

      <CollectionsShowcase
        collections={collections}
        headerTitle={collectionsHeader.title}
        headerDescription={collectionsHeader.description}
      />

      <DiscoverSection
        products={products}
        headerTitle={featuredHeader.title}
        headerDescription={featuredHeader.description}
      />

      <GiftHero
        imageSrc={discoveryPromotion.imageSrc}
        imageAlt={discoveryPromotion.imageAlt}
        title={discoveryPromotion.title}
        description={discoveryPromotion.description}
        ctaLabel={discoveryPromotion.ctaLabel}
        ctaHref={discoveryPromotion.ctaHref}
      />

      <ShowroomSection
        imageSrc={shopifyShowroomPromotion?.imageSrc}
        imageAlt={shopifyShowroomPromotion?.imageAlt}
        heading={shopifyShowroomPromotion?.title}
        description={shopifyShowroomPromotion?.description}
        ctaLabel={shopifyShowroomPromotion?.ctaLabel}
        ctaHref={shopifyShowroomPromotion?.ctaHref}
      />

      <AboutSection
        imageSrc={shopifyAboutPromotion?.imageSrc}
        imageAlt={shopifyAboutPromotion?.imageAlt}
        title={shopifyAboutPromotion?.title ?? dict.about.title}
        descriptions={
          shopifyAboutPromotion
            ? [shopifyAboutPromotion.description]
            : [dict.about.description1, dict.about.description2]
        }
        ctaHref={shopifyAboutPromotion?.ctaHref ?? `/${locale}/about`}
        ctaLabel={shopifyAboutPromotion?.ctaLabel ?? dict.about.ctaLabel}
        reverse
      />
    </div>
  );
}
