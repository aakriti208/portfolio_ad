---
title: "CPTPro"
description: "Image processing tool that extracts facial features to generate personalized color palettes using color harmony theory"
status: "Completed"
stack:
  - Python
  - OpenCV
  - Flask
  - TensorFlow
  - Matplotlib
start_date: 2024-01-20
github: "https://github.com/shassshank/CPTpro"
---

An AI color analysis system that uses Dlib landmark detection and KMeans clustering to extract skin tones, eye color, and hair color from uploaded photos. A color harmony engine then maps these values to a personalized palette using seasonal color theory.

## How it works

The pipeline takes an uploaded image, runs face detection, then extracts dominant colors from three regions — skin, eyes, and hair — using KMeans clustering on the RGB values. Those clusters are then matched against a seasonal color theory model (Spring, Summer, Autumn, Winter) to produce a curated palette recommendation.

## Technical details

- **Face detection**: Dlib 68-point landmark model localizes facial regions precisely
- **Color extraction**: KMeans (k=5) on each region's pixels; picks the most saturated non-background cluster
- **Harmony mapping**: Lab color space distance used to match extracted colors to seasonal palettes
- **Serving**: Flask REST API accepts base64-encoded images, returns JSON palette data
