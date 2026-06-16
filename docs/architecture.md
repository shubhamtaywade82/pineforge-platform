# Architecture Overview

Frontend

React
↓
Monaco Editor
↓
API Gateway

Backend

Rails
↓
Services
↓
Adapters
↓
Sidekiq Jobs

Data

PostgreSQL
Redis
pgvector

AI

Ollama
├── Qwen
└── DeepSeek

Knowledge

Graphify

Deployment

Docker Compose
