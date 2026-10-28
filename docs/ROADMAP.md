# WebAbility — Roadmap

This roadmap is an implementation plan, not a claim that these milestones have shipped.

## Phase 0 — Repository foundation

- [x] Inspect the current application and document the mismatch between the existing Trust Exchange website and the WebAbility goal.
- [x] Define product scope and non-goals.
- [x] Document a proposed architecture and security boundaries.
- [x] Separate current implementation facts from planned functionality.
- [ ] Decide the first browser automation engine and supported Node.js version.
- [ ] Add a project license after choosing the intended terms.

## Phase 1 — Journey contract

- [ ] Define and document a typed journey schema.
- [ ] Support a small allowlist of actions, such as navigate, click, fill, press key, and assert visible.
- [ ] Validate URLs, action arguments, timeouts, and maximum step count.
- [ ] Add valid and invalid example journeys.
- [ ] Add unit tests for validation.

**Exit condition:** invalid or unsafe journey definitions fail before browser startup with actionable errors.

## Phase 2 — Local browser runner

- [ ] Add the chosen browser automation dependency.
- [ ] Implement a runner interface and lifecycle.
- [ ] Add per-step timeout, cancellation, and structured errors.
- [ ] Create local HTML fixtures for forms, navigation, and common accessibility mistakes.
- [ ] Test the runner against those fixtures.

**Exit condition:** a local sample journey runs repeatably and reports step outcomes.

## Phase 3 — Accessibility checks and reports

- [ ] Integrate axe-core or another selected engine behind an adapter.
- [ ] Normalize findings and retain rule IDs and source metadata.
- [ ] Associate findings with journey steps and page URLs.
- [ ] Distinguish violations, incomplete/manual-review results, and runner errors.
- [ ] Add JSON output and a readable terminal summary.
- [ ] Test report serialization and error cases.

**Exit condition:** a fixture with a known issue produces a tested, reproducible report.

## Phase 4 — Developer experience

- [ ] Add a documented CLI or clearly defined local run command.
- [ ] Improve errors and remediation references.
- [ ] Add a small example project and CI usage guide.
- [ ] Add lint, type-check, build, and test automation where appropriate.

## Phase 5 — Reliability and optional persistence

- [ ] Add controlled concurrency and resource limits.
- [ ] Consider run history only after report format and privacy rules are stable.
- [ ] If remote scanning is introduced, implement SSRF protections, redirect validation, and network isolation.
- [ ] Document retention, redaction, and deletion behavior before storing reports.

## Later ideas — not committed to the initial release

- Multi-browser coverage
- Journey-level comparison between runs
- Optional dashboard
- CI annotations
- Framework-aware remediation suggestions
- AI-assisted explanation with explicit data-handling controls

## Release principle

A phase is complete only when code, tests, documentation, and observable behavior support that claim. Update this roadmap as work lands; do not mark a feature complete solely because its design document exists.
