# ADR-0002: Rails 8 Stack Update

Status: Accepted

Supersedes: ADR-0001 (Rails 7)

## Decision

Backend:
- Ruby 3.4.2
- Rails 8 API mode
- PostgreSQL
- Redis
- Sidekiq

Frontend:
- React 18
- TypeScript (strict)
- Vite
- Tailwind CSS
- Monaco Editor (m02+)

AI:
- ollama-client gem (~> 1.3)
- Ollama (local or cloud)
- Qwen 2.5 Coder (primary)
- DeepSeek-R1 (fallback, m28 reasoning)

Infrastructure:
- Docker Compose (m45+)

## Rationale

- Rails 8 aligns with Ruby 3.4.2 and ActionController::Live for SSE streaming
- Vite provides fast HMR for Monaco-based editor UX
- ollama-client is the canonical LLM adapter in this workspace
- Sidekiq handles metadata extraction and repair jobs asynchronously

## Consequences

- ADR-0001 is superseded; all new work targets Rails 8
- CI must run RSpec (backend) and Vitest (client)
- LLM routing centralized in `Llm::Router`; no hardcoded models in controllers
