# WebAbility

**WebAbility is an open-source, journey-first accessibility testing tool.** It runs browser journeys against a local website and connects axe-core findings to the exact task step where they appear.

> **Status: early development.** The repository now includes an initial local CLI runner, a validated journey format, Playwright browser execution, axe-core scans, JSON reports, a runnable demo fixture, schema tests, and CI checks. The runner is deliberately local-only. It is not a hosted scanner, a WCAG certification tool, or a replacement for manual testing.

## Why WebAbility?

A page-level audit can identify violations, but developers also need to know whether important workflows remain usable. WebAbility adds journey context: findings are attached to a named task and the step where they were observed.

Example journeys:
- Navigate a product catalogue using only a keyboard.
- Find a product, add it to a cart, and reach checkout.
- Complete a form and recover from validation errors.
- Move through a multi-step flow while keeping keyboard focus visible and understandable.

## Quick start

Requirements: Node.js 20+, npm, and a local website you own or have permission to test.

```bash
npm install
npx playwright install chromium
```

In terminal 1, start the included demo website:

```bash
npm run fixture
```

In terminal 2, run the sample journey:

```bash
npm run webability -- run examples/checkout.journey.json --out report.json
```

The demo intentionally contains an icon-only submit button with no accessible name. The report should associate the resulting axe-core finding with the checkout journey step. The command exits with a non-zero code when a step fails or an accessibility violation is found.

## Supported journey actions

| Action | What it does |
| --- | --- |
| `goto` | Navigate to a path on the configured local origin |
| `click` | Click an element using a Playwright selector |
| `fill` | Enter a value into a form control |
| `press` | Send an allowlisted keyboard key |
| `expect-visible` | Wait for an element to become visible |

Journeys are JSON files validated with Zod before the browser starts. The current limits are 30 steps and a 500–30,000 ms step timeout. See [CLI usage and journey format](docs/CLI.md).

## What the report contains

- Journey name, target, start time, and total duration.
- Per-step pass/fail status, URL, and duration.
- axe-core rule IDs, impact, help links, target selectors, and failure summaries.
- Incomplete axe checks separated into a manual-review list.
- A versioned JSON structure suitable for CI processing.

A zero-violation report does not prove a site is accessible. Automated checks cover only a subset of accessibility requirements; manual keyboard, screen-reader, and human testing remain essential.

## Safety boundary

The initial runner accepts only `localhost`, `127.0.0.1`, and `::1` targets. Journey navigation must remain on the same local origin. It does not support remote scanning, authentication, arbitrary JavaScript, or production sessions. This is intentional while the project establishes a safe execution model.

## Development

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

To run the demo fixture and CLI locally, see [docs/CLI.md](docs/CLI.md).

## Project documentation

- [CLI usage](docs/CLI.md)
- [Project scope](docs/PROJECT_SCOPE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Contributing guide](CONTRIBUTING.md)
- [Coding-assistant guidance](CLAUDE.md)

## Principles

- **Journey-first:** connect findings to tasks people need to complete.
- **Evidence over claims:** keep checks reproducible and findings actionable.
- **Honest status:** distinguish implemented, experimental, and planned functionality.
- **Privacy by default:** avoid collecting credentials, form values, or page content unnecessarily.
- **Safe scanning:** keep the first runner local-only; remote scanning needs a separately reviewed security design.
- **Human-centred accessibility:** automated findings support, but do not replace, manual and assistive-technology testing.

## License

No license has been selected yet. Until a license file is added, do not assume the code is available for unrestricted reuse.
