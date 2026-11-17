import React from "react";
import Icon from "../common/Icon";

export function PrerequisitesList({ prerequisites = [] }) {
  if (!prerequisites || prerequisites.length === 0) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 text-center text-xs text-slate-500">
        No prerequisites or setup requirements were specified in the repository documentation.
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {prerequisites.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 text-xs text-slate-700 sm:text-sm"
        >
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <span className="text-[10px] font-bold">{idx + 1}</span>
          </span>
          <span className="leading-relaxed font-mono text-xs text-slate-800 sm:text-[13px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default PrerequisitesList;
