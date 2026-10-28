# WebAbility — Proposed Architecture

> This document describes a target architecture. The components below are proposals unless explicitly identified as existing in the repository.

## Design goals

- Keep journey definitions separate from browser automation.
- Keep accessibility-engine output behind an adapter.
- Normalize findings into a stable, documented report format.
- Make execution deterministic and testable with local fixtures.
- Treat target URLs, page content, and browser actions as untrusted input.
- Avoid storing secrets or unnecessary page content.

## Proposed flow

```text
Journey definition
      |
      v
Schema validation
      |
      v
Run coordinator -----> target and network safety checks
      |
      v
Browser adapter
      |
      +---- execute step ----> checkpoint / assertion
      |                             |
      v                             v
Accessibility adapter <------ current page state
      |
      v
Finding normalizer
      |
      v
Run result + JSON / console reporter
```

## Component responsibilities

### Journey schema

Defines a stable format for journey metadata, ordered steps, action types, timeouts, and assertions. Reject unknown or unsafe action types rather than evaluating arbitrary JavaScript supplied by a journey file.

### Validation

Validates structure before opening a browser. Checks required fields, allowed action types, URL schemes, timeout bounds, and limits on step counts.

### Run coordinator

Owns run lifecycle, cancellation, per-step timing, error handling, and the relationship between steps and findings. It should distinguish a failed journey from a journey that completed with accessibility findings.

### Browser adapter

Provides a small interface for navigation, locating elements, keyboard interaction, waiting, and reading safe metadata. A browser automation library should be selected and added as an explicit dependency during implementation.

### Accessibility adapter

Calls a maintained engine such as axe-core and converts engine-specific results into the internal finding model. The initial version should not claim that a single engine detects every accessibility barrier.

### Finding normalizer

Preserves the original rule identifier and relevant metadata while mapping results into consistent fields. It must not turn uncertain or incomplete checks into confirmed violations.

### Reporters

The first reporter should emit JSON for automation and a concise console summary for developers. A web dashboard and historical comparison can be considered after the core result format stabilizes.

## Proposed finding shape

```json
{
  "ruleId": "example-rule-id",
  "impact": "serious",
  "help": "Short explanation from the accessibility engine",
  "pageUrl": "http://127.0.0.1:3000/example",
  "journeyName": "Example form journey",
  "stepName": "Submit with missing required fields",
  "selector": "form button[type=submit]",
  "evidence": [],
  "needsManualReview": false
}
```

This is an illustrative target schema, not output from an implemented scanner. The actual schema should be aligned to the chosen engine and tested before being treated as stable.

## Error model

At minimum, the runner should distinguish:

- Invalid journey definition
- Unsafe or unsupported target
- Navigation or browser timeout
- Element/action failure
- Accessibility-engine failure
- Report serialization failure
- Successful journey with findings
- Successful journey with no findings from the configured checks

A lack of automated findings must never be described as proof that a site is accessible.

## Security and privacy

- Restrict schemes to HTTP and HTTPS.
- Protect against server-side request forgery (SSRF), including loopback, private, link-local, and cloud metadata addresses when remote scanning is enabled.
- Re-check resolved IP addresses and redirects; do not rely on a hostname-only check.
- Apply request, navigation, and total-run timeouts.
- Limit concurrent runs and page/step counts.
- Do not ask for production passwords or store authentication cookies in the first milestone.
- Avoid logging form values, full page HTML, screenshots, or sensitive query parameters by default.
- Clearly separate local-only execution from any future hosted scanning service.

## Existing implementation versus target

Existing repository technology includes Next.js, React, TypeScript, Tailwind CSS, Prisma, and SQLite configuration. The current home page and Prisma models support the former Trust Exchange concept. The browser runner, journey schema, accessibility adapter, normalized result pipeline, and reporting modules described above are not yet present as a complete WebAbility implementation.
