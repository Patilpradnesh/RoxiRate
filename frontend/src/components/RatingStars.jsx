import { useMemo, useState } from "react";

export default function RatingStars({ value = 0, onChange = () => {} }) {
  const [hover, setHover] = useState(null);
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  const active = hover ?? value;

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {stars.map((s) => {
        const filled = active >= s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(null)}
            className={
              "h-9 w-9 rounded-lg border transition flex items-center justify-center " +
              (filled
                ? "bg-yellow-400/15 border-yellow-400/40 text-yellow-600"
                : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50")
            }
            aria-label={`Rate ${s} star${s === 1 ? "" : "s"}`}
          >
            <span className="text-lg leading-none">★</span>
          </button>
        );
      })}
    </div>
  );
}
