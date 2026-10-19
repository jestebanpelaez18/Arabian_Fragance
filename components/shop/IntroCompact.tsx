import type { ReactNode } from "react";

type IntroCompactProps = {
  title: string;
  subtitle?: ReactNode;
};

export default function IntroCompact({ title, subtitle }: IntroCompactProps) {
  return (
    <section className="w-full px-5 pt-7 pb-6 text-left md:pt-8 md:pb-8 xl:px-6">
      <h1 className="font-magister text-3xl leading-tight font-normal uppercase md:text-4xl lg:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <div className="font-garamond mt-3 max-w-4xl text-base leading-relaxed text-black/70 md:text-lg">
          {subtitle}
        </div>
      )}
    </section>
  );
}
