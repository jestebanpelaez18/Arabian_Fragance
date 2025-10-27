import Stripe from "stripe";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { PRODUCTS } from "../data/products"; // tu catálogo local

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const eurToCents = (n: number) => Math.round(n * 100);

async function upsertProductAndPrice(p: any) {
  // 1) ¿Existe un producto en Stripe con metadata.app_id = p.id?
  const list = await stripe.products.list({ limit: 100, active: true });
  let sp = list.data.find((x) => x.metadata?.app_id === p.id);

  if (!sp) {
    sp = await stripe.products.create({
      name: p.name,
      active: true,
      images: p.images?.length ? p.images : p.image ? [p.image] : [],
      metadata: { app_id: p.id, slug: p.slug },
    });
    console.log(`Created product ${p.name} -> ${sp.id}`);
  } else {
    // Mantén Stripe sincronizado con tu contenido visible
    await stripe.products.update(sp.id, {
      name: p.name,
      images: p.images?.length ? p.images : p.image ? [p.image] : [],
      metadata: { app_id: p.id, slug: p.slug },
    });
  }

  // 2) Price activo en EUR con ese importe actual (en céntimos)
  const targetAmount = eurToCents(p.price);
  const prices = await stripe.prices.list({ product: sp.id, active: true, currency: "eur", limit: 100 });
  let price = prices.data.find((x) => x.unit_amount === targetAmount);

  if (!price) {
    // (opcional) desactiva precios anteriores si quieres tener sólo uno activo
    for (const pr of prices.data) {
      await stripe.prices.update(pr.id, { active: false });
    }
    price = await stripe.prices.create({
      product: sp.id,
      currency: "eur",
      unit_amount: targetAmount,
      // Si vas a usar Stripe Tax, normalmente dejas tax_behavior por defecto y activas automatic_tax en la sesión
    });
    console.log(`Created price ${p.price} EUR -> ${price.id}`);
  }

  return { stripe_product_id: sp.id, stripe_price_id: price.id };
}

async function main() {
  const map: Record<string, { stripe_product_id: string; stripe_price_id: string }> = {};

  for (const p of PRODUCTS.filter((x) => x.status !== "draft")) {
    const ids = await upsertProductAndPrice(p);
    map[p.id] = ids;
  }

  const out = path.join(process.cwd(), "stripe.ids.json");
  writeFileSync(out, JSON.stringify(map, null, 2));
  console.log(`\nWrote IDs map to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
