import LuxeHero from "@/components/ui/LuxeHero";
import SectionDivider from "@/components/ui/SectionDivider";
import NextDynamic from "next/dynamic";

// Fuerza prerender estático y cacheado
export const dynamic = "force-static";

// Evita recrear arrays en cada render
const STORY_DESCRIPTIONS = [
  "Arabian Fragrance was founded by Juha Toivanen, a Finnish chef known for creating some of Finland’s most recognized dining experiences.",
  "After years dedicated to taste, atmosphere, and the art of hospitality, Juha began exploring a new way to create emotion, through scent.",
  "His journey led him to Dubai and the Emirates, where perfumery is woven into everyday life. Inspired by the richness of Arabian traditions and rare natural ingredients, he began collaborating with local experts to craft fragrances that embody depth, authenticity, and modern refinement.",
  "Arabian Fragrance is built on contrasts: the boldness of oud balanced with the delicacy of rose, the heritage of the Middle East refined through the clarity of Nordic design.",
  "Each fragrance tells a story - not merely to be worn, but to become part of one’s identity.",
];

const PERFUMES_DESCRIPTIONS = [
  "At Arabian Fragrance, each perfume is more than a scent, it is an experience. Rooted in the rich traditions of Arabic perfumery and crafted in Dubai, our creations combine rare natural ingredients with a modern touch of elegance.",
  "Every fragrance carries its own story: the warmth of oud, the delicacy of rose, the freshness of citrus. Together, they form a collection that is sophisticated, authentic, and impossible to forget.",
  "We invite you to discover perfumes that don’t just complement your presence, they define it.",
];

const SimpleTextImageSection = NextDynamic(
  () => import("@/components/sections/SimpleTextImageSection"),
  {
    loading: () => <section className="min-h-[520px] md:min-h-[560px]" />,
  }
);
const FullImageTextSection = NextDynamic(
  () => import("@/components/sections/FullImageTextSection"),
  {
    loading: () => <section className="min-h-[70vh]" />,
  }
);

export default function aboutPage() {
  return (
    <div>
      <LuxeHero
        title="THE ART OF ARABIAN PERFUMERY"
        subtitle="A refined fusion of rich Arabian perfumery and modern Nordic sophistication."
        imageSrc="/about/aboutusPicture.jpg"
        fit="cover"
        objectClassName="object-[50%_35%]"
        minH="min-h-[90svh] md:min-h-screen"
      />
      <SectionDivider text="Discover" />
      {/* Render SSR arriba del fold para mejor TTFB/SEO */}
      <SimpleTextImageSection
        title="OUR STORY"
        descriptions={STORY_DESCRIPTIONS}
        imageSrc="/hero/gift.jpg"
        imageAlt="Arabian Frangance Story"
      />
      <section className="relative h-[200px] md:h-[220px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center px-16 text-center">
          <p className="font-garamond max-w-7xl text-2xl leading-relaxed text-black md:text-3xl">
            “Arabian Fragrance brings the soul of Dubai’s perfumery heritage to
            life, crafted with authenticity, depth, and modern elegance.”
          </p>
        </div>
      </section>
      <SectionDivider text="Experience" />
      {/* Lazy-load debajo del fold */}
      <SimpleTextImageSection
        title="OUR PERFUMES"
        descriptions={PERFUMES_DESCRIPTIONS}
        imageSrc="/collections/collection-desert-oud.jpg"
        imageAlt="Arabian Frangance Story"
        objectClassName="object-cover object-[50%_35%]"
        borderClassName="border-white/20"
        reverse={true}
        titleClassName="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl"
      />
      <FullImageTextSection
        imageSrc="/about/aboutusPicture2.jpg"
        imageAlt="Our Perfumes"
        minH="min-h-screen md:min-h-[90vh]"
        objectClassName="p-5 object-cover object-center"
        overlayClassName="bg-black/50"
        overlayInset="top-5 right-5 bottom-5 left-5"
        paragraph="At the heart of Arabian Fragrance lies a dialogue between heritage and modernity. Rooted in the traditions of Arabic perfumery, each creation reinterprets oud, amber and rose through a refined, contemporary lens."
        paragraphClassName="font-garamond mt-4 max-w-3xl text-2xl text-white/70 md:text-3xl"
      />
    </div>
  );
}
