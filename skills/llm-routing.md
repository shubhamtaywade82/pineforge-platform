# LLM Routing Skill

Apply when implementing AI integrations (m04, m21, m28, m34+).

## Rules

- All prompts must be versioned.
- All LLM calls must be observable.
- No hardcoded model assumptions.
- Routing logic must be centralized.
- `Graphify::ContextService.fetch` must run before every chat via `Prompts::Builder`.
- `Llm::EndpointResolver.resolve` must be used — never hardcode Ollama client URLs.

## Models (v1.0)

- Ollama Cloud (primary) — `OLLAMA_CLOUD_URL`
- Ollama Local (fallback) — `OLLAMA_URL` + `OLLAMA_LOCAL_FALLBACK_MODEL`
- Qwen 2.5 Coder (primary model)
- DeepSeek-R1 (model-level fallback)

## Graphify RAG

- Graph path: `graphify-out/graph.json`
- Token budget: `GRAPHIFY_TOKEN_BUDGET` (default 2000)
- Query timeout: `GRAPHIFY_QUERY_TIMEOUT` (default 3s)
- Fallback: static `minimal_system.txt` when graph unavailable

## Integrations

- Ollama via `Llm::EndpointResolver` + `Llm::Router`
- Graphify CLI via `Graphify::ContextService`
- MCP server for dev tooling — see `docs/dev/graphify-mcp.md`

## Source of Truth

- docs/architecture.md
- docs/adr/0003-graphify-rag-layer.md
- AGENTS.md (AI section)
