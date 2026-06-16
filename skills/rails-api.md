# Rails API Skill

Apply when implementing backend milestones (m01–m48).

## Rules

- Thin controllers; business logic in services under `app/services/`.
- Background work in Sidekiq jobs.
- External integrations via adapters only.
- Reversible migrations; document major schema changes in ADRs.

## Source of Truth

- docs/architecture.md
- docs/adr/0001-stack-selection.md
- AGENTS.md

## Stack

Rails 7, PostgreSQL, Redis, Sidekiq.

## Testing

RSpec: unit, service, and request specs for every feature.
