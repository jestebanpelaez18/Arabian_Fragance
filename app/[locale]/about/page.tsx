import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import NextDynamic from "next/dynamic";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

// Fuerza prerender estático y cacheado
export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const SimpleTextImageSection = NextDynamic(
  () => import("@/components/sections/SimpleTextImageSection"),
  {
    loading: () => <section className="min-h-[520px] md:min-h-[560px]" />,
  },
);
const FullImageTextSection = NextDynamic(
  () => import("@/components/sections/FullImageTextSection"),
  {
    loading: () => <section className="min-h-[70vh]" />,
  },
);

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div>
      <LuxeHero
        title={dict.aboutPage.heroTitle}
        subtitle={dict.aboutPage.heroSubtitle}
        imageSrc="/about/aboutusPicture.jpg"
        fit="cover"
        objectClassName="object-[50%_35%]"
        minH="min-h-[90svh] md:min-h-screen"
      />
      <SectionDivider text={dict.aboutPage.discoverDivider} />
      <SimpleTextImageSection
        title={dict.aboutPage.storyTitle}
        descriptions={dict.aboutPage.storyDescriptions}
        imageSrc="/hero/gift.jpg"
        imageAlt="Arabian Fragrance Story"
      />
      <section className="relative h-[200px] py-16 md:h-[220px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center md:px-16">
          <p className="font-garamond max-w-7xl text-2xl leading-relaxed text-black md:text-3xl">
            {dict.aboutPage.quote}
          </p>
        </div>
      </section>
      <SectionDivider text={dict.aboutPage.experienceDivider} />
      {/* Lazy-load debajo del fold */}
      <SimpleTextImageSection
        title={dict.aboutPage.perfumesTitle}
        descriptions={dict.aboutPage.perfumesDescriptions}
        imageSrc="/collections/collection-desert-oud.jpg"
        imageAlt="Arabian Frangance Story"
        objectClassName="object-cover object-[50%_35%]"
        reverse={true}
        titleClassName="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl"
      />
      <FullImageTextSection
        imageSrc="/about/aboutusPicture2.jpg"
        imageAlt="Our Perfumes"
        minH="min-h-screen md:min-h-[90vh]"
        objectClassName="object-cover object-center"
        overlayClassName="bg-black/50"
        overlayInset="top-5 right-5 bottom-5 left-5"
        paragraph={dict.aboutPage.fullImageParagraph}
        paragraphClassName="font-garamond mt-4 max-w-3xl text-2xl text-white/70 md:text-3xl"
      />
    </div>
  );
}
