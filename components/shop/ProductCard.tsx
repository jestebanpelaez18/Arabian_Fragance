import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        aria-label={p.name}
        className="card-luxe relative block aspect-3/4 overflow-hidden rounded-sm bg-white ring-1 ring-navbar-border transition-colors ease-luxe group-hover:ring-gold/50"
      >
        <Image
          src={p.image ?? "/placeholder.png"}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="object-contain p-8 transition-transform duration-700 ease-luxe group-hover:scale-[1.03] md:p-10 lg:p-12"
        />
      </Link>

      <div className="mt-2.5">
        <Link
          href={href}
          className="font-garamond link-gold min-h-6 text-base font-light tracking-[0.02em] md:text-lg"
        >
          {p.name}
        </Link>
        <p className="font-garamond mt-2.5 text-xs opacity-80">{p.price} EUR</p>
      </div>
    </article>
  );
}
