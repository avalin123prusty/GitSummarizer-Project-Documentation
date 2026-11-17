import React from "react";
import Icon from "../common/Icon";

export function GenerateButton({
  loading = false,
  disabled = false,
  type = "submit",
  onClick,
  className = "",
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <span>{children || "Generate Summary"}</span>
          <Icon name="arrow" size={14} />
        </>
      )}
    </button>
  );
}

export default GenerateButton;
