# CoinsLive Playwright Test Automation

A JavaScript and Playwright project for automating selected CoinsLive public-site, Adhyayan, and Coaches Admin browser tests.

The suite covers public-page smoke checks, Adhyayan room navigation and responsive layout, Admin routes, and selected Admin sidebar modules. Tests run against deployed websites and depend on their current content and availability.

## Project Overview

| Area | Coverage |
|---|---|
| Public website | Explore, Coaches MVP homepage, courses, enrollment sign-in, and workshops |
| Adhyayan | Room details, join and host sign-in redirects, host profile navigation, browser-back navigation, and horizontal overflow at selected viewport sizes |
| Coaches Admin | Unauthenticated route behavior and selected dashboard/sidebar modules |

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Test implementation |
| Node.js and npm | Runtime and dependency management |
| Playwright Test | Browser automation, assertions, and reporting |
| Chromium, Firefox, WebKit | Configured browser projects |
| Git | Version control |

## Project Structure

```text
playwright-practise/
├── tests/
│   ├── admin-sidebar.spec.js
│   ├── admin.spec.js
│   ├── adhyayan-navigation.spec.js
│   ├── adhyayan-responsive.spec.js
│   └── coinslive.spec.js
├── playwright/
│   └── .auth/
│       └── admin.json            # Local authentication state; do not commit
├── test-results/                 # Generated test output and artifacts
├── playwright-report/            # Generated HTML report
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

The `.gitignore` excludes `playwright/.auth/`, generated reports, test results, and environment files. Never commit or share authentication state, passwords, tokens, or other credentials.

## Test Coverage

The repository currently defines **33 test cases** across five spec files. The Playwright configuration has three browser projects, so an unfiltered full run schedules each test in Chromium, Firefox, and WebKit.

| Test suite | File | Test cases |
|---|---|---:|
| Public website | `tests/coinslive.spec.js` | 6 |
| Coaches Admin routes | `tests/admin.spec.js` | 2 |
| Coaches Admin sidebar | `tests/admin-sidebar.spec.js` | 13 |
| Adhyayan navigation | `tests/adhyayan-navigation.spec.js` | 7 |
| Adhyayan responsive layout | `tests/adhyayan-responsive.spec.js` | 5 |
| **Total** | | **33** |

### Public Website Tests

**File:** `tests/coinslive.spec.js`

| Coverage |
|---|
| Explore page heading |
| Coaches MVP homepage heading and course link |
| Browse courses navigation to the Courses section |
| Course details page and enrollment link |
| Enrollment redirect to sign-in |
| Workshops page Upcoming and Archived sections |

### Coaches Admin Route Tests

**File:** `tests/admin.spec.js`

| Test ID | Coverage |
|---|---|
| ADM-001 | `/admin` returns an HTTP response below status 500 and renders a non-empty body |
| ADM-002 | Unauthenticated `/admin` access presents an authentication gate rather than Admin content |

The base URL can be overridden with the `COACHES_BASE_URL` environment variable. Otherwise, tests use `https://coinslive-coaches-mvp.vercel.app`.

### Coaches Admin Sidebar Tests

**File:** `tests/admin-sidebar.spec.js`

These tests use the saved `playwright/.auth/admin.json` storage state.

| Test ID | Module or behavior |
|---|---|
| ADM-008 | Admin dashboard and workspace setup link |
| ADM-009 | Landing page availability |
| ADM-010 | SEO setup navigation to workspace setup |
| ADM-011 | Courses module empty/workspace-required state |
| ADM-012 | Workshops module setup state |
| ADM-013 | Email Automations canvas availability |
| ADM-014 | Email Templates workspace-required state |
| ADM-015 | Insights dashboard state |
| ADM-016 | Leads heading and filter labels |
| ADM-017 | Workshop Insights navigation |
| ADM-018 | Broadcast navigation and setup state |
| ADM-019 | New Chat interface and disabled composer state |
| ADM-020 | New Chat and Custom Keys navigation |

These checks cover the assertions in the tests; they do not establish that every feature in each module is fully functional.

### Adhyayan Navigation Tests

**File:** `tests/adhyayan-navigation.spec.js`

| Test ID | Coverage |
|---|---|
| ADH-NAV-004 | Room join action points to sign-in with the room destination |
| ADH-NAV-005 | Room title, status, topic, learning goal, and description are visible |
| ADH-NAV-006 | Host profile link has the expected destination |
| ADH-NAV-007 | Hosting a study session redirects a signed-out visitor to sign-in with `/adhyayan/new` as the destination |
| ADH-NAV-008 | Host profile link opens the expected profile route |
| ADH-NAV-009 | Joining redirects to sign-in and preserves the room destination |
| ADH-NAV-010 | Browser back returns from the room to the Adhyayan listing |

### Adhyayan Responsive Tests

**File:** `tests/adhyayan-responsive.spec.js`

The listing page is checked for horizontal overflow at five viewport sizes:

| Viewport | Width | Height |
|---|---:|---:|
| Mobile-360 | 360 | 800 |
| Mobile-390 | 390 | 844 |
| Tablet-768 | 768 | 1024 |
| Laptop-1366 | 1366 | 768 |
| Desktop-1920 | 1920 | 1080 |

