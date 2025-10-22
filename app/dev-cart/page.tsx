"use client";
import { useCart } from "@/lib/cart/store";

export default function DevCartPage() {
  const { add, clear, items, count, subtotal } = useCart();
  return (
    <div style={{ padding: 24 }}>
      <h1>Dev Cart</h1>
      <button
        onClick={() =>
          add({ id: "test-1", slug: "test-1", name: "Test Perfume", price: 65, image: "/placeholder.png" }, 1)
        }
      >
        Add 1
      </button>
      <button onClick={() => clear()} style={{ marginLeft: 8 }}>
        Clear
      </button>
      <div style={{ marginTop: 12 }}>Count: {count()}</div>
      <div>Items: {items.length}</div>
      <div>Subtotal (euros): {subtotal()}</div>
    </div>
  );
}
