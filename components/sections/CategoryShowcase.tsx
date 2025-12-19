"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoryShowcase() {
  return (
    <section className="relative min-h-full">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        {/* Women Perfumes */}
        <CategoryCard
          href="/shop/women"
          imageSrc="/shop/hero-women.jpg"
          title="SHOP FOR HER"
          subtitle="Sensual florals blended with warm amber and soft oud."
          ariaLabel="Shop women fragrances"
        />

        {/* Men Perfumes */}
        <CategoryCard
          href="/shop/men"
          imageSrc="/shop/hero-men.jpg"
          title="SHOP FOR HIM"
          subtitle="Intense amber, deep woods and refined oriental spices."
          ariaLabel="Shop men fragrances"
        />

        {/* Unisex */}
        <CategoryCard
          href="/shop/unisex"
          imageSrc="/shop/hero-unisex.jpg"
          title="UNISEX"
          subtitle="Balanced compositions where rose, spice and oud unite."
          ariaLabel="Shop unisex fragrances"
        />
      </div>
    </section>
  );
}

type CategoryCardProps = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  ariaLabel?: string;
};

function CategoryCard({
  href,
  imageSrc,
  title,
  subtitle,
  ariaLabel,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      prefetch
      aria-label={ariaLabel ?? title}
      className="group card-luxe relative block aspect-3/4 overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={ariaLabel ?? title}
        fill
        sizes="(min-width:768px) 33vw, 100vw"
        className="ease-luxe object-cover transition-transform duration-700 group-hover:scale-[1.03] group-active:scale-[0.99]"
        loading="lazy"
        priority={false}
        decoding="async"
      />

      {/* Luxe overlays: subtle dark for legibility + amber glow + grain */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/10" />
      <div className="overlay-amber absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Soft gold border highlight on hover */}
      <div className="ring-navbar-border group-hover:ring-gold/50 pointer-events-none absolute inset-0 ring-1 transition duration-500" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end">
        {/* gradient bottom to top for readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 via-black/20 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 text-white md:px-12 xl:px-16">
          <h2 className="font-playfair-display text-shadow-soft text-3xl leading-tight tracking-tight md:text-[32px] xl:text-[36px]">
            {title}
          </h2>
          <p className="font-garamond mt-1 max-w-md text-lg opacity-95 md:text-xl">
            {subtitle}
          </p>
          <span className="font-roboto link-gold mt-2 inline-block text-sm font-medium">
            Shop now
          </span>
        </div>
      </div>
    </Link>
  );
}
