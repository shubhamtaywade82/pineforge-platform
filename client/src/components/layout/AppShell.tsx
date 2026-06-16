import type { ReactNode } from "react";

type AppShellProps = {
  sidebar: ReactNode;
  promptPanel: ReactNode;
  editor: ReactNode;
  statusBar: ReactNode;
  validationPanel: ReactNode;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  isPromptCollapsed: boolean;
  onTogglePrompt: () => void;
  activeIndicatorName?: string;
};

export function AppShell({
  sidebar,
  promptPanel,
  editor,
  statusBar,
  validationPanel,
  isSidebarCollapsed,
  onToggleSidebar,
  isPromptCollapsed,
  onTogglePrompt,
  activeIndicatorName,
}: AppShellProps) {
  return (
    <div className="flex h-screen flex-col bg-[#06080F] font-sans text-gray-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Professional Header */}
      <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0B0F19]/90 px-4 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="flex items-center gap-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20">
              <svg
                className="h-4.5 w-4.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-base font-black tracking-wider uppercase text-transparent">
                PineForge
              </span>
              <span className="ml-1.5 rounded-md bg-slate-800/60 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-700/50">
                v1.0
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Active indicator name breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Workspace</span>
            <svg
              className="h-3 w-3 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-200 truncate max-w-[200px]">
              {activeIndicatorName || "New Script"}
            </span>
          </div>
        </div>

        {/* Right tools and settings */}
        <div className="flex items-center gap-4">
          {/* Status Bar info inline */}
          <div className="hidden sm:block">{statusBar}</div>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Toggle Panel buttons */}
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/60 p-1 border border-slate-800/80">
            <button
              type="button"
              onClick={onToggleSidebar}
              title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
                !isSidebarCollapsed
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h10M4 18h16"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onTogglePrompt}
              title={isPromptCollapsed ? "Show Prompt Panel" : "Hide Prompt Panel"}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
                !isPromptCollapsed
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Saved Indicators) */}
        <aside
          className={`flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800/80 bg-[#0B0F19]/40 ${
            isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-64 opacity-100"
          }`}
        >
          <div className="h-full w-64 overflow-hidden">{sidebar}</div>
        </aside>

        {/* Left/Middle Prompt Generator Dock */}
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800/80 bg-[#0B0F19]/20 backdrop-blur-sm ${
            isPromptCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-[380px] opacity-100"
          }`}
        >
          <div className="flex h-full w-[380px] flex-col overflow-hidden">{promptPanel}</div>
        </div>

        {/* Center Monaco Editor & Validation Panel */}
        <main className="flex flex-1 flex-col min-w-0 bg-[#06080F]">
          <div className="flex-1 min-h-0 relative">{editor}</div>
          {validationPanel}
        </main>
      </div>
    </div>
  );
}
