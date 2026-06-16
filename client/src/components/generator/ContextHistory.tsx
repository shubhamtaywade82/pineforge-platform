import type { ChatMessage } from "../../types";

type ContextHistoryProps = {
  messages: ChatMessage[];
};

export function ContextHistory({ messages }: ContextHistoryProps) {
  if (messages.length === 0) {
    return (
      <div className="border-t border-gray-800 p-4 text-xs text-gray-500">
        Multi-turn refinement history will appear here.
      </div>
    );
  }

  return (
    <div className="max-h-56 overflow-y-auto border-t border-gray-800 p-4">
      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className="mb-3 text-xs">
          <div className="mb-1 uppercase tracking-wide text-gray-500">{message.role}</div>
          <div className="whitespace-pre-wrap text-gray-300">{message.content.slice(0, 240)}</div>
        </div>
      ))}
    </div>
  );
}
