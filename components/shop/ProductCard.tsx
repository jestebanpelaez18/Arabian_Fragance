import Image from "next/image";
import Button from "@/components/ui/button";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
    return (
      <article className="flex flex-col">
        <div className="relative w-full bg-white h-[360px] md:h-[400px] xl:h-[440px]">
          {p.image ? (
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-contain p-6 md:p-8 xl:p-8"
              sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-black/50">
              No image
            </div>
          )}
        </div>
        <div className="text-center pt-5 flex flex-col items-center gap-2 min-h-[120px]">
          <h3 className="font-serif text-lg md:text-xl uppercase">{p.name}</h3>
          <p className="opacity-80">€{p.price}</p>
          <Button href={`/product/${p.slug}`} variant="discover" className="mt-1">
            Quick Add
          </Button>
        </div>
      </article>
    );
  }
  

  
