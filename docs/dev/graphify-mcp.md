# Graphify MCP Server

The MCP server exposes the knowledge graph to team assistants. Rails generation uses the CLI directly — MCP is for development tooling only.

## Install MCP Extra

```bash
uv tool install "graphifyy[mcp]"
```

## Run Server

```bash
python -m graphify.serve graphify-out/graph.json \
  --transport http \
  --host 0.0.0.0 \
  --port 8080 \
  --api-key "$GRAPHIFY_SECRET"
```

## Environment Variables

See [`.env.example`](../../.env.example):

- `GRAPHIFY_GRAPH_PATH` — path to committed graph
- `GRAPHIFY_MCP_URL` — HTTP MCP endpoint
- `GRAPHIFY_SECRET` — Bearer token for MCP auth
- `GRAPHIFY_TOKEN_BUDGET` — default query budget (2000)

## Cursor MCP Config

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "pineforge-graph": {
      "url": "http://localhost:8080/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SECRET"
      }
    }
  }
}
```

## Available Tools

- `query_graph` — subgraph retrieval within token budget
- `get_node` / `get_neighbors` — local graph navigation
- `shortest_path` — structural path between concepts
- `list_prs` / `get_pr_impact` / `triage_prs` — PR impact analysis
