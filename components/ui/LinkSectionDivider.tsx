import Link from "next/link";

interface LinkSectionDividerProps {
  text: string;
  href: string;
  className?: string;
  ariaLabel?: string;
}

export default function LinkSectionDivider({
  text,
  href,
  className = "",
  ariaLabel,
}: LinkSectionDividerProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? text}
      className={`group block px-5 py-12 md:py-16 ${className} cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40`}
    >
      <div className="flex items-center justify-center text-center">
        <div className="inline-flex flex-col items-center">
          <p className="font-garamond text-[14px] tracking-[0.22em] text-black/90 uppercase transition-colors duration-200 group-hover:text-gold">
            {text}
          </p>
          <span className="mt-2 h-px w-55 bg-black/20 transition-colors duration-200 group-hover:bg-gold" />
        </div>  
      </div>
    </Link>
  );
}
