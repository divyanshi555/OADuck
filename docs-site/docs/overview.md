---
title: Project Overview
sidebar_position: 1
---

# OA Duck

OA Duck is a web application for practicing coding problems in a timed, monitored online-assessment workspace. It combines a question library and code editor with server-side test execution, saved submissions, assessment monitoring, and post-assessment feedback.

## Roles

- **User**: browse questions, filter a practice choice by topic and difficulty, work in a timed assessment, run or submit code, review personal activity, and request Duck Insight for an eligible result.
- **Admin**: use all user features, view the administration dashboard, create and edit questions and test data, manage accounts and roles, and use an assessment test-mode control.

Accounts are created with email and password or Google sign-in. New accounts default to the `USER` role; the configured administrator email is assigned the `ADMIN` role.

## Main capabilities

- **Question library**: browse problems by difficulty and topic, with per-question attempt and solved indicators.
- **Practice and assessment**: choose a question, review the rules, enter full screen, and start a timed session. Normal and strict monitoring modes are deployment-configurable.
- **Code editor and judging**: edit C++, Java, or Python in Monaco. Run public sample cases or submit against hidden cases; verdicts and submission records are returned by the server.
- **Session integrity tracking**: record copy, paste, tab-switch, back-navigation, and full-screen-exit events. The server applies the configured mode and termination rules.
- **Duck Insight**: request a structured AI explanation for an incorrect submission after a completed, non-terminated assessment, when a same-language reference solution is available.
- **Profile and progress**: view solved counts, submission activity and streaks, recent results, and recorded assessment violations; edit profile details.
- **Administration**: manage questions, reference solutions, hints, test cases, and user roles.

The application does not claim that browser monitoring is equivalent to a dedicated proctoring service; the tracked events are those implemented by the browser and server code.
