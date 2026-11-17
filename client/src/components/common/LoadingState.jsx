import React, { useEffect, useState } from "react";
import Icon from "./Icon";

const STAGES = [
  "Connecting to GitHub REST API...",
  "Fetching repository metadata & README...",
  "Retrieving recent commit activity...",
  "Synthesizing structured AI brief...",
  "Finalizing overview and prerequisites...",
];

export function LoadingState({ message = "Analyzing repository..." }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12"
    >
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-60" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-inner">
          <Icon name="spark" size={26} className="animate-pulse" />
        </div>
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-800 tracking-tight">
        {message}
      </h3>
      <p className="mt-2 text-xs text-slate-500 transition-all duration-300">
        {STAGES[stageIndex]}
      </p>

      {/* Progress pill indicator */}
      <div className="mt-6 flex items-center justify-center gap-1.5">
        {STAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === stageIndex
                ? "w-7 bg-emerald-600"
                : i < stageIndex
                ? "w-2 bg-emerald-300"
                : "w-2 bg-slate-200"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-[11px] text-slate-400">
        Public GitHub repositories only · No tokens required for analysis
      </p>
    </div>
  );
}

export default LoadingState;
