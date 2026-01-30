import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Arabian Fragrance",
  description: "Get in touch with our concierge team.",
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="font-playfair-display text-ink text-4xl tracking-[0.2em] uppercase md:text-5xl">
            Contact Us
          </h1>
          <div className="bg-gold/50 mx-auto mt-8 h-px w-16" />
        </header>

        {/* INTRODUCCIÓN */}
        <div className="mb-16 text-center">
          <p className="font-garamond text-ink/85 text-xl leading-loose">
            Our dedicated team is at your disposal to assist with any inquiries
            regarding our fragrances, orders, or the Arabian Fragrance
            experience.
          </p>
        </div>

        {/* DETALLES DE CONTACTO */}
        <div className="grid gap-12 text-center md:grid-cols-2 md:gap-8 md:text-left">
          {/* Columna 1: Customer Care */}
          <section className="flex flex-col items-center md:items-start">
            <h2 className="font-playfair-display text-ink mb-6 text-lg tracking-widest uppercase">
              Customer Care
            </h2>
            <p className="font-garamond text-ink/85 text-lg leading-relaxed">
              For assistance with online orders and general inquiries.
            </p>
            <a
              href="mailto:juanes.pelaez18@gmail.com"
              className="font-garamond text-gold hover:text-gold-strong border-gold/30 hover:border-gold mt-4 border-b text-xl transition-colors"
            >
              helsinki@arabianfragrance.com
            </a>
          </section>

          {/* Columna 2: Visit Us (Placeholder elegante) */}
          <section className="flex flex-col items-center md:items-start">
            <h2 className="font-playfair-display text-ink mb-6 text-lg tracking-widest uppercase">
              Headquarters
            </h2>
            <div className="font-garamond text-ink/85 text-lg leading-relaxed">
              <p>Helsinki, Finland</p>
              <p className="text-ink/50 mt-2 text-sm tracking-wider uppercase">
                Mikonkatu 4, 00100 Helsinki
              </p>
            </div>
          </section>
        </div>

        {/* PRESS / WHOLESALE (Opcional, da prestigio) */}
        <div className="border-gold/20 mt-20 border-t pt-16 text-center">
          <h2 className="font-playfair-display text-ink mb-4 text-lg tracking-widest uppercase">
            Press & Wholesale
          </h2>
          <p className="font-garamond text-ink/85 mb-4 text-lg">
            For press inquiries and partnership opportunities.
          </p>
          <a
            href="mailto:helsinki@arabianfragrance.com"
            className="font-garamond text-ink/60 hover:text-gold text-lg transition-colors"
          >
            Contact our PR Team
          </a>
        </div>
      </article>
    </main>
  );
}
