export type StreamStatus = "idle" | "streaming" | "done" | "error";

export type StreamEvent = {
  type: string;
  token?: string;
  indicator_id?: string;
  validation?: ValidationResult;
  message?: string;
  version?: number;
  model?: string;
  source?: string;
};

export type ValidationResult = {
  passed: boolean;
  errors: string[];
  warnings: string[];
};

export type ScriptType = "indicator" | "strategy" | "library";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type IndicatorSummary = {
  id: string;
  name: string;
  script_type: ScriptType;
  status: string;
  updated_at: string;
};
