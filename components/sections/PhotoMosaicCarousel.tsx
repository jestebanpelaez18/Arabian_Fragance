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
    left: "/collections/collection-rose-dubai.jpg",
    topRight: "/collections/collection-golden-sands.jpg",
    bottomRight: "/collections/collection-desert-oud.jpg",
    altLeft: "Lifestyle 1",
    altTopRight: "Lifestyle 2",
    altBottomRight: "Lifestyle 3",
  },
  {
    left: "/collections/collection-rose-dubai.jpg",
    topRight: "/collections/collection-golden-sands.jpg",
    bottomRight: "/collections/collection-desert-oud.jpg",
  },
];

export default function PhotoMosaicCarousel() {
  return (
    <section className="bg-bordeaux relative right-1/2 left-1/2 -mx-[50vw] w-screen">
      <div
        className="relative w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="flex gap-3 px-3 py-2.5 md:gap-4 md:px-4 md:py-5">
          {SLIDES.map((s, idx) => (
            <article
              key={idx}
              className="w-[92vw] shrink-0 snap-start md:w-[92vw] lg:w-[92vw] xl:w-[92vw]"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div className="relative h-[55vh] overflow-hidden rounded-xl md:h-[70vh]">
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
                  <div className="relative h-[26vh] overflow-hidden rounded-xl md:h-[34vh]">
                    <Image
                      src={s.topRight}
                      alt={s.altTopRight ?? "Lifestyle"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 32vw, 92vw"
                    />
                  </div>
                  <div className="relative h-[26vh] overflow-hidden rounded-xl md:h-[34vh]">
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
