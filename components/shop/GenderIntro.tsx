import Link from "next/link";

type Gender = "women" | "men" | "unisex";

const titles: Record<Gender, string> = {
  women: "WOMEN FRAGRANCES",
  men: "MEN FRAGRANCES",
  unisex: "UNISEX FRAGRANCES",
};

const copy: Record<Gender, string> = {
  women:
    "Our women’s compositions blend luminous florals with warm oriental nuances. Crafted with precision and elegance, each fragrance reveals a refined trail—timeless, sensual, unmistakably Arabian.",
  men: "Defined by depth and character, our men’s selection layers smoky woods, spices and amber facets. Distinctive yet wearable, each scent delivers a confident signature that lingers.",
  unisex:
    "Modern and versatile, our unisex fragrances balance resinous warmth with airy florals and citrus lift. Compositions designed to be shared—sophisticated, contemporary, unmistakably refined.",
};

const quicklinks: Record<Gender, { label: string; href: string }[]> = {
  women: [{ label: "Best sellers", href: "/shop/women#bestsellers" }],
  men: [{ label: "Best sellers", href: "/shop/men#bestsellers" }],
  unisex: [{ label: "Best sellers", href: "/shop/unisex#bestsellers" }],
};

export default function GenderIntro({ gender }: { gender: Gender }) {
  return (
    <section className="w-full px-5 py-10 text-white md:px-8 md:py-12 xl:px-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr]">
        <h1 className="font-playfair-display text-[28px] leading-tight md:text-[40px]">
          {titles[gender]}
        </h1>

        <div>
          <p className="font-garamond text-base opacity-85 md:text-lg/relaxed">
            {copy[gender]}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {quicklinks[gender].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="link-gold underline-offset-4 hover:underline"
              >
                {q.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Woody", "Floral", "Amber"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-white/25 px-3 py-1 text-xs opacity-85 transition hover:opacity-100"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 h-px w-full bg-white/15" />
    </section>
  );
}
