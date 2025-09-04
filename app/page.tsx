import Image from "next/image";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section className="relative min-h-screen">
        <Image
          className="object-cover object-center"
          src="/hero/heroPicture.jpg"
          alt="Arabian Fragance - Hero Picture"
          fill={true}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-0" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col items-start gap-4 text-white">
            <h1 className="font-display text-4xl md:text-6xl xl:text-7xl leading-none tracking-tight">
              DISCOVER THE
              <br />
              ESSENCE OF
              <br />
              ARABIAN
              <br />
              LUXURY
            </h1>
            <p className="font-serif text-base md:text-lg max-w-md">
              Experience exclusive fragrances from Dubai: bold, sensual, and unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button href="\shop" variant="primary">Shop Now</Button>
              <Button href="about" variant="secondary">Discover Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
