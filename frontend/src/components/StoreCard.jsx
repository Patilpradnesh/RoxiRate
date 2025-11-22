import RatingStars from "./RatingStars";

export default function StoreCard({ store, onRate }) {
  return (
    <article className="bg-white rounded-xl shadow-card p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
        <p className="text-sm text-muted mt-1">{store.address}</p>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="text-yellow-500 font-semibold text-lg">★</div>
            <div>
              <div className="text-sm text-muted">Average</div>
              <div className="text-base font-medium text-gray-800">
                {store.average_rating ?? 0}
              </div>
            </div>
          </div>

          <div className="ml-6">
            <div className="text-sm text-muted">Your rating</div>
            <div className="mt-1">
              <RatingStars
                value={store.user_rating || 0}
                onChange={(v) => onRate(store.id, v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Removed the 'Rate 5★' button */}
    </article>
  );
}
