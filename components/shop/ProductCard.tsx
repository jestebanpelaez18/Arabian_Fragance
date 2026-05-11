import Link from "next/link";
import SmoothImage from "../ui/SmoothImage";
import { type Product } from "@/data/products";

export default function ProductCard({ p }: { p: Product }) {
  const href = `/product/${p.slug ?? p.id}`;
  const cardImage = p.images?.[1] || p.images?.[0] || p.image || "/catalog/Bottle_3.png";

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        aria-label={p.name}
        className="card-luxe ring-navbar-border ease-luxe group-hover:ring-gold/50 relative block aspect-3/4 overflow-hidden rounded-sm bg-[#F5F2ED] ring-1 transition-colors"
      >
        <SmoothImage
          src={cardImage}
          alt={p.name}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
          className="ease-luxe object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
