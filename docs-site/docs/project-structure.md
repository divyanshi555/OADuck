---
title: Project Folder Structure
sidebar_position: 4
---

# Project Folder Structure

```text
.
├── src/
│   ├── app/
│   │   ├── api/                 # Next.js API route handlers
│   │   ├── admin/               # Admin dashboard and question/user screens
│   │   ├── components/          # Shared UI, editor monitoring, and landing components
│   │   ├── profile/             # Profile pages, editor, and dashboard
│   │   ├── questions/           # Question library and coding workspace
│   │   ├── practice/            # Practice selection/session pages
│   │   ├── duck-insight/        # AI feedback page
│   │   ├── layout.jsx           # Root layout and global providers
│   │   └── page.jsx             # Landing page
│   ├── lib/                     # Prisma, Judge0, language, and Duck Insight modules
│   ├── generated/prisma/        # Generated Prisma Client (do not edit)
│   ├── auth.js                  # Auth.js setup and callbacks
│   └── middleware.js            # Route protection and redirects
├── prisma/
│   ├── schema.prisma            # PostgreSQL models and relations
│   └── migrations/              # Database migration history
├── docs-site/
│   ├── docs/                    # Docusaurus documentation pages
│   ├── src/css/                 # Docusaurus theme styling
│   ├── static/                  # Documentation images and static assets
│   ├── docusaurus.config.js     # Site configuration
│   └── sidebars.js              # Documentation navigation
├── public/                      # Main app assets and generated public/docs site
├── scripts/
│   ├── copy-docs.mjs            # Copies Docusaurus build output into public/docs
│   └── setup-judge0.ps1         # Optional local Judge0 setup
├── judge0/                      # Local Judge0 Compose configuration
├── auth.config.js               # Google OAuth provider configuration
├── prisma.config.mjs            # Prisma schema, migration, and DB URL configuration
├── next.config.mjs              # Rewrites for the static /docs site
├── neon.ts                      # Neon branch configuration
└── package.json                 # Main app commands and dependencies
```

## Important source locations

- **Pages and UI**: `src/app/questions/page.jsx` lists questions; `src/app/questions/[id]/page.jsx` hosts the coding workspace; `src/app/practice/page.jsx` selects a question; `src/app/profile/` and `src/app/admin/` contain role-specific screens.
- **API handlers**: `src/app/api/` follows the Next.js App Router convention (`route.js`). Key areas are `questions/`, `code/`, `assessments/`, `profile/`, `admin/`, and `duck-insight/`. `/api/run` and `/api/submit` are thin route aliases to the code execution and submission handlers under `api/code/`.
- **Authentication and access control**: `src/auth.js` configures providers and callbacks; root `auth.config.js` declares Google OAuth; `src/middleware.js` protects matched application routes. API handlers also perform their own authorization checks.
- **Server-side integrations**: `src/lib/prisma.js` owns the Prisma client; `src/lib/judge0.js` calls Judge0; `src/lib/duck-insight.js` and `src/lib/duck-insight-schema.js` build and validate AI feedback; `src/lib/languages.js` defines supported languages.
- **Database model**: `prisma/schema.prisma` defines models including `User`, `Question`, `TestCase`, `Session`, `AssessmentViolation`, `Hint`, and `Submission`.

There are no separate `controllers/`, `models/`, or `services/` directories: API route handlers contain request-level orchestration, Prisma schema files define persisted models, and reusable service logic lives in `src/lib/`.
