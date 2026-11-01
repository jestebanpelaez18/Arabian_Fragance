import { getImageProps } from "next/image";
import SmoothImage from "@/components/ui/SmoothImage";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";
import { getUiLabels } from "@/lib/i18n/uiLabels";
import {
  getShowroomPage,
  type ShowroomPageContent,
  type ShowroomPageImage,
} from "@/lib/shopify/get-showroom-page";

export const dynamic = "force-static";
export const revalidate = 300;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

type VisitLabels = {
  address: string;
  openingHours: string;
  contact: string;
  directions: string;
};

const VISIT_LABELS: Record<string, VisitLabels> = {
  en: {
    address: "Address",
    openingHours: "Opening hours",
    contact: "Contact",
    directions: "Get directions",
  },
  fi: {
    address: "Osoite",
    openingHours: "Aukioloajat",
    contact: "Yhteystiedot",
    directions: "Reittiohjeet",
  },
};

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-garamond text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

function ShowroomPageHero({
  title,
  subtitle,
  image,
  mobileImage,
}: {
  title: string;
  subtitle: string;
  image: ShowroomPageImage;
  mobileImage: ShowroomPageImage | null;
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
      aria-labelledby="showroom-page-heading"
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
            id="showroom-page-heading"
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

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return {
    title: getUiLabels(locale).sections.showroomHero.title,
  };
}

export default async function ShowroomPage({ params }: PageProps) {
  const { locale } = await params;

  const [dict, shopifyContent] = await Promise.all([
    getDictionary(locale),
    getShowroomPage(locale),
  ]);

  const heroLabels = getUiLabels(locale).sections.showroomHero;
  const visitLabels = VISIT_LABELS[locale] ?? VISIT_LABELS.en;

  const fallbackImage: ShowroomPageImage = {
    url: "/showroom/example_shop.avif",
    altText: heroLabels.imageAlt,
    width: 1920,
    height: 1080,
  };

  const fallbackContent: ShowroomPageContent = {
    heroTitle: heroLabels.title,
    heroSubtitle: "",
    heroImage: fallbackImage,
    heroMobileImage: null,
    locationTitle: dict.showroomPage.location.city,
    locationText: "",
    locationImage: fallbackImage,
    address: "",
    openingHours: "",
    phone: "",
    email: "",
  };

  const content = shopifyContent ?? fallbackContent;

  const directionsHref = content.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        content.address.replace(/\s+/g, " ").trim(),
      )}`
    : null;

  const phoneHref = content.phone.replace(/[^\d+]/g, "");

  const detailHeadingClass =
    "font-garamond text-xs tracking-[0.14em] text-neutral-900 uppercase";

  return (
    <div className="bg-background">
      <ShowroomPageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        image={content.heroImage}
        mobileImage={content.heroMobileImage}
      />

      <section
        aria-labelledby="showroom-location-heading"
        className="w-full px-5 py-10 md:py-16 xl:px-6"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="px-1 md:px-8 lg:px-10">
            <div className="mx-auto max-w-lg">
              <h2
                id="showroom-location-heading"
                className="font-magister text-[28px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[34px] lg:text-[40px]"
              >
                {content.locationTitle}
              </h2>

              {content.locationText && (
                <div className="mt-6 flex flex-col gap-5">
                  <Paragraphs text={content.locationText} />
                </div>
              )}

              {(content.address ||
                content.openingHours ||
                content.phone ||
                content.email) && (
                <div className="mt-8 grid gap-x-8 gap-y-8 border-t border-neutral-900/10 pt-8 sm:grid-cols-2">
                  {content.address && (
                    <div>
                      <h3 className={detailHeadingClass}>
                        {visitLabels.address}
                      </h3>

                      <address className="font-garamond mt-3 text-base leading-relaxed whitespace-pre-line text-neutral-600 not-italic md:text-lg">
                        {content.address}
                      </address>

                      {directionsHref && (
                        <a
                          href={directionsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-garamond hover:border-gold hover:text-gold mt-4 inline-block border-b border-neutral-900/30 pb-1.5 text-xs tracking-[0.14em] text-neutral-900 uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                        >
                          {visitLabels.directions}
                        </a>
                      )}
                    </div>
                  )}

                  {content.openingHours && (
                    <div>
                      <h3 className={detailHeadingClass}>
                        {visitLabels.openingHours}
                      </h3>

                      <p className="font-garamond mt-3 text-base leading-relaxed whitespace-pre-line text-neutral-600 md:text-lg">
                        {content.openingHours}
                      </p>
                    </div>
                  )}

                  {(content.phone || content.email) && (
                    <div className="sm:col-span-2">
                      <h3 className={detailHeadingClass}>
                        {visitLabels.contact}
                      </h3>

                      <div className="font-garamond mt-3 flex flex-col items-start gap-2 text-base leading-relaxed text-neutral-600 md:text-lg">
                        {content.phone &&
                          (/\d/.test(phoneHref) ? (
                            <a
                              href={`tel:${phoneHref}`}
                              className="hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                              {content.phone}
                            </a>
                          ) : (
                            <p>{content.phone}</p>
                          ))}

                        {content.email && (
                          <a
                            href={`mailto:${content.email}`}
                            className="hover:text-gold break-all underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                          >
                            {content.email}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-4/5 w-full overflow-hidden">
            <SmoothImage
              src={content.locationImage.url}
              alt={content.locationImage.altText ?? ""}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={88}
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
