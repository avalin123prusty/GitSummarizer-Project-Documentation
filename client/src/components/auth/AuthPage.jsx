import React, { useState } from "react";
import Icon from "../common/Icon";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/errorMapper";

export function AuthPage({ mode = "login", onToggleMode, onGuestDemo }) {
  const [currentMode, setCurrentMode] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useAuth();

  const handleTabSwitch = (newMode) => {
    setCurrentMode(newMode);
    setError("");
    if (onToggleMode && newMode !== mode) {
      onToggleMode();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      if (currentMode === "login") {
        await login({ email: email.trim(), password });
      } else {
        await register({ name: name.trim() || undefined, email: email.trim(), password });
      }
    } catch (err) {
      setError(getErrorMessage(err, "Authentication failed. Please check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-14 items-center">
          {/* Left Column: Visual Showcase & Value Props */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Developer Codebase Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Understand any GitHub repository in <span className="text-emerald-700">minutes</span>.
            </h1>

            <p className="text-xs sm:text-sm md:text-xs lg:text-base text-slate-600 leading-relaxed max-w-2xl">
              Turn dense READMEs, complex architectures, and messy commit logs into clear, actionable briefs. Inspect public repositories with automated feature extraction, prerequisite checks, and release notes.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="book" size={16} />
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Plain-English Overview
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Understand project purpose, stack, and architecture at a glance before reading thousands of lines of code.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="check" size={16} />
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Prerequisites Detection
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Automatically extracts required runtimes, package managers, and setup commands before you clone.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="commit" size={16} />
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Commit Digest & Notes
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Converts recent raw commit messages into human-friendly release notes and changelogs for stakeholders.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 sm:p-4 shadow-2xs">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="clock" size={16} />
                </div>
                <h3 className="mt-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  History & Library
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  Revisit previously analyzed repositories anytime, bookmark favorites, or copy summaries with one click.
                </p>
              </div>
            </div>

            {/* Code / Sample Card Teaser (Desktop only to prevent tablet overflow) */}
            <div className="hidden lg:flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-2xs">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon name="github" size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">facebook/react</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    JavaScript
                  </span>
                  <span className="text-slate-400">★ 220k</span>
                </div>
                <p className="mt-0.5 text-slate-500 truncate">
                  "The library for web and native user interfaces. Build component-driven interfaces..."
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 shrink-0">
                AI Brief Ready
              </span>
            </div>
          </div>

          {/* Right Column: Auth Form Card */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-xl shadow-slate-200/50">
              {/* Card Header & Switcher */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {currentMode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {currentMode === "login"
                      ? "Sign in to access your GitSummarizer workspace"
                      : "Register to save and sync your repository summaries"}
                  </p>
                </div>
              </div>

              {/* Mode Tabs */}
              <div className="mt-6 flex rounded-2xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => handleTabSwitch("login")}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                    currentMode === "login"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch("register")}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                    currentMode === "register"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {currentMode === "register" && (
                  <div>
                    <label htmlFor="auth-page-name" className="block text-xs font-semibold text-slate-700">
                      Full Name (optional)
                    </label>
                    <input
                      id="auth-page-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="auth-page-email" className="block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="auth-page-email"
                    type="email"
                    required
                    placeholder="developer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label htmlFor="auth-page-password" className="block text-xs font-semibold text-slate-700">
                    Password (min. 8 characters)
                  </label>
                  <input
                    id="auth-page-password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>{currentMode === "login" ? "Sign In to Workspace" : "Create Account & Continue"}</span>
                  )}
                </button>
              </form>

              {/* Or Divider */}
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Guest Explorer Button */}
              {onGuestDemo && (
                <button
                  type="button"
                  onClick={onGuestDemo}
                  className="mt-4 w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Icon name="spark" size={14} className="text-emerald-700" />
                  <span>Explore as Guest / Try Demo</span>
                </button>
              )}

              <p className="mt-5 text-center text-[11px] text-slate-400 leading-relaxed">
                Public GitHub repositories only · Passwords hashed with scrypt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
