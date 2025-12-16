import Image from "next/image";

export default function aboutPage() {
  return (
    <div>
      <section className="relative min-h-[90vh] md:min-h-screen">
        <Image
          src="/about/aboutusPicture.jpg"
          alt="Discover Arabian Luxury"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 text-sm tracking-[0.2em] uppercase opacity-70 md:text-base">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl leading-tight tracking-wide text-shadow-lg/30 md:text-6xl lg:text-7xl">
            WHERE ARABIAN HERITAGE
            <br />
            MEETS NORDIC ELEGANCE
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg opacity-90 text-shadow-lg/30 md:text-xl">
            At Arabian Fragrance, we celebrate the enchanting fusion of rich
            Arabian heritage and the refined beauty of Nordic elegance. Our
            mission is to craft luxurious scents that evoke emotion and tell a
            story, inviting you to experience the art of fragrance.
          </p>
        </div>
      </section>
      <section className="grid min-h-[680px] grid-cols-1 px-5 py-2.5 md:grid-cols-2">
        <div className="flex flex-col justify-center border-r border-black/20 px-16 py-20 lg:px-20">
          <span className="mb-6 font-serif text-xs/relaxed tracking-[0.2em] uppercase opacity-70">
            Discover
          </span>
          <h2 className="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            OUR STORY
          </h2>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Arabian Fragrance was founded by Juha Toivanen, a well-known Finnish
            chef with a long career creating some of Finland’s most recognized
            restaurants. After years dedicated to taste, atmosphere, and the art
            of hospitality, Juha wanted to explore a new way of creating
            experiences, through scent.
          </p>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            That journey led him to Dubai and the Emirates, where perfumery is
            part of everyday culture. Inspired by the richness of Arabic
            traditions and rare natural ingredients, he began working with local
            expertise to shape a collection of perfumes that bring together
            depth, authenticity, and modern elegance.
          </p>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Arabian Fragrance is built on contrasts.the boldness of oud with the
            delicacy of rose, the heritage of the Middle East with the clarity
            of Nordic design. Every fragrance carries a story, meant to be worn
            not just as a scent, but as an expression of identity.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-black/0 lg:bg-black/0" />
          <Image
            src="/hero/gift.jpg"
            alt="Arabian Frangance Story"
            fill
            className="object-cover object-[50%_35%]"
            priority
          />
        </div>
      </section>
      <section className="relative h-[200px] md:h-[220px]">
        <div className="absolute inset-0 z-10 flex items-center justify-center px-16 text-center">
          <p className="font-garamond max-w-7xl text-2xl leading-relaxed text-black md:text-3xl">
            “Arabian Fragrance brings the soul of Dubai’s perfumery heritage to
            life, crafted with authenticity, depth, and modern elegance.”
          </p>
        </div>
      </section>
      <section className="grid min-h-[680px] grid-cols-1 px-5 py-2.5 md:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 bg-black/0 lg:bg-black/0" />
          <Image
            src="/collections/collection-desert-oud.jpg"
            alt="Arabian Frangance Story"
            fill
            className="object-cover object-[50%_35%]"
            priority
          />
        </div>
        <div className="flex flex-col justify-center border-r border-white/20 px-16 py-20 lg:px-20">
          <span className="mb-6 font-serif text-xs/relaxed tracking-[0.2em] uppercase opacity-70">
            Discover
          </span>
          <h2 className="font-playfair-display text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
            OUR PERFUMES
          </h2>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            At Arabian Fragrance, each perfume is more than a scent, it is an
            experience. Rooted in the rich traditions of Arabic perfumery and
            crafted in Dubai, our creations combine rare natural ingredients
            with a modern touch of elegance.
          </p>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            Every fragrance carries its own story: the warmth of oud, the
            delicacy of rose, the freshness of citrus. Together, they form a
            collection that is sophisticated, authentic, and impossible to
            forget.
          </p>
          <p className="font-garamond mt-6 max-w-lg text-lg/relaxed opacity-85">
            We invite you to discover perfumes that don’t just complement your
            presence, they define it.
          </p>
        </div>
      </section>
      <section className="relative min-h-screen md:min-h-[90vh]">
        <Image
          src="/about/aboutusPicture2.jpg"
          alt="Our Perfumes"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-garamond mt-4 max-w-3xl text-2xl text-white/70 md:text-3xl">
            At the heart of Arabian Fragrance lies a meeting of heritage and
            modernity, the timeless art of Arabic perfumery reimagined through a
            contemporary lens. Each creation is a dialogue between tradition and
            innovation, carrying the richness of oud, amber, and rose into a new
            era of elegance.
          </p>
        </div>
      </section>
    </div>
  );
}
