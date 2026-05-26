export default function LpStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 text-lg sm:text-xl ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[#f5b800] drop-shadow-sm">
          ★
        </span>
      ))}
    </div>
  );
}
