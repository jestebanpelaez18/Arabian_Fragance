import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const CONTACT_EMAIL = "info@wantafc.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const labels = dict.contactPage;

  const address = [labels.headquartersAddress, labels.headquartersCityCountry]
    .filter(Boolean)
    .join(", ");

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="bg-background text-foreground w-full">
      <article className="mx-auto max-w-4xl px-5 pt-12 pb-16 md:px-6 md:pt-16 md:pb-24">
        <header className="mb-10 text-center md:mb-14">
          <h1 className="font-magister text-[30px] leading-tight font-normal tracking-[0.02em] text-neutral-900 md:text-[44px]">
            {labels.title}
          </h1>

          <div className="bg-gold/50 mx-auto mt-6 h-px w-12" />
        </header>

        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="font-garamond text-lg leading-relaxed text-neutral-600 md:text-xl">
            {labels.intro}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <section>
            <h2 className="font-magister mb-5 text-xl leading-tight text-neutral-900 md:text-2xl">
              {labels.customerCareTitle}
            </h2>

            <p className="font-garamond text-lg leading-relaxed text-neutral-600">
              {labels.customerCareDescription}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-garamond hover:text-gold mt-5 inline-block border-b border-neutral-900/25 pb-1 text-lg break-all text-neutral-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </section>

          <section className="border-t border-neutral-900/10 pt-10 md:border-t-0 md:pt-0">
            <h2 className="font-magister mb-5 text-xl leading-tight text-neutral-900 md:text-2xl">
              {labels.headquartersTitle}
            </h2>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-garamond hover:text-gold inline-block text-lg leading-relaxed text-neutral-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="block">{labels.headquartersAddress}</span>
              <span className="block">{labels.headquartersCityCountry}</span>
            </a>
          </section>
        </div>
      </article>
    </div>
  );
}
