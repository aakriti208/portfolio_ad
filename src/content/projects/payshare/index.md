---
title: "PayShare"
description: "Expense splitting and shared finance tracker with real-time sync and debt reminders"
status: "Paused"
stack:
  - React
  - Redux
  - TypeScript
  - Node.js
  - Express
  - MySQL
start_date: 2022-12-01
github: "https://github.com/aakriti208/payshare"
---

A personal finance tool for splitting shared expenses among groups — roommates, travel companions, friend groups. Tracks who owes what, simplifies debts, and sends reminders.

## Status

Paused. Core expense tracking and debt simplification work. Notification system and mobile-responsive polish are incomplete.

## Design decisions

- Redux for expense state — the transaction log is append-only, which maps cleanly to a Redux store
- Debt simplification uses a greedy algorithm to minimize the number of transactions needed to settle a group
- MySQL with a transactions table that tracks payer, amount, and split shares per participant
