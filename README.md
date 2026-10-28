# WebAbility

**WebAbility is an open-source accessibility-testing project focused on real website journeys.** It aims to help developers understand not only which accessibility issues appear on a page, but where those issues can block someone from completing a task.

> **Status: early foundation.** The repository has been reset on `main` from its former Trust Exchange website to a WebAbility landing page and planning documentation. The journey runner, browser automation, accessibility-engine integration, reporting pipeline, and automated tests are **not implemented yet**. This repository does not currently scan websites.

## Why WebAbility?

A page-level audit can identify useful issues, but developers also need to know whether important workflows remain usable. WebAbility's intended differentiator is journey context: connect accessibility findings to a named task and the step where they were observed.

Future example journeys:
- Navigate a product catalogue using only a keyboard.
- Find a product, add it to a cart, and reach checkout.
- Complete a form and recover from validation errors.
- Move through a multi-step flow while keeping keyboard focus visible and understandable.

Automated checks can reveal many problems, but cannot prove full accessibility or replace testing with people who use assistive technologies.

## Intended first milestone

1. Define a typed, validated journey format.
2. Run a journey against a local test site.
3. Collect accessibility findings at selected journey steps with a maintained engine such as axe-core.
4. Associate findings with step name, URL, rule, impact, and relevant element evidence.
5. Produce JSON output and a concise terminal summary.
6. Add tests for validation, execution outcomes, and report serialization.

## Current technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

Browser automation and accessibility-engine dependencies will be selected and added when the runner milestone begins.

## Run the current landing page

Requirements: a compatible Node.js version and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run typecheck
npm run build
```

These commands check the web application only; they do not run accessibility scans.

## Project documentation

- [Project scope](docs/PROJECT_SCOPE.md)
- [Proposed architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Contributing guide](CONTRIBUTING.md)
- [Coding-assistant guidance](CLAUDE.md)

## Principles

- **Journey-first:** connect findings to tasks people need to complete.
- **Evidence over claims:** keep checks reproducible and findings actionable.
- **Honest status:** distinguish implemented, experimental, and planned functionality.
- **Privacy by default:** avoid collecting credentials, form values, or page content unnecessarily.
- **Safe scanning:** test only sites you own or have permission to assess.
- **Human-centred accessibility:** automated findings support, but do not replace, manual and assistive-technology testing.

## License

No license has been selected yet. Until a license file is added, do not assume the code is available for unrestricted reuse.
