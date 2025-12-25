import Image from "next/image";

export interface SimpleTextImageSectionProps {
  title: string;
  paragraph?: string;
  descriptions?: string[]; // múltiples párrafos
  imageSrc: string;
  imageAlt: string;
  objectClassName?: string; // ej: "object-cover object-[50%_35%]"
  borderClassName?: string; // ej: "border-black/20"
  reverse?: boolean; // texto derecha, imagen izquierda en desktop
  titleClassName?: string; // override de tipografía del título
}

export default function SimpleTextImageSection({
  title,
  paragraph,
  descriptions,
  imageSrc,
  imageAlt = "Section image",
  objectClassName = "object-contain md:object-cover object-center md:object-[50%_35%]",
  reverse = false,
  titleClassName,
}: SimpleTextImageSectionProps) {
  const textOrderDesktop = reverse ? "md:order-2" : "md:order-1";
  const imageOrderDesktop = reverse ? "md:order-1" : "md:order-2";

  return (
    <section className="grid min-h-[680px] grid-cols-1 px-5 py-2.5 md:grid-cols-2">
      <div
        className={`order-1 flex flex-col justify-center px-16 py-20 ${textOrderDesktop} lg:px-20`}
      >
        <h2
          className={
            titleClassName ??
            "font-garamond text-4xl leading-tight tracking-[-0.01em] md:text-5xl"
          }
        >
          {title}
        </h2>

        {descriptions && descriptions.length > 0 ? (
          <div className="font-garamond mt-6 max-w-2xl text-lg/relaxed opacity-85">
            {descriptions.map((para, idx) => (
              <p key={idx} className={idx > 0 ? "mt-4" : undefined}>
                {para}
              </p>
            ))}
          </div>
        ) : (
          paragraph && (
            <p className="font-garamond mt-6 max-w-2xl text-lg/relaxed opacity-85">
              {paragraph}
            </p>
          )
        )}
      </div>

      <div className={`relative order-1 ${reverse ? "md:order-2" : "md:order-1"} aspect-4/3 md:aspect-auto md:min-h-[560px]`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className={objectClassName}
          loading="lazy"
          priority={false}
          decoding="async"
        />
      </div>
    </section>
  );
}
