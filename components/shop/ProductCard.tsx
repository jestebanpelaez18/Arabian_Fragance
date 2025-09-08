import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="bg-bordeaux text-white">
      <div className="relative aspect-[3/4] bg-white/5">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain p-8"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            No image yet
          </div>
        )}
      </div>

      <div className="px-6 py-6 text-center">
        <h3 className="font-serif text-lg uppercase">{p.name}</h3>
        <p className="opacity-80">€{p.price}</p>

        <Link
          href={`/product/${p.slug}`}
          className="mt-4 inline-block bg-[var(--gold)] text-[var(--bordeaux)] px-6 py-3 rounded-full font-semibold hover:opacity-90"
        >
          Quick Add
        </Link>
      </div>
    </article>
  );
}
