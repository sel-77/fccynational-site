# FCCY National Website

Info site for Filipino Chinese Catholic Youth: chapters, events, and event sign-ups.

## Run locally
1. Install Node.js (version in `.node-version`)
2. `npm install`
3. `npm run dev` → http://localhost:4321

## Contributing

Branching, commits, pull requests, releases, and hotfixes: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Environments

| Environment | Deployed from | Cloudflare Worker | URL | Badge |
|---|---|---|---|---|
| Local | your machine | none | http://localhost:4321 | DEVELOPMENT |
| PR preview | any PR branch | `fccynational-site-staging` (Previews) | posted on the PR | STAGING |
| Staging | `develop` | `fccynational-site-staging` | https://fccynational-site-staging.fccy.workers.dev | STAGING |
| Production | `main` | `fccynational-site` | https://fccynational-site.fccy.workers.dev | none |

Deploys are run by [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), not GitHub Actions: merging a PR into `develop` or `main` deploys it automatically. Each Worker sets the `SITE_ENV` build variable (`staging` or `production`), which controls the environment badge.

## Rollback

Use this when a production deploy is broken.

**1. Restore the previous version (about 1 minute).** Either:

- **Dashboard:** Cloudflare → **Workers & Pages** → `fccynational-site` → **Deployments** → find the last good version → **⋯** → **Rollback** → add a reason → confirm.
- **Terminal** (after `npx wrangler login`):
  ```sh
  npx wrangler deployments list --env=""        # find the last good version ID
  npx wrangler rollback <version-id> --env="" -m "reason"
  ```

For staging, use the `fccynational-site-staging` Worker, or `--env staging` instead of `--env=""`.

**2. Fix it in git.** A rollback only lasts until the next deploy from `main`, which would ship the broken code again. Revert the bad change with a PR into `develop`, then release `develop` into `main` as usual:

```sh
git switch develop
git pull
git switch -c fix/WEB-XX-revert-broken-change
git revert <bad-commit-sha>
```
