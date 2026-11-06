---
title: API Reference
sidebar_position: 7
---

# API Reference

All endpoints are implemented by Next.js route handlers under `src/app/api/`. JSON request bodies are used where noted; dynamic path values in braces are path parameters. Unless stated otherwise, error responses have an `{ "error": "..." }` shape. Responses below describe the fields selected/returned by the handler; Prisma-generated records may contain additional fields where the handler returns a whole model.

## Quick reference

| Method | Path | Purpose | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register with email/password | Public |
| `GET`, `POST` | `/api/auth/[...nextauth]` | Auth.js provider and session actions | Auth.js-managed |
| `POST` | `/api/user/setup-password` | Set a password on an OAuth account | Signed-in user needing setup |
| `GET` | `/api/user/public-profile?username={username}` | Read a public profile | Public |
| `GET`, `PUT` | `/api/profile` | Read/update current profile | Signed-in user |
| `GET` | `/api/admin/users` | List accounts | Admin |
| `POST` | `/api/admin/promote` | Promote account by email | Admin |
| `PUT`, `DELETE` | `/api/admin/users/{id}` | Change role/delete account | Admin |
| `GET`, `POST` | `/api/questions` | List questions/create question | Public read; admin create |
| `GET`, `PUT`, `DELETE` | `/api/questions/{id}` | Read/update/delete a question | Public read; admin update/delete |
| `GET`, `POST` | `/api/assessments/start` | Read assessment settings/start session | Signed-in user |
| `POST` | `/api/assessments/{assessmentId}/end` | Complete own assessment | Session owner |
| `POST` | `/api/assessments/{assessmentId}/test-mode` | Toggle admin test mode | Admin; own session only |
| `POST` | `/api/assessments/{assessmentId}/violations` | Record monitoring event | Session owner |
| `POST` | `/api/code/execute`, `/api/run` | Run source code against samples or stdin | Signed-in user |
| `POST` | `/api/code/submit`, `/api/submit` | Evaluate and save a submission | Signed-in user |
| `POST` | `/api/duck-insight` | Generate feedback for eligible submission | Signed-in submission owner |
| `GET` | `/api/profile/stats` | Read current user's progress analytics | Signed-in user |

There is **no random-question API**. The practice page fetches `GET /api/questions`, filters the results, and selects a question in the browser. A specific question is read from `GET /api/questions/{id}`.

## Authentication APIs

### `POST /api/auth/register`

Public account registration. Body:

```json
{ "name": "Alex Chen", "username": "alex_chen", "email": "alex@example.test", "password": "example-password" }
```

Name must be 1–100 characters; username 3–30 lowercase letters, digits, or underscores; email must contain `@`; password 8–128 characters. Email and username are normalized to lowercase. Password is bcrypt-hashed (cost 12).

Success `201`: `{ "ok": true }`. Errors: `400` invalid fields; `409` email or username already exists. The configured admin email can be assigned `ADMIN` at registration.

### `GET`, `POST /api/auth/[...nextauth]`

Auth.js catch-all handler. Auth.js handles provider discovery, sign-in/callback, session, and sign-out actions. Exact action paths, payloads, and response formats are provider/Auth.js-managed and are not defined by separate OA Duck handlers. Google and Credentials providers are configured; credentials are email/password. See [Authentication and Role-Based Authorization](./authentication-authorization.md).

### `POST /api/user/setup-password`

Signed-in user whose session has `needsPasswordSetup`. Body: `{ "password": "example-password" }`. Password length: 8–128.

Success `200`: `{ "ok": true }`. Errors: `401` signed out; `400` password already set or invalid length.

## User management APIs

### `GET /api/user/public-profile?username={username}`

Public profile lookup. The required query parameter is trimmed and lowercased.

Success `200`: `{ "user": { "name": "...", "username": "...", "image": "...", "role": "USER", "description": "..." } }` (`image`, `name`, and `description` may be null). Errors: `400` missing username; `404` not found.

### `GET /api/profile`

Returns the signed-in user's editable profile fields.

Success `200`: `{ "user": { "name", "email", "image", "username", "description" } }`. Error: `401` signed out.

