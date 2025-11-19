// src/components/Toast.jsx
import React, { useEffect, useState } from "react";

let showFn;
export function showToast(msg, type = "success") {
  if (showFn) showFn({ msg, type, id: Date.now() });
}

export default function Toast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    showFn = (it) => {
      setItems((s) => [...s, it]);
      setTimeout(() => {
        setItems((s) => s.filter((x) => x.id !== it.id));
      }, 3000);
    };
    return () => (showFn = null);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50 space-y-2">
      {items.map((it) => (
        <div key={it.id} className={`px-4 py-2 rounded shadow ${it.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {it.msg}
        </div>
      ))}
    </div>
  );
}
