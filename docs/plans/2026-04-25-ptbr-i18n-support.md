# pt-BR i18n Support Implementation Plan

Created: 2026-04-25
Author: mvacoimbra.dev@gmail.com
Status: VERIFIED
Approved: Yes
Iterations: 0
Worktree: No
Type: Feature

## Summary

**Goal:** Add Brazilian Portuguese (pt-BR) support to the portfolio so visitors can switch between English (default, unprefixed URLs) and Portuguese (`/pt-BR/*`), covering frontend UI chrome, CMS content, and date formatting.

**Architecture:** Three layers working in concert — (1) `next-intl` for static UI strings, locale-aware routing, and middleware-based locale detection; (2) Payload `localization` config + `localized: true` field flags for CMS-stored content with English fallback; (3) `date-fns` with `ptBR` locale import for dates. Existing pages move under `app/(frontend)/[locale]/` with `localePrefix: 'as-needed'`.

**Tech Stack:** next-intl, Payload localization, date-fns, Next.js 15 App Router middleware, React 19.

## Scope

### In Scope

- Install and configure `next-intl` (routing, middleware, server config, message JSON files)
- Restructure `app/(frontend)/` into `app/(frontend)/[locale]/` segment with `localePrefix: 'as-needed'`
- Enable Payload `localization` (`en`, `pt-BR`, default `en`, `fallback: true`)
- Mark CMS fields `localized: true` for: `Profile.description`, `Profile.about`, `Projects.title`, `Projects.subtitle`, `Projects.description`, `Work.roles[].title`, `Work.roles[].description`, `Education.degree`
- Translate all hardcoded UI strings in home page, resume page, Navbar tooltips, getNavbarItems labels
- Locale-aware date formatting via `date-fns` + `ptBR` locale (WorkCard, EducationCard, resume page)
- LocaleSwitcher component placed in Navbar
- Dynamic `<html lang>` attribute and metadata `openGraph.locale`
- Provide initial pt-BR translations for all UI chrome strings

### Out of Scope

- Translating Payload Admin Panel UI (`@payloadcms/translations`) — explicitly excluded per user choice
- Localizing `Skills.name` — technical names stay global
- Localizing technology badge names (e.g. "TypeScript", "React")
- Translating CMS content data itself — fields become localizable; user enters translations in admin separately
- SEO sitemap / `<link rel="alternate" hreflang>` tags — defer
- Localizing the `_payload-demo` directory or `/my-route` (legacy / unused)
- Custom migration script for existing English data (Payload + fallback handles it natively)

## Approach

**Chosen:** next-intl + Payload localization + date-fns ptBR.

**Why:** Three idiomatic tools with separation of concerns — UI chrome, CMS data, date formatting. next-intl handles SSR-correct locale routing, middleware redirects, message extraction with type safety. Payload's `localized: true` adds per-locale columns automatically and respects `fallback: true` so untranslated content stays English. Cost: one new dep + a folder restructure + DB schema migration on first Payload run.

**Alternatives considered:**
- *Payload localization only (UI strings as a global)* — rejected: every label change requires admin edit, no idiomatic routing, slower per-page label load.
- *Custom thin wrapper, zero deps* — rejected: reinvents next-intl poorly, more bug surface than the dep itself.

## Context for Implementer

> Codebase has no existing i18n. Currently 100% English. Single Next.js app combines public site (`app/(frontend)`) and Payload admin (`app/(payload)`). Payload uses Local API server-side via `getPayloadClient()`.

- **Patterns to follow:**
  - All data fetching goes through `src/lib/fetch-data.ts` → `getPayloadClient()` (`src/lib/payload-client.ts`). Don't bypass.
  - Components use composition (`Card.Root`, `Avatar.Root`) — don't change this.
  - Path alias is `@/*` → `./*` (root, not `./src`). Imports look like `@/src/lib/utils`.
- **Conventions:**
  - PascalCase component files (`Navbar.tsx`, `WorkCard.tsx`).
  - kebab-case non-component TS (`fetch-data.ts`, `payload-client.ts`).
  - Single quotes (JS), double quotes (JSX), no semicolons, 2-space indent (Biome config).
- **Key files:**
  - `app/(frontend)/layout.tsx` — root layout, `<html lang="en">`, generates metadata, wraps Providers + Navbar
  - `app/(frontend)/page.tsx` — home with sections: hero, about, work, education, skills, projects, contact
  - `app/(frontend)/resume/page.tsx` — print-friendly resume
  - `src/modules/shared/components/Navbar.tsx` — bottom-fixed Dock with tooltips
  - `src/lib/fetch-data.ts` — all Payload queries; currently no locale param
  - `src/modules/payload/payload.config.ts` — Payload root config; no localization yet
  - All collections + Profile global in `src/modules/payload/collections/` and `globals/`
