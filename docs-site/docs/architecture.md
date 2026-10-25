---
id: architecture
title: Architecture
sidebar_position: 1
---

# Architecture

## Application layers

```text
Browser
  ├─ Next.js App Router pages and client components
  ├─ NextAuth session provider
  └─ Monaco/editor and assessment monitoring UI
        ↓
Next.js route handlers and server components
  ├─ Authentication and authorization
  ├─ Question, profile, assessment, and submission APIs
  ├─ Judge0 execution integration
  └─ Duck Insight orchestration
        ↓
Prisma Client → PostgreSQL
```

## Route organization

The application uses the App Router under `src/app`. A folder with `page.jsx` becomes a UI route; a folder with `route.js` becomes an HTTP route handler. Shared UI lives in `src/app/components`, and server-side integrations live under `src/lib`.

## Authentication boundary

`src/auth.js` owns the NextAuth configuration and database-backed credentials authorization. `src/middleware.js` applies route-level protection before requests reach protected pages. Client components read the session with `useSession` where they need role or identity information.

## Data and execution boundary

Prisma models represent users, questions, test cases, sessions, violations, hints, doubt queries, optimal solutions, and submissions. Code execution is delegated to the Judge0 integration; the app remains responsible for request validation, persistence, and presenting the result.

## UI navigation

`NavigationPersistence` renders the shared workspace header/sidebar only when the client session is definitively authenticated. This prevents the private shell from flashing during an unauthenticated session-loading state.
