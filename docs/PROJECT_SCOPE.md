# WebAbility — Project Scope

## Product
WebAbility is an open-source, journey-first accessibility testing tool. It runs browser journeys and connects automated accessibility findings to the exact task step where they appear.

## Problem
Page-level audits can list violations, but developers still need to connect issues to tasks, reproduce them, and prioritize fixes. WebAbility adds journey context: link findings to a named task and the step where they were observed.

## Intended users
- Frontend and full-stack developers
- QA engineers and test automation contributors
- Teams needing repeatable accessibility checks in development and CI
- Accessibility practitioners needing reproducible technical evidence

## First use cases
1. Check a form journey and associate findings with each step.
2. Scan a product-discovery and checkout journey.
3. Record findings with the journey step and URL.
4. Compare reports across runs after the report format stabilizes.

## Initial scope
- Typed, validated journey definitions
- Local browser runner using Playwright
- axe-core integration behind a scanner adapter
- Normalized violations and incomplete/manual-review results
- JSON output and readable console summary
- Unit and integration tests using local fixtures
- Clear safety and privacy boundaries

## Out of scope initially
Automated WCAG/legal certification, replacing human or screen-reader testing, auto-editing source code, remote scanning, production credentials or real transactions, AI fixes, hosted dashboards, and historical analytics before the core runner is reliable.

## First milestone success criteria
A sample journey validates; a local fixture runs; a known issue is associated with a journey step; runner failures are distinguishable from completed scans; tests cover validation and execution; docs state limitations.

## Current status
The first local CLI foundation is implemented on the development branch: validated JSON journeys, Playwright Chromium execution, axe-core checks, step-level JSON reporting, a local checkout fixture, schema tests, and a CI workflow. Runner integration tests, report stability tests, and expanded keyboard assertions remain in progress. The Next.js site remains the project landing page.

## Terms
- **Journey:** named sequence of browser actions and expected outcomes.
- **Step:** action or checkpoint in a journey.
- **Finding:** accessibility-engine result associated with a journey step.
- **Manual review:** incomplete automated result that requires human evaluation.
- **Run:** one execution of a journey against a target.
