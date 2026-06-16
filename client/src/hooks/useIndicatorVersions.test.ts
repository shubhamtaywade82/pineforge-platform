import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useIndicatorVersions } from "./useIndicatorVersions";
import type { IndicatorVersion } from "../types";

const sampleVersions: IndicatorVersion[] = [
  {
    id: "v1",
    version_number: 1,
    code: "v1 code",
    prompt_delta: null,
    created_at: "2025-06-16T00:00:00Z",
  },
  {
    id: "v2",
    version_number: 2,
    code: "v2 code",
    prompt_delta: "Add RSI",
    created_at: "2025-06-16T01:00:00Z",
  },
];

describe("useIndicatorVersions", () => {
  it("defaults to newest-1 vs newest", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => sampleVersions,
      })
    );

    const { result } = renderHook(() => useIndicatorVersions("indicator-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.versions).toHaveLength(2);
    expect(result.current.leftVersion?.version_number).toBe(1);
    expect(result.current.rightVersion?.version_number).toBe(2);
  });

  it("clears versions when indicatorId is missing", async () => {
    const { result } = renderHook(() => useIndicatorVersions(undefined));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.versions).toEqual([]);
    expect(result.current.leftVersion).toBeUndefined();
    expect(result.current.rightVersion).toBeUndefined();
  });
});
