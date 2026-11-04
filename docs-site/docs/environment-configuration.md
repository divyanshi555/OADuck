---
title: Environment Variables and Configuration
sidebar_position: 15
---

# Environment Variables and Configuration

The application reads server settings from `process.env`; none of the values below should be committed with real credentials. Start from the root `.env.example`, supply values through the local environment or deployment secret manager, and keep private keys server-side.

| Variable | Required? | Purpose and consumer |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma's Neon adapter in `src/lib/prisma.js` and Prisma CLI config. |
| `AUTH_SECRET` | Yes in production | Auth.js JWT/session encryption secret. Auth.js may also accept the legacy `NEXTAUTH_SECRET` alias. Generate a unique high-entropy secret for each deployment; do not reuse an example value. |
| `AUTH_GOOGLE_ID` | Required for Google sign-in | Google OAuth client ID inferred by Auth.js for the configured Google provider. |
| `AUTH_GOOGLE_SECRET` | Required for Google sign-in | Google OAuth client secret inferred by Auth.js. Configure the provider's callback URL for the deployed application. |
| `AUTH_ADMIN_EMAIL` | No | Email promoted to the `ADMIN` role by registration/sign-in logic. Without it, that email-based bootstrap promotion does not occur; existing admins can still use the admin user-management flow. |
| `AI_API_KEY` | Required for Duck Insight only | Server-side Google Generative AI credential used by `src/lib/duck-insight.js`. The route returns `503` when it is missing. |
| `DUCK_INSIGHT_MODEL` | No | Gemini model name for LangChain; defaults to `gemini-3.8-flash`. |
| `JUDGE0_API_URL` | No | Judge0 CE base URL used by `src/lib/judge0.js`; defaults to `https://ce.judge0.com`. A trailing slash is removed. |
| `JUDGE0_AUTH_TOKEN` | No | Optional Judge0 `X-Auth-Token` header. Keep it server-side. |
| `ASSESSMENT_MODE` | No | Assessment monitoring mode. Only the exact value `STRICT` selects strict mode; other or unset values select `NORMAL`. |
| `ASSESSMENT_DURATION_MINUTES` | No | Duration returned when starting an assessment; defaults to `30` and is clamped to 1–360 minutes. The current backend does not enforce this as a deadline. |
| `NEXT_PUBLIC_DOCS_URL` | No | Public docs link used by the app header and landing footer; defaults to `/docs/overview`. This value is embedded for browser use and must not contain a secret. |
| `APP_URL` | No; docs site only | Docusaurus footer link to the OA Duck application; defaults to `http://localhost:3000`. |
| `DOCS_SITE_URL` | No; docs site only | Docusaurus canonical site origin; defaults to `http://localhost:3000`. |
| `NODE_ENV` | Set by the framework/deployment | Next.js environment mode; also controls Prisma client reuse in development and whether one question API error includes development details. Normally do not set it manually. |

`AUTH_SECRET`, Google OAuth credentials, AI/Judge0 tokens, and database credentials must never use `NEXT_PUBLIC_` names. Environment variables for Docusaurus are build-time settings; configure them in the documentation build environment when they differ from the defaults.
