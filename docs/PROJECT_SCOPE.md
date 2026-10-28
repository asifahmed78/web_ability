# WebAbility — Project Scope

## Product statement

WebAbility is an open-source accessibility-testing project focused on checking whether important website journeys can be completed and surfacing accessibility findings at the steps where they matter.

## Problem

Traditional automated audits can produce lists of page-level violations. Developers still need to connect those findings to a real task, reproduce the problem, and decide what to fix first.

WebAbility's intended differentiator is **journey context**: findings should be linked to a named task and the step at which they were observed.

## Intended users

- Frontend and full-stack developers
- QA engineers and test automation contributors
- Small teams that need repeatable accessibility checks in development and CI
- Accessibility practitioners who want reproducible technical evidence

## Initial use cases

1. Check keyboard navigation through a multi-step form.
2. Scan each page in a product-discovery and checkout journey.
3. Record accessibility findings alongside the journey step and URL.
4. Compare machine-readable reports across runs once persistence is implemented.

## Initial scope

The first working version should aim to provide:

- A documented, validated journey definition.
- A deterministic browser-runner interface.
- An adapter around a maintained accessibility engine such as axe-core.
- Normalized findings with rule ID, impact/severity, help text, page URL, step name, and element evidence when available.
- JSON output and a readable console summary.
- Unit and integration tests using local fixtures.
- Clear safety and privacy boundaries.

## Out of scope for the first milestone

- Claiming legal or WCAG conformance from an automated score.
- Replacing human testing or screen-reader testing.
- Automatically changing a user's source code.
- Scanning arbitrary URLs without network and SSRF protections.
- Collecting production credentials or submitting real transactions.
- AI-generated fixes, hosted dashboards, team accounts, and historical analytics before the core runner is reliable.

## Success criteria for the first implementation

The first milestone is ready for review when:

- A sample journey can be validated with helpful errors.
- A local fixture can be loaded and checked repeatably.
- At least one accessibility finding is represented in the documented report format.
- Runner failures and timeouts are distinguishable from a clean scan.
- Tests cover successful execution, invalid input, and failure paths.
- Documentation accurately states limitations and setup requirements.

## Current state

This repository is at the documentation and planning stage. The existing Next.js application is a Trust Exchange site and the current Prisma schema models posts, events, and settings. The WebAbility journey runner, accessibility adapter, and report pipeline are planned, not implemented yet.

## Terminology

- **Journey:** a named sequence of browser actions and expected outcomes.
- **Step:** one action or checkpoint within a journey.
- **Finding:** an accessibility engine result associated with a journey step.
- **Incomplete/manual review:** a result that cannot safely be classified as a confirmed violation without human review.
- **Run:** one execution of a journey against a specific target.
