---
title: "Hi Bobcats"
summary: "Full-stack campus activity platform for student registration, roommate search, meal plans, and bus tickets"
date: "May 2024"
draft: false
tags:
  - Javascript
  - SCSS
  - EJS
  - MySQL
  - Node.js
repoUrl: https://github.com/gadhikaritxstate/student-activity-webapp
context: "[CONTEXT — e.g. 'Student services consolidation platform for Texas State University']"
problem: "[PROBLEM_STATEMENT — e.g. 'TXST students navigated 5+ disconnected systems for basic campus services — separate portals for housing, dining, transit, and events with no single sign-on or unified interface...']"
architecture: |
  Browser Client (EJS Views)
          ↓  ↑
  Express.js Router
      ↓           ↓
  Auth MW      Static Assets
      ↓
  Controller Layer
    ↓       ↓        ↓         ↓
  Users  Rooms  MealPlans  BusTickets
    └───────────────────────────┘
                   ↓
           MySQL (single DB)
challenges:
  - "[CHALLENGE_1 — e.g. 'Session management across 4 independent feature modules required a shared middleware strategy to avoid duplicate auth checks']"
  - "[CHALLENGE_2 — e.g. 'Roommate matching algorithm needed to handle partial preference overlap; solved with a weighted scoring function over 6 preference fields']"
  - "[CHALLENGE_3 — e.g. 'EJS template rendering caused N+1 queries on the activity feed; resolved by batch-fetching related data in a single JOIN query']"
metrics:
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
---

## Architecture Narrative

[ARCHITECTURE_DESCRIPTION — 2-4 sentences on how the system is structured and why those choices were made.]

[Add any notes on database design, authentication approach, or deployment here.]
