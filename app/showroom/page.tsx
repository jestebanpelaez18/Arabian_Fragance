import Image from "next/image";
import Link from "next/link";
import SectionDivider from "@/components/showroom/SectionDivider";

export default function ShowroomPage() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <Image
          src="/showroom/example_shop.avif"
          alt="Arabian Fragrance Showroom interior"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="100vw"
        />

        {/* Overlay burdeos suave */}
        <div className="bg-gold/15 absolute inset-0" />

        {/* Contenido */}
        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center px-6 text-center">
          <div className="flex flex-1 items-center justify-center">
            <h1 className="font-garamond text-3xl leading-tight md:text-5xl lg:text-6xl">
              SHOWROOM
            </h1>
          </div>
          <div className="pb-12">
            <Link
              href="/contact"
              className="btn-luxe text-xs tracking-[0.18em] uppercase"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </section>

    {/* INTRO SECTION */}
      <SectionDivider text="FINLAND" />

      {/* SECTION 2 – STORY / CONCEPT */}
      <section>
        <div className="grid gap-16 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-start space-y-8 lg:pr-16">
            <div>
              <h2 className="font-garamond mb-12 text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                HELSINKI
              </h2>

              <p className="font-playfair-display mb-6 text-[15px] leading-relaxed text-white/80">
                Arabian Fragrance's flagship showroom in Helsinki emerges in the
                heart of the city, embodying a luxurious sensibility where
                Nordic minimalism meets Arabian opulence.
              </p>

              <p className="font-playfair-display mb-6 text-[15px] leading-relaxed text-white/80">
                Discover our curated collections and indulge in our full suite
                of luxury experiences including private consultations, bespoke
                gifting services, and personalized scent journeys designed to
                capture your unique story.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-garamond text-[11px] font-medium tracking-[0.2em] uppercase">
                Hours & Contact
              </h3>
              <div className="font-playfair-display space-y-1 text-[15px] leading-relaxed text-white/80">
                <p>Monday to Saturday 10:00am – 6:00pm</p>
                <p>Sunday 12:00pm – 5:00pm</p>
              </div>
              <div className="font-playfair-display space-y-1 text-[15px]">
                <p className="text-white/80">+358 9 1234 5678</p>
                <a
                  href="mailto:helsinki@arabianfragrance.com"
                  className="text-white/80 underline transition-colors hover:text-white"
                >
                  helsinki@arabianfragrance.com
                </a>
              </div>
            </div>

            <div className="font-playfair-display space-y-6 pt-8">
              <h3 className="font-garamond text-[11px] font-medium tracking-[0.2em] uppercase">
                Address
              </h3>
              <p className="text-[15px] leading-relaxed text-white/80">
                Mikonkatu 4
                <br />
                00100 Helsinki, Finland
              </p>
            </div>
          </div>
            {/* Right column - Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:min-h-[700px]">
            <Image
              src="/showroom/example_shop.avif"
              alt="Arabian Fragrance Helsinki showroom interior"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
              quality={100}
            />
          </div>
        </div>
      </section>

    <SectionDivider text="EXPERIENCE" />

    {/* SECTION 3 – EXPERIENCE HIGHLIGHTS */}
    <section>
      <div className="grid gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
        {/* Left column - Header */}
        <div className="flex flex-col justify-start lg:pr-16">
          <h2 className="font-garamond text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            More than a boutique, a scented ritual
          </h2>
        </div>
    
        {/* Right column - Services */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-8">
            <h3 className="mb-3 text-[11px] font-garamond tracking-[0.2em] uppercase">
              Private consultations
            </h3>
            <p className="font-playfair-display text-[15px] leading-relaxed text-white/80">
              One-on-one time with our fragrance specialists to understand
              your preferences, lifestyle and stories, and translate them
              into a curated selection.
            </p>
          </div>
    
          <div className="border-b border-white/10 pb-8">
            <h3 className="mb-3 text-[11px] font-garamond tracking-[0.2em] uppercase">
              Scent journeys
            </h3>
            <p className="text-[15px] leading-relaxed font-playfair-display text-white/80">
              Explore oud, amber, florals and woods through raw materials and
              layered compositions designed to be felt slowly, note by note.
            </p>
          </div>
    
          <div className="pb-8">
            <h3 className="mb-3 text-[11px] font-garamond tracking-[0.2em] uppercase">
              Gifting & occasions
            </h3>
            <p className="text-[15px] leading-relaxed font-playfair-display text-white/80">
              From weddings to private events, we design personalized gifting
              experiences with engraving, bespoke sets and signature
              packaging.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* PHOTO CARROUSEL IN THE FUTURE */}

    <SectionDivider text="BOOK YOUR PRIVATE SHOWROOM EXPERIENCE" />
      {/* CTA FINAL */}
      <section className="pb-12 md:pb-15">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-garamond mb-6 text-3xl md:text-4xl lg:text-5xl leading-tight">
            Book your private showroom experience
          </h2>
          <p className="font-playfair-display mb-8 text-[15px] leading-relaxed text-white/80 md:text-base">
            Our showroom is open by appointment only to keep the atmosphere calm
            and personal. Share a few details and our team will contact you to
            plan your visit.
          </p>
          <Link
            href="/contact"
            className="btn-luxe text-xs tracking-[0.18em] uppercase"
          >
            Request an appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