### `PUT /api/profile`

Updates the signed-in user's profile. Body fields: `name` (required, 1–100 characters), `description` (optional, at most 180 characters), `image` (optional URL or PNG/JPEG/WEBP base64 data URI), `username` (optional, 3–30 lowercase letters/digits/underscores), and `password` (optional, 8–128 characters; stored as bcrypt hash).

```json
{ "name": "Alex Chen", "username": "alex_chen", "description": "Learning algorithms", "image": "https://example.test/avatar.png" }
```

Success `200`: `{ "user": { "name", "image", "username", "description" } }`. Errors: `401` signed out; `400` invalid profile field/image; `409` username conflict. The image data-URI length check is 7 MiB; the handler's validation message describes the limit as 5 MB.

### `GET /api/admin/users`

Admin-only account listing, ordered by email.

Success `200`: `{ "success": true, "users": [{ "id", "name", "email", "username", "role" }] }`. Errors: `401` failed admin check; `500` `{ "success": false, "error": "Failed to fetch users" }`.

### `POST /api/admin/promote`

Admin-only promotion by exact email. Body: `{ "email": "alex@example.test" }`.

Success `200`: `{ "success": true }`. Errors: `401` not admin; `400` missing email or already admin; `404` account not found; `500` promotion failed.

### `PUT /api/admin/users/{id}` and `DELETE /api/admin/users/{id}`

`id` is the target user ID. `PUT` body: `{ "role": "USER" }` or `{ "role": "ADMIN" }`.

Success `PUT 200`: `{ "success": true, "user": { "id", "name", "email", "username", "role" } }`. Success `DELETE 200`: `{ "success": true }`.

Errors: `401` failed admin check; `PUT 400` invalid role or self-demotion; `DELETE 400` self-deletion; `500` update/delete failed (including a nonexistent target handled by the catch block).

## Question management APIs

### `GET /api/questions`

Lists questions ordered by `questionNumber`. Public; when the caller is signed in, each question's `progress` reflects that user's submission attempts and whether any attempt was accepted.

Success `200`:

```json
{
  "success": true,
  "questions": [{
    "id": "00000000-0000-4000-8000-000000000001",
    "questionNumber": 1,
    "title": "Example problem",
    "difficulty": "Easy",
    "topics": ["Arrays"],
    "expectedTC": "O(n)",
    "expectedSC": "O(1)",
    "createdBy": { "id": "...", "name": "..." , "email": "..." },
    "progress": { "attempts": 0, "solved": false }
  }]
}
```

Optional complexity fields and creator `name` can be null. Error: `500` `{ "success": false, "error": "Failed to fetch questions" }`.

### `POST /api/questions`

Admin-only create. Body fields: `title`, `description`, `difficulty`, `topics`, `examples`, `constraints`, `expectedTC`, `expectedSC`, and optional arrays `hints`, `testCases`, `optimalSolutions`. Title and difficulty are required; at most two non-empty hints; each provided test case must have non-empty input and expected output; reference languages must resolve to C++, Java, or Python.

```json
{
  "title": "Pair sum", "description": "Find two values whose sum is target.",
  "difficulty": "Easy", "topics": ["Arrays"],
  "examples": [], "constraints": [],
  "testCases": [{ "input": "2 3", "expectedOutput": "5", "isSample": true }],
  "hints": [{ "content": "Consider a lookup table." }],
  "optimalSolutions": [{ "language": "Python", "code": "..." }]
}
```

Success `200`: `{ "success": true, "question": <created Question record> }`. Errors: `401` not admin; `400` validation error; `404` creator account unavailable; `500` create failure.

### `GET /api/questions/{id}`

Reads question details. Public. Non-admin responses include sample test cases only; admins receive all test cases and optimal-solution records. Hints and creator details are included.

Success `200`: `{ "success": true, "question": { "id", "questionNumber", "title", "description", "difficulty", "topics", "examples", "constraints", "testCases": [...], "expectedTC", "expectedSC", "hints": [...], "createdBy": {...}, "optimalSolutions": [...] } }`. `optimalSolutions` is present only for admins. Errors: `404` not found; `500` fetch failed.

