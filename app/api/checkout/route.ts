import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/data/products";
import { get as getStock } from "@/lib/stock/devStore";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs"; // ⬅️ importante si usas fs/path

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const eurToCents = (n: number) => Math.round(n * 100);

function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

function getBaseUrl(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host =
    req.headers.get("x-forwarded-host") ??
    req.headers.get("host") ??
    "localhost:3000";
  return `${proto}://${host}`;
}

// Cache en memoria para no leer disco cada vez
let IDS_CACHE: Record<string, { stripe_price_id: string }> | null = null;
function seededPriceFor(appId: string): string | undefined {
  try {
    if (IDS_CACHE === null) {
      const p = path.join(process.cwd(), "stripe.ids.json");
      IDS_CACHE = existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
    }
    return IDS_CACHE?.[appId]?.stripe_price_id;
  } catch {
    return undefined;
  }
}

export async function POST(req: NextRequest) {
  try {
    const BASE_URL = getBaseUrl(req);

    const body = await req.json().catch(() => null);
    const items: Array<{ id: string; qty: number }> = Array.isArray(body)
      ? body
      : Array.isArray(body?.items)
        ? body.items
        : [];
    if (!items.length) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    // Validación rápida (usa stock real del file-store)
    for (const it of items) {
      const p = findProduct(it.id);
      const requested = Math.max(1, Math.floor(it.qty || 1));
      if (!p || p.status === "draft") {
        return NextResponse.json(
          { error: `Product not available: ${it?.id ?? "unknown"}` },
          { status: 404 },
        );
      }
      const available = await getStock(p.id);
      if (requested > available) {
        return NextResponse.json(
          { error: `Insufficient stock for ${p.name}`, available },
          { status: 409 },
        );
      }
    }

    // Construcción híbrida de line_items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const it of items) {
      const p = findProduct(it.id)!;
      const qty = Math.max(1, Math.floor(it.qty || 1));

      const seeded = seededPriceFor(p.id);
      if (seeded) {
        line_items.push({ price: seeded, quantity: qty });
      } else if (p.stripe_price_id) {
        line_items.push({ price: p.stripe_price_id, quantity: qty });
      } else {
        line_items.push({
          quantity: qty,
          price_data: {
            currency: "eur",
            unit_amount: eurToCents(p.price),
            product_data: {
              name: p.name,
              // Si tus imágenes son relativas, mejor no enviarlas aquí o asegúrate que sean absolutas
              images: p.images?.length ? p.images : p.image ? [p.image] : [],
              metadata: { app_id: p.id, slug: p.slug },
            },
          },
        });
      }
    }

    const idempotencyKey = `chk_${crypto.randomUUID()}`;

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items,
        success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}/checkout/cancel`,
        billing_address_collection: "required",
        allow_promotion_codes: true,
        locale: "auto",
        // automatic_tax: { enabled: true },
        client_reference_id: crypto.randomUUID(),
        metadata: {
          source: "arabian-fragrance",
          cart: JSON.stringify(
            items.map((i) => ({
              id: i.id,
              qty: Math.max(1, Math.floor(i.qty || 1)),
            })),
          ),
        },
      },
      { idempotencyKey },
    );

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Checkout error" }, { status: 500 });
  }
}
