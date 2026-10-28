# Repository guidance for coding assistants

## Project intent
This repository is WebAbility, an accessibility-testing tool concept focused on real website journeys.

## Read first
- `README.md`
- `docs/PROJECT_SCOPE.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

## Current-state constraint
The current app is a Next.js landing page only. The journey schema, browser runner, accessibility-engine adapter, finding normalizer, report pipeline, and runner tests are not implemented yet. Never claim planned components exist or that a scan was performed unless working code and test output demonstrate it.

## Working rules
- Prefer small, reviewable changes and inspect files before editing.
- Preserve useful Next.js, TypeScript, and build configuration unless there is a concrete reason to change it.
- Add tests with new behavior and report which commands were actually run.
- Keep README, architecture, and roadmap aligned with code.
- Avoid introducing AI, authentication, cloud scanning, report storage, or automatic fixes before the core local runner is designed and tested.
- Treat URLs and page content as untrusted. Remote scanning must account for SSRF, redirects, private IP ranges, timeouts, and resource limits.
- Never commit credentials, tokens, cookies, or real customer data.
- Automated accessibility results are not proof of full WCAG conformance; document manual-review limitations.

## Definition of done
Behavior is implemented, relevant tests and checks are run, errors and limitations are documented, and README claims match the repository.