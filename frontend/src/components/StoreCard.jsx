import RatingStars from "./RatingStars";

export default function StoreCard({ store, onRate }) {
  return (
    <article className="card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
            {store.name}
          </h3>
          <p className="text-sm text-slate-600 mt-1 break-words">
            {store.address || "—"}
          </p>
          {store.email ? (
            <p className="text-xs text-slate-500 mt-1 truncate">{store.email}</p>
          ) : null}
        </div>

        <div className="shrink-0 flex flex-col items-end gap-2">
          <span className="badge-warning">★ {store.average_rating ?? 0}</span>
          <span className="badge">Avg rating</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs text-slate-500">Your rating</div>
          <div className="mt-1">
            <RatingStars value={store.user_rating || 0} onChange={(v) => onRate(store.id, v)} />
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Tip: tap a star to submit
        </div>
      </div>
    </article>
  );
}
