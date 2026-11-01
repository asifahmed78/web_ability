# WebAbility

**WebAbility is a journey-first accessibility testing tool.** It runs browser journeys against a local website and connects axe-core findings to the exact task step where they appear.

> **Status: early development.** The repository includes a local CLI runner, validated journey format, Playwright execution, axe-core scans, JSON and HTML reports, keyboard focus assertions, a runnable demo fixture, integration tests, and CI checks. The runner is deliberately local-only. It is not a hosted scanner, a WCAG certification tool, or a replacement for manual testing.

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
npm run webability -- run examples/checkout.journey.json --out report.json --html report.html
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
| `expect-focused` | Assert that a specific element received keyboard focus |

Use `press` plus `expect-focused` to describe and verify keyboard focus transitions. See [CLI usage and journey format](docs/CLI.md).

## Reports

- JSON output is designed for CI and other tools.
- HTML output is a standalone report for human review.
- Each step includes pass/fail status, URL, duration, axe violations, and manual-review checks.

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

Tests include schema validation, a real Chromium keyboard-focus journey, axe finding detection, and HTML report rendering. Playwright Chromium must be installed before running the integration test.

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

WebAbility is released under the [MIT License](LICENSE).
