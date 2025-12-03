import Image from "next/image";
import Link from "next/link";

export default function ShowroomHero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <Image
        src="/showroom/example_shop.avif"
        alt="Arabian Fragrance Showroom interior"
        fill
        priority
        quality={90}
        className="object-cover"
        sizes="100vw"
      />
      <div className="bg-gold/15 absolute inset-0" />
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
  );
}
