# Graph Report - pineforge-platform  (2026-06-16)

## Corpus Check
- 166 files · ~24,175 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 556 nodes · 589 edges · 111 communities (89 shown, 22 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3437603f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `IndicatorsController` - 14 edges
3. `GeneratorsController` - 13 edges
4. `Builder` - 12 edges
5. `Graphify Development Guide` - 9 edges
6. `Pine Script v6 Rules (Distilled)` - 9 edges
7. `resolve()` - 8 edges
8. `Primer: Next Steps` - 7 edges
9. `fetch()` - 7 edges
10. `IndicatorVersion` - 7 edges

## Surprising Connections (you probably didn't know these)
- `build_ollama_client()` --calls--> `fetch()`  [INFERRED]
  config/initializers/ollama.rb → app/services/graphify/context_service.rb
- `local_client()` --calls--> `Application`  [INFERRED]
  app/services/llm/endpoint_resolver.rb → config/application.rb
- `build_cloud_client()` --calls--> `fetch()`  [INFERRED]
  app/services/llm/endpoint_resolver.rb → app/services/graphify/context_service.rb
- `App()` --calls--> `useGenerator()`  [EXTRACTED]
  client/src/App.tsx → client/src/hooks/useGenerator.ts
- `App()` --calls--> `useIndicators()`  [EXTRACTED]
  client/src/App.tsx → client/src/hooks/useIndicators.ts

## Import Cycles
- None detected.

## Communities (111 total, 22 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (35): ValidationPanel(), ValidationPanelProps, versions, VersionHistoryPanel(), VersionHistoryPanelProps, ContextHistory(), ContextHistoryProps, PromptPanel() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): dependencies, @monaco-editor/react, react, react-dom, devDependencies, autoprefixer, jsdom, postcss (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (10): Application, MetadataService, build_cloud_client(), cloud_configured?(), cloud_reachable?(), EndpointResolver, first_working_key_or_unauthenticated(), local_client() (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (16): applyValidationDecorations(), buildValidationMarkers(), parseLineNumber(), ValidationMarker, registerPineInlineCompletions(), resetInlineCompletionsRegistration(), CompletionSpec, PINE_DECLARATIONS (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (3): RephraseService, ExtractMetadataJob, GeneratorsController

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (12): PhaseStatus, progressFromMilestones(), TIMELINE_PHASES, TimelineMilestone, TimelinePhase, timelineTotals(), withProgress(), MilestoneCardProps (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (4): RefineService, StreamService, Indicator, IndicatorVersionCreator

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (3): CompleteService, RepairService, Builder

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (14): AI, Architectural Rules, Backend, Database Rules, Frontend, Git Rules, Graphify Knowledge Graph, Mission (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.36
Nodes (9): build_query(), ContextService, enabled?(), explain(), fetch(), path(), run_command(), sanitize() (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (10): Backend, Background jobs, Development Principles, Frontend, License, Local Development, PineForge Platform, Technology Stack (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (9): Bootstrap / Refresh Graph, Committed Artifacts, Graphify Development Guide, Ingest Pine v6 Knowledge, Install, Live Watch (Optional), PR Triage, Production Integration (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (9): Arrays, Colors and Transparency, Common Builtins, Inputs, Multi-Timeframe, Pine Script v6 Rules (Distilled), Plotting, Strategies (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.25
Nodes (7): ADR-0003: Graphify as RAG Layer, Alternatives Considered, Consequences, Context, Decision, Ollama Endpoint Policy, Status

### Community 16 - "Community 16"
Cohesion: 0.25
Nodes (7): Documentation map, Execution model, Indicators vs strategies, Manual sections, Primer: Next Steps, Publishing, Time series

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): Backend (RSpec), CI, Factories, Frontend (Vitest), Rules, Running tests, Testing Skill

### Community 18 - "Community 18"
Cohesion: 0.29
Nodes (6): Available Tools, Cursor MCP Config, Environment Variables, Graphify MCP Server, Install MCP Extra, Run Server

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (6): Definition of Done, Phase 1 — MVP (m1–m12), Phase 2 — Intelligence (m13–m24), Phase 3 — Engineering Platform (m25–m36), Phase 4 — Product Launch (m37–m48), PineForge Platform v1.0 Roadmap

### Community 20 - "Community 20"
Cohesion: 0.29
Nodes (6): Acceptance Criteria, Objective, Risks, Scope, Screenshots (if applicable), Tests Added

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (6): Actual Behavior, Description, Environment, Expected Behavior, Logs / Screenshots, Steps to Reproduce

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (6): Acceptance Criteria, Milestone, Objective, Out of Scope, Risks, Scope

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (6): Learning path, Primer: First Steps, Reading code, Script types in Pine Script v6, Using existing scripts, Writing scripts

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (6): Graphify RAG, Integrations, LLM Routing Skill, Models (v1.0), Rules, Source of Truth

### Community 25 - "Community 25"
Cohesion: 0.38
Nodes (3): request_model(), stub_ollama_chat(), stub_ollama_chat_failure()

### Community 26 - "Community 26"
Cohesion: 0.33
Nodes (5): Goals, Out of Scope, PineForge Vision, Target Users, v1.0 Focus

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (5): Key builtins introduced, MACD — version 1 (step-by-step), MACD — version 2 (inputs + builtin), Pine Editor, Primer: First Indicator

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (5): Rails API Skill, Rules, Source of Truth, Stack, Testing

### Community 30 - "Community 30"
Cohesion: 0.40
Nodes (4): ADR-0002: Rails 8 Stack Update, Consequences, Decision, Rationale

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (4): Default mode replays existing cassettes and blocks real HTTP via WebMock., frozen_string_literal: true, Record new cassettes against a live Ollama instance:, VCR_RECORD=all bundle exec rspec spec/services/generators/metadata_service_spec.rb

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): Dependencies, Reporting, Secrets, Security Policy

### Community 35 - "Community 35"
Cohesion: 0.40
Nodes (4): Pine Script Skill, Rules, Scope, Source of Truth

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): React UI Skill, Rules, Source of Truth, Stack

## Knowledge Gaps
- **204 isolated node(s):** `Install`, `Bootstrap / Refresh Graph`, `Ingest Pine v6 Knowledge`, `Query Commands`, `PR Triage` (+199 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Builder` connect `Community 9` to `Community 4`, `Community 6`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `fetch()` connect `Community 11` to `Community 9`, `Community 2`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `Install`, `Bootstrap / Refresh Graph`, `Ingest Pine v6 Knowledge` to the rest of the system?**
  _204 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06654567453115548 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11956521739130435 - nodes in this community are weakly interconnected._