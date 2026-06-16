import { ScriptTypeTabs } from "./components/generator/ScriptTypeTabs";
import { PromptPanel } from "./components/generator/PromptPanel";
import { ContextHistory } from "./components/generator/ContextHistory";
import { PineEditor } from "./components/editor/PineEditor";
import { ValidationPanel } from "./components/editor/ValidationPanel";
import { StreamStatus } from "./components/shared/StreamStatus";
import { AppShell } from "./components/layout/AppShell";
import { Sidebar } from "./components/layout/Sidebar";
import { useGenerator } from "./hooks/useGenerator";
import { useIndicators } from "./hooks/useIndicators";

export default function App() {
  const generator = useGenerator();
  const indicators = useIndicators();

  return (
    <AppShell
      sidebar={
        <Sidebar
          indicators={indicators.indicators}
          loading={indicators.loading}
          error={indicators.error}
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
        <PineEditor code={generator.code} readOnly={generator.status === "streaming"} />
      }
      validationPanel={<ValidationPanel validation={generator.metadata.validation} />}
    />
  );
}
