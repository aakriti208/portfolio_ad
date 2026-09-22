---
title: "Transparent Politics"
description: "Civic engagement platform enabling users to explore Texas Congressional districts, candidate profiles, and legislative tracking via a RAG-powered search pipeline"
status: "Completed"
stack:
  - React
  - ChromaDB
  - FastAPI
  - Python
start_date: 2026-01-10
---

A data platform to inform citizens about incumbent representatives. Architected the core MVP enabling users to explore 38 Texas Congressional districts via interactive maps, candidate profiles, and legislative tracking across 100+ policy-categorized bills.

## RAG pipeline

Built an ETL pipeline to embed and index congressional bill data in ChromaDB for fast semantic search and real-time query capabilities. The pipeline:

1. Scrapes bill text and metadata from Congress.gov API
2. Chunks documents by section with overlapping context windows
3. Embeds using `text-embedding-ada-002` and stores in ChromaDB with metadata filters (district, party, topic)
4. FastAPI endpoint accepts natural language queries, retrieves top-k chunks, passes to GPT-4 for synthesis

## Filtering

Metadata filtering in ChromaDB lets users scope searches to specific districts or policy areas without semantic drift. A query like "education bills in District 21" retrieves only district-21-tagged education documents before embedding similarity is computed.
