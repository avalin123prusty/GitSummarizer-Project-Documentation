import { apiRequest } from "./client";

/**
 * Summary endpoints matching API.md and api-contract.md.
 */

export async function createSummary({ repositoryUrl, commitRef = null, commitLimit = 20 }) {
  const payload = await apiRequest("/summaries", {
    method: "POST",
    body: JSON.stringify({
      repositoryUrl,
      commitRef: commitRef || null,
      commitLimit: Number(commitLimit) || 20,
    }),
  });
  return payload.data;
}

export async function fetchSummaryHistory({ page = 1, limit = 10 } = {}) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  const payload = await apiRequest(`/summaries?${query.toString()}`, {
    method: "GET",
  });
  return {
    items: payload.data || [],
    pagination: payload.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 },
  };
}

export async function fetchSummaryById(summaryId) {
  const payload = await apiRequest(`/summaries/${encodeURIComponent(summaryId)}`, {
    method: "GET",
  });
  return payload.data;
}

export async function deleteSummaryById(summaryId) {
  const payload = await apiRequest(`/summaries/${encodeURIComponent(summaryId)}`, {
    method: "DELETE",
  });
  return payload;
}

export async function checkApiHealth() {
  const payload = await apiRequest("/health", { method: "GET" });
  return payload;
}
