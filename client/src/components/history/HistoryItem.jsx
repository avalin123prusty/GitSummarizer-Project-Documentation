import React from "react";
import Icon from "../common/Icon";
import { formatDate, formatStars } from "../../utils/formatters";

export function HistoryItem({ item, onSelect, onDelete }) {
  if (!item) return null;

  const repo = item.repository || {};
  const repoName = repo.fullName || `${repo.owner}/${repo.name}` || "Repository";
  const preview = item.overviewPreview || item.summary?.overview || repo.description || "No preview available.";

  return (
    <div className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-md sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1 cursor-pointer" onClick={() => onSelect(item.id)}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
            <Icon name="github" size={15} />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
            {repoName}
          </h4>
          {repo.language && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {repo.language}
            </span>
          )}
          {repo.stars !== undefined && repo.stars !== null && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
              <Icon name="star" size={11} className="fill-amber-400 stroke-amber-500" />
              <span>{formatStars(repo.stars)}</span>
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
          {preview}
        </p>

        <p className="mt-2 text-[11px] text-slate-400">
          Analyzed on {formatDate(item.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onSelect(item.id)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
        >
          <span>View Brief</span>
          <Icon name="arrow" size={12} />
        </button>

        {repo.url && (
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition"
          >
            <Icon name="external" size={14} />
          </a>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(item.id, repoName)}
            aria-label={`Delete summary for ${repoName}`}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <Icon name="trash" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default HistoryItem;
