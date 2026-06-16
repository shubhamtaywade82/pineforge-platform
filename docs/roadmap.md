# PineForge Platform v1.0 Roadmap

## Phase 1 — MVP (m1–m12)

Goal:
Generate valid Pine Script v6 reliably.

m01 Project setup
m02 Monaco integration
m03 Generation API
m04 Ollama integration
m05 Pine validation
m06 Repair loops
m07 Persistence
m08 Version history
m09 Diffs
m10 Metadata extraction
m11 Export support
m12 Dashboard

---

## Phase 2 — Intelligence (m13–m24)

Goal:
Build Pine-aware workflows.

m13 AST parser
m14 Dependency graphs
m15 Call graphs
m16 Community detection
m17 Graph persistence
m18 Similarity search
m19 Documentation ingestion
m20 Retrieval
m21 Prompt builder
m22 Validation insights
m23 Explainability
m24 Quality scoring

Note: Graphify RAG (m19–m21, m27) and Monaco upgrades (m40, m43) landed early — see [`docs/adr/0003-graphify-rag-layer.md`](adr/0003-graphify-rag-layer.md). Live progress: dashboard **Timeline** view (`client/src/components/timeline/PineForgeTimeline.tsx`).

---

## Phase 3 — Engineering Platform (m25–m36)

Goal:
Operational maturity.

m25 pgvector
m26 Ingestion pipeline
m27 Graphify
m28 DeepSeek reasoning
m29 Export improvements
m30 GitHub impact analysis
m31 Callflow exports
m32 Wiki generation
m33 Context tuning
m34 Router metrics
m35 PR triage
m36 Merge intelligence

---

## Phase 4 — Product Launch (m37–m48)

Goal:
Launch PineForge.

m37 Public sharing
m38 Embeds
m39 Equity previews
m40 Ghost completions
m41 Federation
m42 Enhanced conflict checks
m43 Open in TradingView
m44 Usage metering
m45 Docker Compose
m46 Documentation
m47 Release notes
m48 Production sign-off

---

# Definition of Done

PineForge v1.0 is complete when:

- All milestones implemented
- Tests passing
- CI green
- Docker operational
- Documentation complete
- Security reviewed
- Production sign-off approved
