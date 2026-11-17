import React from "react";
import Icon from "../common/Icon";
import { formatStars } from "../../utils/formatters";

export function RepositoryHeader({
  repository,
  isSaved = false,
  onToggleSave,
  onCopyAll,
  hasCopiedAll = false,
  source,
}) {
  if (!repository) return null;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-6 sm:p-7">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon name="github" size={24} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {repository.fullName || `${repository.owner}/${repository.name}`}
            </h1>
            {repository.language && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {repository.language}
              </span>
            )}
          </div>

          {repository.description && (
            <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              {repository.description}
            </p>
          )}

          {/* Badges: Stars, Branch, Source status */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Icon name="star" size={14} className="fill-amber-400 stroke-amber-500" />
              <span>{formatStars(repository.stars)} stars</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-600">
              <Icon name="gitBranch" size={14} />
              <span>{repository.defaultBranch || "main"}</span>
            </div>

            {source && (
              <div className="flex items-center gap-1 text-slate-500">
                <span>•</span>
                <span>{source.commitCount} commits analyzed</span>
                <span>•</span>
                <span>{source.readmeAvailable ? "README parsed" : "No README"}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {onCopyAll && (
          <button
            type="button"
            onClick={onCopyAll}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Icon name={hasCopiedAll ? "check" : "copy"} size={14} className={hasCopiedAll ? "text-emerald-600" : ""} />
            <span>{hasCopiedAll ? "Copied" : "Copy Brief"}</span>
          </button>
        )}

        {onToggleSave && (
          <button
            type="button"
            onClick={onToggleSave}
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition ${
              isSaved
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={14} className={isSaved ? "text-emerald-700" : ""} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        )}

        {repository.url && (
          <a
            href={repository.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open repository on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <Icon name="external" size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

export default RepositoryHeader;
