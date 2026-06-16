# Testing Skill

Apply to every milestone; tests are mandatory before marking work complete.

## Backend (RSpec)

| Gem | Role |
|-----|------|
| `rspec-rails` | Request, model, service, job specs |
| `factory_bot_rails` | Test data factories with traits |
| `faker` | Realistic factory attributes |
| `shoulda-matchers` | Model validations and associations |
| `webmock` | Block and stub outbound HTTP |
| `vcr` | Record/replay Ollama API cassettes |
| `json_matchers` | JSON schema assertions for API responses |
| `rspec-sidekiq` | Sidekiq job test helpers |
| `simplecov` | Coverage reports (`COVERAGE=true`) |

## Factories

- Defined in `spec/factories/`
- Use traits (`:complete`, `:strategy`, `:with_metadata`, etc.)
- Lint factories: `FACTORY_BOT_LINT=true bundle exec rspec`

## Frontend (Vitest)

- Component tests
- Integration tests for user workflows

## Running tests

```bash
bundle exec rspec
COVERAGE=true bundle exec rspec
FACTORY_BOT_LINT=true bundle exec rspec
VCR_RECORD=all bundle exec rspec spec/services/generators/metadata_service_spec.rb
cd client && npm test
```

## CI

All tests must pass in `.github/workflows/ci.yml` before merge.

## Rules

- No feature without tests.
- Cover edge cases and failure paths.
- Never mark work complete without test evidence in PRs.
