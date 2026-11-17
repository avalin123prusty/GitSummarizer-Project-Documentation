import React from "react";
import Icon from "../common/Icon";
import { useClipboard } from "../../hooks/useClipboard";

export function CommitDigest({ digest = "", commitCount = 0 }) {
  const { copy, hasCopied } = useClipboard();

  if (!digest) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 text-center text-xs text-slate-500">
        No commit digest available for this repository.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-800">
            <Icon name="commit" size={15} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Recent Changes Digest
            </h4>
            {commitCount > 0 && (
              <span className="text-[10px] text-slate-500">
                Synthesized across {commitCount} recent commit(s)
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => copy(digest)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          <Icon name={hasCopied ? "check" : "copy"} size={13} className={hasCopied ? "text-emerald-600" : ""} />
          <span>{hasCopied ? "Copied" : "Copy Notes"}</span>
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-700 sm:text-sm whitespace-pre-line">
        {digest}
      </p>
    </div>
  );
}

export default CommitDigest;
