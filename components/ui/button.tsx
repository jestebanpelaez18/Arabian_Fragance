import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/* --- tokens --- */
const SIZES = {
  sm: "h-9 px-5 text-[11px]",
  md: "h-11 px-7 text-[12px]",
  lg: "h-12 px-8 text-[13px]",
} as const;
type Size = keyof typeof SIZES;

const VARIANTS = {
  solid:
    "bg-white text-[var(--background)] hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)] active:scale-[0.98]",
  outline:
    "border border-white/80 hover:bg-white hover:text-[var(--background)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.18)] active:scale-[0.98]",
  ghost:
    "text-black/85 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white",
} as const;
type BaseVariant = keyof typeof VARIANTS;

type LegacyVariant = "primary" | "secondary" | "discover";
type Variant = BaseVariant | LegacyVariant;

const mapVariant = (v?: Variant): BaseVariant => {
  switch (v) {
    case "primary":
      return "solid";
    case "secondary":
    case "discover":
      return "outline";
    case "solid":
    case "outline":
    case "ghost":
      return v;
    default:
      return "solid";
  }
};

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* --- props --- */
type Common = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
};

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "color"> & {
    href?: undefined;
  };

type LinkProps = Common & {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
};

export default function Button(props: ButtonProps | LinkProps) {
  if ("href" in props) {
    const {
      href,
      target,
      rel,
      children,
      className,
      size = "md",
      variant,
      iconLeft,
      iconRight,
      loading,
      fullWidth,
    } = props as LinkProps;

    const resolved = mapVariant(variant);
    const classes = cx(
      "inline-flex items-center justify-center rounded-full select-none uppercase tracking-[0.16em] font-normal transition-[background-color,color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
      SIZES[size],
      VARIANTS[resolved],
      fullWidth && "w-full",
      loading && "cursor-wait opacity-60 pointer-events-none",
      className,
    );

    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {iconLeft && <span className="mr-2 inline-flex">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="ml-2 inline-flex">{iconRight}</span>}
      </Link>
    );
  }

  const {
    children,
    className,
    size = "md",
    variant,
    iconLeft,
    iconRight,
    loading,
    fullWidth,
    type = "button",
    disabled,
    ...btnRest
  } = props as ButtonProps;

  const resolved = mapVariant(variant);
  const classes = cx(
    "inline-flex items-center justify-center rounded-full select-none uppercase tracking-[0.16em] font-normal transition-[background-color,color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
    SIZES[size],
    VARIANTS[resolved],
    fullWidth && "w-full",
    loading && "cursor-wait opacity-60 pointer-events-none",
    className,
  );

  return (
    <button
      type={type}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      className={classes}
      style={{ fontFamily: "var(--font-jakarta)" }}
      {...btnRest}
    >
      {iconLeft && <span className="mr-2 inline-flex">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2 inline-flex">{iconRight}</span>}
    </button>
  );
}
