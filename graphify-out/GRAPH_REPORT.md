# Graphify Report — PineForge Platform

Generated via `graphify update . --no-cluster` (AST-only extraction).

## Summary

| Metric | Value |
|--------|-------|
| Nodes | 437 |
| Edges | 482 |
| Graph path | `graphify-out/graph.json` |

## Suggested Queries

Use these with `graphify query "<question>" --graph graphify-out/graph.json --budget 2000`:

- How does `Generators::StreamService` connect to `Llm::Router`?
- What validates Pine Script v6 code before persistence?
- Where is graph context injected into prompts?
- Show the path from `GeneratorsController` to `Pine::Validator`
- Pine Script v6 rules for `request.security` and `strategy.entry`

## Key Communities

- **Generators** — `app/services/generators/*`, `app/controllers/api/v1/generators_controller.rb`
- **LLM routing** — `app/services/llm/*`, `config/initializers/ollama.rb`
- **Pine validation** — `app/services/pine/validator.rb`
- **Graphify context** — `app/services/graphify/context_service.rb`, `app/services/prompts/builder.rb`
- **Frontend editor** — `client/src/components/editor/*`, `client/src/editor/*`
- **Pine v6 docs** — `docs/pine_v6_rules.md`, `docs/pine_v6_examples/*`

## Maintenance

Refresh after code changes:

```bash
bin/graphify-update
```

Or install the git hook: `graphify hook install`
