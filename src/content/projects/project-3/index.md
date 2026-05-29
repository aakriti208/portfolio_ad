---
title: "PayShare"
summary: "Expense splitting and shared finance tracker with real-time sync and debt reminders"
date: "Dec 2022"
draft: false
tags:
  - React
  - Redux
  - TypeScript
  - Node.js
  - Express
  - MySQL
  - Ant Design
repoUrl: https://github.com/aakriti208/payshare
context: "[CONTEXT — e.g. 'Personal finance tool for groups: roommates, travel companions, event organizers']"
problem: "[PROBLEM_STATEMENT — e.g. 'Existing expense splitters (Splitwise etc.) lacked real-time sync and required manual reconciliation. Groups needed a lightweight, self-hostable alternative with automated reminders...']"
architecture: |
  React + Redux (Frontend)
          ↓  ↑
  REST API (Express)
      ↓           ↓
  Auth (JWT)   Validation MW
      ↓
  Service Layer
    ↓         ↓           ↓
  Groups  Expenses   Reminders
    └──────────────────────┘
              ↓
         MySQL (ORM)
              ↓
       [Cron job → Email/SMS reminders]
challenges:
  - "[CHALLENGE_1 — e.g. 'Distributed transaction handling when a single expense touches multiple user balances; solved with DB transactions and rollback on partial failure']"
  - "[CHALLENGE_2 — e.g. 'Redux state synchronisation across tabs got stale; added a polling mechanism + localStorage event listener to re-hydrate store']"
  - "[CHALLENGE_3 — e.g. 'Debt simplification algorithm (minimising transactions in a group) is NP-hard at scale; approximated with a greedy creditor-debtor matching approach']"
metrics:
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
  - label: "[METRIC_LABEL]"
    value: "[VALUE]"
---

## Architecture Narrative

[ARCHITECTURE_DESCRIPTION — describe the data flow: how an expense created by one user propagates through the system to update balances for all group members.]

[Note any design decisions around the debt simplification algorithm or reminder system here.]
