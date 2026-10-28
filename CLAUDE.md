# Repository guidance for coding assistants

## Project intent

This repository is being transitioned from a Next.js Trust Exchange website into WebAbility, an accessibility-testing tool focused on real website journeys.

## Read first

- `README.md`
- `docs/PROJECT_SCOPE.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

## Important current-state constraint

The existing home page and Prisma schema belong to the earlier Trust Exchange concept. The WebAbility journey schema, browser runner, accessibility engine adapter, finding normalizer, and reporting pipeline are not yet implemented. Do not claim that they exist or silently document a proposed design as current behavior.

## Working rules

- Prefer small, reviewable changes over a large rewrite.
- Inspect the relevant files before editing them.
- Preserve useful Next.js, TypeScript, and build configuration unless there is a concrete reason to change it.
- Do not remove existing pages, components, or database models until their dependencies and migration plan have been reviewed.
- Add tests with new behavior and report which commands were actually run.
- Keep the README, architecture document, and roadmap aligned with the code.
- Avoid introducing AI, authentication, cloud scanning, report storage, or automatic fixes before the core local journey runner is designed and tested.
- Treat URLs and page content as untrusted. Any remote scanning design must account for SSRF, redirects, private IP ranges, timeouts, and resource limits.
- Never commit credentials, tokens, cookies, or real customer data.
- Automated accessibility results are not proof of full WCAG conformance; document manual-review limitations.

## Definition of done

A change is complete when its behavior is implemented, relevant tests and checks are run, errors and limitations are documented, and claims in the README match the repository.
