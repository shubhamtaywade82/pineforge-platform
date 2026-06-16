# Graph Report - pineforge-platform  (2026-06-16)

## Corpus Check
- 215 files · ~43,725 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 48 nodes · 56 edges · 11 communities (7 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `16d50321`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Validation Panel Module|Validation Panel Module]]
- [[_COMMUNITY_Refine Service Module|Refine Service Module]]
- [[_COMMUNITY_Package Module|Package Module]]
- [[_COMMUNITY_Application Module|Application Module]]
- [[_COMMUNITY_Pine Diagnostics Module|Pine Diagnostics Module]]
- [[_COMMUNITY_Repair Service Module|Repair Service Module]]
- [[_COMMUNITY_Timeline Phases Module|Timeline Phases Module]]
- [[_COMMUNITY_Tsconfig Module|Tsconfig Module]]
- [[_COMMUNITY_Reference Lookup Module|Reference Lookup Module]]
- [[_COMMUNITY_Indicators Controller Module|Indicators Controller Module]]

## God Nodes (most connected - your core abstractions)
1. `useGenerator()` - 4 edges
2. `useSSEStream()` - 3 edges
3. `Writing: Limitations` - 3 edges
4. `Writing: Profiling and Optimization` - 3 edges
5. `Writing: Publishing` - 3 edges
6. `Writing: Style Guide` - 3 edges
7. `App()` - 2 edges
8. `ValidationPanel()` - 2 edges
9. `VersionHistoryPanel()` - 2 edges
10. `ContextHistory()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useGenerator()`  [EXTRACTED]
  client/src/App.tsx → client/src/hooks/useGenerator.ts
- `useGenerator()` --calls--> `useSSEStream()`  [EXTRACTED]
  client/src/hooks/useGenerator.ts → client/src/hooks/useSSEStream.ts
- `Errors: Overview` --references--> `Pine Script v6 Writing — Source`  [EXTRACTED]
  docs/pine_v6_errors/overview.md → docs/pine_v6_writing/SOURCE.md
- `Pine Script v6 Writing — Source` --references--> `Writing: Debugging`  [EXTRACTED]
  docs/pine_v6_writing/SOURCE.md → docs/pine_v6_writing/debugging.md
- `Writing: Limitations` --conceptually_related_to--> `Writing: Profiling and Optimization`  [EXTRACTED]
  docs/pine_v6_writing/limitations.md → docs/pine_v6_writing/profiling-and-optimization.md

## Import Cycles
- None detected.

## Communities (11 total, 4 thin omitted)

### Community 0 - "Validation Panel Module"
Cohesion: 0.21
Nodes (8): ValidationPanel(), ValidationPanelProps, AppShell(), AppShellProps, Sidebar(), SidebarProps, AppView, PineEditor

### Community 1 - "Refine Service Module"
Cohesion: 0.33
Nodes (6): 1, 2, 3, 4, 5, 6

### Community 2 - "Package Module"
Cohesion: 0.47
Nodes (4): useGenerator(), StreamMetadata, useSSEStream(), App()

### Community 3 - "Application Module"
Cohesion: 0.50
Nodes (3): OPTIONS, ScriptTypeTabs(), ScriptTypeTabsProps

### Community 4 - "Pine Diagnostics Module"
Cohesion: 1.00
Nodes (4): Writing: Limitations, Writing: Profiling and Optimization, Writing: Publishing, Writing: Style Guide

### Community 5 - "Repair Service Module"
Cohesion: 0.67
Nodes (3): Writing: Debugging, Errors: Overview, Pine Script v6 Writing — Source

## Knowledge Gaps
- **14 isolated node(s):** `PineEditor`, `AppView`, `PineEditorProps`, `ValidationPanelProps`, `VersionHistoryPanelProps` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useGenerator()` connect `Package Module` to `Validation Panel Module`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `PineEditor`, `AppView`, `PineEditorProps` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._