These tests check document width against viewport width and save screenshots under `test-results/`. They do not constitute a complete visual or accessibility audit.

## Prerequisites

Install:

- Node.js
- npm
- Git

Check the installed versions:

```bash
node --version
npm --version
git --version
```

## Installation and Setup

Clone the repository and enter its directory:

```bash
git clone https://github.com/OmsinghGit/coinslive-coaches-playwright-tests.git
cd coinslive-coaches-playwright-tests
```

Install project dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

To install only Chromium:

```bash
npx playwright install chromium
```

## Authentication Setup

The Admin sidebar tests require an authorized browser session saved at `playwright/.auth/admin.json`. This file is ignored by Git and must be generated locally.

In PowerShell, create the directory if needed:

```powershell
New-Item -ItemType Directory -Force playwright/.auth
```

Start Playwright Codegen:

```powershell
npx playwright codegen --save-storage=playwright/.auth/admin.json https://coinslive-coaches-mvp.vercel.app/admin
```

Sign in with an authorized test account in the opened browser, then close the browser so Playwright can save the storage state.

Check that the file exists:

```powershell
Test-Path playwright/.auth/admin.json
```

Expected output:

```text
True
```

Authentication sessions can expire. Generate a fresh state when required. Never commit, publish, or share the generated file.

## Running Tests

Run all test files in all configured browser projects:

```bash
npm test
```

Run all tests in Chromium with one worker:

```bash
npm run test:chromium
```

Run the Adhyayan navigation tests in Chromium:

```bash
npx playwright test tests/adhyayan-navigation.spec.js --project=chromium --workers=1
```

Run the Adhyayan responsive tests in Chromium:

```bash
npx playwright test tests/adhyayan-responsive.spec.js --project=chromium --workers=1
```

Run a specific test by title:

```bash
npx playwright test tests/adhyayan-navigation.spec.js --project=chromium --grep "ADH-NAV-009"
```

Run the Admin route tests in Chromium:

```bash
npm run test:admin:routes
```

Run the Admin sidebar tests in Chromium:

```bash
npm run test:admin:sidebar
```

Open the HTML report after a run:

```bash
npm run test:report
```

To set a different Coaches MVP base URL in PowerShell:

```powershell
$env:COACHES_BASE_URL = "https://your-coaches-test-environment"
npm run test:admin:routes
```

## Available npm Scripts

| Script | Description |
|---|---|
| `npm test` | Runs the configured Playwright suite |
| `npm run test:chromium` | Runs the suite in Chromium with one worker |
| `npm run test:admin:routes` | Runs `tests/admin.spec.js` in Chromium with one worker |
| `npm run test:admin:sidebar` | Runs `tests/admin-sidebar.spec.js` in Chromium with one worker |
| `npm run test:report` | Opens the generated Playwright HTML report |

## Playwright Configuration

The configuration in `playwright.config.js`:

- Uses `tests/` as the test directory.
- Enables fully parallel execution by default.
- Uses one worker in CI and allows two retries in CI.
- Uses the HTML reporter.
- Captures a trace on the first retry.
- Defines Chromium, Firefox, and WebKit browser projects.

Tests target live deployed websites. A run can therefore be affected by service availability, network conditions, authentication expiration, or changes to page content.

## Test Execution Results

**Current verification status:** Tests were not run while preparing this README. No pass, fail, flaky, or skipped result is claimed here.

| Metric | Result |
|---|---:|
| Test cases currently defined | 33 |
| Browser projects configured | 3 |
| Test executions in this documentation session | Not run |
| Passed / Failed / Flaky / Skipped | Not verified |

An unfiltered full run schedules 33 test cases in each of the three configured browser projects. CI retries may result in additional attempts. Run the tests and inspect the generated Playwright report for actual execution results.

## Testing Limitations

- Public-site and Adhyayan tests depend on live CoinsLive websites and current page content.
- Admin sidebar tests require a valid local authentication state.
- Admin module tests verify specific visible states and navigation; they do not verify every feature or backend operation.
- The Adhyayan responsive suite checks horizontal overflow at the listed viewport sizes only.
- Responsive screenshots use fixed filenames. Since browser projects can run in parallel, screenshots for the same viewport may be overwritten by another project.
- Cross-browser execution is configured, but compatibility should only be reported after the corresponding browser tests have actually run.

## Test Automation Practices

- Tests are grouped by application area in separate specification files.
- User-facing controls are located with Playwright role-based locators where practical.
- URL assertions parse paths and query parameters for redirect checks.
- Admin authentication state is local and excluded from version control.
- Test results should be reported from an actual Playwright run rather than inferred from the number of tests in the repository.

## Future Improvements

- Use isolated screenshot paths for each test and browser project.
- Add CI execution and retain its HTML report and traces as artifacts.
- Expand functional verification beyond visible states for workspace-dependent Admin modules.
- Add further responsive, accessibility, and error-state coverage.
- Record dated test-run results only after verifying the corresponding report.

## Disclaimer

This project provides focused browser automation for selected CoinsLive experiences. Results apply only to the tested application state, test account, browser, and execution environment. A passing test does not guarantee that all application features are defect-free.

---

**Maintained by:** Om Singh  
**Repository:** [CoinsLive Coaches – Playwright Test Automation](https://github.com/OmsinghGit/coinslive-coaches-playwright-tests)
