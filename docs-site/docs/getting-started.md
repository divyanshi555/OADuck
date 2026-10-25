---
id: getting-started
title: Getting started
sidebar_position: 2
---

# Getting started

## Requirements

- Node.js compatible with the project dependencies.
- npm.
- A PostgreSQL database reachable through the configured environment.
- Authentication and code-execution environment variables from `.env.example`.
- Prisma CLI access for client generation and migrations.

## Install and run the app

From the repository root:

```bash
npm install
npm run dev
```

The Next.js app runs on the configured local development port, normally `http://localhost:3000`.

The development script runs Prisma generation before starting Next.js. For a production-style check:

```bash
npm run build
npm run start
```

## Database setup

1. Copy `.env.example` to `.env`.
2. Set the PostgreSQL connection values required by `prisma.config.mjs`.
3. Run the appropriate Prisma migration workflow for the environment.
4. Generate the client with `npx prisma generate` if you change the schema.

## First user flow

1. Open `/` while signed out.
2. Choose **Sign up** and complete registration.
3. Sign in through the login route.
4. If the account needs password setup, the middleware sends it to `/setup-password`.
5. Authenticated users land on `/practice`.

## Documentation site

The Docusaurus site lives in `docs-site/` and is intentionally separate from the Next.js app:

```bash
cd docs-site
npm install
npm start
```

It is normally available at `http://localhost:3001`.
