"use client";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/store";

export function ClearCartOnSuccess({ sessionId }: { sessionId?: string }) {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    if (sessionId) clear();
  }, [sessionId, clear]);
  return null;
}
