import React from "react";
import Icon from "../common/Icon";
import { useAuth } from "../../context/AuthContext";

export function Sidebar({ activeView, onNavigate, isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth();

  // Close on Escape key press
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    { id: "generate", label: "Generate Summary", icon: "spark" },
    { id: "history", label: "History Activity", icon: "clock" },
    { id: "saved", label: "Saved Library", icon: "bookmark" },
  ];

  const initial = (user?.name || user?.email || "U").slice(0, 1).toUpperCase();
  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Developer");

  return (
    <div className="lg:hidden">
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
        />
      )}

      {/* Mobile/Tablet Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 sm:w-80 flex-col border-r border-slate-200 bg-white p-5 sm:p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand in Drawer */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onNavigate("generate");
              onClose();
            }}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
              <Icon name="code" size={18} />
            </span>
            <div>
              <span className="block text-sm font-bold tracking-tight text-slate-900">
                GitSummarizer
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
                Workspace
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="mt-8 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        <nav className="mt-2 space-y-1.5">
          {items.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-xs font-semibold transition-all duration-150 ${
                  active
                    ? "bg-emerald-50 text-emerald-800 font-bold shadow-2xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={active ? "text-emerald-700" : "text-slate-400"}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card & Interactive Logout Button at bottom */}
        <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
          {isAuthenticated && (
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 text-xs font-bold text-white shrink-0 shadow-2xs">
                  {initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              {/* Interactive Modern Sign Out button */}
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 active:scale-[0.98]"
              >
                <Icon
                  name="logOut"
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 text-slate-400 group-hover:text-rose-600"
                />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-[11px] text-slate-500">
            <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">
              GitSummarizer v1.0
            </span>
            <span>Developer AI codebase brief generator.</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
