---
name: mvacoimbra.dev-conventions
description: Code style, file naming, and component composition patterns for the portfolio
---

# Conventions

## ⛔ Package Manager

**Always use pnpm.** Never `npm` or `yarn` — `pnpm-lock.yaml` is the committed lockfile.

## File Naming

- **React components: PascalCase** (`WorkCard.tsx`, `Navbar.tsx`, `Card.tsx`).
  This applies to `src/modules/shared/components/` AND `src/modules/shared/components/ui/` (shadcn primitives are renamed to PascalCase here, NOT the upstream kebab-case).
- **Non-component TS:** kebab-case (`fetch-data.ts`, `payload-client.ts`, `use-mobile.ts`).
- **Payload collections/globals:** PascalCase matching the export (`Projects.ts` exports `Projects`).

## Component Composition Pattern

Use the dot-notation composition pattern for compound components:

```tsx
// Good — Card.Root, Card.Header, Card.Title
<Card.Root>
  <Card.Header>
    <Card.Title>...</Card.Title>
  </Card.Header>
</Card.Root>
```

Not flat-named subcomponents (`<CardRoot>`, `<CardHeader>`).

## Biome (formatter + linter)

Config in `biome.json`. Highlights:

- **Single quotes** in JS/TS, **double quotes** in JSX, **no semicolons**, **2-space indent**
- `noNonNullAssertion: warn` — avoid `!` non-null assertions
- `noExplicitAny: warn` — avoid `any`, prefer `unknown` or generics
- `noExportedImports: error` — don't re-export imports inline
- `noUnusedImports: warn` — clean up unused imports
- Excludes: `**/*.js`, `**/*.cjs`, `node_modules`, `.next`, `(payload)`, `app/main.tsx`, `src/shared/components/deprecated-ui` — don't waste time formatting these
- Tailwind directives in CSS are recognized — `@tailwind`, `@apply`, etc. won't lint-error

## TypeScript

- `strict: true` is on. No `any` without a `// biome-ignore` line and a reason.
- Prefer explicit return types on exported functions.
- `tsconfig.json` excludes `node_modules`; `.next/types` are included.

## Imports

Use the `@/` root alias for cross-module imports (`@/src/lib/utils`, `@/src/modules/payload/payload-types`). Use relative imports only for siblings within the same directory.

## React Compiler

`babel-plugin-react-compiler` is enabled. Don't manually add `useMemo`/`useCallback` for trivial cases — let the compiler handle it. Add them only when profiling shows they're needed.
