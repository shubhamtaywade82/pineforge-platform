# Graph Report - .  (2026-06-16)

## Corpus Check
- Corpus is ~38,386 words - fits in a single context window. You may not need a graph.

## Summary
- 510 nodes · 527 edges · 135 communities (83 shown, 52 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

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
- [[_COMMUNITY_Reference Index Builder Module|Reference Index Builder Module]]
- [[_COMMUNITY_Context Service Module|Context Service Module]]
- [[_COMMUNITY_Pine Script V6 Bar Coloring|Pine Script V6 Bar Coloring]]
- [[_COMMUNITY_Indicator Module|Indicator Module]]
- [[_COMMUNITY_Ollama Helpers Module|Ollama Helpers Module]]
- [[_COMMUNITY_C O N T R|C O N T R]]
- [[_COMMUNITY_Validator Module|Validator Module]]
- [[_COMMUNITY_Pine Forge  Platform V1 Module|Pine Forge  Platform V1 Module]]
- [[_COMMUNITY_Pine Script V6 Arrays Guide|Pine Script V6 Arrays Guide]]
- [[_COMMUNITY_Export Service Module|Export Service Module]]
- [[_COMMUNITY_Ollama Adapter Module|Ollama Adapter Module]]
- [[_COMMUNITY_Rails 8 A P I|Rails 8 A P I]]
- [[_COMMUNITY_Database  Configuration Component|Database  Configuration Component]]
- [[_COMMUNITY_Diff Service Module|Diff Service Module]]
- [[_COMMUNITY_Restore Version Service Module|Restore Version Service Module]]
- [[_COMMUNITY_Primer  First  Indicator Component|Primer:  First  Indicator Component]]
- [[_COMMUNITY_A G E N T|A G E N T]]
- [[_COMMUNITY_Health Controller Module|Health Controller Module]]
- [[_COMMUNITY_20250616000001 Enable Uuid Extension Module|20250616000001 Enable Uuid Extension Module]]
- [[_COMMUNITY_20250616000002 Create Users Module|20250616000002 Create Users Module]]
- [[_COMMUNITY_20250616000003 Create Indicators Module|20250616000003 Create Indicators Module]]
- [[_COMMUNITY_20250616000004 Create Indicator Versions Module|20250616000004 Create Indicator Versions Module]]
- [[_COMMUNITY_20250616000005 Create Generation Sessions Module|20250616000005 Create Generation Sessions Module]]
- [[_COMMUNITY_Language  Enums Component|Language:  Enums Component]]
- [[_COMMUNITY_Language  Execution  Model Component|Language:  Execution  Model Component]]
- [[_COMMUNITY_Visuals  Backgrounds Component|Visuals:  Backgrounds Component]]
- [[_COMMUNITY_Application Controller Module|Application Controller Module]]
- [[_COMMUNITY_S E C U R|S E C U R]]
- [[_COMMUNITY_Application Job Module|Application Job Module]]
- [[_COMMUNITY_Application Mailer Module|Application Mailer Module]]
- [[_COMMUNITY_Application Record Module|Application Record Module]]
- [[_COMMUNITY_Generation Session Module|Generation Session Module]]
- [[_COMMUNITY_Indicator Version Module|Indicator Version Module]]
- [[_COMMUNITY_User Module|User Module]]
- [[_COMMUNITY_Language  Identifiers Component|Language:  Identifiers Component]]
- [[_COMMUNITY_For.. Module|For.. Module]]
- [[_COMMUNITY_Language  Maps Component|Language:  Maps Component]]
- [[_COMMUNITY_Language  Methods Component|Language:  Methods Component]]
- [[_COMMUNITY_Language  Objects Component|Language:  Objects Component]]
- [[_COMMUNITY_Language  Type  System Component|Language:  Type  System Component]]
- [[_COMMUNITY_Ollama  Metadata  Extraction  Cassette Component|Ollama  Metadata  Extraction  Cassette Component]]
- [[_COMMUNITY_Index Module|Index Module]]
- [[_COMMUNITY_Bundler Audit Module|Bundler Audit Module]]
- [[_COMMUNITY_Cable Module|Cable Module]]
- [[_COMMUNITY_Cache Module|Cache Module]]
- [[_COMMUNITY_English  Locale  Translations Component|English  Locale  Translations Component]]
- [[_COMMUNITY_Active  Storage  Configuration Component|Active  Storage  Configuration Component]]
- [[_COMMUNITY_Distilled Pine Script V6 Rules|Distilled Pine Script V6 Rules]]
- [[_COMMUNITY_Pine Forge Vision And Goals|Pine Forge Vision And Goals]]
- [[_COMMUNITY_Yml Concept|Yml Concept]]
- [[_COMMUNITY_Yml Concept|Yml Concept]]
- [[_COMMUNITY_Yml Concept|Yml Concept]]
- [[_COMMUNITY_Language  Matrices Component|Language:  Matrices Component]]
- [[_COMMUNITY_Language  Operators Component|Language:  Operators Component]]
- [[_COMMUNITY_Language  Script  Structure Component|Language:  Script  Structure Component]]
- [[_COMMUNITY_Language  User Defined  Functions Component|Language:  User Defined  Functions Component]]
- [[_COMMUNITY_Language  Variable  Declarations Component|Language:  Variable  Declarations Component]]
- [[_COMMUNITY_Pine Script V6 Symbol Reference|Pine Script V6 Symbol Reference]]
- [[_COMMUNITY_Pine  Script V6  Colors Component|Pine  Script V6  Colors Component]]
- [[_COMMUNITY_L L M Routing Skill|L L M Routing Skill]]
- [[_COMMUNITY_Rails A P I Skill|Rails A P I Skill]]
- [[_COMMUNITY_React  U I  Skill Component|React  U I  Skill Component]]
- [[_COMMUNITY_Testing  Skill Component|Testing  Skill Component]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `IndicatorsController` - 14 edges
3. `GeneratorsController` - 13 edges
4. `Builder` - 13 edges
5. `ReferenceIndexBuilder` - 12 edges
6. `ReferenceLookup` - 9 edges
7. `Pine Script v6 Visuals Overview` - 9 edges
8. `resolve()` - 8 edges
9. `fetch()` - 7 edges
10. `IndicatorVersion` - 7 edges

## Surprising Connections (you probably didn't know these)
- `build_ollama_client()` --calls--> `fetch()`  [INFERRED]
  config/initializers/ollama.rb → app/services/graphify/context_service.rb
- `Pine Script Skill` --conceptually_related_to--> `Pine Script v6 Visuals Overview`  [INFERRED]
  skills/pine-script.md → docs/pine_v6_visuals/overview.md
- `local_client()` --calls--> `Application`  [INFERRED]
  app/services/llm/endpoint_resolver.rb → config/application.rb
- `build_cloud_client()` --calls--> `fetch()`  [INFERRED]
  app/services/llm/endpoint_resolver.rb → app/services/graphify/context_service.rb
- `Queue Configuration` --shares_data_with--> `Database Configuration`  [INFERRED]
  config/queue.yml → config/database.yml

## Import Cycles
- None detected.

## Communities (135 total, 52 thin omitted)

### Community 0 - "Validation Panel Module"
Cohesion: 0.07
Nodes (35): ValidationPanel(), ValidationPanelProps, versions, VersionHistoryPanel(), VersionHistoryPanelProps, ContextHistory(), ContextHistoryProps, PromptPanel() (+27 more)

### Community 1 - "Refine Service Module"
Cohesion: 0.09
Nodes (4): RefineService, StreamService, ExtractMetadataJob, GeneratorsController

### Community 2 - "Package Module"
Cohesion: 0.07
Nodes (27): dependencies, @monaco-editor/react, react, react-dom, devDependencies, autoprefixer, jsdom, postcss (+19 more)

### Community 3 - "Application Module"
Cohesion: 0.10
Nodes (11): Application, CompleteService, MetadataService, build_cloud_client(), cloud_configured?(), cloud_reachable?(), EndpointResolver, first_working_key_or_unauthenticated() (+3 more)

### Community 4 - "Pine Diagnostics Module"
Cohesion: 0.12
Nodes (16): applyValidationDecorations(), buildValidationMarkers(), parseLineNumber(), ValidationMarker, registerPineInlineCompletions(), resetInlineCompletionsRegistration(), CompletionSpec, PINE_DECLARATIONS (+8 more)

### Community 5 - "Repair Service Module"
Cohesion: 0.11
Nodes (3): RepairService, RephraseService, Builder

### Community 6 - "Timeline Phases Module"
Cohesion: 0.15
Nodes (12): PhaseStatus, progressFromMilestones(), TIMELINE_PHASES, TimelineMilestone, TimelinePhase, timelineTotals(), withProgress(), MilestoneCardProps (+4 more)

### Community 7 - "Tsconfig Module"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 8 - "Reference Lookup Module"
Cohesion: 0.18
Nodes (4): call(), enabled?(), index(), ReferenceLookup

### Community 11 - "Context Service Module"
Cohesion: 0.36
Nodes (9): build_query(), ContextService, enabled?(), explain(), fetch(), path(), run_command(), sanitize() (+1 more)

### Community 12 - "Pine Script V6 Bar Coloring"
Cohesion: 0.20
Nodes (10): Pine Script v6 Bar Coloring, Pine Script v6 Bar Plotting, Pine Script v6 Fills, Pine Script v6 Levels, Pine Script v6 Lines and Boxes, Pine Script v6 Visuals Overview, Pine Script v6 Plots, Pine Script v6 Tables (+2 more)

### Community 14 - "Ollama Helpers Module"
Cohesion: 0.38
Nodes (3): request_model(), stub_ollama_chat(), stub_ollama_chat_failure()

### Community 15 - "C O N T R"
Cohesion: 0.33
Nodes (4): .github/ISSUE_TEMPLATE/bug.md, .github/ISSUE_TEMPLATE/feature.md, .github/pull_request_template.md, PineForge Vision

### Community 17 - "Pine Forge  Platform V1 Module"
Cohesion: 0.40
Nodes (5): Graphify RAG Layer, ADR-0003: Graphify as RAG Layer, Graphify Development Guide, Graphify MCP Server Guide, PineForge Platform v1.0 Roadmap

### Community 18 - "Pine Script V6 Arrays Guide"
Cohesion: 0.40
Nodes (5): Pine Script v6 Arrays Guide, Pine Script v6 Built-ins Guide, Pine Script v6 Conditionals Guide, Pine Script v6 Declarations Guide, Pine Script v6 Language Source Map

### Community 21 - "Rails 8 A P I"
Cohesion: 0.50
Nodes (4): Rails 8 API mode, ADR-0001: Technology Stack Selection, ADR-0002: Rails 8 Stack Update, Architecture Overview

### Community 22 - "Database  Configuration Component"
Cohesion: 0.50
Nodes (4): Database Configuration, Deployment Configuration, Queue Configuration, Recurring Jobs Configuration

### Community 25 - "Primer:  First  Indicator Component"
Cohesion: 0.50
Nodes (4): Primer: First Indicator, Primer: First Steps, Primer: Next Steps, Pine Script v6 Primer — Source

### Community 34 - "Language:  Enums Component"
Cohesion: 0.67
Nodes (3): Language: Enums, Enum Declaration, Enum Inputs

### Community 35 - "Language:  Execution  Model Component"
Cohesion: 0.67
Nodes (3): Language: Execution Model, Bar-by-Bar Execution Model, Variable Persistence (var / varip)

### Community 36 - "Visuals:  Backgrounds Component"
Cohesion: 0.67
Nodes (3): Visuals: Backgrounds, bgcolor Function, Pine Script v6 Visuals — Source

## Knowledge Gaps
- **148 isolated node(s):** `ApplicationController`, `ApplicationJob`, `ApplicationMailer`, `ApplicationRecord`, `GenerationSession` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **52 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Builder` connect `Repair Service Module` to `Refine Service Module`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `fetch()` connect `Context Service Module` to `Application Module`, `Repair Service Module`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `ApplicationController`, `ApplicationJob`, `ApplicationMailer` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Validation Panel Module` be split into smaller, more focused modules?**
  _Cohesion score 0.06654567453115548 - nodes in this community are weakly interconnected._
- **Should `Refine Service Module` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._
- **Should `Package Module` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Application Module` be split into smaller, more focused modules?**
  _Cohesion score 0.09686609686609686 - nodes in this community are weakly interconnected._