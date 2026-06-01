type SectionHeaderProps = {
  title: string;
  description: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function SectionHeader({
  title,
  description,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <section
      className={cx(
        "w-full bg-background px-4 py-14 text-center md:py-18",
        className,
      )}
    >
      <div
        className={cx(
          "mx-auto flex max-w-3xl flex-col items-center",
          contentClassName,
        )}
      >
        <h2
          className={cx(
            "text-2xl leading-tight font-light tracking-[0.14em] uppercase text-neutral-900 md:text-3xl lg:text-4xl",
            titleClassName,
          )}
        >
          {title}
        </h2>

        <p
          className={cx(
            "font-garamond mt-5 max-w-xl text-xs leading-relaxed font-light tracking-wide text-neutral-600 md:text-sm",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      </div>
    </section>
  );
}