- **Gotchas:**
  - The `(payload)` route group is excluded from Biome formatting — don't touch it for i18n.
  - `next.config.ts` is currently `export default withPayload(nextConfig, { devBundleServerPackages: false })`. The exact target expression is:
    ```ts
    export default withPayload(createNextIntlPlugin('./src/i18n/request.ts')(nextConfig), { devBundleServerPackages: false })
    ```
    `createNextIntlPlugin('./src/i18n/request.ts')` returns a function; calling it with `nextConfig` produces a new `NextConfig` object that becomes `withPayload`'s first argument. `withPayload` stays outermost, options object stays as second arg.
  - Payload localization changes the SQL schema. First `pnpm dev` after enabling it migrates the DB. Existing `portfolio.db` will have its non-localized fields converted; pre-migration backup recommended (copy `portfolio.db` to `portfolio.db.bak` before first run).
  - `getPayloadClient()` returns the same Payload instance across requests. Locale is per-query, passed as `locale: 'en' | 'pt-BR'` argument to `find` / `findGlobal`.
  - Locale code must be `pt-BR` (BCP-47, hyphen, uppercase region) consistently — do NOT use `pt_BR` or `pt`.
  - `next-intl` requires `[locale]` to be a *catch-all* segment in the App Router. Move ALL of `app/(frontend)/*` (including `layout.tsx`, `page.tsx`, `resume/page.tsx`) into `app/(frontend)/[locale]/`.
  - `middleware.ts` lives at the project root (not inside `app/`). Its `matcher` must exclude `/admin`, `/api`, static files. Payload's `(payload)` group already excludes its own paths, so the matcher just needs to skip them.
- **Domain context:** Personal portfolio. Sole admin = repo owner. Default URL behavior must remain unchanged for existing English visitors (`/` stays `/`, not `/en/`).

## Runtime Environment

- **Start command:** `pnpm dev` (Turbopack)
- **Port:** 3000
- **Health check:** `GET http://localhost:3000` returns 200, `GET http://localhost:3000/pt-BR` returns 200 after implementation
- **Restart procedure:** Ctrl+C, `pnpm dev` again. After enabling Payload localization, the first run runs an automatic SQLite schema migration — observe console for migration logs.
- **Backup before migration:** `cp portfolio.db portfolio.db.bak` before Task 8 (Payload localization enable).

## Assumptions

- Locale code `pt-BR` is acceptable (BCP-47 hyphenated form). Both `next-intl` and Payload accept it. — Tasks 1, 8 depend on this.
- Payload's `fallback: true` handles existing English data gracefully on schema migration: existing values are stored as the `en` locale column. — Tasks 8, 9 depend on this.
- Visitor expects `/` to remain English (no `/en/` redirect). — Tasks 1, 4 depend on this.
- Date formats: English uses existing `MMM yyyy` (e.g. "Jan 2024"); pt-BR uses the same format pattern but with `ptBR` locale (yields lowercase month abbreviations: "jan. 2024"). — Task 7 depends on this.
- The `_payload-demo` directory and `app/my-route` are not part of the public site and don't need i18n. — verified by reading.
- Skills names, technology names, and social platform labels are technical/proper nouns that stay the same in both languages. — Task 8 depends on this.

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Payload schema migration corrupts existing `portfolio.db` | Low | High | Take `portfolio.db.bak` snapshot before Task 8; verify English content still readable via admin after migration. |
| `next-intl` middleware conflicts with Payload's API/admin routes | Medium | High | Strict matcher in `middleware.ts` excluding `/admin`, `/api`, `/_payload-demo`, `/my-route`, `_next`, static assets, favicon paths. Verify via Task 12 E2E. |
| `withPayload` and `createNextIntlPlugin` wrapping order breaks build | Low | Medium | Wrap as `withPayload(createNextIntlPlugin(...)(nextConfig), { devBundleServerPackages: false })`. Verify `pnpm build` succeeds in Task 1 DoD. |
| Hardcoded English strings remain after refactor | Medium | Medium | Task 5 + Task 6 each have a DoD line that grep finds zero non-`t()` literal strings inside `<Text>`/JSX text nodes within the affected page. |
| Untranslated pt-BR fields display empty instead of English | Low | High | Payload `fallback: true` is set in Task 8. fetch-data passes `fallbackLocale: 'en'` explicitly. Verified by TS-004. |
| Locale switcher loses scroll position / hash anchor | Low | Low | Use `next-intl/navigation` `Link` which preserves pathname; document switcher is intra-page navigation only. |
| TypeScript breaks because of stale `payload-types.ts` after Task 8 | High | Medium | Task 9 DoD includes `pnpm generate:types` + commit; verify `tsc --noEmit` clean. |

## Goal Verification

### Truths

