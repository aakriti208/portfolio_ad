---
title: "Metadata Filtering in RAG Pipelines"
date: 2025-11-01
summary: "How to use metadata filters to scope vector similarity search — and why filtering before retrieval beats filtering after."
tags:
  - RAG
  - AI
  - PostgreSQL
  - pgvector
draft: false
related_projects:
  - "governed-healthcare-agent"
  - "bobcat-ai-tutor"
  - "transparent-politics"
related_notes:
  - "pgvector-indexing"
  - "postgresql-schemas"
---

The naive RAG setup retrieves the top-k most semantically similar chunks and passes them to the LLM. This works until your vector store contains documents from multiple contexts — different courses, different users, different domains — and you start getting cross-context contamination in responses.

Metadata filtering fixes this.

## Pre-filter vs. post-filter

**Post-filter**: Retrieve top-k, then discard chunks that don't match your metadata criteria. Simple but wasteful — if most of your data is in the wrong category, you'll discard most of your results and end up with low effective k.

**Pre-filter**: Apply metadata filters before similarity search, then retrieve top-k from the filtered subset. This is almost always what you want.

With pgvector, pre-filtering is a WHERE clause:

```sql
SELECT id, content, 1 - (embedding <=> $1) AS similarity
FROM document_chunks
WHERE metadata->>'course_id' = $2
  AND metadata->>'content_type' = 'lecture'
ORDER BY embedding <=> $1
LIMIT 10;
```

## The index interaction problem

There's a catch: combining a WHERE clause with an HNSW or IVFFlat index scan requires the index to support filtered queries. pgvector supports this, but the efficiency depends on how selective your filter is.

If your filter selects a very small fraction of rows (< 5%), PostgreSQL may fall back to a sequential scan rather than the index. You can check with `EXPLAIN`:

```sql
EXPLAIN SELECT ...
```

For highly selective filters, consider a partial index:

```sql
CREATE INDEX ON document_chunks
USING hnsw (embedding vector_cosine_ops)
WHERE metadata->>'content_type' = 'lecture';
```

## Metadata schema design

Metadata that you'll filter on should be promoted to top-level jsonb keys (or dedicated columns). Nested metadata is hard to index efficiently.

Good:
```json
{ "course_id": "CS4320", "content_type": "lecture", "week": 3 }
```

Bad (for filtering):
```json
{ "source": { "course": { "id": "CS4320" } } }
```

## Multi-tenant isolation

For multi-tenant RAG (e.g., per-user or per-course knowledge bases), metadata filtering is your access control layer. Every query must include a tenant filter, and that filter should be enforced at the application layer, not left to the caller.

```python
def retrieve(query: str, course_id: str, k: int = 10) -> list[Chunk]:
    embedding = embed(query)
    return db.query(
        "SELECT ... WHERE metadata->>'course_id' = $1 ORDER BY embedding <=> $2 LIMIT $3",
        course_id, embedding, k
    )
```

Never let `course_id` come directly from user input without validation against the authenticated user's allowed courses.
