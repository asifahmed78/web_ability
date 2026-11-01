# WebAbility — Architecture

## Current implementation

The repository contains a Next.js project site and an initial local journey runner.

```text
JSON journey
  -> Zod validation
  -> local-target restriction
  -> Playwright Chromium
  -> allowlisted browser actions
  -> axe-core scan after each step
  -> normalized violations + incomplete checks
  -> console summary + versioned JSON report
```

## Main modules

- `src/core/journey-schema.ts`: validates journey metadata, local base URLs, step types, keyboard keys, and execution limits.
- `src/core/run-journey.ts`: executes steps in Chromium, scans with axe-core, and associates results with the step and URL.
- `src/cli.ts`: command-line interface and JSON report writer.
- `examples/fixture/`: intentionally small local checkout fixture.
- `tests/`: schema validation tests.

## Journey contract

Supported actions are `goto`, `click`, `fill`, `press`, and `expect-visible`. Journeys are capped at 30 steps. The default step timeout is 5 seconds and the maximum is 30 seconds. Navigation is restricted to the same local origin.

Arbitrary JavaScript is intentionally not part of the journey format.

## Report model

Reports use `schemaVersion: 1`. Each step contains its status, URL, duration, axe violations, and incomplete checks that need manual review. Findings retain rule IDs, impact, help text, help URL, description, selectors, and axe failure summaries. Form values and full HTML are not copied into the report.

## Safety and privacy

- Only `localhost`, `127.0.0.1`, and `::1` are accepted as initial targets.
- Journey navigation must remain on the configured origin.
- The runner does not accept credentials in target URLs.
- No arbitrary JavaScript or authenticated production sessions are supported.
- Avoid placing real personal data or secrets in journey files.
- Do not interpret zero automated violations as proof of accessibility.

The local-only boundary is deliberate. A future remote scanning service would need a separate security design for DNS resolution, SSRF, redirects, private and link-local networks, resource limits, isolation, and retention.

## Known limitations

The first runner is a foundation, not a complete accessibility platform. It currently uses Chromium and axe-core, does not simulate screen readers, does not prove keyboard-only task completion, and does not replace manual review. Runner and report integration tests are still being expanded.
