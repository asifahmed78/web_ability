# Contributing to WebAbility

WebAbility is in its foundation stage. Focused documentation improvements and small, testable implementation changes are welcome.

## Before starting
1. Read the [README](README.md), [scope](docs/PROJECT_SCOPE.md), [architecture](docs/ARCHITECTURE.md), and [roadmap](docs/ROADMAP.md).
2. Check existing issues and changes to avoid duplicate work.
3. For substantial changes, open an issue describing the problem and proposed approach.

## Workflow
1. Create a focused branch, such as `docs/journey-format` or `feat/journey-validation`.
2. Keep changes small and explain the reason.
3. Add or update tests when behavior changes.
4. Run available checks before opening a pull request.
5. Describe what changed, how it was tested, and any limitations.

The repository has development, build, start, lint, and type-check scripts. Tests for the planned runner have not been established; do not claim they pass until they exist and have been run.

## Expectations
- Keep implemented behavior and documentation in sync.
- Do not describe planned features as complete.
- Prefer typed interfaces and explicit error handling.
- Never commit secrets, access tokens, cookies, private URLs, or customer page content.
- Use local fixtures for reproducible tests where possible.
- Automated findings are evidence, not a guarantee of legal compliance.
- Consider keyboard-only users, screen-reader users, low-vision users, and people with cognitive or motor disabilities.

## Security
Do not publish sensitive vulnerability details in public issues. Until a private security contact is configured, avoid submitting secrets or exploitable details and contact the repository owner through a suitable private channel.

## Pull request checklist
- [ ] Clear purpose and limited scope.
- [ ] Documentation matches behavior.
- [ ] Relevant tests added or updated.
- [ ] Available checks run and results stated accurately.
- [ ] No secrets or sensitive user data included.