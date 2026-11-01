# Repository guidance for coding assistants

## Project intent
This repository is WebAbility, an open-source, journey-first accessibility testing tool. The product should help developers discover where accessibility barriers appear while completing real website tasks.

## Read first
- `README.md`
- `docs/PROJECT_SCOPE.md`
- `docs/ARCHITECTURE.md`
- `docs/CLI.md`
- `docs/ROADMAP.md`

## Current implementation
The repository includes a Next.js project site, a Zod-validated journey format, a local Playwright Chromium runner, axe-core scans, a JSON report, a local checkout fixture, schema tests, and CI checks. The runner is intentionally restricted to loopback targets and same-origin navigation.

## Working rules
- Prefer small, reviewable changes and inspect files before editing.
- Preserve useful Next.js, TypeScript, and build configuration unless there is a concrete reason to change it.
- Add tests with new behavior and report which commands were actually run.
- Keep README, architecture, and roadmap aligned with code.
- Do not claim remote scanning, screen-reader simulation, full keyboard task verification, WCAG certification, or features that are only planned.
- Keep arbitrary JavaScript out of journey files.
- Treat URLs and page content as untrusted. Any future remote scanning requires a separately reviewed SSRF, redirect, DNS, isolation, and resource-limit design.
- Never commit credentials, tokens, cookies, or real customer data.
- Automated accessibility results are not proof of full WCAG conformance; document manual-review limitations.

## Definition of done
Behavior is implemented, relevant tests and checks are run, errors and limitations are documented, and README claims match the repository.
