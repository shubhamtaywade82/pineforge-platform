import { useEffect, useState } from "react";

type VersionDiffResult = {
  beforeCode?: string;
  afterCode?: string;
  loading: boolean;
  error: string | null;
};

export function useVersionDiff(indicatorId?: string, version?: number): VersionDiffResult {
  const [beforeCode, setBeforeCode] = useState<string>();
  const [afterCode, setAfterCode] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!indicatorId || !version) {
      setBeforeCode(undefined);
      setAfterCode(undefined);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchDiff() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/v1/indicators/${indicatorId}/versions/${version}/diff`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as {
          before_code?: string;
          after_code?: string;
        };

        setBeforeCode(payload.before_code ?? "");
        setAfterCode(payload.after_code);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        setBeforeCode(undefined);
        setAfterCode(undefined);
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load version diff");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchDiff();

    return () => controller.abort();
  }, [indicatorId, version]);

  return { beforeCode, afterCode, loading, error };
}
