import React, { useState } from "react";
import Icon from "../common/Icon";
import { formatDate } from "../../utils/formatters";

export function SourceCommits({ commits = [], repositoryUrl = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!commits || commits.length === 0) {
    return null;
  }

  const cleanRepoUrl = repositoryUrl.replace(/\/+$/, "");

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-xs font-bold text-slate-800 hover:text-emerald-700 transition"
      >
        <div className="flex items-center gap-2">
          <Icon name="commit" size={16} className="text-slate-500" />
          <span>Source Commits Referenced ({commits.length})</span>
        </div>
        <Icon name={isOpen ? "chevronUp" : "chevronDown"} size={16} className="text-slate-400" />
      </button>

      {isOpen && (
        <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100 pt-2">
          {commits.map((c, idx) => {
            const shortSha = c.sha ? c.sha.slice(0, 7) : `commit-${idx}`;
            const commitUrl = c.sha && cleanRepoUrl ? `${cleanRepoUrl}/commit/${c.sha}` : null;

            return (
              <li key={c.sha || idx} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800 line-clamp-1">{c.message}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {c.authorName || "Unknown author"} • {formatDate(c.committedAt)}
                  </p>
                </div>

                {commitUrl ? (
                  <a
                    href={commitUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-mono text-[11px] font-semibold text-emerald-700 hover:underline"
                  >
                    {shortSha}
                  </a>
                ) : (
                  <span className="shrink-0 font-mono text-[11px] text-slate-400">
                    {shortSha}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SourceCommits;
