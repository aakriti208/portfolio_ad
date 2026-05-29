---
title: "CPTPro"
summary: "Image processing tool that extracts facial features to generate personalized color palettes using color harmony theory"
date: "2024"
draft: false
tags:
  - Python
  - OpenCV
  - Dlib
  - Flask
  - TensorFlow
  - Matplotlib
repoUrl: https://github.com/shassshank/CPTpro
context: "[CONTEXT — what problem space this sits in, e.g. 'computer vision tool for personal styling']"
problem: "[PROBLEM_STATEMENT — why this was built, what was broken or missing. E.g. 'Existing color analysis tools required expensive in-person consultations or gave generic, one-size-fits-all advice...']"
architecture: |
  User Upload → Resize/Normalise → Dlib Landmark Detection
                                  ↓
                          [68 facial keypoints]
                                  ↓
              ┌────────────────┬──────────────────┐
              ↓                ↓                  ↓
        Skin Sampling    Eye Region Crop    Hair Region Mask
              ↓                ↓                  ↓
        KMeans Cluster    TF Classifier      KMeans Cluster
              ↓                ↓                  ↓
          Skin Tones       Eye Color           Hair Color
              └────────────────┴──────────────────┘
                                  ↓
                      Color Harmony Engine
                                  ↓
                      Flask API → JSON Palette → UI
challenges:
  - "[CHALLENGE_1 — e.g. 'Dlib landmark detection failed on low-contrast images; solved by adding CLAHE preprocessing before landmark pass']"
  - "[CHALLENGE_2 — e.g. 'KMeans produced unstable clusters on diverse skin tones; addressed by working in CIELAB colour space instead of RGB']"
  - "[CHALLENGE_3 — e.g. 'Flask response times spiked under concurrent requests; added result caching with a SHA256 hash of the image bytes']"
metrics:
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
---

## Architecture Narrative

[ARCHITECTURE_DESCRIPTION — 2-4 sentences describing the data flow shown above. What enters the system, how it's transformed, what comes out.]

[Add any technical notes about specific design choices here.]
