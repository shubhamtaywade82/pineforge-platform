# Graph Report - pineforge-platform  (2026-06-16)

## Corpus Check
- 176 files · ~32,916 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 803 nodes · 843 edges · 168 communities (144 shown, 24 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4cb19244`
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
- [[_COMMUNITY_Community 111|Community 111]]
- [[_COMMUNITY_Community 112|Community 112]]
- [[_COMMUNITY_Community 114|Community 114]]
- [[_COMMUNITY_Community 115|Community 115]]
- [[_COMMUNITY_Community 116|Community 116]]
- [[_COMMUNITY_Community 117|Community 117]]
- [[_COMMUNITY_Community 118|Community 118]]
- [[_COMMUNITY_Community 119|Community 119]]
- [[_COMMUNITY_Community 120|Community 120]]
- [[_COMMUNITY_Community 121|Community 121]]
- [[_COMMUNITY_Community 122|Community 122]]
- [[_COMMUNITY_Community 123|Community 123]]
- [[_COMMUNITY_Community 124|Community 124]]
- [[_COMMUNITY_Community 125|Community 125]]
- [[_COMMUNITY_Community 126|Community 126]]
- [[_COMMUNITY_Community 127|Community 127]]
- [[_COMMUNITY_Community 128|Community 128]]
- [[_COMMUNITY_Community 129|Community 129]]
- [[_COMMUNITY_Community 130|Community 130]]
- [[_COMMUNITY_Community 131|Community 131]]
- [[_COMMUNITY_Community 132|Community 132]]
- [[_COMMUNITY_Community 133|Community 133]]
- [[_COMMUNITY_Community 134|Community 134]]
- [[_COMMUNITY_Community 135|Community 135]]
- [[_COMMUNITY_Community 136|Community 136]]
- [[_COMMUNITY_Community 137|Community 137]]
- [[_COMMUNITY_Community 138|Community 138]]
- [[_COMMUNITY_Community 139|Community 139]]
- [[_COMMUNITY_Community 140|Community 140]]
- [[_COMMUNITY_Community 141|Community 141]]
- [[_COMMUNITY_Community 142|Community 142]]
- [[_COMMUNITY_Community 143|Community 143]]
- [[_COMMUNITY_Community 144|Community 144]]
- [[_COMMUNITY_Community 145|Community 145]]
- [[_COMMUNITY_Community 146|Community 146]]
- [[_COMMUNITY_Community 147|Community 147]]
- [[_COMMUNITY_Community 148|Community 148]]
- [[_COMMUNITY_Community 149|Community 149]]
- [[_COMMUNITY_Community 150|Community 150]]
- [[_COMMUNITY_Community 151|Community 151]]
- [[_COMMUNITY_Community 152|Community 152]]
- [[_COMMUNITY_Community 153|Community 153]]
- [[_COMMUNITY_Community 154|Community 154]]
- [[_COMMUNITY_Community 155|Community 155]]
- [[_COMMUNITY_Community 156|Community 156]]
- [[_COMMUNITY_Community 157|Community 157]]
- [[_COMMUNITY_Community 158|Community 158]]
- [[_COMMUNITY_Community 159|Community 159]]
- [[_COMMUNITY_Community 160|Community 160]]
- [[_COMMUNITY_Community 161|Community 161]]
- [[_COMMUNITY_Community 162|Community 162]]
- [[_COMMUNITY_Community 163|Community 163]]

## God Nodes (most connected - your core abstractions)
1. `Functions - Technical Analysis All ta.* functions (RSI, SMA, etc.)` - 60 edges
2. `compilerOptions` - 17 edges
3. `IndicatorsController` - 14 edges
4. `Builder` - 13 edges
5. `GeneratorsController` - 13 edges
6. `ReferenceIndexBuilder` - 12 edges
7. `ReferenceLookup` - 9 edges
8. `Graphify Development Guide` - 9 edges
9. `Pine Script v6 Rules (Distilled)` - 9 edges
10. `resolve()` - 8 edges

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

## Communities (168 total, 24 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (35): ValidationPanel(), ValidationPanelProps, versions, VersionHistoryPanel(), VersionHistoryPanelProps, ContextHistory(), ContextHistoryProps, PromptPanel() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): dependencies, @monaco-editor/react, react, react-dom, devDependencies, autoprefixer, jsdom, postcss (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (10): Application, CompleteService, build_cloud_client(), cloud_configured?(), cloud_reachable?(), EndpointResolver, first_working_key_or_unauthenticated(), local_client() (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (16): applyValidationDecorations(), buildValidationMarkers(), parseLineNumber(), ValidationMarker, registerPineInlineCompletions(), resetInlineCompletionsRegistration(), CompletionSpec, PINE_DECLARATIONS (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (9): MetadataService, RefineService, RephraseService, StreamService, ExtractMetadataJob, Indicator, Builder, IndicatorVersionCreator (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (12): PhaseStatus, progressFromMilestones(), TIMELINE_PHASES, TimelineMilestone, TimelinePhase, timelineTotals(), withProgress(), MilestoneCardProps (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (24): Functions - Technical Analysis All ta.* functions (RSI, SMA, etc.), Remarks, Remarks, Remarks, Remarks, Remarks, Returns, Returns (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

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

### Community 111 - "Community 111"
Cohesion: 0.17
Nodes (4): call(), enabled?(), index(), ReferenceLookup

### Community 114 - "Community 114"
Cohesion: 0.33
Nodes (5): Files, Pine Script v6 Symbol Reference, Refresh, Runtime, Source

### Community 115 - "Community 115"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.alma()

### Community 116 - "Community 116"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.swma()

### Community 117 - "Community 117"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.vwap()

### Community 118 - "Community 118"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.vwma()

### Community 119 - "Community 119"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.wma()

### Community 120 - "Community 120"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.wpr()

### Community 121 - "Community 121"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.bbw()

### Community 122 - "Community 122"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.change()

### Community 123 - "Community 123"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.cmo()

### Community 124 - "Community 124"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.cog()

### Community 125 - "Community 125"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.dev()

### Community 126 - "Community 126"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.ema()

### Community 127 - "Community 127"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.hma()

### Community 128 - "Community 128"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.kc()

### Community 129 - "Community 129"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.atr()

### Community 130 - "Community 130"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.kcw()

### Community 131 - "Community 131"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.macd()

### Community 132 - "Community 132"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.mfi()

### Community 133 - "Community 133"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.pivot_point_levels()

### Community 134 - "Community 134"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.pivothigh()

### Community 135 - "Community 135"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.pivotlow()

### Community 136 - "Community 136"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.barssince()

### Community 137 - "Community 137"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.rma()

### Community 138 - "Community 138"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.rsi()

### Community 139 - "Community 139"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.sma()

### Community 140 - "Community 140"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.bb()

### Community 141 - "Community 141"
Cohesion: 0.50
Nodes (4): Code Example, Remarks, Returns, ta.stdev()

### Community 142 - "Community 142"
Cohesion: 0.67
Nodes (3): Code Example, Returns, ta.supertrend()

### Community 143 - "Community 143"
Cohesion: 0.67
Nodes (3): Code Example, Remarks, ta.valuewhen()

### Community 144 - "Community 144"
Cohesion: 0.67
Nodes (3): Code Example, Returns, ta.dmi()

### Community 145 - "Community 145"
Cohesion: 0.67
Nodes (3): Code Example, Returns, ta.sar()

### Community 146 - "Community 146"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.tr()

### Community 147 - "Community 147"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.tsi()

### Community 148 - "Community 148"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.variance()

### Community 149 - "Community 149"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.cci()

### Community 150 - "Community 150"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.correlation()

### Community 151 - "Community 151"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.highest()

### Community 152 - "Community 152"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.linreg()

### Community 153 - "Community 153"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.lowest()

### Community 154 - "Community 154"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.lowestbars()

### Community 155 - "Community 155"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.median()

### Community 156 - "Community 156"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.highestbars()

### Community 157 - "Community 157"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.percentile_linear_interpolation()

### Community 158 - "Community 158"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.percentile_nearest_rank()

### Community 159 - "Community 159"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.percentrank()

### Community 160 - "Community 160"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.range()

### Community 161 - "Community 161"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.rising()

### Community 162 - "Community 162"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.roc()

### Community 163 - "Community 163"
Cohesion: 0.67
Nodes (3): Remarks, Returns, ta.stoch()

## Knowledge Gaps
- **346 isolated node(s):** `Source`, `Files`, `Refresh`, `Runtime`, `Returns` (+341 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Functions - Technical Analysis All ta.* functions (RSI, SMA, etc.)` connect `Community 6` to `Community 128`, `Community 129`, `Community 130`, `Community 131`, `Community 132`, `Community 133`, `Community 134`, `Community 135`, `Community 136`, `Community 137`, `Community 138`, `Community 139`, `Community 140`, `Community 141`, `Community 142`, `Community 143`, `Community 144`, `Community 145`, `Community 146`, `Community 147`, `Community 148`, `Community 149`, `Community 150`, `Community 151`, `Community 152`, `Community 153`, `Community 154`, `Community 155`, `Community 156`, `Community 157`, `Community 158`, `Community 159`, `Community 160`, `Community 161`, `Community 162`, `Community 163`, `Community 115`, `Community 116`, `Community 117`, `Community 118`, `Community 119`, `Community 120`, `Community 121`, `Community 122`, `Community 123`, `Community 124`, `Community 125`, `Community 126`, `Community 127`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `Builder` connect `Community 4` to `Community 9`, `Community 2`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `fetch()` connect `Community 11` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `Source`, `Files`, `Refresh` to the rest of the system?**
  _346 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06654567453115548 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09686609686609686 - nodes in this community are weakly interconnected._