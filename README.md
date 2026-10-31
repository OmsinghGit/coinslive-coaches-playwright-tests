# CoinsLive Coaches — Playwright Test Automation

## Overview

This repository contains automated UI and functional tests for the CoinsLive Coaches platform using Playwright.

The test suite covers public website navigation, admin route access, dashboard modules and basic UI interactions.

## Tech Stack

- JavaScript
- Node.js
- Playwright
- Chromium
- Git & GitHub

## Project Structure

```text
playwright-practise/
│
├── tests/
│   ├── coinslive.spec.js
│   ├── admin.spec.js
│   └── admin-sidebar.spec.js
│
├── playwright/
│   └── .auth/                 # Local authentication state (ignored)
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md