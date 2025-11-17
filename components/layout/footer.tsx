"use client";

import Link from "next/link";
import { FormEvent } from "react";
import Image from "next/image";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
	{
		title: "Customer Care",
		links: [
			{ label: "Contact Us", href: "/contact" },
			{ label: "Shipping", href: "/shipping" },
			{ label: "Returns & Repairs", href: "/returns" },
			{ label: "FAQs", href: "/faq" },
			{ label: "Warranty Policy", href: "/warranty" },
			{ label: "Terms & Conditions", href: "/terms" },
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Cookies Policy", href: "/cookies" },
		],
	},
	{
		title: "About",
		links: [
			{ label: "Brand Profile", href: "/about" },
			{ label: "Store", href: "/showroom" },
			{ label: "Philanthropy", href: "/philanthropy" },
			{ label: "Recycling", href: "/recycling" },
			{ label: "Care Guide", href: "/care" },
		],
	},
	{
		title: "Social",
		links: [
			{ label: "Instagram", href: "https://instagram.com/" },
			{ label: "Facebook", href: "https://facebook.com/" },
			{ label: "Pinterest", href: "https://pinterest.com/" },
		],
	},
];

const BRAND_COPY =
	"Arabian Fragrance is a contemporary perfumery house crafting evocative scents with ethically sourced ingredients. Explore signature blends, layered rituals and limited editions in-store or online.";

function ArrowRightIcon({ className = "" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
			<path
				d="M13 5l7 7-7 7M5 12h14"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default function Footer() {
	const year = new Date().getFullYear();

	function onSubscribe(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TODO: connect to your ESP (Klaviyo/Mailchimp/etc.)
	}

	return (
		<footer className="min-h-[430px] border-white/10 text-white">
			<div className="px-4 pt-8 pb-7 md:px-5">
				{/* MOBILE: vertical Structure */}
				<div className="block md:hidden">
					{/* Newsletter */}
					<section className="mb-8">
						<h3 className="font-bodoni text-base tracking-wide uppercase mb-2">
							Join the list
						</h3>
						<p className="font-bodoni text-sm mb-4">
							Recibe noticias sobre nuevos productos, eventos exclusivos y
							lanzamientos privados.
						</p>
						<form onSubmit={onSubscribe} className="mb-4">
							<div className="flex items-center border-b border-stone-300 py-2">
								<input
									id="footerEmail"
									type="email"
									required
									placeholder="Email address"
									className="font-bodoni flex-1 border-none bg-transparent text-xs placeholder-stone-400 outline-none"
								/>
								<button
									type="submit"
									className="ml-2 text-white hover:text-stone-900"
									aria-label="Subscribe"
									title="Subscribe"
								>
									<ArrowRightIcon className="h-6 w-6" />
								</button>
							</div>
						</form>
					</section>

					{/* Collapsible menus */}
					<section className="mb-8">
						{COLUMNS.map((col) => (
							<details key={col.title} className="mb-2">
								<summary className="font-bodoni text-xs uppercase tracking-wide py-2 cursor-pointer">
									{col.title}
								</summary>
								<ul className="pl-2 space-y-2">
									{col.links.map((l) => (
										<li key={l.label}>
											<Link href={l.href} className="font-bodoni text-xs text-white">
												{l.label}
											</Link>
										</li>
									))}
								</ul>
							</details>
						))}
					</section>

					{/* Brand copy */}
					<p className="font-bodoni text-xs leading-relaxed mb-6">
						{BRAND_COPY}
					</p>

					{/* Currency selector & logo */}
					<div className="flex items-center justify-end gap-4 mb-4">
						<select
							className="font-carlito border-none bg-transparent text-xs"
							defaultValue="EUR"
							aria-label="Select currency"
						>
							<option value="EUR">€ / EUR</option>
							<option value="USD">$ / USD</option>
							<option value="GBP">£ / GBP</option>
						</select>
						<Image
							src="/logo/AFC-logo-mark-light.svg"
							alt="Arabian Fragrance"
							width={28}
							height={28}
							priority
							className="h-8 w-auto select-none"
						/>
					</div>

					{/* Copyright */}
					<div className="text-xs text-stone-400 mt-2 text-center">
						© {year} Arabian Fragrance. All rights reserved.
					</div>
				</div>

				{/* DESKTOP */}
				<div className="hidden md:grid grid-cols-4 gap-5">
					{COLUMNS.map((col) => (
						<section key={col.title}>
							<ul className="footer space-y-3 text-sm text-white">
								{col.links.map((l) => (
									<li key={l.label}>
										<Link
											href={l.href}
											className="nav-link inline-flex items-center gap-2 transition hover:text-white"
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</section>
					))}
					<aside>
						<h3 className="font-bodoni text-base tracking-wide text-white uppercase">
							Join the list
						</h3>
						<p className="font-bodoni mt-3 max-w-xl text-sm text-white">
							Recibe noticias sobre nuevos productos, eventos exclusivos y
							lanzamientos privados.
						</p>
						<form onSubmit={onSubscribe} className="mb-8">
							<div className="flex items-center border-b border-stone-300 py-2">
								<input
									id="footerEmail"
									type="email"
									required
									placeholder="Email address"
									className="font-bodoni flex-1 border-none bg-transparent text-xs placeholder-stone-400 outline-none"
								/>
								<button
									type="submit"
									className="ml-2 text-white hover:text-stone-900"
									aria-label="Subscribe"
									title="Subscribe"
								>
									<ArrowRightIcon className="h-6 w-6" />
								</button>
							</div>
						</form>
						<p className="font-bodoni mt-8 max-w-xl text-sm leading-relaxed text-white">
							{BRAND_COPY}
						</p>
						<div className="mt-6 flex items-center justify-end gap-6">
							<select
								className="font-carlito border-none bg-transparent text-sm"
								defaultValue="EUR"
								aria-label="Select currency"
							>
								<option value="EUR">€ / EUR</option>
								<option value="USD">$ / USD</option>
								<option value="GBP">£ / GBP</option>
							</select>
							<Image
								src="/logo/AFC-logo-mark-light.svg"
								alt="Arabian Fragrance"
								width={32}
								height={32}
								priority
								className="h-10 w-auto select-none"
							/>
						</div>
					</aside>
				</div>
			</div>

			{/* Copyright para desktop */}
			<div className="hidden md:block">
				<div className="flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-5">
					<p className="font-bodoni text-sm text-stone-400">
						© {year} Arabian Fragrance. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
