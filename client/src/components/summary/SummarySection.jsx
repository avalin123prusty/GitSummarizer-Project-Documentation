import React, { useState } from "react";
import Icon from "../common/Icon";
import FeatureList from "./FeatureList";
import PrerequisitesList from "./PrerequisitesList";
import CommitDigest from "./CommitDigest";
import SourceCommits from "./SourceCommits";
import { useClipboard } from "../../hooks/useClipboard";

export function SummarySection({ data, onRerun }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { copy, hasCopied } = useClipboard();

  if (!data || !data.summary) return null;

  const { summary, repository, source, commits, ai } = data;

  const tabs = [
    { id: "overview", label: "Overview", icon: "book" },
    { id: "features", label: `Features (${summary.features?.length || 0})`, icon: "spark" },
    { id: "prerequisites", label: `Prerequisites (${summary.prerequisites?.length || 0})`, icon: "check" },
    { id: "commits", label: "Recent Changes", icon: "commit" },
  ];

  return (
    <div className="p-6 sm:p-7">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-100 gap-6 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-xs font-semibold transition shrink-0 inline-flex items-center gap-1.5 ${
                isActive ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon name={tab.icon} size={14} className={isActive ? "text-emerald-700" : "text-slate-400"} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-700" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Project Overview
              </h3>
              <button
                type="button"
                onClick={() => copy(summary.overview)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
              >
                <Icon name={hasCopied ? "check" : "copy"} size={13} className={hasCopied ? "text-emerald-600" : ""} />
                <span>{hasCopied ? "Copied" : "Copy Overview"}</span>
              </button>
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-slate-700 whitespace-pre-line sm:text-base">
              {summary.overview || "No overview available."}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 border-t border-slate-100 pt-6">
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <Icon name="spark" size={14} className="text-emerald-600" />
                  Key Highlights
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {(summary.features || []).slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="line-clamp-2">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <Icon name="check" size={14} className="text-emerald-600" />
                  Quick Prerequisites
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-mono">
                  {(summary.prerequisites || []).slice(0, 3).map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="line-clamp-2">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Features & Capabilities
              </h3>
              <span className="text-xs text-slate-400">{summary.features?.length || 0} features listed</span>
            </div>
            <FeatureList features={summary.features} />
          </div>
        )}

        {activeTab === "prerequisites" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Setup & Environment Prerequisites
              </h3>
              <span className="text-xs text-slate-400">{summary.prerequisites?.length || 0} items listed</span>
            </div>
            <PrerequisitesList prerequisites={summary.prerequisites} />
          </div>
        )}

        {activeTab === "commits" && (
          <div className="space-y-6">
            <CommitDigest digest={summary.commitDigest} commitCount={source?.commitCount || 0} />
            <SourceCommits commits={commits} repositoryUrl={repository?.url} />
          </div>
        )}
      </div>

      {/* AI Attribution & Disclaimer (UI_UX_DESIGN.md Section 4) */}
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Icon name="spark" size={14} className="text-emerald-600 shrink-0" />
          <span>
            AI Provider: <strong className="text-slate-700">{ai?.provider || "OpenAI"}</strong> ({ai?.model || "gpt-4o-mini"}).
            Always verify critical commands against the official repository documentation.
          </span>
        </div>

        {onRerun && (
          <button
            type="button"
            onClick={onRerun}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition shrink-0"
          >
            <Icon name="refresh" size={13} />
            <span>Re-run Analysis</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SummarySection;
