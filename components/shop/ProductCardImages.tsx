"use client";

import { useEffect, useState } from "react";
import SmoothImage from "../ui/SmoothImage";

const IMAGE_SIZES = "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw";
const PRIMARY_IMAGE_CLASS =
  "object-cover transform-gpu transition-transform transition-opacity duration-1500 ease-out group-hover:scale-[1.03]";
const HOVER_IMAGE_CLASS =
  "absolute inset-0 object-cover opacity-0 transform-gpu scale-[1.05] transition-transform transition-opacity duration-1500 ease-out group-hover:scale-[1.03] group-hover:opacity-100";

type ProductCardImagesProps = {
  name: string;
  primaryImage: string;
  hoverImage: string | null;
};

export default function ProductCardImages({
  name,
  primaryImage,
  hoverImage,
}: ProductCardImagesProps) {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const hasHoverImage = canHover && Boolean(hoverImage);

  return (
    <>
      <SmoothImage
        src={primaryImage}
        alt={name}
        fill
        sizes={IMAGE_SIZES}
        className={`${PRIMARY_IMAGE_CLASS} ${hasHoverImage ? "group-hover:opacity-0" : ""}`}
      />

      {hasHoverImage && hoverImage && (
        <SmoothImage
          src={hoverImage}
          alt={`${name} detail`}
          fill
          sizes={IMAGE_SIZES}
          className={HOVER_IMAGE_CLASS}
        />
      )}
    </>
  );
}