### `PUT /api/questions/{id}`

Admin-only update. Body uses the same fields as create. `title` and `difficulty` are required. If `testCases`, `hints`, or `optimalSolutions` arrays are supplied, that entire relation list is replaced; if omitted, it is left unchanged.

Success `200`: `{ "success": true, "question": <updated Question record> }`. Errors: `401` not admin; `400` invalid payload; `404` question not found; `500` update failed.

### `DELETE /api/questions/{id}`

Admin-only deletion. The handler deletes related sessions first, then the question in a transaction.

Success `200`: `{ "success": true }`. Errors: `401` not admin; `404` not found; `409` related record constraint prevents deletion; `500` delete failed.

## Random and specific question selection APIs

There is no endpoint that returns a random question. `GET /api/questions` supplies the list; `/practice` filters and randomly selects one client-side. `GET /api/questions/{id}` is the specific-question API described above.

## Assessment APIs

### `GET /api/assessments/start`

Returns server-configured assessment settings; signed-in user required.

Success `200`: `{ "mode": "NORMAL", "durationMinutes": 30 }`. `mode` is `STRICT` only when `ASSESSMENT_MODE=STRICT`; otherwise `NORMAL`. Duration is clamped to 1–360 minutes (default 30). Error: `401` not signed in.

### `POST /api/assessments/start`

Starts a session for a question. Body: `{ "questionId": "<question UUID>" }`. Mode and duration are server-controlled; client-supplied mode is ignored.

Success `200`: `{ "assessmentId": "<session UUID>", "mode": "NORMAL", "count": 0, "terminated": false, "maxViolations": 3, "startedAt": "<ISO timestamp>", "durationMinutes": 30 }`. Errors: `400` invalid JSON or missing question; `401` not signed in/user unavailable; `404` question not found.

### `POST /api/assessments/{assessmentId}/end`

Completes the signed-in user's own assessment. The handler requires at least one submission and does not accept a request body.

Success `200`: `{ "success": true, "completedAt": "<ISO timestamp>", "violationCount": 0, "latestSubmission": { "status": "Accepted", "passedTests": 3, "totalTests": 3 } }`. Errors: `401` not signed in/user unavailable; `400` invalid assessment UUID; `404` assessment not found/owned; `409` already terminated or no submission to end.

### `POST /api/assessments/{assessmentId}/test-mode`

Admin-only toggle for an active session belonging to the signed-in admin. Body: `{ "enabled": true }`.

Success `200`: `{ "adminTestMode": true }`. Errors: `401` not signed in; `403` not admin; `400` invalid UUID/body; `404` session not found or not owned; `409` session already ended; `503` update failure.

## Code execution and submission APIs

### `POST /api/code/execute` and `POST /api/run`

Signed-in code execution. `/api/run` re-exports the same handler. Body: `{ "language": "python|java|cpp", "code": "...", "problemId": "<optional question ID>", "stdin": "<optional input>", "custom": true|false }`.

With `problemId` and `custom` false/omitted, the handler runs up to 20 public sample cases and returns `{ "success": true, "results": [{ "passed", "input", "expectedOutput", "result" }], "result": <first result or null> }`. With no configured public tests, it runs supplied stdin and includes `warning`. Custom execution returns `{ "success": true, "result": { "status", "statusId", "verdict", "stdout", "stderr", "compileOutput", "message", "time", "memory", "exitCode" } }`.

Errors: `401` not signed in; `400` unsupported language/missing code or problem not found; `413` source exceeds 50,000 characters; `502` Judge0 or execution failure.

### `POST /api/code/submit` and `POST /api/submit`

Signed-in evaluation and persistence; `/api/submit` is an alias. Body: `{ "problemId": "<question ID>", "assessmentId": "<optional session ID>", "language": "python|java|cpp", "code": "..." }`. `questionId` may be used instead of `problemId`. The question must have hidden cases; at most 100 total test cases are evaluated. Hidden input/expected output are not included in the returned `testResults`.

