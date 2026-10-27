# CLAUDE.md

## About this project

Info website for a youth organization in the Philippines with 10–30 chapters nationwide. It shows chapters and events, and has event sign-ups and a contact form. Content is updated by a team of 1–3 people (currently just me).

## Hard constraint: everything must be free

Don't suggest paid services or paid plans. If a free tier has a catch (limits, pausing, non-commercial terms), point it out.

## Stack and why we chose it

- **Astro + TypeScript (strict):** content site; events and chapters live as Markdown content collections; fast static pages.
- **Cloudflare Workers with static assets (free plan):** free unlimited static requests; free `.workers.dev` subdomain for now (no custom domain yet).
- **Cloudflare D1:** stores event sign-ups and contact messages. **Turnstile** blocks spam. We chose this over Supabase because free Supabase projects pause when inactive, which would break the forms between events.
- **Vitest** for tests, **GitHub Actions** for CI.
- **GitHub repo is public:** branch protection and unlimited CI minutes are free on public repos. Never commit secrets; they go in Cloudflare's secret storage.
- **Jira** (Kanban, project key `WEB`) for tickets.
- **My machine:** Windows, using PowerShell in VS Code's terminal.

## Commands

- `npm run dev`: local dev server at http://localhost:4321
- `npm run check`: type-check (astro check)
- `npm test`: run tests (Vitest)
- `npm run build`: production build

## Workflow rules

- `main` = production, `develop` = staging. Never commit or push directly to either.
- Branch from `develop` and name branches after the Jira ticket: `feature/WEB-12-events-page`, `fix/WEB-20-...`, `chore/WEB-6-...`.
- Commit messages use Conventional Commits with the ticket key: `feat: add events page (WEB-12)`.
- Open PRs into `develop` and squash-merge them. CI (check, test, build) must pass.
- Releases: PR from `develop` into `main` with a merge commit, then tag `vX.Y.Z` with a GitHub Release.
- **No AI attribution:** never add `Co-Authored-By` trailers, "Generated with Claude Code" lines, or session links to commit messages, PR titles, or PR descriptions. Commits are authored by me only.
- **Privacy:** sign-up forms may collect minors' personal data. Follow the Philippine Data Privacy Act: collect only the fields we need, include a consent checkbox (with parent/guardian consent for under-18s), and never log personal data.

## How to work with me: I'm learning

I'm a CS graduate building my first real project. I want to understand the software development lifecycle, not just get things done.

- Before starting a task, say in a sentence or two what we're about to do and which ticket it belongs to.
- After each meaningful action, explain why it matters: what problem it solves, where it fits in the pipeline, and how professional teams handle it.
- Show me git commands and explain what each one does. Let me run `git push` and merge PRs myself.
- For steps in web dashboards (GitHub settings, Cloudflare, Jira), give me clear click-by-click instructions, then wait for me to confirm before continuing.
- Point out Windows-specific gotchas.
- Keep explanations short and practical, not lectures.
- If I choose something that differs from best practice, explain the tradeoff, then respect my decision.

## Roadmap

Update ticket keys to match Jira and mark progress as tickets finish.

1. [x] Accounts, tools, and Jira setup
2. [x] Astro project + GitHub repo with `main` and `develop`
3. [ ] CI checks on PRs (WEB-6): `ci.yml`, PR template, branch rulesets. In progress; check the repo to see what's already done.
4. [ ] Deploy to Cloudflare: PR preview URLs, staging from `develop`, production from `main`, visible STAGING badge, rollback steps documented in README
5. [ ] Pages: base layout, home, about, chapters, events (Markdown content collections)
6. [ ] D1 database + event sign-ups
7. [ ] Contact form + Turnstile spam protection
8. [ ] Monitoring (free Sentry plan) and launch v1.0.0
9. [ ] CONTRIBUTING.md documenting this workflow for future teammates
