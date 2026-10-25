---
id: testing-debugging
title: Testing and debugging
sidebar_position: 3
---

# Testing and debugging

## Baseline checks

From the app root run npm run lint and npm run build. For docs changes, change into docs-site and run npm run build.

## Debug by layer

### Page does not appear

Check the folder contains the expected page.jsx, confirm middleware did not redirect, and inspect the browser network request for the final route.

### Workspace chrome is missing

Inspect useSession status and NavigationPersistence. The shell intentionally renders only for authenticated status.

### API returns unauthorized

Confirm the browser has a valid session cookie, the route is included in the expected middleware behavior, and the handler role/ownership check matches the intended user.

### Submission fails

Check request validation first, then Judge0 configuration, provider response, timeout/limits, and whether the Submission record was written. Do not debug only from the final UI verdict.

### Prisma errors

Confirm the database URL, migration state, generated client output, and model field names. After schema changes, run Prisma generation and the relevant migration workflow.

## UI verification

Check desktop and narrow viewport layouts, loading state, empty state, error state, keyboard focus, and authenticated versus unauthenticated rendering. For assessment pages, also verify timers, fullscreen behavior, violation handling, and session completion.
