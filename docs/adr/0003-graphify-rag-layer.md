# ADR-0003: Graphify as RAG Layer

## Status

Accepted

## Context

PineForge needs Pine Script v6 context for generation without injecting the full language spec (~120k tokens) on every request. The roadmap originally planned pgvector retrieval (m25) and Graphify (m27) in later phases.

## Decision

Use Graphify as the v1 RAG layer:

1. **Committed graph artifact** — `graphify-out/graph.json` and `GRAPH_REPORT.md` live in the repo
2. **Runtime retrieval** — `Graphify::ContextService` calls `graphify query --budget 2000` before LLM prompts
3. **Static base rules** — `app/prompts/v1/minimal_system.txt` remains the fixed instruction layer
4. **Graceful degradation** — missing CLI or graph failure returns empty context; generation continues

## Alternatives Considered

| Option | Rejected because |
|--------|------------------|
| Full v6 docs in system prompt | ~123k tokens per request |
| pgvector only | Heavier infra; deferred to m25 |
| No RAG (static rules only) | Misses prompt-specific v6 context |

## Consequences

- Developers must run `bin/graphify-update` (or git hook) after structural code changes
- CI validates graph presence and runs PR impact checks
- Production hosts need `graphify` CLI on PATH or accept static-only fallback
- pgvector may complement Graphify later; not replaced in this ADR

## Ollama Endpoint Policy

Cloud Ollama (`OLLAMA_CLOUD_BASE_URL` → `https://ollama.com`) is primary with health check. Local Ollama (`OLLAMA_URL`) serves degraded mode with `OLLAMA_LOCAL_FALLBACK_MODEL`.
