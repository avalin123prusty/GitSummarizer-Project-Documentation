import React from "react";
import Icon from "./Icon";

export function EmptyState({
  icon = "clock",
  title = "No summaries yet",
  description = "Enter any public GitHub repository URL above to generate your first summary.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-center sm:p-14">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon name={icon} size={24} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow" size={13} />
        </button>
      )}
    </div>
  );
}

export default EmptyState;
