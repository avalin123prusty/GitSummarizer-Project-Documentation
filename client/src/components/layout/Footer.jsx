import React from "react";
import Icon from "../common/Icon";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/70 py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-white">
            <Icon name="code" size={13} />
          </span>
          <span className="font-bold text-slate-700">GitSummarizer</span>
          <span>— Understand any GitHub repository in minutes.</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="https://github.com/vishal-rathod-02/gitsummarizer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition"
          >
            <Icon name="github" size={14} />
            <span>GitHub Repo</span>
          </a>
          <span>•</span>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
