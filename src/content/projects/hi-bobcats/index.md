---
title: "Hi Bobcats"
description: "Full-stack campus activity platform for student registration, roommate search, meal plans, and bus tickets"
status: "Completed"
stack:
  - JavaScript
  - Node.js
  - MySQL
  - EJS
start_date: 2024-05-01
github: "https://github.com/gadhikaritxstate/student-activity-webapp"
---

A unified campus services platform for Texas State University students. Consolidates student registration, roommate matching, meal plan management, and bus ticket purchasing into a single Express.js application backed by MySQL.

## Motivation

Texas State students had to navigate four separate portals to manage basic campus life tasks. Hi Bobcats collapses that into one authenticated session.

## Architecture

Standard MVC pattern with Express routing, EJS templating, and a MySQL database normalized to 3NF. Session-based auth with bcrypt password hashing. Forms validate server-side before writing to the database.

## Features

- Student registration and profile management
- Roommate matching with preference filtering
- Meal plan selection and balance tracking
- Campus bus ticket purchasing and digital pass display
