import React, { useState } from "react";
import Icon from "../common/Icon";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/errorMapper";

export function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login({ email: email.trim(), password });
      } else {
        await register({ name: name.trim() || undefined, email: email.trim(), password });
      }
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Authentication failed. Please check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
    >
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon name="code" size={16} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              GitSummarizer
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1 text-slate-400 hover:text-slate-700 transition"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="mt-6 flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
              mode === "login" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
              mode === "register" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {mode === "register" && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-semibold text-slate-700">
                Name (optional)
              </label>
              <input
                id="auth-name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700">
              Email address
            </label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-700">
              Password (min. 8 characters)
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Account support allows your summaries to be saved and synced securely.
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
