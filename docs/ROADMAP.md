# WebAbility — Roadmap

This roadmap tracks observable functionality, not aspirations.

## Phase 0 — Foundation

- [x] Reset the app identity and landing page to WebAbility.
- [x] Define scope, architecture, and safety boundaries.
- [x] Document current versus planned functionality.
- [ ] Select and add an open-source license.

## Phase 1 — Journey contract

- [x] Define a typed, validated journey schema.
- [x] Support allowlisted actions: navigate, click, fill, press key, assert visible.
- [x] Validate local URLs, action arguments, timeout bounds, and maximum step count.
- [x] Add valid/invalid schema tests and a sample journey.

**Status:** initial contract implemented. More edge-case coverage is still needed.

## Phase 2 — Local browser runner

- [x] Add Playwright Chromium execution.
- [x] Implement sequential step execution and per-step timeouts.
- [x] Add a bundled local checkout fixture.
- [ ] Add cancellation, richer structured execution errors, and runner integration tests.

**Status:** initial runner works by design against local targets; integration coverage remains incomplete.

## Phase 3 — Accessibility and reports

- [x] Integrate axe-core behind the Playwright adapter.
- [x] Associate violations and incomplete/manual-review results with journey steps and URLs.
- [x] Add JSON output and a readable console summary.
- [ ] Add report serialization tests and stable deduplication across repeated scans.

**Status:** first report format implemented; schema stability and broader tests remain.

## Phase 4 — Developer experience

- [x] Add a CLI command, example journey, and local demo.
- [x] Add a CI workflow for lint, type-check, tests, and build.
- [ ] Add GitHub Actions annotations, report HTML, and remediation guidance.

## Phase 5 — Reliability and broader coverage

- [ ] Add cancellation and resource limits.
- [ ] Add dedicated keyboard journey assertions and focus evidence.
- [ ] Add cross-browser coverage.
- [ ] Consider run history only after report format and privacy rules stabilize.
- [ ] If remote scanning is introduced, implement SSRF protections, redirect validation, and network isolation before enabling it.

## Release principle

A phase is complete only when code, tests, and observable behavior support the claim. A design document alone does not make a feature complete.
