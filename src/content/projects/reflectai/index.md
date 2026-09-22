---
title: "ReflectAI"
description: "AI-powered journaling mobile app with real-time emotion detection via fine-tuned BERT sentiment analysis"
status: "Completed"
stack:
  - React Native
  - Expo
  - Supabase
  - FastAPI
  - BERT
  - Hugging Face
start_date: 2025-05-05
github: "https://github.com/aakriti208/JournalApp"
related_notes:
  - "rag-metadata-filtering"
---

A production journaling app for iOS and Android built with React Native and Expo. A custom fine-tuned BERT sentiment model — published to Hugging Face Hub — is served via FastAPI to detect emotional patterns in journal entries in real time. User data and insights are persisted in Supabase.

## ML pipeline

Fine-tuned `distilbert-base-uncased` on a combined dataset of GoEmotions and a curated journaling corpus. The model outputs 8 emotion categories with confidence scores. Published to Hugging Face Hub for versioned, reproducible deployments.

## Architecture

```
React Native app
  → FastAPI (sentiment endpoint)
      → Hugging Face model inference
  → Supabase (entries, user profiles, emotion history)
```

The app sends journal text to the FastAPI endpoint on save. The response (emotion labels + scores) is stored alongside the entry in Supabase, powering the weekly emotion trend charts.

## What I learned

Fine-tuning on domain-specific text matters more than model size. A fine-tuned DistilBERT significantly outperformed zero-shot GPT-3.5 on journal-style emotional nuance while being 10x cheaper to serve.
