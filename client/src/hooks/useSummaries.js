import { useCallback, useEffect, useState } from "react";
import {
  createSummary,
  deleteSummaryById,
  fetchSummaryById,
  fetchSummaryHistory,
} from "../api/summaries";

const LOCAL_SAVED_KEY = "gitsummarizer.saved";
const LOCAL_HISTORY_CACHE_KEY = "gitsummarizer.history_cache";

export function useSummaries() {
  const [currentSummary, setCurrentSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // History state from API
  const [historyItems, setHistoryItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [historyLoading, setHistoryLoading] = useState(false);

  // Saved / bookmarked items (persisted in localStorage)
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(savedItems));
    } catch {
      // Ignore quota error
    }
  }, [savedItems]);

  const loadHistory = useCallback(async (page = 1, limit = 10) => {
    setHistoryLoading(true);
    try {
      const result = await fetchSummaryHistory({ page, limit });
      setHistoryItems(result.items || []);
      setPagination(result.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
      // Update local cache
      try {
        localStorage.setItem(LOCAL_HISTORY_CACHE_KEY, JSON.stringify(result.items || []));
      } catch {
        // Ignore quota error
      }
    } catch (err) {
      // If offline/backend issue, try fallback to cached history
      try {
        const cached = localStorage.getItem(LOCAL_HISTORY_CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          setHistoryItems(parsed);
          setPagination({ page: 1, limit: 10, total: parsed.length, totalPages: 1 });
        }
      } catch {
        // Ignore fallback error
      }
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const generate = useCallback(
    async ({ repositoryUrl, commitRef = null, commitLimit = 20 }) => {
      setLoading(true);
      setError(null);

      try {
        const summaryData = await createSummary({ repositoryUrl, commitRef, commitLimit });
        setCurrentSummary(summaryData);
        // Refresh history
        loadHistory(1, pagination.limit);
        return summaryData;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadHistory, pagination.limit]
  );

  const loadDetail = useCallback(async (summaryId) => {
    setLoading(true);
    setError(null);

    try {
      const detail = await fetchSummaryById(summaryId);
      setCurrentSummary(detail);
      return detail;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(
    async (summaryId) => {
      try {
        await deleteSummaryById(summaryId);
      } catch {
        // Continue to remove locally even if server fails
      }

      setHistoryItems((prev) => prev.filter((item) => item.id !== summaryId));
      setSavedItems((prev) => prev.filter((item) => item.id !== summaryId));
      if (currentSummary?.id === summaryId) {
        setCurrentSummary(null);
      }
    },
    [currentSummary?.id]
  );

  const toggleSave = useCallback((summaryToSave) => {
    if (!summaryToSave || !summaryToSave.id) return;

    setSavedItems((prev) => {
      const exists = prev.some((item) => item.id === summaryToSave.id);
      if (exists) {
        return prev.filter((item) => item.id !== summaryToSave.id);
      }
      return [summaryToSave, ...prev];
    });
  }, []);

  const isSaved = useCallback(
    (summaryId) => {
      if (!summaryId) return false;
      return savedItems.some((item) => item.id === summaryId);
    },
    [savedItems]
  );

  return {
    currentSummary,
    setCurrentSummary,
    loading,
    error,
    setError,
    generate,
    loadDetail,
    remove,
    historyItems,
    pagination,
    historyLoading,
    loadHistory,
    savedItems,
    toggleSave,
    isSaved,
  };
}

export default useSummaries;
