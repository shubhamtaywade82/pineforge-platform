import type { editor, MarkerSeverity } from "monaco-editor";
import type { ValidationResult } from "../types";

const LINE_ERROR_PATTERN = /Line (\d+):/;

export type ValidationMarker = {
  severity: MarkerSeverity;
  message: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

export function parseLineNumber(message: string): number | null {
  const match = message.match(LINE_ERROR_PATTERN);
  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

export function buildValidationMarkers(
  model: editor.ITextModel,
  validation: ValidationResult | undefined,
  severities: { error: MarkerSeverity; warning: MarkerSeverity }
): ValidationMarker[] {
  if (!validation) {
    return [];
  }

  const markers: ValidationMarker[] = [];

  for (const message of validation.errors) {
    const lineNumber = parseLineNumber(message) ?? 1;
    markers.push({
      severity: severities.error,
      message,
      startLineNumber: lineNumber,
      startColumn: 1,
      endLineNumber: lineNumber,
      endColumn: model.getLineMaxColumn(lineNumber),
    });
  }

  for (const message of validation.warnings) {
    const lineNumber = parseLineNumber(message) ?? 1;
    markers.push({
      severity: severities.warning,
      message,
      startLineNumber: lineNumber,
      startColumn: 1,
      endLineNumber: lineNumber,
      endColumn: model.getLineMaxColumn(lineNumber),
    });
  }

  return markers;
}

export function applyValidationDecorations(
  editorInstance: editor.IStandaloneCodeEditor,
  monacoRef: typeof import("monaco-editor"),
  validation?: ValidationResult
) {
  const model = editorInstance.getModel();
  if (!model) {
    return;
  }

  const markers = buildValidationMarkers(model, validation, {
    error: monacoRef.MarkerSeverity.Error,
    warning: monacoRef.MarkerSeverity.Warning,
  });

  monacoRef.editor.setModelMarkers(model, "pine-validator", markers);
}
