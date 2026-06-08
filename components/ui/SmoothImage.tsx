"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SmoothImage({
  alt,
  src,
  className,
  ...props
}: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      src={src}
      className={`transition-[transform,opacity] duration-700 ease-out ${
        isLoading
          ? "scale-[1.02] opacity-0"
          : "scale-100 opacity-100"
      } ${className || ""}`}
      onLoad={() => setLoading(false)}
      decoding="async"
      {...props}
    />
  );
}