1. Visiting `http://localhost:3000/` renders the site in English with `<html lang="en">`. (TS-001)
2. Visiting `http://localhost:3000/pt-BR` renders the site in Portuguese with `<html lang="pt-BR">`. (TS-002)
3. Locale switcher in the Navbar toggles between `/` and `/pt-BR/` and updates visible chrome strings. (TS-006)
4. CMS content fields not yet translated to pt-BR fall back to the English value (no blanks). (TS-004)
5. Dates render with locale-correct month abbreviations: e.g. "Jan 2024" in en, "jan. 2024" in pt-BR. (TS-005)
6. `pnpm build` succeeds. `pnpm exec tsc --noEmit` reports zero errors. `pnpm lint` reports zero new errors.
7. Payload admin (`/admin`) continues to load and edit collections; existing English content is preserved post-migration.

### Artifacts

- `src/i18n/routing.ts` (real `defineRouting` config with `locales: ['en', 'pt-BR']`)
- `src/i18n/messages/en.json` and `pt-BR.json` (real translation key sets)
- `middleware.ts` at project root (real matcher)
- `src/modules/payload/payload.config.ts` with `localization` block
- All targeted collections/globals updated with `localized: true`
- `app/(frontend)/[locale]/layout.tsx`, `page.tsx`, `resume/page.tsx`
- `src/modules/shared/components/LocaleSwitcher.tsx`
- `src/lib/date.ts` (locale-aware `formatDate` helper)
- Updated `src/lib/fetch-data.ts` accepting `locale` param

## E2E Test Scenarios

### TS-001: English homepage at root URL
**Priority:** Critical
**Preconditions:** Dev server running, browser supports `Accept-Language: en`.
**Mapped Tasks:** Task 1, 4, 5

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `http://localhost:3000/` | Page returns 200, `<html lang="en">` |
| 2 | Read page text | Section headings show "About", "Work Experience", "Education", "Skills", "My Projects", "Contact" |
| 3 | Read URL bar | URL is `/` (no `/en/` prefix) |

### TS-002: Portuguese homepage via prefix
**Priority:** Critical
**Preconditions:** Dev server running.
**Mapped Tasks:** Task 1, 4, 5

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `http://localhost:3000/pt-BR` | Page returns 200, `<html lang="pt-BR">` |
| 2 | Read page text | Section headings show "Sobre", "Experiência Profissional", "Educação", "Habilidades", "Meus Projetos", "Contato" |

### TS-003: Resume page bilingual
**Priority:** High
**Preconditions:** Dev server running.
**Mapped Tasks:** Task 6, 7

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/resume` | Resume renders with English `Skills`, `Experience`, `Education`, `AboutMe` headers |
| 2 | Navigate to `/pt-BR/resume` | Resume renders with `Habilidades`, `Experiência`, `Educação`, `SobreMim` |
| 3 | Read date ranges | English uses "Jan 2024", Portuguese uses "jan. 2024" (date-fns ptBR locale output) |

### TS-004: Fallback to English when pt-BR field empty
**Priority:** Critical
**Preconditions:** Payload localization enabled. At least one project has English description but no pt-BR translation.
**Mapped Tasks:** Task 8, 9

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open admin `/admin/collections/projects/<id>`, ensure pt-BR description is empty for one project | Admin shows empty pt-BR field |
| 2 | Navigate to `/pt-BR/` (frontend) | The project card displays the English description (fallback), NOT empty/blank |

### TS-005: Locale-aware date formatting
**Priority:** High
**Preconditions:** Dev server running. Work and Education entries exist with start/end dates.
**Mapped Tasks:** Task 7

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Visit `/` | Date ranges show English month abbreviations: e.g. "Jan 2024" |
| 2 | Visit `/pt-BR/` | Date ranges show Portuguese month abbreviations: e.g. "jan. 2024" (lowercase, with period — date-fns ptBR convention) |
| 3 | Visit `/resume` and `/pt-BR/resume` | Same locale-correct formatting in resume context |

### TS-006: Locale switcher in Navbar
**Priority:** Critical
**Preconditions:** Dev server running, on `/`.
**Mapped Tasks:** Task 11

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Locate locale switcher in Navbar | Visible globe/language icon with tooltip |
| 2 | Click switcher, select "Português" | URL changes to `/pt-BR/`, page chrome updates to Portuguese without full reload jank |
| 3 | Click switcher again, select "English" | URL returns to `/`, chrome back to English |
| 4 | Visit `/pt-BR/resume`, switch to English | URL becomes `/resume` (preserves pathname segment) |

### TS-007: Payload admin unaffected
**Priority:** Critical
**Preconditions:** Dev server running, admin user exists.
**Mapped Tasks:** Task 8

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/admin` | Admin login screen renders normally (not localized to pt-BR — out of scope) |
| 2 | Log in, open `/admin/collections/projects` | List view renders with existing projects intact |
| 3 | Open a project | Localized fields show locale tabs (`en` / `pt-BR`); English value is in `en` tab |

