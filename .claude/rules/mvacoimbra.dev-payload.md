---
name: mvacoimbra.dev-payload
description: Payload CMS patterns — data fetching, type generation, route groups, and collection structure
paths:
  - "src/modules/payload/**"
  - "src/lib/fetch-data.ts"
  - "src/lib/payload-client.ts"
  - "app/(frontend)/**"
  - "app/(payload)/**"
---

# Payload CMS

## Data Fetching — Local API Only

Frontend pages fetch via Payload's **Local API** server-side, NOT the REST/GraphQL endpoints. Pattern:

```ts
// src/lib/fetch-data.ts
import { getPayloadClient } from './payload-client'

export async function getProjects() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'projects', sort: 'order', limit: 100 })
  return docs.map(/* shape into UI type */)
}
```

- Always go through `getPayloadClient()` — don't instantiate Payload directly.
- Add new fetchers to `src/lib/fetch-data.ts`. They should map raw Payload docs into the UI types in `src/lib/types.ts`.
- Use `getMediaUrl(media)` helper for `Media` references — they may be `string | number | Media | null`.

## After Editing Collections / Globals

Run `pnpm generate:types` to refresh `src/modules/payload/payload-types.ts`. Commit it. The `Media` type and collection types come from this file.

When adding admin UI components, also run `pnpm generate:importmap`.

## Route Groups

- `app/(frontend)/` — public pages. Layout, theme provider, navbar live here.
- `app/(payload)/admin/[[...segments]]/` — Payload admin UI (catch-all).
- `app/(payload)/api/[...slug]/route.ts` — Payload REST API.
- `app/(payload)/api/graphql/route.ts` + `graphql-playground/route.ts` — GraphQL.

The `(payload)` group is excluded from Biome formatting — don't try to format it.

## Collections

Located at `src/modules/payload/collections/`. One file per collection, default-exported config object. Fields use Payload's field types; rich text uses Lexical.

- `Users` — auth-enabled, admin login
- `Media` — uploads with image sizes
- `Projects`, `Work`, `Education`, `Skills` — content collections (sorted by `order` field)

## Globals

`src/modules/payload/globals/Profile.ts` — single-instance global for site profile (name, avatar, bio, social links).

## Database

SQLite via `@payloadcms/db-sqlite`. `DATABASE_URI` env points to the file (or libsql URL). The committed `portfolio.db` is the dev DB.
