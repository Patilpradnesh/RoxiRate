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

  const remove = (id) => setItems((s) => s.filter((x) => x.id !== id));

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {items.map((it) => {
        const isSuccess = it.type === "success";
        return (
          <div
            key={it.id}
            className={
              "min-w-[240px] max-w-[360px] rounded-xl border shadow-soft p-3 bg-white text-slate-900 flex items-start gap-3"
            }
          >
            <div
              className={
                "mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 " +
                (isSuccess ? "bg-green-600/10 text-green-700" : "bg-red-600/10 text-red-700")
              }
              aria-hidden="true"
            >
              {isSuccess ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 011.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-10.707a1 1 0 00-1.414-1.414L10 7.172 8.707 5.879a1 1 0 00-1.414 1.414L8.586 8.586 7.293 9.879a1 1 0 101.414 1.414L10 10l1.293 1.293a1 1 0 001.414-1.414L11.414 8.586l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">
                {isSuccess ? "Success" : "Error"}
              </div>
              <div className="text-sm text-slate-600 break-words">{it.message}</div>
            </div>

            <button
              type="button"
              onClick={() => remove(it.id)}
              className="btn-ghost px-2 py-1"
              aria-label="Dismiss"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-slate-500">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
