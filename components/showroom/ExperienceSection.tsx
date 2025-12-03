interface Service {
  title: string;
  description: string;
}

interface ExperienceSectionProps {
  title: string;
  services: Service[];
}

export default function ExperienceSection({
  title,
  services,
}: ExperienceSectionProps) {
  return (
    <section>
      <div className="grid gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-0">
        <div className="flex flex-col justify-start lg:pr-16">
          <h2 className="font-garamond text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`pb-8 ${index < services.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <h3 className="font-garamond mb-3 text-[11px] tracking-[0.2em] uppercase">
                {service.title}
              </h3>
              <p className="font-playfair-display text-[15px] leading-relaxed text-white/80">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