### TS-008: Build passes
**Priority:** Critical
**Preconditions:** All tasks complete.
**Mapped Tasks:** All

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run `pnpm exec tsc --noEmit` | Zero errors |
| 2 | Run `pnpm lint` | Zero new errors |
| 3 | Run `pnpm build` | Successful build, no warnings about missing locale or message keys |

## Progress Tracking

- [x] Task 1: Install next-intl + scaffold routing/request config
- [x] Task 2: Add root middleware.ts with locale matcher
- [x] Task 3: Create message JSON files (en + pt-BR) with extracted UI strings
- [x] Task 4: Restructure app/(frontend) into [locale] segment + dynamic html lang + locale-aware metadata
- [x] Task 5: Translate home page hardcoded strings
- [x] Task 6: Translate resume page hardcoded strings
- [x] Task 7: Locale-aware date formatter
- [x] Task 8: Enable Payload localization + mark fields localized:true
- [x] Task 9: Update fetch-data.ts to accept locale + regen Payload types
- [x] Task 10: Wire locale param through pages to fetch-data
- [x] Task 11: LocaleSwitcher component + integrate into Navbar
- [x] Task 12: E2E verification + cleanup pass

**Total Tasks:** 12 | **Completed:** 12 | **Remaining:** 0

## Implementation Tasks

### Task 1: Install next-intl + scaffold routing/request config

**Objective:** Add next-intl dep, create routing/request config files, wire next.config.ts plugin without breaking existing build.
**Dependencies:** None
**Mapped Scenarios:** TS-008

**Files:**
- Modify: `package.json` (add `next-intl` dep)
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Modify: `next.config.ts`

**Key Decisions / Notes:**
- Use exact locale codes `'en'` and `'pt-BR'`. Default `'en'`. `localePrefix: 'as-needed'`.
- Wrap order: `withPayload(createNextIntlPlugin('./src/i18n/request.ts')(nextConfig), { devBundleServerPackages: false })`. Payload wrapper stays outermost.
- `request.ts` exports default `getRequestConfig` returning `{ locale, messages }` where messages are imported from `./messages/${locale}.json`. Validate locale and call `notFound()` if invalid.

**Definition of Done:**
- [ ] `pnpm install` completes
- [ ] `pnpm exec tsc --noEmit` passes
- [ ] `pnpm build` succeeds (existing English-only behavior unchanged at this point — no [locale] move yet, but plugin wired)
- [ ] `routing.ts` exports `routing` object with both locales

**Verify:**
- `pnpm install && pnpm exec tsc --noEmit && pnpm build`

---

### Task 2: Add root middleware.ts with locale matcher

**Objective:** Create `middleware.ts` at project root that uses next-intl middleware, with matcher excluding admin/API/payload-demo/static.
**Dependencies:** Task 1
**Mapped Scenarios:** TS-001, TS-002, TS-007

**Files:**
- Create: `middleware.ts` (project root, not inside `app/`)

**Key Decisions / Notes:**
- Import `createMiddleware` from `next-intl/middleware` and pass the `routing` object from Task 1.
- Matcher pattern: `['/((?!api|admin|_payload-demo|my-route|_next|favicon|favicon.ico|.*\\..*).*)']` — excludes Payload's API + admin, the demo dirs, Next.js internals, and any path with a file extension (covers `/favicon/*.png`, `/site.webmanifest`).
- Verify TS-007 manually after this task: `/admin` should NOT be locale-rewritten.

