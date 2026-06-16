import type { editor } from "monaco-editor";
import { describe, expect, it } from "vitest";
import { buildValidationMarkers, parseLineNumber } from "./pine-diagnostics";

describe("parseLineNumber", () => {
  it("extracts the line number from validator messages", () => {
    expect(parseLineNumber("Line 3: Use request.security() not bare security()")).toBe(3);
  });

  it("returns null when no line prefix is present", () => {
    expect(parseLineNumber("Missing //@version=6 on first line")).toBeNull();
  });
});

describe("buildValidationMarkers", () => {
  it("maps line-specific errors to model markers", () => {
    const model = {
      getLineMaxColumn: (lineNumber: number) => (lineNumber === 3 ? 42 : 10),
    } as unknown as editor.ITextModel;

    const markers = buildValidationMarkers(
      model,
      {
        passed: false,
        errors: ["Line 3: Use request.security() not bare security()"],
        warnings: ["Line 5: Deprecated pattern"],
      },
      { error: 8, warning: 4 }
    );

    expect(markers).toHaveLength(2);
    expect(markers[0]).toMatchObject({
      severity: 8,
      startLineNumber: 3,
      endColumn: 42,
      message: "Line 3: Use request.security() not bare security()",
    });
    expect(markers[1]).toMatchObject({
      severity: 4,
      startLineNumber: 5,
      endColumn: 10,
    });
  });

  it("defaults to line 1 for messages without a line prefix", () => {
    const model = { getLineMaxColumn: () => 20 } as unknown as editor.ITextModel;

    const markers = buildValidationMarkers(
      model,
      {
        passed: false,
        errors: ["Missing //@version=6 on first line"],
        warnings: [],
      },
      { error: 8, warning: 4 }
    );

    expect(markers[0]?.startLineNumber).toBe(1);
    expect(markers[0]?.endColumn).toBe(20);
  });
});
