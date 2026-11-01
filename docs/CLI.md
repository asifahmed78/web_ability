# WebAbility CLI

The first CLI release runs a declared browser journey against a local development site and checks the page with axe-core after each step.

## Requirements

- Node.js 20 or newer
- npm
- Chromium installed for Playwright

## Install and run the bundled demo

```bash
npm install
npx playwright install chromium
```

Start the fixture in terminal 1:

```bash
npm run fixture
```

Run the journey in terminal 2:

```bash
npm run webability -- run examples/checkout.journey.json --out report.json
```

The fixture intentionally contains an icon-only submit button without an accessible name so the scanner has a known issue to report.

## Journey format

A journey is JSON with a name, a local `baseUrl`, optional timeout and scan settings, and an ordered list of steps.

Supported actions:

| Type | Required fields | Behavior |
| --- | --- | --- |
| `goto` | `name`, `path` | Navigate to a path on the same local origin |
| `click` | `name`, `selector` | Click an element |
| `fill` | `name`, `selector`, `value` | Fill a form control |
| `press` | `name`, `selector`, `key` | Send an allowlisted keyboard key |
| `expect-visible` | `name`, `selector` | Wait for an element to become visible |

The schema limits journeys to 30 steps and timeouts to 30 seconds. Selectors use Playwright locator syntax. Avoid putting real credentials or personal data in journey files.

## Reports and exit codes

The optional `--out` flag writes a versioned JSON report containing the journey, step status, URL, duration, axe rule IDs, impact, help links, target selectors, and failure summaries. Axe incomplete checks are kept separate as items requiring manual review.

The command exits non-zero when a step fails or axe reports a violation. A completed run with zero automated findings is not proof of accessibility or WCAG conformance. Manual keyboard, screen-reader, and assistive-technology testing remains necessary.

## Safety boundary in this release

The initial runner intentionally accepts only `localhost`, `127.0.0.1`, and `::1` targets, and journey navigation must remain on the same origin. It does not accept remote websites, credentials, arbitrary JavaScript, browser extensions, or authenticated production sessions. This local-only boundary is deliberate while the project establishes a safe execution model.
