import React from "react";
import Icon from "./Icon";
import { getErrorMessage } from "../../utils/errorMapper";

export function ErrorBanner({ error, onRetry, onDismiss, className = "" }) {
  if (!error) return null;

  const displayMessage = getErrorMessage(error);
  const errorCode = typeof error === "object" ? error?.code || error?.error?.code : null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs text-rose-800 ${className}`}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
        <Icon name="alertCircle" size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-rose-900">
          {errorCode ? `Error: ${errorCode.replace(/_/g, " ")}` : "Unable to generate summary"}
        </p>
        <p className="mt-0.5 leading-relaxed text-rose-700">{displayMessage}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-2.5 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-50 transition"
          >
            <Icon name="refresh" size={13} />
            <span>Retry</span>
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss error"
            className="rounded-lg p-1 text-rose-400 hover:text-rose-700 hover:bg-rose-100/50 transition"
          >
            <Icon name="close" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorBanner;
