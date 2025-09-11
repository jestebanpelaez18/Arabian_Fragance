import Image from "next/image";
import Button from "@/components/ui/button";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="flex flex-col bg-bordeaux text-white px-2.5">
      <div className="relative w-full aspect-[3/4] bg-white flex items-center justify-center">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain p-6"
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 45vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/60">
            No image yet
          </div>
        )}
      </div>
      <div className="px-6 py-6 text-center flex flex-col items-center">
        <h3 className="font-serif text-lg uppercase tracking-wide">
          {p.name}
        </h3>
        <p className="text-white/75 mt-1">€{p.price}</p>

        <Button
          href={`/product/${p.slug}`}
          variant="secondary"
          className="mt-5 px-6 py-2 hover:bg-white hover:text-[var(--bordeaux)] transition"
        >
          Quick Add
        </Button>
      </div>
    </article>
  );
}


  

  
