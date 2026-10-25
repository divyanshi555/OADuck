---
id: product-flow
title: End-to-end product flow
sidebar_position: 1
---

# End-to-end product flow

## 1. Public entry

The public landing page explains the product and links to registration and login. The root server component checks the NextAuth session. An authenticated user is redirected to `/practice`; a visitor remains on the landing page.

## 2. Authentication

The application supports credentials-based authentication and the providers configured in `auth.config.js`. The auth layer uses a JWT session strategy. The JWT callback enriches the token with role, username, and password-setup state. The session callback exposes those values to the client session.

The middleware protects practice, question, and setup routes. It also handles:

- Redirecting unauthenticated protected-route requests to `/`.
- Redirecting users who need a password to `/setup-password`.
- Redirecting completed setup away from `/setup-password`.
- Resolving `/profile` to the signed-in user’s public username route.
- Allowing public profile pages under `/profile/[username]`.

## 3. Practice flow

The learner opens `/practice`, selects a question, reads the description and constraints, and opens a solving session. The session presents the editor and the question context. Sample execution can be used to validate an approach before final submission.

## 4. Submission flow

The client sends source code and language metadata to the execution or submission route. The server validates the request, calls the configured Judge0 integration, stores the outcome, and returns status and performance data. Outcomes can include accepted, wrong answer, compile error, runtime error, and time limit exceeded.

Each submission records its relationship to the session, user, question, language, source code, test counts, runtime, memory, and error details when available.

## 5. Assessment flow

Assessment sessions add timing and integrity controls. The monitor records events such as tab switches, navigation violations, and other configured violations. Completion or termination stores a reason and prevents an official session from being treated as still active.

Admins can use test mode to exercise assessment behavior without treating the run as a normal candidate attempt.

## 6. Review flow

After an attempt, the learner can inspect the submission history and request Duck Insight where supported. The AI review route can explain the algorithm, reference solution, complexity, and likely mistakes in the submitted approach.
