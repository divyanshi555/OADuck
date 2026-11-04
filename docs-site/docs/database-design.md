---
title: Database Design
sidebar_position: 5
---

# Database Design

OA Duck stores its application data in PostgreSQL. Prisma's schema is `prisma/schema.prisma`; model names below are Prisma names, while `@@map`/`@map` give several tables or columns their SQL names. Prisma scalar types map to PostgreSQL types; UUID identifiers use `@db.Uuid`, long text uses `@db.Text`, and `Json` stores JSON.

![OA Duck entity relationship diagram](/img/oaduck-er.svg)

## Models

`?` means nullable/optional; otherwise a field is required unless its default generates a value. Relation fields describe Prisma relations and are not separate scalar columns. Database constraints/defaults are distinguished below from additional validation in API handlers.

### User

An account and the owner/creator of related content.

| Field | Type | Required/default | Purpose |
|---|---|---|---|
| `id` | UUID | Required; `uuid()` | Primary key. |
| `email` | String | Required; unique | Sign-in identity. |
| `name` | String | Optional | Display name. |
| `username` | String | Optional; unique | Profile handle. |
| `description` | Text | Optional | Profile bio. |
| `passwordHash` (`password_hash`) | String | Optional | bcrypt hash; null for OAuth accounts until a password is set. |
| `image` | String | Optional | Profile image URL or data URI. |
| `role` | `Role` | Required; `USER` | `USER` or `ADMIN`. |

`User` has many created questions, assessment sessions, and submissions.

### Question

A problem in the question library.

| Field | Type | Required/default | Purpose |
|---|---|---|---|
| `id` | UUID | Required; `uuid()` | Primary key. |
| `questionNumber` (`question_number`) | Int | Required; auto-increment | Display/list number. |
| `title` | String | Optional in schema; required by create/update APIs | Problem title. |
| `description` | Text | Optional | Problem statement. |
| `difficulty` | String | Required | Difficulty label. |
| `topics` | String[] | Required | Topic labels. |
| `examples`, `constraints` | Json | Optional | Structured problem examples/constraints. |
| `expectedTC` (`expected_tc`), `expectedSC` (`expected_sc`) | String | Optional | Expected time and space complexity labels. |
| `createdById` (`created_by`) | UUID | Required | Foreign key to `User.id`. |

The creator relation is required. A question has many test cases, hints, optimal solutions, assessment sessions, and submissions.

### TestCase

A public sample or hidden evaluation case for one question.

| Field | Type | Required/default | Purpose |
|---|---|---|---|
| `id` | UUID | Required; `uuid()` | Primary key. |
| `questionId` (`question_id`) | UUID | Required | Foreign key to `Question.id`. |
| `isSample` (`is_sample`) | Boolean | Required | `true` for a public sample; `false` for a hidden case. |
| `input` | Text | Required; empty string | Judge stdin. |
| `expectedOutput` (`expected_output`) | Text | Required; empty string | Expected result. |

Deleting the question cascades to its test cases. A test case can be referenced by submissions as their `failedTestCase`.

### OptimalSolution

A reference solution for a question and language. Fields: `id` UUID primary key (`uuid()`); `questionId` UUID (required, FK to Question); `language` String (required); `code` Text (required). Deleting the question cascades to its optimal solutions. The schema does not enforce unique language-per-question pairs.

### Session (assessment)

A user's attempt/session for one question.

| Field | Type | Required/default | Purpose |
|---|---|---|---|
| `id` | UUID | Required; `uuid()` | Primary key. |
| `userId` (`user_id`) | UUID | Required | Foreign key to `User.id`. |
| `questionId` (`question_id`) | UUID | Required | Foreign key to `Question.id`. |
| `terminationReason` (`termination_reason`) | String | Optional | Reason the session was terminated. |
| `monitoringMode` (`monitoring_mode`) | String | Required; `"NORMAL"` | Recorded assessment mode. |
| `violationCount` (`violation_count`) | Int | Required; `0` | Count of recorded violations. |
| `completedAt` (`completed_at`) | DateTime | Optional | Completion timestamp. |
| `adminTestMode` (`admin_test_mode`) | Boolean | Required; `false` | Per-session admin testing flag. |

