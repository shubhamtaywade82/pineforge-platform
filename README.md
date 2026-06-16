# PineForge Platform

AI-powered Pine Script engineering platform for generating, validating, refining, and managing TradingView Pine Script strategies.

---

## Vision

PineForge helps traders and developers move from:

Idea → Generation → Validation → Refinement → Backtesting → Deployment

using Pine-native tooling, local AI models, and knowledge-driven workflows.

---

## v1.0 Scope

PineForge v1.0 includes:

- Pine Script v6 generation
- Validation and repair loops
- Version history and diffs
- Graph-based retrieval
- Deep reasoning mode
- Ghost completions
- Public sharing
- Equity previews
- TradingView handoff
- Docker deployment
- Production readiness

See:

- docs/vision.md
- docs/roadmap.md
- docs/architecture.md

---

## Technology Stack

Backend:
- Ruby 3.4.2
- Ruby on Rails 8 API
- PostgreSQL
- Redis
- Sidekiq

Frontend:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor

AI:
- Ollama
- Qwen 2.5 Coder
- DeepSeek-R1
- Graphify

Infrastructure:
- Docker Compose

---

## Local Development

### Backend

```bash
cp .env.example .env
bundle install
bin/rails db:create db:migrate
bin/rails server
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Background jobs

```bash
bundle exec sidekiq
```

---

## Development Principles

- Architecture first.
- Small incremental milestones.
- Tests are mandatory.
- No scope creep.
- Production readiness is non-negotiable.

---

## License

Apache 2.0
