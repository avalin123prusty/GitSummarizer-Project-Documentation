import React from "react";
import Icon from "../common/Icon";
import UserProfileMenu from "./UserProfileMenu";
import { useAuth } from "../../context/AuthContext";

export function Header({
  activeView,
  onNavigate,
  onOpenAuth,
  apiHealthy = true,
  onToggleMobileMenu,
}) {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { id: "generate", label: "Generate", icon: "spark" },
    { id: "history", label: "History", icon: "clock" },
    { id: "saved", label: "Saved", icon: "bookmark" },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-8 lg:px-12 backdrop-blur-md transition-all">
      {/* Left: Brand & Mobile/Tablet Drawer Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 lg:hidden transition"
          >
            <Icon name="menu" size={19} />
          </button>
        )}

        <button
          type="button"
          onClick={() => onNavigate("generate")}
          className="group flex items-center gap-2.5 text-left focus:outline-hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs group-hover:bg-emerald-800 transition">
            <Icon name="code" size={18} />
          </span>
          <div>
            <span className="block text-sm font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition">
              GitSummarizer
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-emerald-800 sm:block">
              AI Codebase Briefs
            </span>
          </div>
        </button>
      </div>

      {/* Center: Navigation Pills (Desktop view; Mobile & Tablet use drawer) */}
      <nav className="hidden lg:flex items-center gap-1 rounded-2xl bg-slate-100/80 p-1 border border-slate-200/60">
        {navItems.map((item) => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                active
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Icon
                name={item.icon}
                size={14}
                className={active ? "text-emerald-700" : "text-slate-400"}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: API Status & User Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Status Pill */}
        <span
          title={apiHealthy ? "Connected to GitSummarizer API" : "Backend unreachable"}
          className="hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 md:inline-flex"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              apiHealthy ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          <span>{apiHealthy ? "API Online" : "API Offline"}</span>
        </span>

        {/* User Profile Dropdown or Sign In */}
        {isAuthenticated ? (
          <UserProfileMenu />
        ) : (
          <button
            type="button"
            onClick={onOpenAuth}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition shadow-xs"
          >
            <Icon name="user" size={13} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
