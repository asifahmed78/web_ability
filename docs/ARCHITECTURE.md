# WebAbility — Proposed Architecture

> This is a target architecture. Apart from the Next.js landing page and documentation, these components are planned, not implemented.

## Design goals
- Separate journey definitions from browser automation.
- Put accessibility-engine output behind an adapter.
- Normalize findings into a stable report format.
- Make runs deterministic and testable with local fixtures.
- Treat target URLs, page content, and journey files as untrusted input.
- Avoid storing secrets or unnecessary page content.

## Proposed flow

```text
Journey definition
  -> schema validation
  -> run coordinator + target safety checks
  -> browser adapter executes a step
  -> accessibility adapter checks current page state
  -> finding normalizer
  -> JSON and console reports
```

## Responsibilities
- **Journey schema:** metadata, ordered steps, allowed actions, timeouts, and assertions. Never evaluate arbitrary JavaScript from a journey file.
- **Validation:** check required fields, action types, URL schemes, timeout bounds, and maximum step counts before browser startup.
- **Run coordinator:** manage lifecycle, cancellation, timing, errors, and step-level findings. Distinguish failed execution from completed runs with findings.
- **Browser adapter:** provide navigation, element interaction, keyboard input, waiting, and safe metadata access. Choose a browser automation library during implementation.
- **Accessibility adapter:** integrate a maintained engine such as axe-core. One engine cannot detect every accessibility barrier.
- **Finding normalizer:** retain rule identifiers and map results into consistent fields without turning uncertain results into confirmed violations.
- **Reporters:** initially emit JSON and a concise console summary.

## Illustrative finding

```json
{
  "ruleId": "example-rule-id",
  "impact": "serious",
  "pageUrl": "http://127.0.0.1:3000/example",
  "journeyName": "Example form journey",
  "stepName": "Submit missing required fields",
  "selector": "form button[type=submit]",
  "evidence": [],
  "needsManualReview": false
}
```

This is an example target schema, not scanner output.

## Error model
Distinguish invalid journey input, unsafe targets, navigation timeouts, action failures, engine failures, report failures, successful runs with findings, and successful runs with no findings from configured checks. No automated findings does not prove a site is accessible.

## Security and privacy
- Restrict target schemes to HTTP and HTTPS.
- Protect against SSRF, including loopback, private, link-local, and cloud metadata addresses for remote scans.
- Re-check resolved IPs and redirects; hostname-only checks are insufficient.
- Apply timeouts and limits for concurrency, pages, and steps.
- Do not request production passwords or store authentication cookies in the first milestone.
- Avoid logging form values, full HTML, screenshots, or sensitive query parameters by default.
- Separate local execution from any future hosted scanning service.

## Current implementation
The current app is a small Next.js landing page. The runner, journey schema, accessibility adapter, finding pipeline, and report generation are not present yet.