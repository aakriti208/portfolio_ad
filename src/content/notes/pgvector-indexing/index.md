---
title: "pgvector Indexing: HNSW vs IVFFlat"
date: 2025-10-01
summary: "When to use HNSW and when to use IVFFlat for vector similarity search in PostgreSQL — and what the tradeoffs actually mean in practice."
tags:
  - PostgreSQL
  - pgvector
  - AI
  - Database
draft: false
related_projects:
  - "governed-healthcare-agent"
related_notes:
  - "postgresql-schemas"
  - "rag-metadata-filtering"
---

pgvector gives you two index types: HNSW and IVFFlat. The docs tell you they exist; they're less clear on when to choose each. Here's what the tradeoffs mean in practice.

## The short version

- **HNSW**: Better recall, faster queries, higher memory cost, slower build time. Default choice for most applications.
- **IVFFlat**: Lower memory, faster builds, worse recall unless you tune it. Better for very large datasets where you can't afford HNSW's memory overhead.

## HNSW

Hierarchical Navigable Small World graphs navigate a multi-layer graph structure to find approximate nearest neighbors. Once built, queries are fast and recall is high.

```sql
CREATE INDEX ON document_chunks
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

- `m`: Number of connections per node. Higher = better recall, more memory. Default 16 is fine for most cases.
- `ef_construction`: Search width during index build. Higher = better recall, slower build. 64–128 is typical.

At query time, set `hnsw.ef_search` to control the recall/speed tradeoff:

```sql
SET hnsw.ef_search = 100;
SELECT * FROM document_chunks
ORDER BY embedding <=> query_embedding
LIMIT 10;
```

## IVFFlat

Inverted file index with flat quantization. Clusters vectors into `lists` buckets at build time; queries search `probes` buckets.

```sql
CREATE INDEX ON document_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

Rule of thumb: `lists = rows / 1000` for datasets under 1M rows, `sqrt(rows)` for larger.

At query time, `ivfflat.probes` controls recall:

```sql
SET ivfflat.probes = 10;
```

More probes = better recall, slower queries. IVFFlat requires the table to be populated before building — you can't build it on an empty table and add rows later without degrading recall.

## When HNSW is the wrong choice

- Very large datasets (50M+ vectors) where HNSW memory becomes prohibitive
- Frequent bulk inserts — HNSW updates are slower than IVFFlat
- You need to build the index quickly on a large existing dataset

## Recall testing

Always test recall for your specific dataset. Generate a set of queries with known ground truth (exact kNN via sequential scan), run your index queries, and measure overlap.

```sql
-- Exact nearest neighbors (no index)
SET enable_indexscan = off;
SELECT id FROM document_chunks
ORDER BY embedding <=> $1
LIMIT 10;
```

Compare against index results to compute recall@k.
