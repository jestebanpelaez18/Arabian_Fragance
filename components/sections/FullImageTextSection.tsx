import Image from "next/image";

type Props = {
  imageSrc: string;
  imageAlt: string;
  minH?: string; // ej: "min-h-screen md:min-h-[90vh]"
  objectClassName?: string; // ej: "object-cover object-center"
  overlayClassName?: string; // ej: "bg-black/50"
  overlayInset?: string; // ej: "top-8 right-8 bottom-8 left-8"
  paragraph?: string;
  paragraphClassName?: string; // tipografía del texto
  centerContent?: boolean; // default true
};

export default function FullImageTextSection({
  imageSrc,
  imageAlt,
  minH = "min-h-screen md:min-h-[90vh]",
  objectClassName = "object-cover object-center",
  overlayClassName = "bg-black/50",
  overlayInset = "inset-0",
  paragraph,
  paragraphClassName = "font-garamond mt-4 max-w-3xl text-2xl text-white/70 md:text-3xl",
  centerContent = true,
}: Props) {
  return (
    <section className={`relative ${minH}`}>
      <Image src={imageSrc} alt={imageAlt} fill priority className={objectClassName} />
      <div className={`absolute ${overlayInset} ${overlayClassName}`} />
      <div
        className={`absolute inset-0 z-10 flex flex-col px-6 text-center ${centerContent ? "items-center justify-center" : "items-start justify-center"}`}
      >
        {paragraph ? <p className={paragraphClassName}>{paragraph}</p> : null}
      </div>
    </section>
  );
}
