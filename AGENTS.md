# PineForge Platform Agent Constitution

This repository is designed to be developed collaboratively by humans and coding agents.

The agent must follow these rules.

---

# Mission

Implement PineForge Platform v1.0 exactly as defined.

Do not invent features.

Do not expand scope.

Follow the roadmap.

---

# Source of Truth

Priority order:

1. docs/vision.md
2. docs/roadmap.md
3. docs/architecture.md
4. ADR documents
5. Existing code

If conflicts occur:

Ask for clarification.

Never guess.

---

# Architectural Rules

## Backend

- Rails controllers must remain thin.
- Business logic belongs in services.
- Background work belongs in Sidekiq jobs.
- External integrations require adapters.

## Frontend

- Use React functional components.
- Use strict TypeScript.
- Avoid global state unless justified.
- Prefer composition over inheritance.

## AI

- All prompts must be versioned.
- All LLM calls must be observable.
- No hardcoded model assumptions.
- Routing logic must be centralized.
- Graphify context must precede every LLM chat call via `Graphify::ContextService`.
- Use `Llm::EndpointResolver` for cloud→local Ollama fallback — never hardcode client URLs.

---

# Graphify Knowledge Graph

This project has a graphify knowledge graph at `graphify-out/`.

**Before answering architecture or codebase questions:**

1. Read [`graphify-out/GRAPH_REPORT.md`](graphify-out/GRAPH_REPORT.md) for god nodes and suggested queries
2. Run `graphify query "<question>" --graph graphify-out/graph.json --budget 2000` — do not read raw source files when the graph exists
3. Use `graphify path "A" "B"` for call chains; `graphify explain "Concept"` for component docs
4. After modifying `app/` or `client/src/`, run `bin/graphify-update` (git hook handles this if `graphify hook install` was run)

**Code generation discipline:**

- `Graphify::ContextService.fetch` precedes every `Llm::Router#chat` via `Prompts::Builder`
- `Pine::Validator` must pass before generated code is persisted
- All streaming uses `ActionController::Live` with `X-Accel-Buffering: no`

See [`docs/dev/graphify.md`](docs/dev/graphify.md) for full setup.

---

# Database Rules

- Every migration must be reversible.
- Avoid destructive migrations.
- Add indexes deliberately.
- Document major schema changes in ADRs.

---

# Testing Rules

Every feature requires tests.

Backend:

- Unit tests
- Service tests
- Request specs

Frontend:

- Component tests
- Integration tests

Never mark work complete without tests.

---

# Refactoring Rules

Allowed:

- Refactor code touched by the feature.

Forbidden:

- Large unrelated rewrites.
- Renaming modules without justification.
- Introducing frameworks without approval.

---

# Git Rules

One milestone per branch.

Branch naming:

feature/mXX-description

Examples:

feature/m01-project-setup
feature/m28-deepseek-reasoning

---

# Pull Requests

Every PR must include:

- Objective
- Scope
- Acceptance criteria
- Test evidence
- Risks

---

# When Uncertain

Stop.

Explain the ambiguity.

Request clarification.

Do not hallucinate architecture or behavior.
