import Image from "next/image";
import Button from "@/components/ui/button";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="flex h-full flex-col bg-bordeaux text-white">
      <div className="relative aspect-[3/4] bg-white">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain p-2 md:p-4"   
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/60">
            No image yet
          </div>
        )}
      </div>
      <div className="flex flex-col items-center px-6 py-6 text-center">
        <h3 className="font-serif text-lg uppercase tracking-wide">{p.name}</h3>
        <p className="mt-1 text-white/75">€{p.price}</p>

        <Button
          href={`/product/${p.slug}`}
          variant="secondary"
          className="font-roboto mt-5 rounded-full px-6 py-2 border border-white/60 hover:bg-white hover:text-[var(--bordeaux)] transition"
        >
          Quick Add
        </Button>
      </div>
    </article>
  );
}



  

  
