"use client";

import Image, { ImageProps } from "next/image";

export default function SmoothImage({
  alt,
  src,
  className,
  priority,
  loading,
  ...props
}: ImageProps) {
  return (
    <Image
      alt={alt}
      src={src}
      className={`transition-[transform,opacity] duration-1200 ease-out ${className || ""}`}
      decoding="async"
      loading={priority ? loading : (loading ?? "lazy")}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIGZpbGw9IiNGNEYzRUYiLz48L3N2Zz4="
      {...props}
    />
  );
}