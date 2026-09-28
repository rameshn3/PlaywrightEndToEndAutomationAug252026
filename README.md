# Playwright End-to-End Automation

TypeScript test automation using [Playwright Test](https://playwright.dev/docs/intro). This repository contains UI automation for SauceDemo, browser-interaction exercises against The Internet (HerokuApp), and OrangeHRM workflows, along with a configured Booking API test command.

Repository: [PlaywrightEndToEndAutomationAug252026](https://github.com/rameshn3/PlaywrightEndToEndAutomationAug252026.git)

## Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment configuration](#environment-configuration)
- [Run tests](#run-tests)
- [Test coverage](#test-coverage)
- [Framework structure](#framework-structure)
- [Test data](#test-data)
- [Reports](#reports)
- [CI](#ci)
- [AI-assisted OrangeHRM workflow](#ai-assisted-orangehrm-workflow)
- [Troubleshooting](#troubleshooting)

## Overview

The project practices several complementary Playwright approaches:

- **SauceDemo**: manual page-object-model (POM) UI tests for authentication, product listing, cart actions, and checkout. Checkout examples include JSON- and CSV-driven test data.
- **HerokuApp / The Internet**: browser interaction tests for file upload and download, keyboard input, JavaScript alerts, frames and iframes, multiple windows, and drag and drop.
- **OrangeHRM**: authenticated workflow tests using an OrangeHRM-specific fixture and page objects for login, dashboard, Admin, PIM, Leave, Performance, and Directory.
- **Booking API**: an `npm run test:api` command is configured for tests under `tests/booking`.

The same Playwright configuration defines Chromium, Firefox, WebKit, Mobile Chrome, Microsoft Edge, and Google Chrome projects. The convenience scripts for the applications below run Chromium by default.

## Prerequisites

- Node.js 22 (the version used by the GitHub Actions workflow)
- npm
- A supported browser installed through Playwright
- Network access to the public demo applications when running their tests

## Setup

Clone the repository and install its locked dependencies:

```bash
git clone https://github.com/rameshn3/PlaywrightEndToEndAutomationAug252026.git
cd PlaywrightEndToEndAutomationAug252026
npm ci
npx playwright install
```

On Linux CI machines, install browser operating-system dependencies as well:

```bash
npx playwright install --with-deps
```

## Environment configuration

`playwright.config.ts` reads `ENV_ID` (default: `dev`) and calls `config/envLoader.ts`. The loader searches `env/.env.<name>` and then `.env.<name>` in the project root. Playwright's `baseURL` is set from `BASE_URL`, falling back to `API_BASE_URL`.

The repository currently has these environment files:

| File | Purpose | Main values |
| --- | --- | --- |
| `env/.env.dev` | SauceDemo | `BASE_URL`, SauceDemo user names, and `PASSWORD` |
| `env/.env.qa` | HerokuApp and Booking API | `BASE_URL`, `API_BASE_URL`, and API credentials |
| `env/.env.uat` | OrangeHRM demo | `BASE_URL`, `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD` |

OrangeHRM page fixtures use `ORANGEHRM_BASE_URL`, `ORANGEHRM_USERNAME`, and `ORANGEHRM_PASSWORD`, with the public demo URL and demo credentials as fallbacks. The `BASE_URL` in `.env.uat` is the login URL; `ORANGEHRM_BASE_URL` is the site root used to construct the login path.

The OrangeHRM credentials in this repository are public demo credentials, not private credentials. Do not put personal or production secrets in tracked environment files. For private credentials, use untracked local environment files or CI secrets, and make sure the required variable names are supplied to the test process.

Do not change `.env.dev` to switch the OrangeHRM base URL; run OrangeHRM with `ENV_ID=uat` instead.

## Run tests

### Application scripts

```bash
npm run test:ui          # SauceDemo UI tests, Chromium, ENV_ID=dev
npm run test:heroku      # HerokuApp tests, Chromium, ENV_ID=qa
npm run test:orangehrm   # OrangeHRM tests, Chromium, ENV_ID=uat
npm run test:api         # configured Booking API test path, Chromium, ENV_ID=qa
```

`test:all` currently runs `test:ui`, `test:api`, and `test:heroku`; it does **not** include OrangeHRM. Run `npm run test:orangehrm` separately when OrangeHRM coverage is required.

### Direct Playwright commands

Run a specific suite or spec directly:

```bash
npx playwright test tests/orangehrm --project=chromium
npx playwright test tests/orangehrm/directory-search.spec.ts --project=chromium
npx playwright test tests/herokuapp --project=chromium
npx playwright test tests/saucedemo --project=chromium
```

When bypassing the npm scripts, set the environment explicitly. On Windows PowerShell:

```powershell
$env:ENV_ID = 'uat'
npx playwright test tests/orangehrm --project=chromium
```

On macOS or Linux:

```bash
ENV_ID=uat npx playwright test tests/orangehrm --project=chromium
```

Run a project other than Chromium by replacing `--project=chromium` with a configured project name, for example `--project=firefox` or `--project="Mobile Chrome"`. The browser must be installed first.

Useful general commands:

```bash
npx playwright test --list
npx playwright test tests/orangehrm --project=chromium --headed
npx playwright test tests/orangehrm --project=chromium --debug
```

The package also provides `npm run test:headed` and `npm run test:debug` for general headed and debug runs.

## Test coverage

### SauceDemo

Specs are in `tests/saucedemo/` and use `fixtures/appFixtures.ts` with page objects from `pages/`.

- Login success, locked-out user, and invalid credentials
- Product page and inventory checks, adding/removing products, cart count, and price sorting
- Cart and checkout completion/cancel paths
- Checkout data supplied from JSON and CSV files

### HerokuApp / The Internet

Specs are in `tests/herokuapp/` and use the shared `HerokuAppPage` page object.

- Single and multiple file uploads and file download
- JavaScript alert, confirm, and prompt handling
- Nested frames and iframe content
- Multiple browser windows
- Drag and drop using locator and mouse actions
- Keyboard input and key combinations

### OrangeHRM

Specs are in `tests/orangehrm/` and use the OrangeHRM fixtures and page objects in `tests/orangehrm/orangehrmFixtures.ts`.

- Valid demo login
- Dashboard widgets and navigation between Dashboard and PIM
- Admin system-user search and reset
- PIM blank Add Employee required-field validation and cancel
- PIM employee search using an employee found in the live list, then reset
- Leave List search and Apply Leave availability checks, without submitting a request
- Performance review search and reset
- Directory search using a current directory employee and reset

The detailed OrangeHRM plan is `specs/orangehrm-login-test-plan.md`. It includes additional proposed scenarios (for example Recruitment, Time, Claim, Buzz, Maintenance, and logout); those plan entries should not be considered implemented tests unless a corresponding spec exists under `tests/orangehrm/`.

### Booking API

The package script targets `tests/booking` and uses the QA environment. Confirm that the folder and test files are present in the checkout before running it; Playwright reports an error if the configured path has no tests.

## Framework structure

```text
config/                 Environment file loader
env/                    Local environment configuration files
fixtures/               Shared SauceDemo and HerokuApp Playwright fixtures
pages/                  Base page and application page objects
specs/                  Test plans and planning notes
testdata/               JSON, CSV, and file upload/download data
tests/
  saucedemo/            SauceDemo UI specs
  herokuapp/            Browser interaction specs
  orangehrm/            OrangeHRM specs and application fixtures/page objects
utils/                  Authentication and test-data helpers
playwright.config.ts    Playwright projects, reporters, and global defaults
```

`BasePage` wraps the Playwright `Page` and provides shared navigation. `fixtures/appFixtures.ts` extends Playwright Test with the SauceDemo and HerokuApp page objects. The OrangeHRM suite defines separate fixtures so its locators and authentication remain isolated from SauceDemo's existing `loginPage` fixture.

## Test data

- `testdata/checkoutData.json` and `testdata/datadrivenData.json`: JSON checkout data
- `testdata/checkoutData.csv` and `testdata/datadrivenCsvData.csv`: CSV checkout data
- `testdata/some-file.txt`: file download/upload sample
- `utils/dataReader.ts` and `utils/csvReader.ts`: data loading helpers

Some public demo applications reset or change records over time. OrangeHRM employee and directory tests should discover available records at runtime instead of assuming a particular demo record always exists.

## Reports

The Playwright configuration writes several report formats:

- HTML: `playwright-report/` (open `playwright-report/index.html`)
- JSON: `test-results.json`
- JUnit XML: `test-results.xml`
- Allure raw results: `allure-results/`

The HTML report can be opened with:

```bash
npx playwright show-report
```

Allure CLI commands are also available:

```bash
npm run allure:generate
npm run allure:open
npm run allure:serve
```

The Allure commands require the Allure CLI to be installed. GitHub Actions installs it globally in its jobs.

## CI

GitHub Actions is configured in `.github/workflows/playwright.yml` for pushes and pull requests to `main`. It runs SauceDemo UI, Booking API, and HerokuApp jobs, creates Allure reports, and publishes combined reports to GitHub Pages. OrangeHRM is not currently included in those workflow jobs.

`Jenkinsfile` supports `ui`, `api`, `heroku`, and `all` module choices, installs npm dependencies and Playwright browsers, and archives Playwright/Allure reports. Its current `all` selection delegates to `test:all`, so it also does not include OrangeHRM.

## AI-assisted OrangeHRM workflow

OrangeHRM was used as the example application for AI-assisted test authoring with Playwright MCP and Playwright CLI:

1. Inspect the public demo login and authenticated modules in a browser.
2. Draft and maintain workflow scenarios in `specs/orangehrm-login-test-plan.md`.
3. Generate and refine Playwright specs under `tests/orangehrm/` using the existing fixture and page-object conventions.
4. Execute the generated specs with Playwright Test, inspect failures, and update locators or data handling to reflect the live application.

MCP and CLI are development-time authoring/inspection tools; the test suite itself runs with `@playwright/test` and does not require an AI service at runtime. The available OrangeHRM suite command is `npm run test:orangehrm`.

## Troubleshooting

- **Environment file not found:** set `ENV_ID` to `dev`, `qa`, or `uat`, or add the corresponding `.env.<name>` file in `env/`.
- **Browser executable missing:** run `npx playwright install` (or `npx playwright install --with-deps` on Linux CI).
- **OrangeHRM uses SauceDemo URL:** run through `npm run test:orangehrm` or set `ENV_ID=uat` when invoking Playwright directly.
- **A demo record is missing:** demo data is mutable; prefer searching for a currently visible record and selecting the autocomplete suggestion.
- **Report files are stale:** rerun the relevant test command to regenerate reports for that run.