import type { ChatMessage } from "../../types";

type ContextHistoryProps = {
  messages: ChatMessage[];
};

export function ContextHistory({ messages }: ContextHistoryProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 border-t border-slate-800/80 bg-[#070A13] text-center">
        <svg
          className="h-8 w-8 text-slate-600 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Refinement History
        </span>
        <p className="mt-1 text-[11px] text-slate-600 max-w-[200px] leading-relaxed">
          Refinement prompts and generation versions will be logged here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto border-t border-slate-800/80 bg-[#070A13] px-4 py-3 space-y-3 custom-scrollbar">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
        Conversation Log
      </div>

      {messages.map((message, index) => {
        const isUser = message.role === "user";

        return (
          <div key={`${message.role}-${index}`} className="flex gap-2.5 items-start text-xs">
            {/* Avatar bubble */}
            <div
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-[9px] font-extrabold shadow-sm ${
                isUser
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                  : "bg-teal-500/20 text-teal-400 border border-teal-500/20"
              }`}
            >
              {isUser ? "U" : "AI"}
            </div>

            {/* Message Bubble */}
            <div className="flex-1 min-w-0 rounded-lg bg-slate-900/40 border border-slate-800/50 p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider ${
                    isUser ? "text-blue-400" : "text-teal-400"
                  }`}
                >
                  {isUser ? "User" : "PineForge AI"}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-slate-300 text-[11px] leading-relaxed">
                {message.content.slice(0, 240)}
                {message.content.length > 240 ? "..." : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
