import type { ReactNode } from "react";

type AppShellProps = {
  sidebar: ReactNode;
  promptPanel: ReactNode;
  editor: ReactNode;
  statusBar: ReactNode;
  validationPanel: ReactNode;
};

export function AppShell({
  sidebar,
  promptPanel,
  editor,
  statusBar,
  validationPanel,
}: AppShellProps) {
  return (
    <div className="flex h-screen bg-[#0d1117] font-mono text-gray-100">
      {sidebar}
      <div className="flex w-[380px] flex-col border-r border-gray-800">{promptPanel}</div>
      <div className="flex flex-1 flex-col">
        {statusBar}
        <div className="flex-1">{editor}</div>
        {validationPanel}
      </div>
    </div>
  );
}
