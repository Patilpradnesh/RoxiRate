import React, { useEffect, useState } from "react";

let pushToast;
export function showToast(message, type = "success") {
  if (pushToast) pushToast({ id: Date.now(), message, type });
}

export default function Toast() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    pushToast = (it) => {
      setItems((s) => [...s, it]);
      setTimeout(() => setItems((s) => s.filter(x => x.id !== it.id)), 3500);
    };
    return () => { pushToast = null; };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {items.map(it => (
        <div key={it.id} className={`min-w-[220px] p-3 rounded-xl shadow flex items-start gap-3 ${it.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          <div className="text-sm">{it.message}</div>
        </div>
      ))}
    </div>
  );
}
