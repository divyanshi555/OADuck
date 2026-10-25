---
id: security
title: Security and authorization
sidebar_position: 2
---

# Security and authorization

## Authentication is not authorization

Having a valid session only proves identity. Every privileged handler must also check role or ownership. Admin routes require an admin role. User-owned sessions, submissions, profiles, and doubt queries must be scoped to the current user unless the operation is explicitly public.

## Sensitive boundaries

- Passwords are stored as bcrypt hashes, never plaintext.
- Auth and provider secrets stay in server environment variables.
- Code execution and AI provider credentials stay behind server routes.
- Assessment violations are append-only evidence for the session lifecycle.
- Public profile routes must expose only intentionally public profile fields.

## Input handling

Validate UUIDs, question/session ownership, language values, source code limits, and required fields before database or external-service calls. Treat code, question text, AI output, and CI/log output as untrusted content when displaying it.

## Change review checklist

Before merging a protected feature, verify the unauthenticated path, a normal user path, an admin path, a mismatched-owner path, and malformed input. Confirm that errors do not disclose secrets or unnecessary database details.
