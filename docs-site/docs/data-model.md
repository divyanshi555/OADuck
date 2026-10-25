---
id: data-model
title: Data model
sidebar_position: 2
---

# Data model

## Core relationships

- `User` owns authored questions, assessment sessions, and submissions.
- `Question` owns hints, test cases, optimal solutions, sessions, and submissions.
- `Session` joins a user to a question and represents one solving/assessment attempt.
- `Submission` stores a code result associated with a session and optionally a user/question.
- `AssessmentViolation` belongs to a session and records a monitored event.
- `SessionHintView` records which hints were viewed during a session.
- `DoubtQuery` stores a learner question asked in the context of a session.

## Important lifecycle fields

`Session.completedAt` indicates completion. `terminationReason` explains why a session ended. `violationCount` provides a quick summary while the normalized `AssessmentViolation` records retain the individual event history.

`Submission.status`, `passedTests`, `totalTests`, `runtimeMs`, `memoryKb`, `actualOutput`, and `errorMessage` provide both a verdict and the evidence needed for review.

## Schema changes

Database migrations are stored under `prisma/migrations`. Any schema change should be accompanied by a migration, regenerated Prisma Client output, and a build or focused route check.
