import React, { useState } from "react";
import Icon from "../common/Icon";
import HistoryItem from "./HistoryItem";
import EmptyState from "../common/EmptyState";
import ConfirmDialog from "../common/ConfirmDialog";

export function HistoryList({
  items = [],
  pagination = { page: 1, limit: 10, total: 0, totalPages: 1 },
  onPageChange,
  onSelect,
  onDelete,
  onNewSummary,
  loading = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const fullName = item.repository?.fullName || "";
    const description = item.overviewPreview || item.repository?.description || "";
    return fullName.toLowerCase().includes(q) || description.toLowerCase().includes(q);
  });

  const handleDeleteClick = (id, name) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget && onDelete) {
      onDelete(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header and Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Summary History
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Revisit or export previous repository analyses and release notes.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                name="search"
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="h-9 w-48 rounded-xl border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 sm:w-64"
              />
            </div>

            {onNewSummary && (
              <button
                type="button"
                onClick={onNewSummary}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 text-xs font-bold text-white hover:bg-emerald-800 transition"
              >
                <Icon name="spark" size={13} />
                <span>New Summary</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* List content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 rounded-2xl border border-slate-100 bg-white p-5 animate-pulse"
            />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          icon="clock"
          title={searchQuery ? "No matching summaries" : "No summary history found"}
          description={
            searchQuery
              ? `No summaries found matching "${searchQuery}".`
              : "Summaries you generate will be automatically recorded here."
          }
          actionLabel="Generate your first summary"
          onAction={onNewSummary}
        />
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onSelect={onSelect}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs text-slate-500 font-medium">
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Summary?"
        message={`Are you sure you want to delete the summary for ${deleteTarget?.name || "this repository"}? This action cannot be undone.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default HistoryList;
