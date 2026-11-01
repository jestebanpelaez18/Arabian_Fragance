import { getImageProps } from "next/image";
import SmoothImage from "@/components/ui/SmoothImage";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";
import {
  getAboutPage,
  type AboutPageContent,
  type AboutPageImage,
} from "@/lib/shopify/get-about-page";

export const dynamic = "force-static";
export const revalidate = 300;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

function Paragraphs({ text, className }: { text: string; className: string }) {
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

function AboutHero({
  title,
  subtitle,
  image,
  mobileImage,
}: {
  title: string;
  subtitle: string;
  image: AboutPageImage;
  mobileImage: AboutPageImage | null;
}) {
  const selectedMobileImage = mobileImage ?? image;

  const commonProps = {
    alt: "",
    sizes: "100vw",
    quality: 90,
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };

  const { props: desktopProps } = getImageProps({
    ...commonProps,
    src: image.url,
    width: image.width,
    height: image.height,
  });

  const { props: mobileProps } = getImageProps({
    ...commonProps,
    src: selectedMobileImage.url,
    width: selectedMobileImage.width,
    height: selectedMobileImage.height,
  });

  return (
    <section
      aria-labelledby="about-page-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <div className="relative aspect-4/5 w-full md:aspect-[16/7]">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={mobileProps.srcSet}
            sizes={mobileProps.sizes}
          />

          <img
            {...desktopProps}
            alt=""
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        <div className="pointer-events-none absolute inset-0 hidden bg-black/40 md:block" />
      </div>

      <div className="relative px-5 py-10 text-center md:absolute md:inset-0 md:z-10 md:flex md:items-center md:justify-center md:px-8 md:py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h1
            id="about-page-heading"
            className="font-magister max-w-[20ch] text-[32px] leading-[1.15] font-normal tracking-[0.02em] text-neutral-900 md:text-[44px] md:text-white lg:text-[56px]"
          >
            {title}
          </h1>

          {subtitle && (
            <p className="font-garamond mt-4 max-w-xl text-base leading-relaxed whitespace-pre-line text-neutral-600 md:mt-5 md:text-lg md:text-white/90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function StorySection({
  headingId,
  title,
  text,
  image,
  imageOnRight = false,
}: {
  headingId: string;
  title: string;
  text: string;
  image: AboutPageImage;
  imageOnRight?: boolean;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="w-full px-5 py-10 md:py-14 xl:px-6"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div
          className={[
            "relative aspect-4/5 w-full overflow-hidden",
            imageOnRight ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <SmoothImage
            src={image.url}
            alt={image.altText ?? ""}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            loading="lazy"
            className="object-cover object-center"
          />
        </div>

        <div
          className={[
            "px-1 md:px-8 lg:px-10",
            imageOnRight ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <div className="mx-auto max-w-lg">
            <h2
              id={headingId}
              className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[34px] lg:text-[40px]"
            >
              {title}
            </h2>

            <div className="mt-6 flex flex-col gap-5">
              <Paragraphs
                text={text}
                className="font-garamond text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.aboutPage.storyTitle,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const [dict, shopifyContent] = await Promise.all([
    getDictionary(locale),
    getAboutPage(locale),
  ]);

  const fallbackContent: AboutPageContent = {
    heroTitle: dict.aboutPage.heroTitle,
    heroSubtitle: dict.aboutPage.heroSubtitle,
    heroImage: {
      url: "/about/aboutusPicture.jpg",
      altText: null,
      width: 1920,
      height: 1080,
    },
    heroMobileImage: null,
    storyTitle: dict.aboutPage.storyTitle,
    storyText: dict.aboutPage.storyDescriptions.join("\n\n"),
    storyImage: {
      url: "/hero/story.jpg",
      altText: null,
      width: 800,
      height: 1000,
    },
    fragrancesTitle: dict.aboutPage.perfumesTitle,
    fragrancesText: dict.aboutPage.perfumesDescriptions.join("\n\n"),
    fragrancesImage: {
      url: "/collections/collection-desert-oud.jpg",
      altText: null,
      width: 800,
      height: 1000,
    },
    closingText: dict.aboutPage.fullImageParagraph,
    closingImage: {
      url: "/about/aboutusPicture2.jpg",
      altText: null,
      width: 1920,
      height: 1080,
    },
  };

  const content = shopifyContent ?? fallbackContent;

  return (
    <div className="bg-background">
      <AboutHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        image={content.heroImage}
        mobileImage={content.heroMobileImage}
      />

      <div className="py-2 md:py-4">
        <StorySection
          headingId="about-story-heading"
          title={content.storyTitle}
          text={content.storyText}
          image={content.storyImage}
        />

        <StorySection
          headingId="about-fragrances-heading"
          title={content.fragrancesTitle}
          text={content.fragrancesText}
          image={content.fragrancesImage}
          imageOnRight
        />
      </div>

      <section
        aria-label={content.heroTitle}
        className="px-5 pt-4 pb-12 md:pt-6 md:pb-16 xl:px-6"
      >
        <div className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-16 md:min-h-[480px] md:px-12 md:py-20">
          <SmoothImage
            src={content.closingImage.url}
            alt={content.closingImage.altText ?? ""}
            fill
            sizes="100vw"
            quality={88}
            loading="lazy"
            className="object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/50" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5 text-center">
            <Paragraphs
              text={content.closingText}
              className="font-garamond text-xl leading-relaxed whitespace-pre-line text-white md:text-[28px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
