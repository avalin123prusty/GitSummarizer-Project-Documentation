import React from "react";
import Icon from "../common/Icon";

export function AuthNavbar({ mode, onToggleMode, apiHealthy = true, onGuestDemo }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-8 lg:px-12">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
          <Icon name="code" size={18} />
        </div>
        <div>
          <span className="block text-sm font-bold tracking-tight text-slate-900">
            GitSummarizer
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
            AI Codebase Platform
          </span>
        </div>
      </div>

      {/* Center tagline on large screens */}
      <div className="hidden items-center gap-2 text-xs text-slate-500 lg:flex font-medium">
        <Icon name="spark" size={14} className="text-emerald-600" />
        <span>Analyze, understand, and document public repositories in seconds</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Status pill */}
        <span
          title={apiHealthy ? "Connected to GitSummarizer API" : "Backend unreachable"}
          className="hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 sm:inline-flex"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              apiHealthy ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          <span>{apiHealthy ? "API Ready" : "API Offline"}</span>
        </span>

        {/* Switch Login / Register */}
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-slate-500 sm:inline">
            {mode === "login" ? "Need an account?" : "Have an account?"}
          </span>
          <button
            type="button"
            onClick={onToggleMode}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition shadow-2xs"
          >
            {mode === "login" ? "Create Account" : "Sign In"}
          </button>
        </div>

        {onGuestDemo && (
          <button
            type="button"
            onClick={onGuestDemo}
            className="hidden sm:inline-flex rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
          >
            Try Demo
          </button>
        )}
      </div>
    </header>
  );
}

export default AuthNavbar;
