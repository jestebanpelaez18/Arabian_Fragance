import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
};

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative h-[min(88vh,980px)] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-left"
        sizes="(min-width:1536px) 900px, (min-width:1024px) 58vw, 100vw"
        quality={90}
        priority
      />
    </div>
  );
}