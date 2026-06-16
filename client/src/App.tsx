import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { ScriptTypeTabs } from "./components/generator/ScriptTypeTabs";
import { PromptPanel } from "./components/generator/PromptPanel";
import { ContextHistory } from "./components/generator/ContextHistory";
import { VersionHistoryPanel } from "./components/editor/VersionHistoryPanel";
import { ValidationPanel } from "./components/editor/ValidationPanel";
import { StreamStatus } from "./components/shared/StreamStatus";
import { AppShell } from "./components/layout/AppShell";
import { Sidebar } from "./components/layout/Sidebar";
import { PineForgeTimeline } from "./components/timeline/PineForgeTimeline";
import { useGenerator } from "./hooks/useGenerator";
import { useIndicators } from "./hooks/useIndicators";
import { useIndicatorVersions } from "./hooks/useIndicatorVersions";
import type { IndicatorVersion } from "./types";

const PineEditor = lazy(() =>
  import("./components/editor/PineEditor").then((module) => ({ default: module.PineEditor }))
);

type AppView = "editor" | "timeline";

export default function App() {
  const [view, setView] = useState<AppView>("editor");
  const [showDiff, setShowDiff] = useState(false);
  const [deletingIndicatorId, setDeletingIndicatorId] = useState<string | null>(null);
  
  // Custom sidebar/panel collapse states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPromptCollapsed, setIsPromptCollapsed] = useState(false);

  // Track active indicator selection
  const [activeIndicatorId, setActiveIndicatorId] = useState<string | null>(null);

  const generator = useGenerator();
  const indicators = useIndicators();
  const {
    versions,
    leftVersion,
    rightVersion,
    setLeftVersion,
    setRightVersion,
    loading: versionsLoading,
    error: versionsError,
    refetch: refetchVersions,
  } = useIndicatorVersions(generator.indicatorId, generator.metadata.version);

  const diffAvailable = Boolean(leftVersion?.code && rightVersion?.code);

  const toggleDiff = useCallback(() => {
    if (!diffAvailable) {
      return;
    }

    setShowDiff((previous) => !previous);
  }, [diffAvailable]);

  // Sync active indicator selection with generator's indicatorId
  useEffect(() => {
    if (generator.indicatorId) {
      setActiveIndicatorId(generator.indicatorId);
    } else {
      setActiveIndicatorId(null);
    }
  }, [generator.indicatorId]);

  useEffect(() => {
    if (generator.status === "done" && generator.metadata.version) {
      refetchVersions();
      // Refresh indicators list to show updated script or new script name/version
      void indicators.refresh();
    }
  }, [generator.metadata.version, generator.status, refetchVersions]);

  useEffect(() => {
    if (!diffAvailable) {
      setShowDiff(false);
    }
  }, [diffAvailable]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;

      if (modifier && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        toggleDiff();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [toggleDiff]);

  const handleSelectVersion = useCallback(
    (version: IndicatorVersion) => {
      setRightVersion(version);

      const previousVersion = versions.find(
        (entry) => entry.version_number === version.version_number - 1
      );

      if (previousVersion) {
        setLeftVersion(previousVersion);
      }
    },
    [setLeftVersion, setRightVersion, versions]
  );

  // Load selected indicator from sidebar
  const handleSelectIndicator = useCallback(
    async (id: string) => {
      if (generator.status === "streaming") {
        return; // Don't interrupt streaming
      }

      try {
        const response = await fetch(`/api/v1/indicators/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const details = await response.json();

        generator.loadIndicator(
          details.generated_code || "",
          {
            indicatorId: details.id,
            validation: details.validation,
            version: details.metadata?.version,
            model: details.metadata?.model,
            source: details.metadata?.source,
          },
          details.prompt || "",
          details.script_type || "indicator"
        );
        setActiveIndicatorId(details.id);
        setShowDiff(false);
      } catch (err) {
        console.error("Failed to load indicator details:", err);
      }
    },
    [generator]
  );

  const handleDeleteIndicator = useCallback(
    async (id: string) => {
      const indicator = indicators.indicators.find((entry) => entry.id === id);
      const label = indicator?.name ?? "this indicator";

      if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
        return;
      }

      setDeletingIndicatorId(id);

      try {
        await indicators.deleteIndicator(id);

        if (generator.indicatorId === id) {
          generator.reset();
          setActiveIndicatorId(null);
          setShowDiff(false);
        }
      } finally {
        setDeletingIndicatorId(null);
      }
    },
    [generator.indicatorId, generator.reset, indicators.deleteIndicator, indicators.indicators]
  );

  if (view === "timeline") {
    return <PineForgeTimeline onBack={() => setView("editor")} />;
  }

  const activeIndicatorName = activeIndicatorId
    ? indicators.indicators.find((ind) => ind.id === activeIndicatorId)?.name
    : undefined;

  return (
    <AppShell
      isSidebarCollapsed={isSidebarCollapsed}
      onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      isPromptCollapsed={isPromptCollapsed}
      onTogglePrompt={() => setIsPromptCollapsed((prev) => !prev)}
      activeIndicatorName={activeIndicatorName}
      sidebar={
        <Sidebar
          indicators={indicators.indicators}
          loading={indicators.loading}
          error={indicators.error}
          onOpenTimeline={() => setView("timeline")}
          onDeleteIndicator={(id) => void handleDeleteIndicator(id)}
          deletingIndicatorId={deletingIndicatorId}
          onSelectIndicator={handleSelectIndicator}
          activeIndicatorId={activeIndicatorId}
          onCollapse={() => setIsSidebarCollapsed(true)}
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
            onRephrase={() => void generator.rephrasePrompt()}
            rephrasing={generator.rephrasing}
            rephraseError={generator.rephraseError}
            status={generator.status}
            onCancel={generator.cancel}
            hasExisting={generator.code.length > 0}
          />
          <ContextHistory messages={generator.chatHistory} />
          <VersionHistoryPanel
            versions={versions}
            leftVersion={leftVersion}
            rightVersion={rightVersion}
            loading={versionsLoading}
            error={versionsError}
            onSelectVersion={handleSelectVersion}
            onCompare={() => setShowDiff(true)}
          />
        </>
      }
      statusBar={<StreamStatus status={generator.status} metadata={generator.metadata} />}
      editor={
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
              <span className="ml-2">Loading editor...</span>
            </div>
          }
        >
          <PineEditor
            code={generator.code}
            leftCode={leftVersion?.code}
            rightCode={rightVersion?.code}
            readOnly={generator.status === "streaming"}
            validation={generator.metadata.validation}
            scriptType={generator.scriptType}
            showDiff={showDiff}
            onToggleDiff={toggleDiff}
            versions={versions}
            leftVersion={leftVersion}
            rightVersion={rightVersion}
            onSelectLeftVersion={setLeftVersion}
            onSelectRightVersion={setRightVersion}
          />
        </Suspense>
      }
      validationPanel={<ValidationPanel validation={generator.metadata.validation} />}
    />
  );
}
