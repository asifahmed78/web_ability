# WebAbility — Project Scope

## Product
WebAbility is an open-source accessibility-testing project focused on checking important website journeys and reporting accessibility findings at the steps where they matter.

## Problem
Page-level audits can list violations, but developers still need to connect issues to tasks, reproduce them, and prioritize fixes. WebAbility's intended differentiator is journey context: link findings to a named task and the step where they were observed.

## Intended users
- Frontend and full-stack developers
- QA engineers and test automation contributors
- Teams needing repeatable accessibility checks in development and CI
- Accessibility practitioners needing reproducible technical evidence

## First use cases
1. Check keyboard navigation through a multi-step form.
2. Scan pages in a product-discovery and checkout journey.
3. Record findings with the journey step and URL.
4. Compare reports across runs after the report format stabilizes.

## Initial scope
- Typed, validated journey definitions
- Browser runner and accessibility-engine adapter such as axe-core
- Normalized findings with rule ID, impact, URL, step, and element evidence
- JSON output and readable console summary
- Unit/integration tests using local fixtures
- Clear safety and privacy boundaries

## Out of scope initially
Automated WCAG/legal certification, replacing human or screen-reader testing, auto-editing source code, unsafe arbitrary remote scanning, production credentials or real transactions, AI fixes, hosted dashboards, and historical analytics before the core runner is reliable.

## First milestone success criteria
A sample journey validates; a local fixture runs repeatably; a known issue appears in the report; timeouts and runner failures are distinguishable from clean results; tests cover success and failure paths; docs state limitations.

## Current status
The repository currently contains a WebAbility landing page and planning documentation. The journey runner, browser automation, accessibility adapter, finding pipeline, report generation, and runner tests remain planned work.

## Terms
- **Journey:** named sequence of browser actions and expected outcomes.
- **Step:** action or checkpoint in a journey.
- **Finding:** accessibility-engine result associated with a journey step.
- **Manual review:** result that cannot be safely classified as a confirmed violation automatically.
- **Run:** one execution of a journey against a target.