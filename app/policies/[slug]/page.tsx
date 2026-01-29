import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/shopify";
import type { Metadata } from "next";

// ... (Types, Query y Policy_Map se quedan igual, no hace falta tocarlos) ...
interface Policy {
  id: string;
  title: string;
  body: string;
  handle: string;
}

interface ShopPoliciesData {
  data: {
    shop: {
      privacyPolicy: Policy | null;
      termsOfService: Policy | null;
      refundPolicy: Policy | null;
      shippingPolicy: Policy | null;
    };
  };
}

const getPoliciesQuery = `
  query getPolicies {
    shop {
      privacyPolicy { id title body }
      termsOfService { id title body }
      refundPolicy { id title body }
      shippingPolicy { id title body }
    }
  }
`;

const POLICY_MAP: Record<string, keyof ShopPoliciesData["data"]["shop"]> = {
  "privacy-policy": "privacyPolicy",
  "terms-conditions": "termsOfService",
  "refund-policy": "refundPolicy",
  "shipping-policy": "shippingPolicy",
};

async function getPolicy(slug: string): Promise<Policy | null> {
  const shopifyKey = POLICY_MAP[slug];
  if (!shopifyKey) return null;

  const res = await shopifyFetch<ShopPoliciesData>({
    query: getPoliciesQuery,
    tags: ["policies"],
  });

  const shopData = res.body?.data?.shop;
  if (!shopData || !shopData[shopifyKey]) return null;

  return shopData[shopifyKey];
}

export function generateStaticParams() {
  return Object.keys(POLICY_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = await getPolicy(slug);
  if (!policy) return {};
  return {
    title: `${policy.title} | Arabian Fragrance`,
  };
}

// --- COMPONENTE VISUAL ---
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = await getPolicy(slug);

  if (!policy) return notFound();

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <article className="mx-auto px-6 py-24 md:py-32">
        
        {/* HEADER */}
        <header className="mb-20 text-center">
          <h1 className="font-playfair-display text-3xl uppercase tracking-[0.2em] text-ink md:text-5xl">
            {policy.title}
          </h1>
          <div className="mx-auto mt-8 h-px w-16 bg-gold/50" />
        </header>
        <div
          className="policy-content" 
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />

      </article>
    </main>
  );
}