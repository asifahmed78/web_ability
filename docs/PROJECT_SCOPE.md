# WebAbility — Project Scope

## Product
WebAbility is a journey-first accessibility testing tool. It runs browser journeys and connects automated accessibility findings to the exact task step where they appear.

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

## Implemented in the current foundation
- Typed, validated journey definitions with execution limits
- Local browser runner using Playwright Chromium
- axe-core scans after each journey step
- Normalized violations and incomplete/manual-review results
- Keyboard actions and explicit keyboard focus assertions
- JSON reports for automation and standalone HTML reports for review
- Local checkout fixture and browser integration coverage
- CI workflow for lint, typecheck, tests, and build

## Explicitly out of scope for this early release
Automated WCAG/legal certification, replacing human or screen-reader testing, auto-editing source code, remote scanning, production credentials or real transactions, AI fixes, hosted dashboards, and historical analytics before the core runner is reliable.

## Current limitations
- Targets are restricted to localhost / loopback addresses and same-origin navigation.
- Keyboard assertions verify explicitly declared focus expectations; they do not prove complete keyboard accessibility.
- axe-core incomplete results require human review.
- The project is an early developer tool, not a certification product.

## Next milestone
Improve failure recovery and cancellation, add CI annotations and report filtering, expand keyboard interaction coverage, and establish a stable report contract.

## Terms
- **Journey:** named sequence of browser actions and expected outcomes.
- **Step:** action or checkpoint in a journey.
- **Finding:** accessibility-engine result associated with a journey step.
- **Manual review:** incomplete automated result that requires human evaluation.
- **Run:** one execution of a journey against a target.
