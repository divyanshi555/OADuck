---
id: admin-guide
title: Admin guide
sidebar_position: 3
---

# Admin guide

Administrators can reach the admin dashboard at `/admin`. The UI exposes role-aware navigation for content and user operations.

## User management

The admin user area lists registered accounts and supports role-related operations through the admin API. Role changes should be treated as privileged actions because they change which routes and controls are available to an account.

## Question management

The question manager supports creating, listing, editing, and deleting questions. A complete question should include:

- A clear statement and constraints.
- Difficulty and topics.
- Public examples.
- Sample and hidden test cases.
- Expected complexity guidance.
- A reference solution where Duck Insight or review workflows need one.

## Assessment test mode

Admin test mode exists to validate assessment behavior without confusing internal QA runs with normal learner history. The toggle is backed by a dedicated API route and is surfaced in the assessment header for authorized users.

## Safety checklist

- Verify the target user before changing a role.
- Do not place secrets in question text, source code, or documentation.
- Test sample cases before publishing hidden cases.
- Confirm the intended language and execution limits before enabling a question.
