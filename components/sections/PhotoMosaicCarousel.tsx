"use client";
import Image from "next/image";

type Slide = {
  left: string;
  topRight: string;
  bottomRight: string;
  altLeft?: string;
  altTopRight?: string;
  altBottomRight?: string;
};

const SLIDES: Slide[] = [
  {
    left: "/collections/Coleccion3.jpg",
    topRight: "/collections/Coleccion2.jpg",
    bottomRight: "/collections/Coleccion1.jpg",
    altLeft: "Lifestyle 1",
    altTopRight: "Lifestyle 2",
    altBottomRight: "Lifestyle 3",
  },
  {
    left: "/collections/Coleccion3.jpg",
    topRight: "/collections/Coleccion2.jpg",
    bottomRight: "/collections/Coleccion1.jpg",
  },
];

export default function PhotoMosaicCarousel() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-bordeaux">
      <div
        className="relative w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="flex gap-3 md:gap-4 px-3 md:px-4 py-6 md:py-8">
          {SLIDES.map((s, idx) => (
            <article
              key={idx}
              className="snap-start shrink-0 w-[92vw] md:w-[92vw] lg:w-[92vw] xl:w-[92vw]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="relative rounded-xl overflow-hidden h-[55vh] md:h-[70vh]">
                  <Image
                    src={s.left}
                    alt={s.altLeft ?? "Lifestyle"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 60vw, 92vw"
                    priority={idx === 0}
                  />
                </div>
                <div className="grid grid-rows-2 gap-3 md:gap-4">
                  <div className="relative rounded-xl overflow-hidden h-[26vh] md:h-[34vh]">
                    <Image
                      src={s.topRight}
                      alt={s.altTopRight ?? "Lifestyle"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 32vw, 92vw"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden h-[26vh] md:h-[34vh]">
                    <Image
                      src={s.bottomRight}
                      alt={s.altBottomRight ?? "Lifestyle"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 32vw, 92vw"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
