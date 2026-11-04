---
title: Authentication and Role-Based Authorization
sidebar_position: 6
---

# Authentication and Role-Based Authorization

OA Duck uses Auth.js (NextAuth) with JWT-backed sessions and two roles: `USER` and `ADMIN`. The server-side auth configuration is in `src/auth.js`; Google provider setup is in root `auth.config.js`.

## Registration and sign-in

- **Email/password registration**: `POST /api/auth/register` accepts `name`, `username`, `email`, and `password`. The API normalizes username/email to lowercase, validates them, hashes the password with bcryptjs (cost factor 12), and creates the user. The email matching `AUTH_ADMIN_EMAIL` is assigned `ADMIN`; other accounts are `USER`.
- **Google OAuth**: Auth.js provides Google sign-in. On successful sign-in, `src/auth.js` upserts the user by email. A matching configured admin email is assigned `ADMIN`; otherwise a new account is created as `USER`. Existing non-admin accounts retain their current role during a non-admin Google sign-in.
- **Credentials login**: Auth.js's Credentials provider looks up the normalized email and compares the submitted password with `passwordHash` using bcryptjs. Missing account/hash or a mismatch does not authenticate.
- **OAuth password setup**: accounts without a password hash (for example, new Google accounts) receive `needsPasswordSetup` in the JWT/session. The frontend routes them to `/setup-password`; `POST /api/user/setup-password` lets that signed-in user set a password once.
- **Sign-out and provider callbacks**: the catch-all Auth.js handler at `/api/auth/[...nextauth]` exports GET and POST. Provider sign-in, callback, session, and sign-out actions are handled by Auth.js rather than separate OA Duck route handlers.

Passwords are never returned by profile APIs. Only a bcrypt hash is persisted in `User.passwordHash`; Google OAuth does not require a local password.

## Session and role checks

Auth.js uses `strategy: "jwt"`. Its JWT callback reads the current database role, username, and whether a password exists; its session callback exposes role, username, and `needsPasswordSetup` to the server/client session. API authorization uses `auth()` and checks `session.user.role`. No separate bearer-token API is implemented; browser requests use the Auth.js session cookie.

`src/middleware.js` uses Auth.js middleware for the configured page matcher:

- `/practice/:path*` and `/questions/:path*` require a signed-in user.
- `/setup-password` redirects signed-out visitors home; signed-in users who already have a password are redirected to `/practice`. Users needing setup are redirected there from the other matched routes.
- `/profile` redirects to the current user's profile handle. Individual `/profile/:username` pages are deliberately public.
- `/admin` is checked by its server page rather than the middleware matcher.
- `/` is public. API routes are not in the middleware matcher; API handlers perform their own authentication and authorization checks.
- `/admin` page access is checked in its server page (`role === "ADMIN"`). Admin API routes likewise check the role in each handler.

## Permission comparison

| Capability | User | Admin |
|---|---:|---:|
| Browse questions and read a specific question | Yes | Yes |
| See hidden test cases or reference-solution records from question detail API | No | Yes |
| Start an assessment, run/submit code, record violations | Own sessions | Own sessions |
| Read/update own profile and view own stats | Yes | Yes |
| Read a public profile by username | Yes, no sign-in required | Yes |
| Create, edit, or delete questions | No | Yes |
| List users, change other users' roles, delete other users | No | Yes |
| Toggle admin test mode | No | Admin only; endpoint currently targets the admin's own session |

The API is the enforcement boundary: UI visibility is not a substitute for these server-side checks. For example, hidden test data is filtered by the question detail handler, and code submissions are checked against the authenticated user's assessment.

## Admin role and user management

- Registration and Google sign-in assign the configured admin email the `ADMIN` role.
- `POST /api/admin/promote` promotes an existing account by email. It does not demote.
- `PUT /api/admin/users/{id}` sets a target role to `USER` or `ADMIN`; an admin cannot downgrade their own account through this route.
- `DELETE /api/admin/users/{id}` removes another account; an admin cannot delete their own account through this route.
- These management routes require an admin session. Demotion changes the database role; the JWT callback re-reads the role from the database when refreshed/issued.
- `POST /api/assessments/{assessmentId}/test-mode` is also admin-only, but the handler limits it to the signed-in admin's own active assessment.

### Route and API error distinction

Page middleware redirects when a page requires sign-in; API handlers return JSON errors instead. Most admin handlers return `401` with an `Unauthorized` error when the role check fails; the assessment test-mode route distinguishes unauthenticated (`401`) from non-admin (`403`). Exact endpoint-specific status codes are listed in the [API Reference](./api-reference.md).