Success `200`:

```json
{
  "success": true,
  "submissionId": "<submission UUID>",
  "status": "Wrong Answer",
  "questionNumber": 1,
  "questionTitle": "Pair sum",
  "expectedTC": "O(n)",
  "expectedSC": "O(n)",
  "attempts": 1,
  "passedTests": 2,
  "totalTests": 3,
  "failedTestNumber": 3,
  "runtime": "0.01",
  "memory": 1024,
  "testResults": [{ "label": "Sample 1", "isHidden": false, "passed": true, "verdict": "Passed", "input": "...", "expectedOutput": "...", "result": {} }],
  "terminalOutput": "..."
}
```

`testResults` items always include `label`, `isHidden`, `passed`, and `verdict`; sample items additionally include input, expected output, and normalized Judge0 result. Runtime/memory and failed-test fields may be null. Errors: `401` not signed in/user unavailable; `400` required fields invalid or no hidden tests; `404` question/assessment not found; `403` assessment completed or terminated; `413` code over 50,000 characters; `502` evaluation failure.

## Violation tracking APIs

### `POST /api/assessments/{assessmentId}/violations`

Signed-in owner records one event. Body:

```json
{ "type": "COPY" }
```

Allowed types: `COPY`, `PASTE`, `BACK_NAVIGATION`, `TAB_SWITCH`, `FULLSCREEN_EXIT`.

Success `200`: `{ "count": 1, "mode": "NORMAL", "terminated": false, "adminTestMode": false, "timestamp": "<ISO timestamp>", "maxViolations": 3 }`. Errors: `401` not signed in/user unavailable; `404` malformed UUID or no owned assessment; `400` invalid JSON or event type; `500` recording failed. In non-test mode, full-screen exit terminates immediately; `STRICT` terminates on any violation; `NORMAL` terminates at the third. The admin test-mode flag suppresses termination but still records the violation.

## Duck Insight APIs

### `POST /api/duck-insight`

Signed-in submission owner only. Body: `{ "submissionId": "<submission UUID>", "problemId": "<question UUID>" }`. The submission must belong to the caller, be for that question, be from a completed and non-terminated assessment, have a supported language, and not be accepted. A same-language optimal solution must exist.

Success `200`: `{ "analysis": <structured analysis>, "optimalCode": "...", "language": "python", "languageLabel": "Python" }`. `analysis` contains `language`, `approach`, `walkthrough[]` (`title`, `detail`), `complexity` (`time`, `space`, `reason`), `summary`, `bugs[]`, `recommendations[]`, `tests[]` (`input`, `expected`, `explanation`), and nullable `compilerOrRuntimeErrorAnalysis` and `performanceAnalysis`.

Errors: `401` not signed in/user unavailable; `400` invalid IDs or unsupported submission language; `403` accepted submission; `404` submission/problem not found for the caller; `422` no same-language reference solution; `503` AI configuration or generation/validation failure.

## Dashboard and analytics APIs

### `GET /api/profile/stats`

Signed-in user analytics. Success `200`: `{ "user": { "name", "email", "username", "image", "description" }, "stats": { "solvedCount", "totalQuestions", "completionPercent", "difficultyCounts", "topicCounts", "acceptedCount", "timeoutCount", "violationCount", "giveUpCount", "totalSubmissions", "activeDays", "currentStreak", "longestStreak", "activityDays", "recentSubmissions" } }`.

`difficultyCounts` has `easy`, `medium`, and `hard` entries, each with `solved` and `total`. `topicCounts` items have `{ "label", "solved" }`. `activityDays` items have `{ "date", "count", "future", "level" }`. `totalSubmissions`, `activityDays`, `activeDays`, and streaks are based on submissions in the last 365 days; `recentSubmissions` contains up to six latest rows with status, language, runtime, creation time, and related problem summary. Errors: `401` signed out; `404` account not found; `500` stats fetch failed.

The admin dashboard is server-rendered by `/admin`; it does not have a separate dashboard API endpoint. There are also no API routes for editing/viewing persisted `DoubtQuery` or `SessionHintView` records.
