# LLM Routing Skill

Apply when implementing AI integrations (m04, m21, m28, m34+).

## Rules

- All prompts must be versioned.
- All LLM calls must be observable.
- No hardcoded model assumptions.
- Routing logic must be centralized.

## Models (v1.0)

- Ollama (local)
- Qwen 2.5 Coder
- DeepSeek-R1

## Integrations

- Ollama URL via `OLLAMA_URL` (see `.env.example`)
- Graphify for knowledge graph (m27+)

## Source of Truth

- docs/architecture.md
- AGENTS.md (AI section)
