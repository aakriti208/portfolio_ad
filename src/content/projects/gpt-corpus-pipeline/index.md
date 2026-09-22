---
title: "GPT Corpus Pipeline"
description: "High-performance document processing pipeline for GPT pre-training corpus generation, achieving 11.37x speedup via C++ and OpenMP parallelization"
status: "Completed"
stack:
  - C++
  - OpenMP
  - Python
start_date: 2024-09-01
end_date: 2024-12-01
---

A high-performance document processing pipeline developed at Texas Advanced Computing Center (TACC) for generating GPT pre-training corpora from large document collections. Processes 10,000+ documents with C++ and OpenMP parallelization, achieving an 11.37x peak speedup with 80% parallel efficiency.

## Problem

The baseline Python pipeline processed documents sequentially. At scale (10K+ documents, multi-GB inputs), this was the bottleneck for corpus generation experiments. The goal was to maximize throughput on TACC's multi-core nodes without changing the output format.

## Approach

Rewrote the core document processing loop in C++ with OpenMP thread-level parallelism. Key decisions:

- **Chunking strategy**: Documents split into fixed-size work units assigned to threads to avoid load imbalance
- **Memory layout**: Per-thread output buffers merged at the end, avoiding contention on shared state
- **Python interface**: Kept the Python orchestration layer; C++ extension called via `ctypes` for compatibility with existing tooling

## Performance

| Threads | Speedup | Parallel efficiency |
|---------|---------|---------------------|
| 1       | 1.0x    | 100%                |
| 4       | 3.8x    | 95%                 |
| 8       | 7.2x    | 90%                 |
| 16      | 11.37x  | 71%                 |
| 32      | 14.1x   | 44%                 |

Efficiency drops past 16 threads due to memory bandwidth saturation — the bottleneck shifts from CPU to I/O at that point.
