---
name: mvacoimbra.dev-project
description: Project overview, tech stack, structure, and dev commands for the mvacoimbra.dev portfolio
---

# Project: mvacoimbra.dev

Personal portfolio site. Public frontend + Payload CMS admin in a single Next.js app.

## Tech Stack

- **Runtime:** Node 22 (`.nvmrc`), pnpm 9/10
- **Framework:** Next.js 15.4 (App Router, Turbopack dev)
- **UI:** React 19 (with React Compiler via `babel-plugin-react-compiler`)
- **CMS:** Payload 3.64 (SQLite via `@payloadcms/db-sqlite`, Lexical editor)
- **Styling:** Tailwind CSS 4, shadcn (style: `new-york`, base: neutral), Lucide icons
- **Forms:** react-hook-form + zod
- **Lint/Format:** Biome 2.3.7 (Prettier + ESLint deps exist but unused)
- **Testing:** Vitest + Playwright + jsdom + @testing-library/react are **installed but not yet wired up** (no scripts, no config files)

## Directory Layout

```
app/
  (frontend)/           # Public site routes (page.tsx, /resume)
  (payload)/admin/      # Payload admin UI (catch-all segments)
  (payload)/api/        # Payload REST + GraphQL handlers
src/
  lib/                  # utils, types, payload-client, fetch-data, providers
  modules/
    payload/            # payload.config.ts, collections/, globals/, generated payload-types.ts
    shared/             # components/, components/ui/ (shadcn), hooks/, providers/
public/                 # static assets
```

## Path Aliases (tsconfig)

- `@/*` → `./*` (project root, NOT `./src`). Imports look like `@/src/lib/utils` or `@/src/modules/...`
- `@payload-config` → `./src/modules/payload/payload.config.ts`

## Dev Commands

| Task | Command |
|------|---------|
| Install | `pnpm install` |
| Dev | `pnpm dev` (Turbopack) |
| Dev (no Turbopack, fresh `.next`) | `pnpm devsafe` |
| Build | `pnpm build` |
| Start | `pnpm start` |
| Lint | `pnpm lint` |
| Lint + autofix (unsafe) | `pnpm lint:fix` |
| Format | `pnpm format` / `pnpm format:fix` |
| Typecheck | `pnpm exec tsc --noEmit` |
| Regenerate Payload types | `pnpm generate:types` |
| Regenerate import map | `pnpm generate:importmap` |
| Payload CLI | `pnpm payload <cmd>` |

## After Significant Changes

Run in order: `pnpm lint` → `pnpm format` → `pnpm exec tsc --noEmit` → `pnpm build`. Fix all errors before declaring done.

## Env Vars

`.env` requires `DATABASE_URI` (SQLite file path or libsql URL) and `PAYLOAD_SECRET`. Note: `.env.example` and `docker-compose.yml` still reference MongoDB — those are stale; the project uses SQLite.

## Collections + Globals

Collections: `Users` (auth), `Media` (uploads), `Projects`, `Work`, `Education`, `Skills`. Global: `Profile`. Defined in `src/modules/payload/collections/` and `globals/`.
