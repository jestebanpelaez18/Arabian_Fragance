"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.setAttribute("data-portal", "cart");
    document.body.appendChild(div);
    setEl(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!el) return null;
  return createPortal(children, el);
}
