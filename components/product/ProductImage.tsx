import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
};

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative  aspect-5/6 w-full overflow-hidden rounded-sm ring-1 ring-black/10">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-left"
        sizes="(min-width:1536px) 900px, (min-width:1024px) 58vw, 100vw"
        // Usa el default (75) para evitar el warning de Next 16
        quality={90}
        priority
      />
    </div>
  );
}