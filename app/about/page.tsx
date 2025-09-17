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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[0.2em] text-sm md:text-base opacity-70 mb-4">
            Introducing
          </p>
          <h1 className="font-playfair-display text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide text-shadow-lg/30">
            WHERE ARABIAN HERITAGE
            <br />
            MEETS NORDIC ELEGANCE
          </h1>
          <p className="font-garamond mt-6 max-w-2xl text-lg md:text-xl opacity-90 text-shadow-lg/30">
            At Arabian Fragrance, we celebrate the enchanting fusion of rich
            Arabian heritage and the refined beauty of Nordic elegance. Our
            mission is to craft luxurious scents that evoke emotion and tell a
            story, inviting you to experience the art of fragrance.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[680px] py-2.5 px-5">
        <div className="bg-bordeaux text-white py-20 px-16 lg:px-20 flex flex-col justify-center border-r border-white/20">
          <span className="font-serif uppercase tracking-[0.2em] text-xs/relaxed opacity-70 mb-6">
            Discover
          </span>
          <h2 className="font-playfair-display text-4xl md:text-5xl leading-tight tracking-[-0.01em]">
            OUR STORY
          </h2>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
            Arabian Fragrance was founded by Juha Toivanen, a well-known Finnish
            chef with a long career creating some of Finland’s most recognized
            restaurants. After years dedicated to taste, atmosphere, and the art
            of hospitality, Juha wanted to explore a new way of creating
            experiences, through scent.
          </p>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
            That journey led him to Dubai and the Emirates, where perfumery is
            part of everyday culture. Inspired by the richness of Arabic
            traditions and rare natural ingredients, he began working with local
            expertise to shape a collection of perfumes that bring together
            depth, authenticity, and modern elegance.
          </p>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
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
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-16">
          <p className="font-garamond text-2xl md:text-3xl text-white max-w-7xl leading-relaxed">
            “Arabian Fragrance brings the soul of Dubai’s perfumery heritage to
            life, crafted with authenticity, depth, and modern elegance.”
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[680px] py-2.5 px-5">
        <div className="relative">
          <div className="absolute inset-0 bg-black/0 lg:bg-black/0" />
          <Image
            src="/collections/Coleccion1.jpg"
            alt="Arabian Frangance Story"
            fill
            className="object-cover object-[50%_35%]"
            priority
          />
        </div>
        <div className="bg-bordeaux text-white py-20 px-16 lg:px-20 flex flex-col justify-center border-r border-white/20">
          <span className="font-serif uppercase tracking-[0.2em] text-xs/relaxed opacity-70 mb-6">
            Discover
          </span>
          <h2 className="font-playfair-display text-4xl md:text-5xl leading-tight tracking-[-0.01em]">
            OUR PERFUMES
          </h2>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
            At Arabian Fragrance, each perfume is more than a scent, it is an
            experience. Rooted in the rich traditions of Arabic perfumery and
            crafted in Dubai, our creations combine rare natural ingredients
            with a modern touch of elegance.
          </p>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
            Every fragrance carries its own story: the warmth of oud, the
            delicacy of rose, the freshness of citrus. Together, they form a
            collection that is sophisticated, authentic, and impossible to
            forget.
          </p>
          <p className="mt-6 font-garamond text-lg/relaxed opacity-85 max-w-lg">
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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <p className="font-garamond mt-4 text-2xl md:text-3xl text-white/70 max-w-3xl">
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
