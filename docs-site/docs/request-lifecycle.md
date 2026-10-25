---
id: request-lifecycle
title: Request lifecycle
sidebar_position: 5
---

# Request lifecycle

## Page request

1. The browser requests a route.
2. src/middleware.js checks whether the path is protected and whether a NextAuth request has a user.
3. Middleware redirects unauthenticated protected requests to / and handles password-setup and profile redirects.
4. The App Router renders the matching layout and page.
5. The root layout supplies fonts, global styles, session context, and shared navigation.

## Authenticated data request

1. A page or client component calls a route handler.
2. The handler resolves the current session with the server auth helper.
3. The handler validates input and checks ownership/role.
4. Prisma reads or writes PostgreSQL records.
5. The handler returns JSON with a success payload or a meaningful HTTP error.
6. The client updates local state and renders loading, success, empty, or error UI.

## Code execution request

Editor input → client run/submit action → Next.js route handler → validation and ownership check → Judge0 adapter → execution verdict and metrics → Submission persistence → UI result panel.

Sample execution is for fast iteration. Final submission is the durable record used by history, statistics, and review workflows.

## Assessment request

Assessment start creates a Session. The client monitor observes browser events and posts violations. Ending an assessment records completion or termination. The session and violation records provide the audit trail used by the assessment UI and admin review.
