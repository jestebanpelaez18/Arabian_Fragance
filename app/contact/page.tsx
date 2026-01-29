import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Arabian Fragrance",
  description: "Get in touch with our concierge team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <article className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="font-playfair-display text-4xl uppercase tracking-[0.2em] text-ink md:text-5xl">
            Contact Us
          </h1>
          <div className="mx-auto mt-8 h-px w-16 bg-gold/50" />
        </header>

        {/* INTRODUCCIÓN */}
        <div className="text-center mb-16">
          <p className="font-garamond text-xl leading-loose text-ink/85">
            Our dedicated team is at your disposal to assist with any inquiries regarding our fragrances, 
            orders, or the Arabian Fragrance experience.
          </p>
        </div>

        {/* DETALLES DE CONTACTO */}
        <div className="grid gap-12 text-center md:grid-cols-2 md:text-left md:gap-8">
          
          {/* Columna 1: Customer Care */}
          <section className="flex flex-col items-center md:items-start">
            <h2 className="mb-6 font-playfair-display text-lg uppercase tracking-widest text-ink">
              Customer Care
            </h2>
            <p className="font-garamond text-lg leading-relaxed text-ink/85">
              For assistance with online orders and general inquiries.
            </p>
            <a 
              href="mailto:juanes.pelaez18@gmail.com" 
              className="mt-4 font-garamond text-xl text-gold transition-colors hover:text-gold-strong border-b border-gold/30 hover:border-gold"
            >
              helsinki@arabianfragrance.com
            </a>
          </section>

          {/* Columna 2: Visit Us (Placeholder elegante) */}
          <section className="flex flex-col items-center md:items-start">
             <h2 className="mb-6 font-playfair-display text-lg uppercase tracking-widest text-ink">
              Headquarters
            </h2>
            <div className="font-garamond text-lg leading-relaxed text-ink/85">
              <p>Helsinki, Finland</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-ink/50">
                Mikonkatu 4, 00100 Helsinki
              </p>
            </div>
          </section>

        </div>

        {/* PRESS / WHOLESALE (Opcional, da prestigio) */}
        <div className="mt-20 border-t border-gold/20 pt-16 text-center">
          <h2 className="mb-4 font-playfair-display text-lg uppercase tracking-widest text-ink">
            Press & Wholesale
          </h2>
          <p className="font-garamond text-lg text-ink/85 mb-4">
            For press inquiries and partnership opportunities.
          </p>
          <a 
            href="mailto:helsinki@arabianfragrance.com" 
            className="font-garamond text-lg text-ink/60 transition-colors hover:text-gold"
          >
            Contact our PR Team
          </a>
        </div>

      </article>
    </main>
  );
}