**Definition of Done:**
- [ ] Middleware compiles
- [ ] `curl -I http://localhost:3000/admin` returns Payload admin page (not redirected to `/admin/en`)
- [ ] `curl -I http://localhost:3000/pt-BR` returns 200 (rewrite, not 404 — even though pages aren't moved yet, middleware should accept the prefix)

**Verify:**
- `pnpm dev` then `curl -sI http://localhost:3000/admin | head -1` and `curl -sI http://localhost:3000/api/users | head -1` both succeed without locale rewrite

---

### Task 3: Create message JSON files (en + pt-BR) with extracted UI strings

**Objective:** Create initial `en.json` and `pt-BR.json` with all hardcoded UI strings extracted from home, resume, and Navbar, organized in nested namespaces.
**Dependencies:** Task 1
**Mapped Scenarios:** TS-002

**Files:**
- Create: `src/i18n/messages/en.json`
- Create: `src/i18n/messages/pt-BR.json`

**Key Decisions / Notes:**
- Nested structure: `home.hero.greeting`, `home.about.title`, `home.work.title`, `home.education.title`, `home.skills.title`, `home.projects.tag`, `home.projects.heading`, `home.projects.body`, `home.contact.tag`, `home.contact.heading`, `home.contact.body`, `resume.skills`, `resume.experience`, `resume.education`, `resume.aboutMe`, `resume.present`, `navbar.home`, `navbar.resume`, `navbar.theme`, `navbar.localeSwitcher`, `localeSwitcher.english`, `localeSwitcher.portuguese`.
- `home.hero.greeting` uses ICU placeholder: `"Hi, I'm {name} 👋"` / `"Olá, sou {name} 👋"`.
- `home.contact.body` uses rich text placeholder for the inline link: `"Hey! I just met you, and this is crazy, but here's my <link>linkedin</link>, so dm me maybe."`. pt-BR: `"E aí! Acabei de te conhecer, e isso é loucura, mas aqui está meu <link>linkedin</link>, então me chama!"`.
- Escape apostrophes properly. Use straight quotes `'`, not curly.
- Initial pt-BR translations are seed text; user can refine in source control later.

**Definition of Done:**
- [ ] Both JSON files parse as valid JSON
- [ ] Both files have identical key sets at every nesting level — verify with the recursive flatten check below
- [ ] `pnpm exec tsc --noEmit` succeeds (next-intl ambient types pick up messages)

**Verify:**
- Recursive deep-key parity (catches nested mismatches that top-level `Object.keys` misses):
  ```bash
  node -e "const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>typeof v==='object'&&v!==null?flat(v,p+k+'.'):[p+k]);const a=flat(require('./src/i18n/messages/en.json')).sort();const b=flat(require('./src/i18n/messages/pt-BR.json')).sort();const diff=[...a.filter(k=>!b.includes(k)).map(k=>'-'+k),...b.filter(k=>!a.includes(k)).map(k=>'+'+k)];if(diff.length){console.error('Key mismatch:',diff);process.exit(1)}else{console.log('OK',a.length,'keys')}"
  ```

---

### Task 4: Restructure app/(frontend) into [locale] segment + dynamic html lang + locale-aware metadata

**Objective:** Move public pages under `[locale]`, update root layout to use `NextIntlClientProvider` and dynamic `<html lang>`, make `generateMetadata` locale-aware.
**Dependencies:** Task 1, 2, 3
**Mapped Scenarios:** TS-001, TS-002

**Files:**
- Move + Modify: `app/(frontend)/layout.tsx` → `app/(frontend)/[locale]/layout.tsx`
- Move + Modify: `app/(frontend)/page.tsx` → `app/(frontend)/[locale]/page.tsx`
- Move + Modify: `app/(frontend)/resume/page.tsx` → `app/(frontend)/[locale]/resume/page.tsx`
- Modify: `app/(frontend)/[locale]/layout.tsx` — accept `params: Promise<{ locale: string }>`, await it, call `setRequestLocale(locale)`, validate against routing locales, wrap children in `<NextIntlClientProvider>`, set `<html lang={locale}>`.

**Key Decisions / Notes:**
- Async layout signature for Next 15: `export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> })` then `const { locale } = await params`.
- Validate: `if (!routing.locales.includes(locale)) notFound()`.
- `generateMetadata` also receives `params` with locale; map locale to OG tag (`en` → `en_US`, `pt-BR` → `pt_BR`).
- Add `export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })) }`.
- Keep all other layout content (font, providers, navbar) unchanged.

**Definition of Done:**
- [ ] Both `/` and `/pt-BR/` return 200 in dev
- [ ] `<html lang="en">` on `/`, `<html lang="pt-BR">` on `/pt-BR/`
- [ ] `pnpm build` succeeds
- [ ] Existing routes `/resume` and `/pt-BR/resume` both render

**Verify:**
- `curl -s http://localhost:3000/ | grep '<html'` and same for `/pt-BR`

---

### Task 5: Translate home page hardcoded strings

**Objective:** Replace every hardcoded English string in the home page with `t('...')` calls using the keys defined in Task 3.
**Dependencies:** Task 3, 4
**Mapped Scenarios:** TS-001, TS-002

**Files:**
- Modify: `app/(frontend)/[locale]/page.tsx`

**Key Decisions / Notes:**
- Use `getTranslations` from `next-intl/server` (not the client `useTranslations`) since this is a server component.
- Call `await getTranslations('home')` once per logical section, OR scope per-section: `const tHero = await getTranslations('home.hero')`.
- The hero greeting uses interpolation: `t('hero.greeting', { name: PROFILE.name })`.
- The contact body uses rich text: `t.rich('contact.body', { link: (chunks) => <Link href="https://linkedin.com/in/mvacoimbra" className="...">{chunks}</Link> })`.
- Strings to replace: `"About"`, `"Work Experience"`, `"Education"`, `"Skills"`, `"My Projects"`, `"Check out my latest work"`, the projects intro paragraph, `"Contact"`, `"Get in Touch"`, contact body paragraph, hero greeting.

**Definition of Done:**
- [ ] No literal English strings remain in JSX text nodes of `page.tsx` (verify by visual diff)
- [ ] `/` shows English, `/pt-BR/` shows Portuguese for all section headings and body copy
- [ ] `pnpm exec tsc --noEmit` clean (next-intl types pick up keys)
- [ ] `pnpm lint` clean

**Verify:**
- Visit both URLs in browser; compare section headings against `messages/en.json` and `messages/pt-BR.json`

---

### Task 6: Translate resume page hardcoded strings

**Objective:** Replace hardcoded section headers and "present" string in resume page with translations.
**Dependencies:** Task 3, 4
**Mapped Scenarios:** TS-003

**Files:**
- Modify: `app/(frontend)/[locale]/resume/page.tsx`

**Key Decisions / Notes:**
- Section headers: `"Skills"` → `t('resume.skills')`, `"Experience"` → `t('resume.experience')`, `"Education"` → `t('resume.education')`, `"AboutMe"` → `t('resume.aboutMe')`.
- "present" literal in date range → `t('resume.present')`.
- pt-BR translations: `"Habilidades"`, `"Experiência"`, `"Educação"`, `"SobreMim"`, `"presente"`.

**Definition of Done:**
- [ ] No literal English strings remain in JSX text nodes
- [ ] `/resume` and `/pt-BR/resume` both render correctly with locale-correct headers

**Verify:**
- Browser visit both URLs

---

### Task 7: Locale-aware date formatter

**Objective:** Centralize date formatting in `src/lib/date.ts` with locale-aware behavior using `date-fns` + `ptBR` locale; replace inline `formatDate` definitions in WorkCard, EducationCard, and resume page.
**Dependencies:** Task 4
**Mapped Scenarios:** TS-005

**Files:**
- Create: `src/lib/date.ts`
- Modify: `src/modules/shared/components/WorkCard.tsx`
- Modify: `src/modules/shared/components/EducationCard.tsx`
- Modify: `app/(frontend)/[locale]/resume/page.tsx`

**Key Decisions / Notes:**
- New helper signature: `formatMonthYear(dateString: string, locale: 'en' | 'pt-BR'): string`.
- Maps `locale` to date-fns locale: `pt-BR` → `ptBR` (imported from `date-fns/locale`), default English uses no `locale` option (date-fns default).
- Returns empty string on falsy input. Returns `dateString` on parse error. Treats `'present'` value via `t('resume.present')` at *call site* — the formatter does NOT translate "present" because it has no access to translations; that stays in the page/component.
- Pattern: `format(parseISO(dateString), 'MMM yyyy', { locale: locale === 'pt-BR' ? ptBR : undefined })`.
- WorkCard and EducationCard currently are `'use client'` with hardcoded formatter — pass `locale` as a prop. Get locale from `useLocale()` (next-intl client hook) inside the component, OR pass from the parent server component. Prefer `useLocale()` to avoid prop drilling.

**Definition of Done:**
- [ ] WorkCard, EducationCard, resume page no longer define their own `formatDate`
- [ ] `/` shows "Jan 2024", `/pt-BR/` shows "jan. 2024" for the same date
- [ ] `pnpm exec tsc --noEmit` clean

**Verify:**
- Browser visit; inspect any work card date range across both locales

---

### Task 8: Enable Payload localization + mark fields localized:true

**Objective:** Enable `localization` in Payload config and mark CMS fields that should differ per locale.
**Dependencies:** None (independent of next-intl tasks; touches Payload only)
**Mapped Scenarios:** TS-004, TS-007

**Files:**
- Modify: `src/modules/payload/payload.config.ts`
- Modify: `src/modules/payload/globals/Profile.ts`
- Modify: `src/modules/payload/collections/Projects.ts`
- Modify: `src/modules/payload/collections/Work.ts`
- Modify: `src/modules/payload/collections/Education.ts`

**Key Decisions / Notes:**
- payload.config: add
  ```ts
  localization: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    fallback: true,
  }
  ```
- Mark `localized: true` on:
  - `Profile.description`, `Profile.about`
  - `Projects.title`, `Projects.subtitle`, `Projects.description`
  - `Work.roles[].title`, `Work.roles[].description`
  - `Education.degree`
- Do NOT localize: technology arrays, URLs, image references, `order` fields, `companyName`, `school`, `Skills.name`, `socialLinks` array.
- **Pre-task:** `cp portfolio.db portfolio.db.bak` — capture safety backup before first migration.
- After config save, the next `pnpm dev` run triggers SQLite schema migration. Watch console for migration log; expect new `_locales` tables.

**Definition of Done:**
- [ ] `portfolio.db.bak` exists in repo root (gitignore both `*.db` and `*.db.bak` if not already; verify before commit)
- [ ] `pnpm dev` starts without errors
- [ ] `/admin` loads, opens an existing project, shows locale tabs (`en` / `pt-BR`) on the localized fields
- [ ] Existing English values are present in the `en` tab
- [ ] `pt-BR` tabs are empty for all existing records
- [ ] Frontend `/` still renders existing English content unchanged
- [ ] **SQLite migration verified:** `sqlite3 portfolio.db "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_locales%'"` returns at least one `_locales` table; and `sqlite3 portfolio.db "SELECT title FROM projects_locales WHERE _locale='en' LIMIT 1"` returns a non-empty value (existing English title backfilled into `en` locale row). If empty, restore `portfolio.db.bak` and investigate before proceeding.

**Verify:**
- Open `/admin/collections/projects`, click a project, confirm locale tabs visible on `title`, `subtitle`, `description`
- Frontend smoke: `/` renders project list with existing English text intact
- Direct SQLite check: `sqlite3 portfolio.db ".schema projects_locales"` shows the localized columns; SELECT returns existing English values

---

### Task 9: Update fetch-data.ts to accept locale + regen Payload types

**Objective:** Refactor every fetcher in `src/lib/fetch-data.ts` to accept `locale: 'en' | 'pt-BR'` and pass it (plus `fallbackLocale: 'en'`) to Payload Local API calls. Regenerate `payload-types.ts`.
**Dependencies:** Task 8
**Mapped Scenarios:** TS-004

**Files:**
- Modify: `src/lib/fetch-data.ts`
- Modify: `src/lib/types.ts` (add `Locale` type union)
- Regenerate: `src/modules/payload/payload-types.ts`

**Key Decisions / Notes:**
- Add `export type Locale = 'en' | 'pt-BR'` to `src/lib/types.ts`.
- Each function signature becomes: `getProfile(locale: Locale): Promise<Profile>`, etc. No default parameter — caller must pass.
- Pass `{ locale, fallbackLocale: 'en' }` on every `payload.find` and `payload.findGlobal` call.
- Run `pnpm generate:types` after Task 8 schema changes; commit the regenerated `payload-types.ts`.
- The shape returned by `findGlobal({ slug: 'profile' })` for localized fields with `fallback: true` is identical to the non-localized shape (still flat strings, not `{en, pt-BR}` objects), so the mapping logic in fetch-data does NOT need to change beyond adding the locale param.

**Definition of Done:**
- [ ] All five fetchers in `fetch-data.ts` accept and forward `locale`
- [ ] `payload-types.ts` regenerated and committed
- [ ] `pnpm exec tsc --noEmit` clean
- [ ] Calling fetchers with `'pt-BR'` returns Portuguese data; with `'en'` returns English; missing pt-BR fields fall back to English text

**Verify:**
- Add a temporary log in `getProfile` to print the returned name → run `pnpm dev` and visit both `/` and `/pt-BR/` → remove log

---

### Task 10: Wire locale param through pages to fetch-data

**Objective:** Pages receive `locale` from route params and pass it to all fetcher calls. Update `generateMetadata` to also receive and use locale.
**Dependencies:** Task 4, 9
**Mapped Scenarios:** TS-002, TS-004

**Files:**
- Modify: `app/(frontend)/[locale]/layout.tsx` (pass locale to `getNavbarItems`; update `generateMetadata` to accept `params` and call `getProfile(locale)`)
- Modify: `app/(frontend)/[locale]/page.tsx` (pass locale to all fetchers)
- Modify: `app/(frontend)/[locale]/resume/page.tsx` (pass locale to all fetchers)
- Modify: `src/lib/fetch-data.ts` (`getNavbarItems` signature: also accept locale; emit `labelKey` for built-in items, keep `label` for CMS-supplied social link platform names)
- Modify: `src/lib/types.ts` (extend `NavbarItem` with both `label?: string` AND `labelKey?: string` — see notes)

**Key Decisions / Notes:**
- `getNavbarItems` currently hardcodes labels `'Resume'` and `'Home'`. Change to return `labelKey: 'navbar.home' | 'navbar.resume'` for built-in items. Social link entries (from CMS) keep `label: link.platform` because platform names are CMS-supplied strings.
- **Dual-field NavbarItem type** (preserves CMS data path): keep `label?: string` AND add `labelKey?: string`. Navbar renders: `item.labelKey ? t(item.labelKey) : item.label`. This avoids `t(undefined)` runtime errors and TypeScript narrowing issues.
- `generateMetadata` currently calls `getProfile()` (no args). After Task 9 makes locale required, this errors. Update signature to:
  ```ts
  export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const profile = await getProfile(locale as Locale)
    // ...
    openGraph: { locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US', ... }
  }
  ```
- Pass `locale` from layout's `params` into both `getNavbarItems(locale)` and `getProfile(locale)`.

**Definition of Done:**
- [ ] No `await getX()` calls without explicit locale argument anywhere in `app/(frontend)/[locale]/`
- [ ] `generateMetadata` passes locale to `getProfile` and maps to OG locale string
- [ ] `pnpm exec tsc --noEmit` clean
- [ ] Navbar labels show "Home/Resume" on `/` and "Início/Currículo" on `/pt-BR/`
- [ ] `<meta property="og:locale" content="pt_BR">` present on `/pt-BR/`, `en_US` on `/`

**Verify:**
- Browser hover Navbar items on both locales

---

### Task 11: LocaleSwitcher component + locale-aware Navbar

**Objective:** Create a switcher component, integrate into Navbar, AND replace plain `next/link` with `next-intl/navigation` `Link` for ALL Navbar items so internal nav (Home, Resume) preserves locale.
**Dependencies:** Task 10
**Mapped Scenarios:** TS-006

**Files:**
- Create: `src/i18n/navigation.ts` (export `Link`, `usePathname`, `useRouter` from `createNavigation(routing)`)
- Create: `src/modules/shared/components/LocaleSwitcher.tsx`
- Modify: `src/modules/shared/components/Navbar.tsx` — replace `import Link from 'next/link'` with `import { Link } from '@/src/i18n/navigation'`; add LocaleSwitcher between items separator and ThemeToggle

**Key Decisions / Notes:**
- The locale-aware `Link` from `next-intl/navigation` automatically prefixes hrefs with the current locale. So `<Link href="/resume">` on `/pt-BR/` resolves to `/pt-BR/resume`. This is required for the existing Home/Resume Navbar items to stay locale-correct.
- LocaleSwitcher: client component, reads current locale via `useLocale()`, reads pathname via `usePathname()` (from `src/i18n/navigation.ts` — returns *unprefixed* pathname). Renders shadcn DropdownMenu (`ui/DropdownMenu.tsx` already exists) with two items: "English" / "Português", each rendered as `<Link href={pathname} locale="en|pt-BR">`.
- Trigger: `Globe` icon from `lucide-react`. Tooltip uses `t('navbar.localeSwitcher')`.

**Definition of Done:**
- [ ] Switcher visible in Navbar in both locales
- [ ] Clicking "Português" on `/` navigates to `/pt-BR/`
- [ ] Clicking "English" on `/pt-BR/resume` navigates to `/resume` (path preserved)
- [ ] **Clicking "Home" while on `/pt-BR/` stays on `/pt-BR/` (does NOT drop locale to `/`)**
- [ ] **Clicking "Resume" while on `/pt-BR/` navigates to `/pt-BR/resume` (does NOT drop locale to `/resume`)**
- [ ] Navbar.tsx no longer imports from `'next/link'`
- [ ] Tooltip text translates per locale

**Verify:**
- TS-006 walked manually in browser

---

### Task 12: E2E verification + cleanup pass

**Objective:** Run full quality gate (typecheck, lint, build) and walk every E2E scenario in browser. Fix anything found.
**Dependencies:** Tasks 1–11
**Mapped Scenarios:** TS-001 through TS-008

**Files:**
- Touch only as needed for fixes uncovered during verification.

**Key Decisions / Notes:**
- Run in order: `pnpm exec tsc --noEmit` → `pnpm lint` → `pnpm format:fix` → `pnpm build`.
- Walk all 8 scenarios with browser automation (Chrome DevTools MCP or playwright-cli).
- Verify no hardcoded English strings remain in any modified file: `grep -nE ">\\s*[A-Z][a-z]+\\s+[A-Z]" app/\\(frontend\\)/[locale] src/modules/shared/components | grep -v 'import\\|//\\|t('` (manual inspection).
- Take a clean snapshot of `portfolio.db` for posterity if migration succeeded; document `portfolio.db.bak` exists in plan completion notes.

**Definition of Done:**
- [ ] All 8 TS scenarios pass
- [ ] Quality gate: typecheck 0 errors, lint 0 new errors, build succeeds
- [ ] Hardcoded English strings audit clean

**Verify:**
- Run quality gate commands
- Browser walk all 8 scenarios

## Open Questions

None — all addressed in Q&A rounds.

## Deferred Ideas

- Translate Payload Admin Panel UI via `@payloadcms/translations` (out of scope this plan)
- SEO `<link rel="alternate" hreflang>` tags + bilingual sitemap
- Localizing technology badge names (e.g. add a `displayName.pt-BR` field to a normalized Technologies collection)
- Add a third locale (e.g. `es`)
- Persist user's chosen locale in a cookie beyond next-intl's default behavior (extend `maxAge`)
- E2E browser tests via Playwright (deps installed but not configured — out of scope)
- Locale-aware `not-found.tsx` under `app/(frontend)/[locale]/not-found.tsx` — currently a pt-BR visitor hitting `/pt-BR/nonexistent` will get the default English Next.js 404 page
