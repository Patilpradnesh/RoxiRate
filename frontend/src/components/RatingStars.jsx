export default function RatingStars({ value = 0, onChange = () => {} }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition
    ${value >= s ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-600"}
  `}
        >
          ★
        </button>
      ))}
    </div>
  );
}
