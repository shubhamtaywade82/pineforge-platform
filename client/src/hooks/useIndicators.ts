import { useCallback, useEffect, useState } from "react";
import type { IndicatorSummary } from "../types";

export function useIndicators() {
  const [indicators, setIndicators] = useState<IndicatorSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/indicators");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const payload = (await response.json()) as IndicatorSummary[];
      setIndicators(payload);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load indicators");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { indicators, loading, error, refresh };
}
