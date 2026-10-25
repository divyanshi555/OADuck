---
id: development
title: Development and maintenance
sidebar_position: 4
---

# Development and maintenance

## Useful commands

From the app root:

```bash
npm run dev       # Prisma generate + Next.js development server
npm run lint      # ESLint
npm run build     # Prisma generate + production Next.js build
```

From `docs-site/`:

```bash
npm start         # Docusaurus development server
npm run build     # Static documentation build
npm run serve     # Serve the generated build
```

## Change workflow

1. Identify whether the change belongs to a page, client component, route handler, library integration, Prisma schema, or migration.
2. Check the route’s authentication and ownership boundary.
3. Update docs when behavior, API contracts, or data relationships change.
4. Run focused lint/build checks.
5. For UI changes, inspect desktop and mobile layouts.

## Environment and secrets

Keep secrets in `.env` and use `.env.example` to document required names without values. Do not commit database URLs, auth secrets, provider credentials, or execution service tokens.

## Known operational note

Next.js currently reports that the `middleware` convention is deprecated in favor of `proxy`. This is a framework migration concern and is separate from the application’s current auth behavior; plan it as an explicit upgrade task rather than changing it casually during feature work.