A session belongs to one user and one question and has many submissions, violations, viewed-hint links, and doubt queries.

### AssessmentViolation

One recorded monitoring event. Fields: `id` UUID primary key (`uuid()`); `assessmentId` UUID (required, FK to `Session.id`); `type` String (required); `timestamp` DateTime (required, defaults to `now()`). An index covers `(assessmentId, timestamp)`. Deleting the assessment cascades to its violations. Allowed event names are validated by the API, not by the database enum: `COPY`, `PASTE`, `BACK_NAVIGATION`, `TAB_SWITCH`, and `FULLSCREEN_EXIT`.

### Hint

A question hint. Fields: `id` UUID primary key (`uuid()`); `questionId` UUID (required, FK to Question); `hintOrder` Int (required); `content` Text (optional). Deleting the question cascades to hints. The API limits a question to two non-empty hints; that limit is not a schema constraint.

### SessionHintView

Join record linking a session to a hint viewed in it. Fields: `id` UUID primary key (`uuid()`); `sessionId` UUID (required, FK to Session); `hintId` UUID (required, FK to Hint). Both relations cascade on deletion. The schema does not declare a unique `(sessionId, hintId)` constraint.

### DoubtQuery

A persisted question/query text associated with a session. Fields: `id` UUID primary key (`uuid()`); `sessionId` UUID (required, FK to Session); `queryText` Text (required). Deleting the session cascades to its doubt queries.

### Submission

A code evaluation result associated with a session and optionally with a user, problem, and failed test case.

| Field | Type | Required/default | Purpose |
|---|---|---|---|
| `id` | UUID | Required; `uuid()` | Primary key. |
| `sessionId` (`session_id`) | UUID | Required | Foreign key to `Session.id`. |
| `userId` (`user_id`) | UUID | Optional | Foreign key to `User.id`. |
| `questionId` (`question_id`) | UUID | Optional | Foreign key to `Question.id`. |
| `language` | String | Required | Submitted language. |
| `sourceCode` (`source_code`) | Text | Optional | Submitted source. |
| `status` | String | Required | Verdict/status. |
| `runtimeMs` (`runtime_ms`), `memoryKb` (`memory_kb`) | Int | Optional | Judge performance data. |
| `passedTests` (`passed_tests`), `totalTests` (`total_tests`) | Int | Required; `0` | Passed and evaluated test counts. |
| `createdAt` (`created_at`) | DateTime | Required; `now()` | Creation timestamp. |
| `failedTestCaseId` (`failed_test_case_id`) | UUID | Optional | Reference to the failed `TestCase`, when available. |
| `actualOutput` (`actual_output`), `errorMessage` (`error_message`) | Text | Optional | Output/diagnostic data. |

The session relation is required and cascades on session deletion. Optional user and question relations cascade when those records are deleted. The optional failed-test relation has no explicit cascade action in the Prisma schema.

## Relationships at a glance

- **User → Question**: one-to-many; a question has one required creator.
- **User → Session → Question**: each session belongs to one user and one question.
- **Session → Submission**: one-to-many; every submission has a required session. Submission also has optional direct references to its user and question.
- **Question → TestCase / Hint / OptimalSolution**: one-to-many.
- **Session → AssessmentViolation / DoubtQuery / SessionHintView**: one-to-many; `SessionHintView` also points to one `Hint`, forming the session-to-hint join.
- **TestCase → Submission**: one-to-many optional failed-test reference.

## Validation and defaults

Prisma supplies the schema-level field types, nullability, unique email/username constraints, foreign keys, and defaults listed above. Additional checks live in route handlers: registration validates name, username, email, and password; question APIs validate title/difficulty, hint count, test case fields, and supported reference-solution languages; code APIs validate supported language and source-code length. The schema itself does not declare enums for difficulty, language, verdict, monitoring mode, or violation type, nor bounds for those values.

`DoubtQuery` and `SessionHintView` are present in the Prisma schema; no corresponding API route is currently exposed.
