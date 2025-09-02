import Image from "next/image";

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
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="px-6 md:px-16 max-w-screen-xl w-full mx-auto flex flex-col items-start gap-4 text-white">
            <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight">
            DISCOVER THE<br />ESSENCE OF<br />ARABIAN<br />LUXURY
            </h1>
            <p className="font-serif text-base md:text-lg">
            Experience exclusive fragrances from Dubai: bold, sensual, and <br />unforgettable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
