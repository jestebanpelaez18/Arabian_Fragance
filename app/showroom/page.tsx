import Image from "next/image";
import Link from "next/link";
import SectionDivider from "@/components/showroom/SectionDivider";
import ShowroomHero from "@/components/showroom/ShowroomHero";
import LocationSection from "@/components/showroom/LocationSection";
import ExperienceSection from "@/components/showroom/ExperienceSection";
import CTASection from "@/components/showroom/CTASection";

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

const experienceServices = [
  {
    title: "Private consultations",
    description:
      "One-on-one time with our fragrance specialists to understand your preferences, lifestyle and stories, and translate them into a curated selection.",
  },
  {
    title: "Scent journeys",
    description:
      "Explore oud, amber, florals and woods through raw materials and layered compositions designed to be felt slowly, note by note.",
  },
  {
    title: "Gifting & occasions",
    description:
      "From weddings to private events, we design personalized gifting experiences with engraving, bespoke sets and signature packaging.",
  },
];



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
      <ExperienceSection
        title="More than a boutique, a scented ritual"
        services={experienceServices}
      />

      {/* PHOTO CARROUSEL IN THE FUTURE */}

      <SectionDivider text="BOOK YOUR PRIVATE SHOWROOM EXPERIENCE" />
      {/* CTA FINAL */}

        <CTASection
        title="Book your private showroom experience"
        description="Our showroom is open by appointment only to keep the atmosphere calm and personal. Share a few details and our team will contact you to plan your visit."
        buttonText="Request an appointment"
        buttonHref="/contact"
      />
    </div>
  );
}
