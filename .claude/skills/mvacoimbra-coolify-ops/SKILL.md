---
name: mvacoimbra-coolify-ops
description: |
  VPS and Coolify operations for the mvacoimbra.dev portfolio (Next.js + Payload CMS + SQLite).
  Use when: (1) deploying a new build to production, (2) updating env vars, (3) restarting/recreating
  the container, (4) debugging the running site, (5) inspecting the production SQLite DB.
  Key insight: the image is built MANUALLY on the VPS (`pull_policy: never`) — pushing to git
  does NOT auto-deploy. SQLite DB and Payload media live on host volumes outside the repo.
targets: [claude]
tags: [devops, coolify, vps, nextjs, payload]
license: MIT
author: Claude Code
version: 1.0.0
---

# mvacoimbra.dev VPS & Coolify Operations

## VPS Access

```bash
ssh root@147.93.9.133  # Must use root@ explicitly (no User in ssh config)
# SSH keys managed by 1Password agent
# BatchMode works: ssh -o BatchMode=yes root@147.93.9.133
```

## Coolify Setup

- **Admin UI**: https://admin.mvacoimbra.dev.br
- **API base**: `http://localhost:8000/api/v1` (from VPS)
- **Proxy**: Traefik (managed by Coolify)

### Portfolio Service

| Field | Value |
|-------|-------|
| Service UUID | `ssw0c4ks8cwgcs448ow888o0` |
| Service name (compose) | `mvacoimbra-web` |
| Container name | `mvacoimbra-web-ssw0c4ks8cwgcs448ow888o0` |
| Domain | `mvacoimbra.dev.br` |
| Internal port | `3000` |
| Coolify service dir | `/data/coolify/services/ssw0c4ks8cwgcs448ow888o0/` |
| Project repo on VPS | `/root/www/mvacoimbra.dev/` |
| Git origin | `git@github.com:mvacoimbra/mvacoimbra.dev.git` (branch: `main`) |
| Image | `mvacoimbra-web:latest` (built locally, `pull_policy: never`) |

### Host Volumes (data lives OUTSIDE the repo & image)

| Container path | Host path | Purpose |
|----------------|-----------|---------|
| `/app/data` | `/root/www/mvacoimbra.dev/src/modules/payload/data` | SQLite DB (`portfolio.db`) |
| `/app/media` | `/root/www/mvacoimbra.dev/src/modules/payload/media` | Payload media uploads |

⛔ **Never check `portfolio.db` into git.** Production data is edited via the Payload admin UI on the VPS — committing the local dev DB would overwrite production. `*.db` is gitignored.

## Architecture

This is a **single-container Next.js + Payload app** (no Postgres, no separate admin). Differs from the typical Coolify "service" model:

- The Next.js standalone build is bundled into a single image via the project `Dockerfile`.
- The image is built **manually on the VPS** (`pull_policy: never` means Coolify never pulls — it expects the image to exist locally).
- The container runs `node server.js` on port 3000; Traefik handles TLS at `mvacoimbra.dev.br`.
- All Payload state is on host-mounted volumes (SQLite + media).

## Env Var Architecture

The Coolify-managed compose at `/data/coolify/services/{uuid}/docker-compose.yml` has the static values inline in `environment:` and pulls the rest from `.env` via `env_file`:

```yaml
environment:
  DATABASE_URI: file:/app/data/portfolio.db
  NEXT_PUBLIC_SERVER_URL: https://mvacoimbra.dev.br
  PAYLOAD_SECRET: ${PAYLOAD_SECRET}
env_file:
  - .env
```

Coolify regenerates `.env` on each deploy from its database (configured via the Coolify UI under "Environment Variables"). Required keys:

| Var | Source | Notes |
|-----|--------|-------|
| `PAYLOAD_SECRET` | Coolify env | Long random string for Payload auth |
| `DATABASE_URI` | hardcoded in compose | `file:/app/data/portfolio.db` |
| `NEXT_PUBLIC_SERVER_URL` | hardcoded in compose | `https://mvacoimbra.dev.br` |

⛔ **Never edit `.env` at `/data/coolify/services/{uuid}/.env` manually** — Coolify regenerates it on every deploy from its database.

## Deploy Procedure

The deploy is two steps because the image is built locally:

1. Pull latest `main` on the VPS
2. Build the image
3. Trigger a Coolify deploy to recreate the container

```bash
ssh root@147.93.9.133 '
  set -e
  cd /root/www/mvacoimbra.dev
  git pull --ff-only origin main
  docker build -t mvacoimbra-web:latest .
'
```

Then trigger the Coolify deploy:

```bash
TOKEN="<coolify-api-token>"  # Coolify UI → Keys & Tokens → API tokens
API="http://localhost:8000/api/v1"
UUID="ssw0c4ks8cwgcs448ow888o0"

ssh root@147.93.9.133 "curl -s '$API/deploy?uuid=$UUID&force=true' -H 'Authorization: Bearer $TOKEN'"
```

