/**
 * Display formatters for dates, numbers, and text.
 */

export function formatDate(dateString) {
  if (!dateString) return "Just now";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Recently";
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return "Recently";
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return "Just now";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Recently";
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "Recently";
  }
}

export function formatStars(count) {
  if (count === undefined || count === null) return "0";
  const num = Number(count);
  if (Number.isNaN(num)) return "0";
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toLocaleString();
}

export function truncateText(text, maxLength = 160) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
