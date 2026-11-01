# WebAbility CLI

The first CLI release runs a declared browser journey against a local development site and checks the page with axe-core after each step.

## Requirements

- Node.js 20 or newer
- npm
- A local website you own or are authorized to test
- Chromium installed for Playwright: `npx playwright install chromium`

## Install and run

```bash
npm install
npx playwright install chromium
npm run webability -- run examples/checkout.journey.json --out report.json
```

Start your local application separately before running the example. The example expects a checkout fixture at `http://127.0.0.1:3000`; it is a template, not a live target.

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

The optional `--out` flag writes a versioned JSON report containing the journey, step status, URL, duration, axe rule IDs, impact, help links, target selectors, and failure summaries.

The command exits non-zero when a step fails or axe reports a violation. A completed run with zero automated findings is not proof of accessibility or WCAG conformance. Axe incomplete results and manual checks remain important; broader keyboard and assistive-technology testing is still required.

## Safety boundary in this release

The initial runner intentionally accepts only `localhost`, `127.0.0.1`, and `::1` targets, and journey navigation must remain on the same origin. It does not accept remote websites, credentials, arbitrary JavaScript, browser extensions, or authenticated production sessions. This local-only boundary is deliberate while the project establishes a safe execution model.
