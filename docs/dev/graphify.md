# Graphify Development Guide

PineForge uses [Graphify](https://github.com/safishamsi/graphify) (`graphifyy` on PyPI) as the knowledge graph for both production RAG and development intelligence.

## Install

```bash
uv tool install "graphifyy[ollama,pdf,leiden,mcp]"
graphify install --platform cursor
graphify hook install
```

## Bootstrap / Refresh Graph

```bash
# AST-only update (no LLM cost) — use after code changes
bin/graphify-update

# Full semantic extraction (requires Ollama)
OLLAMA_BASE_URL=$OLLAMA_CLOUD_URL OLLAMA_MODEL=qwen2.5-coder:7b \
  graphify extract . --backend ollama
```

## Ingest Pine v6 Knowledge

Source docs live in:

- [`docs/pine_v6_rules.md`](../pine_v6_rules.md)
- [`docs/pine_v6_examples/`](../pine_v6_examples/)

After adding docs, rebuild:

```bash
graphify . --update
```

## Query Commands

```bash
graphify query "request.security Pine Script v6" \
  --graph graphify-out/graph.json --budget 2000

graphify path "GeneratorsController" "Pine::Validator" \
  --graph graphify-out/graph.json

graphify explain "Graphify::ContextService" \
  --graph graphify-out/graph.json
```

## PR Triage

```bash
graphify prs
graphify prs 42
GRAPHIFY_TRIAGE_BACKEND=ollama graphify prs --triage
graphify prs --conflicts --graph graphify-out/graph.json
```

## Live Watch (Optional)

```bash
graphify watch ./app
```

Do not add watch to the default `bin/dev` stack — it is CPU-intensive.

## Committed Artifacts

| File | Policy |
|------|--------|
| `graphify-out/graph.json` | Commit |
| `graphify-out/GRAPH_REPORT.md` | Commit |
| `graphify-out/cache/` | Gitignored |
| `graphify-out/graph.html` | Gitignored |

## Production Integration

Rails calls `Graphify::ContextService.fetch` before every LLM prompt via [`Prompts::Builder`](../app/services/prompts/builder.rb). If the CLI is missing or the graph is unavailable, generation falls back to static rules only.
