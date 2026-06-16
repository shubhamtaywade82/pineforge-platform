# Testing Skill

Apply to every milestone; tests are mandatory before marking work complete.

## Backend (RSpec)

- Unit tests for models and utilities
- Service specs for business logic
- Request specs for API endpoints
- WebMock blocks outbound HTTP by default
- VCR replays Ollama interactions from `spec/cassettes/`

## Frontend (Vitest)

- Component tests
- Integration tests for user workflows

## Running tests

```bash
bundle exec rspec
VCR_RECORD=all bundle exec rspec spec/services/generators/metadata_service_spec.rb
```

## CI

All tests must pass in `.github/workflows/ci.yml` before merge.

## Rules

- No feature without tests.
- Cover edge cases and failure paths.
- Never mark work complete without test evidence in PRs.

