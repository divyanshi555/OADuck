---
id: api-reference
title: API reference
sidebar_position: 3
---

# API reference

The following route handlers are implemented under `src/app/api`.

| Route | Responsibility |
| --- | --- |
| `/api/auth/[...nextauth]` | NextAuth sign-in, session, and provider callbacks. |
| `/api/auth/register` | Account registration. |
| `/api/questions` | Question listing and creation operations. |
| `/api/questions/[id]` | Read/update/delete one question. |
| `/api/run` | Execute code against runnable/sample input. |
| `/api/submit` | Evaluate and persist a submission. |
| `/api/code/execute` | Code execution integration endpoint. |
| `/api/code/submit` | Code submission integration endpoint. |
| `/api/assessments/start` | Create an assessment session. |
| `/api/assessments/[assessmentId]/end` | End an assessment session. |
| `/api/assessments/[assessmentId]/violations` | Record or retrieve assessment violations. |
| `/api/assessments/[assessmentId]/test-mode` | Read/update admin assessment test mode. |
| `/api/profile` | Read or update profile data. |
| `/api/profile/stats` | Return profile statistics. |
| `/api/user/public-profile` | Return public profile information. |
| `/api/duck-insight` | Generate an AI review for supported attempts. |
| `/api/admin/users` | Admin user listing and management. |
| `/api/admin/users/[id]` | Admin operations for one user. |
| `/api/admin/promote` | Privileged user promotion operation. |

## Request expectations

Protected handlers should validate the current session and authorization before reading or mutating user-owned data. Submission and assessment handlers should validate identifiers, language/source fields, and session ownership before invoking external execution or AI services.
