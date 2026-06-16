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

# Full semantic extraction (local Ollama)
OLLAMA_API_KEY=local OLLAMA_MODEL=qwen2.5-coder:7b \
  graphify extract . --backend ollama --no-cluster

# Or Ollama Cloud (if you have an API key)
OLLAMA_BASE_URL=https://ollama.com OLLAMA_API_KEY=your-key OLLAMA_MODEL=qwen2.5-coder:7b \
  graphify extract . --backend ollama --no-cluster
```

### Local Ollama troubleshooting

Graphify defaults to `qwen2.5-coder:7b`. If you see `model 'qwen2.5-coder:7b' not found`:

```bash
# List installed models
curl -s http://localhost:11434/api/tags | jq -r '.models[].name'

# Pull the expected model (no ollama CLI required)
curl -N http://localhost:11434/api/pull -d '{"name":"qwen2.5-coder:7b"}'

# Then re-run with explicit model
OLLAMA_API_KEY=local OLLAMA_MODEL=qwen2.5-coder:7b \
  graphify extract . --backend ollama --no-cluster
```

Or point `OLLAMA_MODEL` at any model already on localhost (e.g. `qwen3:8b`, `llama3.1:8b`). Coder-tuned models return valid extraction JSON more reliably.

**Do not** use `bin/graphify-update --force` after adding docs — it can drop semantically extracted doc nodes. Use `graphify extract` for new markdown only.

Run only **one** `graphify extract` at a time; parallel runs contend for Ollama and appear hung.

## Ingest Pine v6 Knowledge

Source docs live in:

- [`docs/pine_v6_rules.md`](../pine_v6_rules.md)
- [`docs/pine_v6_examples/`](../pine_v6_examples/)
- [`docs/pine_v6_primer/`](../pine_v6_primer/) — TradingView User Manual primer (first-steps, first-indicator, next-steps)
- [`docs/pine_v6_language/`](../pine_v6_language/) — TradingView Language section (execution model, type system, structure, identifiers, declarations, variables, operators, conditionals, loops, built-ins, UDFs, objects, enums, methods, arrays, matrices, maps)
- [`docs/pine_v6_visuals/`](../pine_v6_visuals/) — TradingView Visuals section (overview, backgrounds, bar coloring/plotting, colors, fills, levels, lines/boxes, plots, tables, text/shapes)
- [`docs/pine_v6_writing/`](../pine_v6_writing/) — TradingView Writing section (style guide, debugging, profiling/optimization, publishing, limitations)
- [`docs/pine_v6_errors/`](../pine_v6_errors/) — TradingView Errors section (overview, CE10101, CW10003, RE10139, RE10143)
- [`docs/pine_v6_reference/symbols.json`](../pine_v6_reference/symbols.json) — symbol lookup index for codegen (`Pine::ReferenceLookup`)

Rebuild symbol index from upstream function docs:

```bash
bin/pine-reference-build
```

After adding docs, rebuild:

```bash
graphify . --update
# or AST-only refresh:
bin/graphify-update
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

Rails calls `Graphify::ContextService.fetch` and `Pine::ReferenceLookup.call` before every LLM prompt via [`Prompts::Builder`](../app/services/prompts/builder.rb). If the CLI is missing or the graph is unavailable, generation falls back to static rules and symbol lookup only.
