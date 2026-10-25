---
id: env-config
title: Environment configuration
sidebar_position: 1
---

# Environment configuration

The canonical variable names are documented in the repository .env.example. Keep real values in .env; never commit them.

## Configuration groups

### Database

Prisma uses the PostgreSQL connection configured through prisma.config.mjs. The database must be reachable before server routes that use Prisma can work.

### Authentication

NextAuth requires its configured secret and provider settings. Credentials authorization checks the submitted email/password against the User record and its bcrypt password hash. OAuth provider settings are read from the auth provider configuration.

### Execution and AI

Judge0 or the configured execution service needs its endpoint and credentials. Duck Insight providers use server-side API keys. Both stay behind server routes so provider credentials never reach the browser.

### Documentation URL

The main app uses NEXT_PUBLIC_DOCS_URL=http://localhost:3001/docs/overview. If omitted, that local URL is used as the fallback. Set it to the deployed Docusaurus URL in production.

## Local setup rule

When adding a new variable, update .env.example, this documentation page, and the code that consumes it. Prefer explicit startup errors for required secrets over silent misconfiguration.
