import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "discover";
  href?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  className,
  variant = "primary",
  href,
}: ButtonProps) {
  const base = "px-6 py-3 rounded font-semibold transition";

  const variants = {
    primary:
      "bg-white text-neutral-900 shadow-md hover:shadow-lg " +
      "focus:ring-white/70 focus:ring-offset-black/30",
    secondary:
      "border border-white text-white hover:bg-white hover:text-neutral-900 " +
      "focus:ring-white/70 focus:ring-offset-black/30",
    discover: `border border-white text-white hover:bg-yellow-400 hover:text-neutral-900 focus:ring-white/70 focus:ring-offset-black/30`,
  } as const;

  const styles = `${base} ${variants[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
