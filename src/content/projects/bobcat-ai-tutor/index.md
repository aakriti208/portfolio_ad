---
title: "Bobcat AI Tutor"
description: "RAG-based AI tutoring system integrated with Texas State course management APIs, serving grounded 24/7 student support"
status: "Completed"
stack:
  - Python
  - ChromaDB
  - FastAPI
  - React
start_date: 2024-08-01
end_date: 2025-05-01
related_notes:
  - "rag-metadata-filtering"
---

A retrieval-augmented AI tutoring system built during my graduate research assistantship at Texas State University. Integrates with the course management system APIs to ground responses in actual course content — syllabi, lecture notes, assignments — reducing hallucination and instructor workload by 50%.

## The problem with generic LLM tutors

Off-the-shelf LLM assistants don't know anything about the specific course. Students get generic answers that may contradict what their instructor actually expects. The fix is retrieval: every response is grounded in the actual course materials for that student's specific section.

## Pipeline

1. Course materials ingested from Canvas API (PDFs, pages, assignments)
2. Chunked by section with metadata tags (course, week, content type)
3. Embedded with `text-embedding-3-small` and stored in ChromaDB per course
4. At query time: retrieve top-k chunks for the student's course, pass to Claude for synthesis
5. Responses cite the source chunk so students can verify

## Outcome

Deployed to graduate-level CS and data science courses. Reduced TA office hour load by 50% in pilot semester. Students reported higher confidence on assignments.
