
# CoinsLive Coaches — Playwright Test Automation

A browser automation project built using **Playwright and JavaScript** to validate selected user journeys, public website behaviour, and Coaches Admin modules of the CoinsLive platform.

The project combines automated UI validation, authenticated route testing, and structured test coverage to identify usability and functional issues.

## Project Overview

This repository contains automated test cases for:

- Public website smoke testing
- Coaches Admin route validation
- Admin dashboard and sidebar modules
- UI visibility and interaction checks
- Authenticated browser testing

The tests are organized by application area to make them easier to maintain, execute, and extend.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Test implementation |
| Node.js | Runtime environment |
| Playwright | Browser automation and testing |
| Chromium | Browser used for the verified test execution |
| Git | Version control |
| GitHub | Source code management |

## Project Structure

```text
playwright-practise/
│
├── tests/
│   ├── coinslive.spec.js          # Public website smoke tests
│   ├── admin.spec.js              # Admin route validation
│   └── admin-sidebar.spec.js      # Admin sidebar module tests
│
├── playwright/
│   └── .auth/
│       └── admin.json             # Local authentication state
│
├── test-results/                  # Generated test artifacts
├── playwright-report/              # HTML test report
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

**Security note:** The `playwright/.auth/` directory contains local authentication state and must remain excluded from Git. Never commit passwords, session files, access tokens, or other sensitive credentials.

## Test Coverage

The current automated suite contains **20 test cases** across three test files.

| Test Suite | Test IDs | Test Cases |
|---|---|---:|
| Public Website Tests | Existing public smoke tests | 6 |
| Coaches Admin Route Tests | ADM-001 to ADM-002 | 2 |
| Admin Sidebar Tests | ADM-008 to ADM-019 | 12 |
| **Total** | | **20** |

### 1. Public Website Tests

**File:** `tests/coinslive.spec.js`

Contains six smoke tests covering selected public-facing website behaviour.

### 2. Coaches Admin Route Tests

**File:** `tests/admin.spec.js`

Contains two authenticated route checks for the Coaches Admin area.

### 3. Coaches Admin Sidebar Tests

**File:** `tests/admin-sidebar.spec.js`

The following Admin modules are covered:

| Test ID | Module | Validation |
|---|---|---|
| ADM-008 | Home Dashboard | Dashboard visibility and no-workspace state |
| ADM-009 | Landing | Landing page availability |
| ADM-010 | SEO | SEO page and workspace setup access |
| ADM-011 | Courses | Workspace-required state |
| ADM-012 | Workshops | Workshops section visibility |
| ADM-013 | Email Automations | Automation section and canvas visibility |
| ADM-014 | Email Templates | Workspace-required state |
| ADM-015 | Insights | Insights dashboard visibility |
| ADM-016 | Leads | Leads page and filter controls |
| ADM-017 | Workshop Insights | Workshop Insights page visibility |
| ADM-018 | Broadcast | Broadcast section visibility |
| ADM-019 | New Chat | Chat interface and composer state |

The tests validate the specific UI conditions and behaviours defined in their assertions. A passing test does not establish that every feature on a page is fully functional.

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

Verify your installations:

```bash
node --version
npm --version
git --version
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/OmsinghGit/coinslive-coaches-playwright-tests.git
```

### 2. Navigate to the project

```bash
cd coinslive-coaches-playwright-tests
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

## Authentication Setup

The Admin test suite requires an authenticated browser session.

Authentication state is stored locally and excluded from source control.

### Generate authentication state

Run:

```bash
New-Item -ItemType Directory -Force playwright/.auth
```

Then start Playwright Codegen:

```bash
npx playwright codegen --save-storage=playwright/.auth/admin.json https://coinslive-coaches-mvp.vercel.app/admin
```

Sign in using an authorized test account in the opened browser window. Close the browser after authentication so the storage state can be saved.

Verify the generated file:

```powershell
Test-Path playwright/.auth/admin.json
```

Expected output:

```text
True
```

**Important:** Authentication sessions may expire. Generate a fresh session when required. Never share or commit the generated authentication file.

## Running the Tests

### Run the complete test suite

```bash
npm test
```

### Run tests in Chromium

```bash
npm run test:chromium
```

### Run Admin route tests only

```bash
npm run test:admin:routes
```

### Run Admin sidebar tests only

```bash
npm run test:admin:sidebar
```

### Open the HTML test report

```bash
npm run test:report
```

## Available npm Scripts

| Script | Description |
|---|---|
| `npm test` | Executes the configured Playwright test suite |
| `npm run test:chromium` | Runs all tests in Chromium with one worker |
| `npm run test:admin:routes` | Executes Admin route tests in Chromium |
| `npm run test:admin:sidebar` | Executes Admin sidebar tests in Chromium |
| `npm run test:report` | Opens the generated Playwright HTML report |

## Test Execution Results

**Latest verified local Chromium execution:**

| Metric | Result |
|---|---:|
| Total Tests | 20 |
| Passed | 20 |
| Failed | 0 |
| Flaky | 0 |
| Skipped | 0 |

<badge color="success">20 / 20 Passed</badge>

The verified execution included:

- 6 Public Website tests
- 2 Coaches Admin route tests
- 12 Admin sidebar tests

**Execution environment:** Local machine, Chromium browser.

This result represents the recorded Chromium test run. Firefox, WebKit, and CI execution should be verified separately before claiming cross-browser or CI coverage.

## Testing Limitations

The following areas require additional validation:

- Workspace-dependent features could not be fully tested because a workspace was not created during the review.
- New Chat AI response generation was not tested because an AI provider was not configured.
- Leads filter behaviour requires further verification with suitable lead data.
- Additional browser testing is needed before making cross-browser compatibility claims.

These are testing limitations, not confirmed application defects.

## Test Automation Practices

- Tests are organized into separate specification files by application area.
- Authenticated tests use Playwright storage state.
- Sensitive authentication data is excluded from version control.
- Test IDs support traceability between automated tests and QA documentation.
- Assertions validate observable UI states and interactions.
- Inconclusive behaviour is documented separately instead of being reported as a confirmed defect.

## Future Improvements

- Expand functional test coverage for workspace-dependent workflows.
- Add more interaction and form-validation scenarios.
- Automate additional end-to-end Admin workflows.
- Integrate test execution into a CI/CD pipeline.
- Extend and verify browser coverage across Chromium, Firefox, and WebKit.

## Disclaimer

This project represents focused browser automation and QA validation of selected CoinsLive Coaches application areas. Test results are specific to the application state, test account, browser, and execution environment used during testing.

---

**Maintained by:** Om Singh  
**Repository:** [CoinsLive Coaches – Playwright Test Automation](https://github.com/OmsinghGit/coinslive-coaches-playwright-tests)
