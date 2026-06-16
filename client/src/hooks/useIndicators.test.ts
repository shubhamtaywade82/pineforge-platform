import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useIndicators } from "./useIndicators";

describe("useIndicators", () => {
  it("deletes an indicator from local state", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [
            {
              id: "indicator-1",
              name: "RSI",
              script_type: "indicator",
              status: "complete",
              updated_at: "2025-06-16T00:00:00Z",
            },
          ],
        })
        .mockResolvedValueOnce({ ok: true })
    );

    const { result } = renderHook(() => useIndicators());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.indicators).toHaveLength(1);

    await act(async () => {
      await result.current.deleteIndicator("indicator-1");
    });

    expect(result.current.indicators).toHaveLength(0);
    expect(fetch).toHaveBeenLastCalledWith("/api/v1/indicators/indicator-1", { method: "DELETE" });
  });
});
