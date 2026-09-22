---
title: "Governed Healthcare Agent"
description: "Multi-agent LLM system for clinical decision support with guardrails, audit logging, and retrieval-augmented generation over medical knowledge bases"
status: "In progress"
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - pgvector
  - LangGraph
start_date: 2025-08-01
related_notes:
  - "postgresql-schemas"
  - "pgvector-indexing"
  - "rag-metadata-filtering"
---

A governed multi-agent system for clinical decision support. Built on LangGraph for agent orchestration, with pgvector-backed retrieval over medical literature, and a policy layer that enforces guardrails on what the system can and cannot recommend.

## Motivation

Clinical LLM deployments fail in two ways: hallucination on medical facts, and uncontrolled scope (the model does things it shouldn't). This project treats both as engineering problems, not prompting problems.

## Architecture

```
User query
  → Intent classifier (LangGraph node)
  → Retrieval agent (pgvector similarity search)
  → Synthesis agent (GPT-4 with retrieved context)
  → Policy gate (rule-based + classifier)
  → Response
  → Audit log (PostgreSQL)
```

The policy gate runs after synthesis and before delivery. It checks the response against a set of constraints — no specific dosage recommendations, no diagnoses — and either passes, flags for review, or blocks.

## Status

Retrieval and synthesis pipeline complete. Policy gate in active development. Evaluating RAGAS metrics for retrieval quality baseline.