Or trigger from the Coolify UI: open the service → **Deploy**.

### Backup the SQLite DB BEFORE Every Deploy

The DB is on a host volume, so `docker build` cannot touch it — but mistakes happen (a wrong volume path, a bad `git pull` overwriting `portfolio.db` if it ever gets re-tracked, etc.). Take a snapshot first:

```bash
ssh root@147.93.9.133 '
  cp /root/www/mvacoimbra.dev/src/modules/payload/data/portfolio.db \
     /root/www/mvacoimbra.dev/src/modules/payload/data/portfolio.db.bak.$(date +%Y%m%d-%H%M%S)
  ls -lh /root/www/mvacoimbra.dev/src/modules/payload/data/portfolio.db*
'
```

### After Deploy: Verify

```bash
# Container running?
ssh root@147.93.9.133 "docker ps --filter name=mvacoimbra-web --format '{{.Names}} {{.Status}}'"

# Logs (look for: "Ready in", "Server started", no Payload migration errors)
ssh root@147.93.9.133 "docker logs mvacoimbra-web-ssw0c4ks8cwgcs448ow888o0 --tail 40"

# Public site
curl -sI https://mvacoimbra.dev.br | head -5
```

## Common Operations

### Restart container only (no rebuild)

```bash
ssh root@147.93.9.133 "docker restart mvacoimbra-web-ssw0c4ks8cwgcs448ow888o0"
```

### Recreate container without rebuilding image

Trigger a Coolify deploy with `force=true` — it recreates the container using the existing local image.

### Inspect / dump the production SQLite DB

```bash
# Quick read-only inspection (SQLite allows concurrent readers)
ssh root@147.93.9.133 "sqlite3 /root/www/mvacoimbra.dev/src/modules/payload/data/portfolio.db '.tables'"

# Dump a snapshot to local
scp root@147.93.9.133:/root/www/mvacoimbra.dev/src/modules/payload/data/portfolio.db ./portfolio.prod.db
```

### Run a Payload migration on the VPS

```bash
ssh root@147.93.9.133 "
  docker exec -it mvacoimbra-web-ssw0c4ks8cwgcs448ow888o0 \
    sh -c 'cd /app && pnpm payload migrate'
"
```

If the runner image doesn't have pnpm/source, run the migration during build instead (extend the Dockerfile build stage), or run from the local repo against a copy of the prod DB.

## Coolify API Operations

### List env vars

```bash
curl -s "$API/services/$UUID/envs" -H "Authorization: Bearer $TOKEN"
```

### Create env var

```bash
curl -s -X POST "$API/services/$UUID/envs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key":"MY_VAR","value":"my_value","is_preview":false}'
```

### Deploy

```bash
curl -s "$API/deploy?uuid=$UUID&force=true" -H "Authorization: Bearer $TOKEN"
```

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `pull access denied for mvacoimbra-web` on deploy | Image not built locally yet | `docker build -t mvacoimbra-web:latest .` on VPS first |
| Container restarts loop, "EACCES /app/data" | Volume permission mismatch (`USER nextjs`, uid 1001) | `chown -R 1001:1001 /root/www/mvacoimbra.dev/src/modules/payload/data` |
| `Cannot open database file` | Volume not mounted, or `DATABASE_URI` typo | Verify `docker inspect` shows the bind mount; check env vars |
| Site returns old content after deploy | Browser/CDN cache, or container didn't restart | `docker ps` for fresh `Up Xs`, then hard-reload |
| Payload admin: "schema out of sync" | Migrations not run after a model change | Run `pnpm payload migrate` (see above) |
| Build OOM on VPS during `docker build` | Next.js + Payload bundle is heavy | Add swap, or build the image on a beefier machine and `docker save` / `docker load` |

## When NOT to Use This Skill

- **Local dev** — use `pnpm dev` / `pnpm devsafe`. Never SSH for dev.
- **Schema-only changes** to Payload collections — generate a migration locally (`pnpm payload migrate:create`), commit it, then deploy. Don't hand-edit DB on prod.
- **Content edits** — use the Payload admin UI at `https://mvacoimbra.dev.br/admin`. Never edit `portfolio.db` directly.

## Other VPS Services (for reference)

| Service | UUID | Domain |
|---------|------|--------|
| Supermais Directus | `b0wgw84k080gww0scw8ocg88` | (internal) |
| Finanflux | `w4sgo4occ4g888k4ck44o08c` | finanflux.com |
| **mvacoimbra.dev** | `ssw0c4ks8cwgcs448ow888o0` | mvacoimbra.dev.br |
| n8n | `j8oo0wcwkkkgs8kkgk04w4w4` | n8n.mvacoimbra.dev.br |
