import { useCallback, useEffect, useState } from "react";
import type { IndicatorVersion } from "../types";

function defaultPair(versions: IndicatorVersion[]): {
  left: IndicatorVersion | undefined;
  right: IndicatorVersion | undefined;
} {
  if (versions.length === 0) {
    return { left: undefined, right: undefined };
  }

  if (versions.length === 1) {
    return { left: undefined, right: versions[0] };
  }

  return {
    left: versions[versions.length - 2],
    right: versions[versions.length - 1],
  };
}

export function useIndicatorVersions(indicatorId?: string, version?: number) {
  const [versions, setVersions] = useState<IndicatorVersion[]>([]);
  const [leftVersion, setLeftVersion] = useState<IndicatorVersion>();
  const [rightVersion, setRightVersion] = useState<IndicatorVersion>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => {
    setFetchKey((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (!indicatorId) {
      setVersions([]);
      setLeftVersion(undefined);
      setRightVersion(undefined);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchVersions() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/v1/indicators/${indicatorId}/versions`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as IndicatorVersion[];
        setVersions(payload);

        const pair = defaultPair(payload);
        setLeftVersion(pair.left);
        setRightVersion(pair.right);
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        setVersions([]);
        setLeftVersion(undefined);
        setRightVersion(undefined);
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load versions");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchVersions();

    return () => controller.abort();
  }, [indicatorId, fetchKey]);

  useEffect(() => {
    if (!version || versions.length === 0) {
      return;
    }

    const pair = defaultPair(versions);
    setLeftVersion(pair.left);
    setRightVersion(pair.right);
  }, [version, versions]);

  return {
    versions,
    leftVersion,
    rightVersion,
    setLeftVersion,
    setRightVersion,
    loading,
    error,
    refetch,
  };
}
