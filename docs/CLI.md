# WebAbility CLI

The CLI runs a declared browser journey against a local development site and checks the page with axe-core after each step. It can write both machine-readable JSON and a shareable HTML report.

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
npm run webability -- run examples/checkout.journey.json --out report.json --html report.html
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
| `expect-focused` | `name`, `selector` | Assert that the element is the active keyboard focus target |

For a keyboard path, use `press` to send Tab or Enter, then `expect-focused` to assert which element received focus. This verifies a specific focus transition; it does not prove that every keyboard interaction or assistive-technology experience is correct.

The schema limits journeys to 30 steps and timeouts to 30 seconds. Selectors use Playwright locator syntax. Avoid putting real credentials or personal data in journey files.

## Reports and exit codes

- `--out report.json` writes a versioned JSON report for CI processing.
- `--html report.html` writes a standalone HTML report for people reviewing a run.
- Both flags can be used together.

Reports include step status, URL, duration, axe rule IDs, impact, help links, target selectors, and failure summaries. Axe incomplete checks are kept separate as items requiring manual review. Run status is `passed`, `failed` (a journey step failed), or `issues-found` (steps completed but axe found violations).

The command exits non-zero when a step fails or axe reports a violation. A completed run with zero automated findings is not proof of accessibility or WCAG conformance. Manual keyboard, screen-reader, and assistive-technology testing remains necessary.

## Safety boundary in this release

The initial runner intentionally accepts only `localhost`, `127.0.0.1`, and `::1` targets, and journey navigation must remain on the same origin. It does not accept remote websites, credentials, arbitrary JavaScript, browser extensions, or authenticated production sessions. This local-only boundary is deliberate while the project establishes a safe execution model.
