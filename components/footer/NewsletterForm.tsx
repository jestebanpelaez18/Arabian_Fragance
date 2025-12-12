"use client";

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

export default function NewsletterForm({
  onSubscribe,
}: {
  onSubscribe: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubscribe} className="text-white/90 mb-4 md:mb-8">
      <h3 className="font-bodoni mb-2 text-base tracking-wide uppercase">
        Join the list
      </h3>
      <p className="font-bodoni mb-4 text-sm">
        Receive updates on new arrivals, exclusive events, and private releases.
      </p>
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
  );
}
