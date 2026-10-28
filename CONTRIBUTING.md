# Contributing to WebAbility

Thank you for considering a contribution. WebAbility is currently in its documentation and planning stage, so focused documentation improvements and small, testable foundation changes are welcome.

## Before starting

1. Read the [README](README.md), [project scope](docs/PROJECT_SCOPE.md), [architecture](docs/ARCHITECTURE.md), and [roadmap](docs/ROADMAP.md).
2. Check open issues and existing changes to avoid duplicate work.
3. For substantial changes, open an issue or discussion describing the problem and proposed approach first.

## Development workflow

1. Create a focused branch, for example `docs/journey-format` or `feat/journey-validation`.
2. Keep each change small and explain why it is needed.
3. Add or update tests when behavior changes.
4. Run the checks available in the repository before opening a pull request.
5. Describe what changed, how it was tested, and any limitations.

The current repository has Next.js scripts for development, build, start, and lint. Test scripts for the planned WebAbility runner have not yet been established; do not claim they pass until they exist and have been run.

## Contribution expectations

- Keep implemented behavior and documentation in sync.
- Do not describe planned features as complete.
- Prefer typed interfaces and explicit error handling.
- Never commit secrets, access tokens, cookies, private URLs, or customer page content.
- Include local fixtures for reproducible tests when possible.
- Treat accessibility-engine output as evidence, not a guarantee of legal compliance.
- Consider keyboard-only users, screen-reader users, low-vision users, and people with cognitive or motor disabilities.

## Security issues

Do not publish sensitive vulnerability details in a public issue. Until a private security contact is configured, avoid submitting secrets or exploitable details and contact the repository owner through a suitable private channel.

## Pull request checklist

- [ ] The change has a clear purpose and limited scope.
- [ ] Documentation reflects actual behavior.
- [ ] Tests were added or updated where appropriate.
- [ ] Available lint/build/test checks were run and their results are stated accurately.
- [ ] No secrets or sensitive user data are included.
