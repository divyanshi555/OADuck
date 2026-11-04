---
title: System Architecture
sidebar_position: 3
---

# System Architecture

![OA Duck system architecture](/img/oaduck-architecture.svg)

The browser UI and backend API are parts of the same Next.js App Router application. API route handlers enforce the signed-in user and role checks, validate requests, and coordinate database and external-service work. The browser does not call Judge0 or Gemini directly.

## Main modules

- **App Router UI** (`src/app/`): landing, authentication, question library, coding workspace, profile, and admin pages.
- **API routes** (`src/app/api/`): question and profile data, authentication, administration, code run/submission, assessment lifecycle and monitoring, and Duck Insight.
- **Shared server libraries** (`src/lib/`): Prisma client, Judge0 HTTP client, supported-language helpers, and the Duck Insight prompt/schema integration.
- **Persistence** (`prisma/`): PostgreSQL schema and migrations for users, questions, test cases, assessment sessions, violations, hints, and submissions.
- **External services**: Neon-hosted PostgreSQL, Judge0 CE, Google OAuth, and the Gemini API.
- **Documentation site** (`docs-site/`): a separate Docusaurus build copied to `public/docs`; Next.js rewrites serve the generated pages under `/docs`.

## Request and response lifecycle

1. The browser loads an App Router page and sends same-origin requests to Next.js route handlers.
2. Auth.js resolves the JWT session. Handlers check the user or admin role as appropriate, then validate request data.
3. For application data, the handler uses Prisma Client with the Neon adapter to read or update PostgreSQL. Results are returned to the browser as JSON.
4. For **Run** and **Submit**, the handler loads permitted test cases from PostgreSQL, sends source code and input to Judge0, polls its submission endpoint, and returns normalized output/verdicts. Submit evaluates stored cases and persists the resulting `Submission`.
5. For **Duck Insight**, the handler loads an eligible completed assessment submission, problem details, and a same-language optimal solution from PostgreSQL. LangChain sends that context to Google Gemini; the Zod-validated analysis is returned as JSON.

Assessment start, completion, and violation endpoints update the session and violation records. The browser reports supported monitoring events; the server stores the event and applies the session mode and termination policy.
