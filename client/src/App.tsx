import { Suspense, lazy, useState } from "react";
import { ScriptTypeTabs } from "./components/generator/ScriptTypeTabs";
import { PromptPanel } from "./components/generator/PromptPanel";
import { ContextHistory } from "./components/generator/ContextHistory";
import { ValidationPanel } from "./components/editor/ValidationPanel";
import { StreamStatus } from "./components/shared/StreamStatus";
import { AppShell } from "./components/layout/AppShell";
import { Sidebar } from "./components/layout/Sidebar";
import { PineForgeTimeline } from "./components/timeline/PineForgeTimeline";
import { useGenerator } from "./hooks/useGenerator";
import { useIndicators } from "./hooks/useIndicators";
import { useVersionDiff } from "./hooks/useVersionDiff";

const PineEditor = lazy(() =>
  import("./components/editor/PineEditor").then((module) => ({ default: module.PineEditor }))
);

type AppView = "editor" | "timeline";

export default function App() {
  const [view, setView] = useState<AppView>("editor");
  const generator = useGenerator();
  const indicators = useIndicators();
  const versionDiff = useVersionDiff(generator.indicatorId, generator.metadata.version);
  const previousCode = versionDiff.beforeCode ?? generator.previousCode;

  if (view === "timeline") {
    return <PineForgeTimeline onBack={() => setView("editor")} />;
  }

  return (
    <AppShell
      sidebar={
        <Sidebar
          indicators={indicators.indicators}
          loading={indicators.loading}
          error={indicators.error}
          onOpenTimeline={() => setView("timeline")}
        />
      }
      promptPanel={
        <>
          <ScriptTypeTabs value={generator.scriptType} onChange={generator.setScriptType} />
          <PromptPanel
            prompt={generator.prompt}
            onPromptChange={generator.setPrompt}
            onGenerate={() => void generator.generate()}
            onRefine={(value) => void generator.refine(value)}
            status={generator.status}
            onCancel={generator.cancel}
            hasExisting={generator.code.length > 0}
          />
          <ContextHistory messages={generator.chatHistory} />
        </>
      }
      statusBar={<StreamStatus status={generator.status} metadata={generator.metadata} />}
      editor={
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              Loading editor...
            </div>
          }
        >
          <PineEditor
            code={generator.code}
            previousCode={previousCode}
            readOnly={generator.status === "streaming"}
            validation={generator.metadata.validation}
            scriptType={generator.scriptType}
          />
        </Suspense>
      }
      validationPanel={<ValidationPanel validation={generator.metadata.validation} />}
    />
  );
}
