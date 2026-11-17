import React from "react";
import Icon from "./Icon";

export function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#0f1f18]/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-md transition-all duration-200 animate-toast-slide-down"
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${
          isSuccess
            ? "bg-emerald-600/30 text-emerald-300 ring-1 ring-emerald-500/40"
            : isError
            ? "bg-rose-900/40 text-rose-300 ring-1 ring-rose-500/40"
            : "bg-slate-800 text-slate-300 ring-1 ring-slate-700"
        }`}
      >
        <Icon name={isSuccess ? "check" : isError ? "alertCircle" : "spark"} size={14} />
      </span>

      <span className="max-w-xs text-slate-100 leading-snug">{message}</span>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="ml-2 rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}

export default Toast;
