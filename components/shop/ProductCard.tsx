import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/data/products";
import Button from "@/components/ui/button";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="bg-bordeaux text-white flex flex-col items-center p-6">
      <div className="relative w-full max-w-[280px] h-[360px] mx-auto">
        {p.image ? (
          <Image src={p.image} alt={p.name} fill className="object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            No image yet
          </div>
        )}
      </div>

      <div className="mt-6 text-center flex flex-col items-center gap-2">
        <h3 className="font-serif text-lg uppercase leading-tight">{p.name}</h3>
        <p className="opacity-80 leading-normal mt-1">€{p.price}</p>

        {/* sin margen extra; deja que el gap se encargue del espacio */}
        <Button href={`/product/${p.slug}`} variant="discover" className="mt-0">
          Quick Add
        </Button>
      </div>
    </article>
  );
}
