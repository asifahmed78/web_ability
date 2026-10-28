# WebAbility — Roadmap

This is a plan, not a claim that these milestones have shipped.

## Phase 0 — Foundation
- [x] Reset the app identity and landing page to WebAbility.
- [x] Define scope, architecture, and safety boundaries.
- [x] Document current versus planned functionality.
- [ ] Choose browser automation engine and supported Node.js version.
- [ ] Select a project license.

## Phase 1 — Journey contract
- [ ] Define a typed journey schema.
- [ ] Support allowlisted actions: navigate, click, fill, press key, assert visible.
- [ ] Validate URLs, arguments, timeouts, and maximum step count.
- [ ] Add valid/invalid examples and validation tests.

**Exit:** invalid or unsafe journeys fail before browser startup with actionable errors.

## Phase 2 — Local browser runner
- [ ] Add browser automation dependency.
- [ ] Implement lifecycle, per-step timeouts, cancellation, and structured errors.
- [ ] Create local fixtures for forms, navigation, and common accessibility mistakes.
- [ ] Test against fixtures.

**Exit:** a local journey runs repeatably and reports step outcomes.

## Phase 3 — Accessibility and reports
- [ ] Integrate axe-core or another selected engine behind an adapter.
- [ ] Normalize findings and associate them with journey steps and URLs.
- [ ] Distinguish violations, incomplete/manual-review results, and runner errors.
- [ ] Add JSON output, console summary, and report tests.

**Exit:** a known issue in a fixture produces a tested, reproducible report.

## Phase 4 — Developer experience
- [ ] Add a documented CLI/run command, better errors, remediation references, example project, and CI guide.
- [ ] Automate lint, type-check, build, and test checks where appropriate.

## Phase 5 — Reliability
- [ ] Add concurrency and resource limits.
- [ ] Consider run history only after report format and privacy rules stabilize.
- [ ] If remote scanning is introduced, implement SSRF protections, redirect validation, and network isolation.
- [ ] Document retention, redaction, and deletion before storing reports.

## Later ideas
Multi-browser coverage, run comparisons, dashboard, CI annotations, framework-aware remediation suggestions, and AI-assisted explanations are not initial-release commitments.

## Release principle
A phase is complete only when code, tests, and observable behavior support the claim. A design document alone does not make a feature complete.