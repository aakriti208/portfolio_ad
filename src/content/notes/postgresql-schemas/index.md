---
title: "PostgreSQL Schema Design for AI Applications"
date: 2025-09-01
summary: "Patterns for structuring PostgreSQL schemas when your app involves embeddings, vector search, and LLM-generated content."
tags:
  - PostgreSQL
  - AI
  - Database
draft: false
related_projects:
  - "governed-healthcare-agent"
related_notes:
  - "pgvector-indexing"
---

AI applications have a different data access pattern than typical CRUD apps. You're often storing large blobs of text, embedding vectors, and audit trails of LLM interactions. Here's what I've learned about structuring PostgreSQL for this.

## Separate concerns: source vs. derived data

Keep source documents in one table and their embeddings in another. This lets you re-embed without touching the source, and query each independently.

```sql
CREATE TABLE documents (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url  text,
  content     text NOT NULL,
  metadata    jsonb,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE document_chunks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  content     text NOT NULL,
  embedding   vector(1536),
  metadata    jsonb,
  created_at  timestamptz DEFAULT now()
);
```

The `metadata` jsonb column on chunks is important — it's what enables filtering before or after similarity search.

## Audit tables for LLM interactions

Every query sent to an LLM and every response received should be logged. This is essential for debugging, evaluation, and compliance.

```sql
CREATE TABLE llm_interactions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   uuid,
  model        text NOT NULL,
  prompt       text NOT NULL,
  response     text,
  latency_ms   int,
  tokens_in    int,
  tokens_out   int,
  created_at   timestamptz DEFAULT now()
);
```

## Indexing strategy

For vector columns, an HNSW index on `document_chunks.embedding` is almost always the right choice. See [pgvector indexing strategies](/notes/pgvector-indexing) for details on when to use IVFFlat instead.

## jsonb vs. dedicated columns

Use `jsonb` for metadata that varies across records (tags, categories, source-specific fields). Use dedicated columns for fields you'll frequently filter or sort on — PostgreSQL can't use standard indexes on jsonb internals efficiently without expression indexes.
