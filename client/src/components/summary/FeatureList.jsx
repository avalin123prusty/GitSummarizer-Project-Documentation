import React from "react";
import Icon from "../common/Icon";

export function FeatureList({ features = [] }) {
  if (!features || features.length === 0) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 text-center text-xs text-slate-500">
        No specific feature highlights were extracted for this repository.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 text-xs text-slate-700 shadow-2xs sm:text-sm"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold">
            <Icon name="check" size={12} />
          </span>
          <span className="leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
