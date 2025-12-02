import Image from "next/image";

interface LocationData {
  city: string;
  description: string[];
  hours: string[];
  phone: string;
  email: string;
  address: string[];
  imageSrc: string;
  imageAlt: string;
}

interface LocationSectionProps {
  location: LocationData;
}

export default function LocationSection({ location }: LocationSectionProps) {
  return (
    <section>
      <div className="grid gap-16 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
        <div className="flex flex-col justify-start space-y-8 lg:pr-16">
          <div>
            <h2 className="font-garamond mb-12 text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              {location.city}
            </h2>
            {location.description.map((paragraph, index) => (
              <p
                key={index}
                className="font-playfair-display mb-6 text-[15px] leading-relaxed text-white/80"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="font-garamond text-[11px] font-medium tracking-[0.2em] uppercase">
              Hours & Contact
            </h3>
            <div className="font-playfair-display space-y-1 text-[15px] leading-relaxed text-white/80">
              {location.hours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
            <div className="font-playfair-display space-y-1 text-[15px]">
              <p className="text-white/80">{location.phone}</p>
              <a
                href={`mailto:${location.email}`}
                className="text-white/80 underline transition-colors hover:text-white"
              >
                {location.email}
              </a>
            </div>
          </div>

          <div className="font-playfair-display space-y-6 pt-8">
            <h3 className="font-garamond text-[11px] font-medium tracking-[0.2em] uppercase">
              Address
            </h3>
            <p className="text-[15px] leading-relaxed text-white/80">
              {location.address.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < location.address.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="relative aspect-4/5 w-full overflow-hidden lg:aspect-auto lg:min-h-[700px]">
          <Image
            src={location.imageSrc}
            alt={location.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 55vw, 100vw"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}