// src/components/RatingStars.jsx
import React from "react";

export default function RatingStars({ value = 0, onChange, readOnly = false }) {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => (
        <button
          key={s}
          disabled={readOnly}
          title={`${s} star`}
          onClick={() => onChange && onChange(s)}
          className={`w-7 h-7 flex items-center justify-center rounded ${s <= value ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"} focus:outline-none`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
