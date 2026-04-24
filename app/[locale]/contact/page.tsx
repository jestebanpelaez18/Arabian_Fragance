import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

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

  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-ink text-4xl tracking-[0.2em] uppercase md:text-5xl">
            {dict.contactPage.title}
          </h1>
          <div className="bg-gold/50 mx-auto mt-8 h-px w-16" />
        </header>

        {/* INTRODUCCIÓN */}
        <div className="mb-16 text-center">
          <p className="font-garamond text-ink/85 text-xl leading-loose">
            {dict.contactPage.intro}
          </p>
        </div>

        {/* DETALLES DE CONTACTO */}
        <div className="grid gap-12 text-center md:grid-cols-2 md:gap-8 md:text-left">
          {/* Columna 1: Customer Care */}
          <section className="flex flex-col items-center md:items-start">
            <h2 className="text-ink mb-6 text-lg tracking-widest uppercase">
              {dict.contactPage.customerCareTitle}
            </h2>
            <p className="font-garamond text-ink/85 text-lg leading-relaxed">
              {dict.contactPage.customerCareDescription}
            </p>
            <a
              href="mailto:helsinki@arabianfragrance.com"
              className="font-garamond text-gold hover:text-gold-strong border-gold/30 hover:border-gold mt-4 border-b text-xl transition-colors"
            >
              helsinki@arabianfragrance.com
            </a>
          </section>

          {/* Columna 2: Visit Us (Placeholder elegante) */}
          <section className="flex flex-col items-center md:items-start">
            <h2 className="text-ink mb-6 text-lg tracking-widest uppercase">
              {dict.contactPage.headquartersTitle}
            </h2>
            <div className="font-garamond text-ink/85 text-lg leading-relaxed">
              <p>{dict.contactPage.headquartersCityCountry}</p>
              <p className="text-ink/50 mt-2 text-sm tracking-wider uppercase">
                {dict.contactPage.headquartersAddress}
              </p>
            </div>
          </section>
        </div>

        {/* PRESS / WHOLESALE (Opcional, da prestigio) */}
        <div className="border-gold/20 mt-20 border-t pt-16 text-center">
          <h2 className="text-ink mb-4 text-lg tracking-widest uppercase">
            {dict.contactPage.pressWholesaleTitle}
          </h2>
          <p className="font-garamond text-ink/85 mb-4 text-lg">
            {dict.contactPage.pressWholesaleDescription}
          </p>
          <a
            href="mailto:helsinki@arabianfragrance.com"
            className="font-garamond text-ink/60 hover:text-gold text-lg transition-colors"
          >
            {dict.contactPage.pressWholesaleCta}
          </a>
        </div>
      </article>
    </main>
  );
}
