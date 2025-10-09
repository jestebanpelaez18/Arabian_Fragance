export default function ShopIntro() {
  return (
    <section className="w-full px-5 md:px-8 xl:px-12 py-10 md:py-12 text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr]">
        <h1 className="font-playfair-display text-[28px] leading-tight md:text-[40px]">
          ALL ARABIAN FRAGRANCE
        </h1>

        <div>
          <p className="font-garamond text-base md:text-lg/relaxed opacity-85">
            Hand-crafted compositions rooted in Arabian perfumery—resinous
            depth, luminous florals and ambered warmth. Discover our full
            selection of timeless signatures for every style.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Woody", "Floral", "Amber"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-white/25 px-3 py-1 text-xs opacity-85 hover:opacity-100 transition"
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
