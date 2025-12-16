import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="pb-12 md:pb-15">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-garamond mb-6 text-3xl leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="font-playfair-display mb-8 text-[15px] leading-relaxed md:text-base">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="btn-luxe text-xs tracking-[0.18em] uppercase"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
