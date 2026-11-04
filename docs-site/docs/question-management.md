---
title: Question Management
sidebar_position: 8
---

# Question Management

Questions are stored as `Question` records with related `TestCase`, `Hint`, and `OptimalSolution` rows. The schema is defined in `prisma/schema.prisma`; the UI is under `src/app/admin/questions/`, and persistence is implemented by the question API routes.

## Question data

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Generated primary key. |
| `questionNumber` | Int | Auto-incremented display number. |
| `title` | String? | API requires a non-empty title on create/update. |
| `description` | Text? | Problem statement. |
| `difficulty` | String | Required by schema and API; admin form offers `Easy`, `Medium`, `Hard`. Database/API do not restrict to those values. |
| `topics` | String[] | Topic tags; UI collects comma-separated text and stores non-empty trimmed values. |
| `examples`, `constraints` | Json? | Structured details; create form currently sends `examples: []` and constraints as a list. Edit form accepts JSON arrays. |
| `expectedTC`, `expectedSC` | String? | Expected complexity notes. |
| `createdById` | UUID | Required creator reference to `User`. |

Related records:

- **TestCase**: `input`, `expectedOutput` (Text) and `isSample` (Boolean). `isSample: true` means public/sample; false means hidden. Question creation/update validation requires non-empty input and output for supplied cases.
- **Hint**: `hintOrder` (Int) and optional `content` (Text). APIs limit non-empty hints to two per question.
- **OptimalSolution**: `language` and `code`; supported labels are C++, Java, and Python. Language validity is checked by the API.

## Admin workflow

1. The admin opens the question manager and chooses to create or edit a question.
2. The form collects title, difficulty, topics, problem text, constraints, hints, complexity notes, reference solutions, and test cases. Example input/output can be parsed from the description into public cases.
3. Create stores the question and provided relations. Edit first loads the question, then sends a `PUT`; supplied test-case, hint, or reference-solution arrays replace the existing arrays, while omitted arrays remain unchanged.
4. Delete calls the question API. The handler deletes sessions for that question in a transaction before deleting the question; related submissions, violations, viewed-hint links, and doubt queries cascade through the session relations. Question-owned test cases, hints, and reference solutions also cascade.

## Retrieval and filtering

`GET /api/questions` returns questions ordered by number and (for an authenticated caller) per-question attempt/solved progress. `GET /api/questions/{id}` returns details. These APIs do not accept difficulty/topic/search filters: the question library filters and sorts the returned list in the browser by text/number/title/topic, difficulty, topic, attempt/solved status, or question number/attempt frequency.

The detail API returns public test cases to non-admin callers and all cases plus reference solutions to admins. Hidden test values are used by submission evaluation but are not returned to regular users.

## Question APIs

| Method and path | Access | Purpose |
|---|---|---|
| `GET /api/questions` | Public | List questions and caller progress. |
| `POST /api/questions` | Admin | Create a question and optional related cases, hints, and solutions. |
| `GET /api/questions/{id}` | Public read; admin gets additional data | Read question details. |
| `PUT /api/questions/{id}` | Admin | Update fields; replace related arrays when included. |
| `DELETE /api/questions/{id}` | Admin | Delete question and its associated session history. |

Request fields, response shapes, and validation errors are documented in the [API Reference](./api-reference.md).
