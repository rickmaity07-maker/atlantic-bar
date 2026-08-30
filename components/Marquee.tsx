const ITEMS = [
  "LUXURY VIBES",
  "PREMIUM NIGHTS",
  "LIVE DJ SETS",
  "HAND-CRAFTED COCKTAILS",
  "VELVET LOUNGE",
  "GOLDEN HOUR",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-gold/20 bg-charcoal py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 font-display uppercase tracking-[0.3em] text-sm text-smoke"
          >
            {item}
            <span className="text-gold text-lg leading-none">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
