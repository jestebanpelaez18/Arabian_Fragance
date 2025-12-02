import Image from "next/image";
import Link from "next/link";
import SectionDivider from "@/components/showroom/SectionDivider";
import ShowroomHero from "@/components/showroom/ShowroomHero";
import LocationSection from "@/components/showroom/LocationSection";

const helsinkiLocation = {
  city: "HELSINKI",
  description: [
    "Arabian Fragrance's flagship showroom in Helsinki emerges in the heart of the city, embodying a luxurious sensibility where Nordic minimalism meets Arabian opulence.",
    "Discover our curated collections and indulge in our full suite of luxury experiences including private consultations, bespoke gifting services, and personalized scent journeys designed to capture your unique story.",
  ],
  hours: ["Monday to Saturday 10:00am – 6:00pm", "Sunday 12:00pm – 5:00pm"],
  phone: "+358 9 1234 5678",
  email: "helsinki@arabianfragrance.com",
  address: ["Mikonkatu 4", "00100 Helsinki, Finland"],
  imageSrc: "/showroom/example_shop.avif",
  imageAlt: "Arabian Fragrance Helsinki showroom interior",
};

export default function ShowroomPage() {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <ShowroomHero />
      {/* INTRO SECTION */}
      <SectionDivider text="FINLAND" />

      {/* SECTION 2 – Location */}

      <LocationSection location={helsinkiLocation} />

      <SectionDivider text="EXPERIENCE" />

      {/* SECTION 3 – EXPERIENCE HIGHLIGHTS */}
      <section>
        <div className="grid gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
          {/* Left column - Header */}
          <div className="flex flex-col justify-start lg:pr-16">
            <h2 className="font-garamond text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
              More than a boutique, a scented ritual
            </h2>
          </div>

          {/* Right column - Services */}
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-8">
              <h3 className="font-garamond mb-3 text-[11px] tracking-[0.2em] uppercase">
                Private consultations
              </h3>
              <p className="font-playfair-display text-[15px] leading-relaxed text-white/80">
                One-on-one time with our fragrance specialists to understand
                your preferences, lifestyle and stories, and translate them into
                a curated selection.
              </p>
            </div>

            <div className="border-b border-white/10 pb-8">
              <h3 className="font-garamond mb-3 text-[11px] tracking-[0.2em] uppercase">
                Scent journeys
              </h3>
              <p className="font-playfair-display text-[15px] leading-relaxed text-white/80">
                Explore oud, amber, florals and woods through raw materials and
                layered compositions designed to be felt slowly, note by note.
              </p>
            </div>

            <div className="pb-8">
              <h3 className="font-garamond mb-3 text-[11px] tracking-[0.2em] uppercase">
                Gifting & occasions
              </h3>
              <p className="font-playfair-display text-[15px] leading-relaxed text-white/80">
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
          <h2 className="font-garamond mb-6 text-3xl leading-tight md:text-4xl lg:text-5xl">
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
