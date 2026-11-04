---
title: Known Limitations and Future Improvements
sidebar_position: 14
---

# Known Limitations and Future Improvements

This page describes observed implementation limits, not planned work. The improvement ideas are possibilities and are not claims about a committed roadmap.

## Current and security limitations

- **Assessment timing:** the configured duration is returned to the browser and displayed, but the submission and end handlers do not enforce a server-side deadline or automatically close an expired session.
- **Browser monitoring:** clipboard, fullscreen, tab visibility, and history events are detected in the browser and reported to the backend. A browser user can disable, evade, or interfere with client-side monitoring; it is not proctoring or a guarantee against cheating. The backend validates event types, records reported events, increments the session counter, and applies termination rules to received events.
- **Dashboard scope:** the Admin Dashboard contains aggregate and per-question data, not per-user performance or violation analytics. The User Dashboard shows submission activity, not assessment-session history or a distinct count of attempted questions. See [Dashboard and Progress Tracking](./dashboard-progress.md) for formulas and filtering caveats.
- **Dashboard freshness and scale:** dashboard data is loaded on page/API requests rather than through live updates. Admin pages load all users, questions, and matching submissions without dashboard pagination. Admin date ranges are based on the newest loaded submission, and per-question telemetry is not time-windowed. The per-question table's “Avg Attempts” column currently displays an attempt count rather than an average.
- **Duck Insight:** analysis depends on Gemini and a matching stored reference solution. The app validates response structure, but cannot prove LLM explanations are correct. Analysis calls have no app-level rate limiter, model retries are disabled, and generated results are stored only in browser local storage.
- **External data processing:** Duck Insight sends the submitted source code, reference code, problem details, diagnostics, and public examples to Google Gemini. The application does not manage that provider's data-handling policy. Judge0 receives code and test input for execution.
- **External service availability:** persistence depends on the configured PostgreSQL/Neon connection; assessment code execution depends on Judge0; AI analysis depends on the configured Gemini API; Google sign-in depends on Google OAuth configuration.
- **Execution limits:** code is executed through Judge0 with configured language IDs and per-call CPU/wall time limits. Service errors, provider limits, or delayed execution can prevent a verdict; a polling timeout is reported by the helper as an internal-error result rather than a code time-limit verdict.

## Possible improvements

- Enforce assessment deadlines and eligibility on the server, and add server-side controls and auditability appropriate to the assessment threat model.
- Add pagination and indexes/aggregates for large admin datasets; implement accurate calendar-based date filters and range-aware per-question metrics.
- Add admin per-user performance and violation summaries, and a user assessment-history view if those product views are needed.
- Add rate limits, request quotas, and operational monitoring for code execution and AI analysis.
- Make AI analysis more auditable with per-model evaluations, prompt/output versioning, and explicit handling for uncertain or unsupported explanations.
- Add integration tests for dashboard formulas, violation aggregation, external-service failures, and role-based access.

These are recommendations only; they are not currently implemented features.
