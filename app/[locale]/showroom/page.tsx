import SectionDivider from "@/components/ui/SectionDivider";
import ShowroomHero from "@/components/showroom/ShowroomHero";
import LocationSection from "@/components/showroom/LocationSection";
import ExperienceSection from "@/components/showroom/ExperienceSection";
import CTASection from "@/components/showroom/CTASection";
import { getDictionary } from "@/dictionaries/getDictionary";
import type { Locale } from "@/i18n-config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ShowroomPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const helsinkiLocation = {
    city: dict.showroomPage.location.city,
    description: dict.showroomPage.location.description,
    hours: dict.showroomPage.location.hours,
    phone: "+358 9 1234 5678",
    email: "helsinki@arabianfragrance.com",
    address: dict.showroomPage.location.address,
    imageSrc: "/showroom/example_shop.avif",
    imageAlt: dict.showroomPage.location.imageAlt,
  };

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <ShowroomHero />
      {/* INTRO SECTION */}
      <SectionDivider text={dict.showroomPage.dividerFinland} />

      {/* SECTION 2 – Location */}

      <LocationSection location={helsinkiLocation} />

      <SectionDivider text={dict.showroomPage.dividerExperience} />

      {/* SECTION 3 – EXPERIENCE HIGHLIGHTS */}
      <ExperienceSection
        title={dict.showroomPage.experienceTitle}
        services={dict.showroomPage.services}
      />

      {/* PHOTO CARROUSEL IN THE FUTURE */}

      <SectionDivider text={dict.showroomPage.dividerBookExperience} />
      {/* CTA FINAL */}

      <CTASection
        title={dict.showroomPage.ctaTitle}
        description={dict.showroomPage.ctaDescription}
        buttonText={dict.showroomPage.ctaButtonText}
        buttonHref="/contact"
      />
    </div>
  );
}
