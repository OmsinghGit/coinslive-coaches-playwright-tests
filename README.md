# CoinsLive Coaches MVP — Playwright Automation

## Overview
This project contains Playwright smoke tests for the CoinsLive Coaches MVP website. The tests verify key public user flows and basic UI behaviour using Chromium.

**Application URL:** https://coinslive-coaches-mvp.vercel.app/

## Tech Stack
- JavaScript
- Playwright
- Node.js
- Chromium

## Automated Smoke Tests

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| SMK-001 | Homepage loads | Main heading and Browse courses link are visible |
| SMK-002 | Browse courses navigation | Page navigates to the Courses section |
| SMK-003 | View course details | Course details, heading and Enroll text are visible |
| SMK-004 | Enroll redirects to login | Login page and Email/Password fields are visible |
| SMK-005 | Workshops page | Workshops, Upcoming and Archived headings are visible |

## Setup Instructions

1. Install Node.js.
2. Clone or download this repository.
3. Open the project directory in a terminal.
4. Install dependencies:

```bash
npm install
```

5. Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

## Run Tests

Run all five Coaches MVP smoke tests:

```bash
npx playwright test tests/coinslive.spec.js --project=chromium --grep "Coaches MVP|Browse courses|View course|Enroll redirects|Workshops page"
```

Open the HTML report:

```bash
npx playwright show-report
```

## Latest Verified Result

- **5 Coaches MVP smoke tests passed**
- Browser: Chromium
- Combined execution time: 11.2 seconds
- Verification date: 28 October 2026

## Notes
- Tests cover basic public-page navigation and visibility checks.
- Login credentials and account creation are not used.
- The Day 1 CoinsLive Explore test is separate from the five Coaches MVP smoke tests.
- Test results may vary depending on network conditions and website availability.
 