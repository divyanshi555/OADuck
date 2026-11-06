---
title: Secure Assessment and Violation Detection
sidebar_position: 10
---

# Secure Assessment and Violation Detection

OA Duck combines browser event listeners with server-side event recording and submission-state checks. It is not a browser lockdown or a dedicated proctoring service.

## Browser-side detection

`AssessmentMonitor` attaches listeners only while an assessment is active:

| Event | Browser behavior | Event type sent |
|---|---|---|
| Copy keyboard shortcut / `copy` event | Prevents the default copy action when observed | `COPY` |
| Paste keyboard shortcut / `paste` event | Prevents the default paste action when observed | `PASTE` |
| `document.visibilitychange` when `document.hidden` | Detects a hidden tab/document | `TAB_SWITCH` |
| `fullscreenchange` when no full-screen element remains | Reports exiting full screen | `FULLSCREEN_EXIT` |
| Browser history `popstate` | Reports back navigation and pushes the current state again | `BACK_NAVIGATION` |

Repeated same-type events within 150 ms are suppressed in the client. Before a session is created, the rules gate asks the user to enter full screen and acknowledge the rules. If full screen is later lost, the UI shows a resume-full-screen overlay while the browser event is sent.

The code checks `document.hidden`; it does not register a separate window-blur/focus listener. Browser event delivery is best-effort: a disabled/modified client, unsupported event, network failure, or browser behavior may prevent an event from being observed or reported. Copy/paste prevention is not a security boundary and does not prevent other ways to read or transfer information.

## Server-side recording and termination

The client posts `{ "type": "..." }` to `POST /api/assessments/{assessmentId}/violations`. The route authenticates the user, confirms the assessment belongs to that user, validates the event type, locks the session row in a database transaction, creates an `AssessmentViolation`, and increments `Session.violationCount`.

Termination policy in the route:

- **NORMAL**: first and second violations are recorded with warnings; the third terminates the session.
- **STRICT**: the first violation terminates the session.
- **Full-screen exit**: terminates immediately in either mode.
- **Admin test mode**: events are still recorded and counted, but do not terminate while the flag is enabled.

Termination sets `Session.terminationReason`. The active client displays a terminated screen. More importantly, `POST /api/submit` verifies session ownership and rejects a terminated (`403`) or completed assessment before persisting a submission; the final save also rechecks session state under a row lock. This prevents further assessment submissions through that flow.

“Debarment” here is limited to ending that assessment session. The schema and handlers do not set an account suspension or prevent the user from starting a future session. The separate code-run endpoint is not bound to a session and remains a signed-in code-execution endpoint; it should not be confused with permission to submit to a terminated assessment.

## Stored data and dashboard

- `AssessmentViolation` stores each accepted event's `assessmentId`, `type`, and timestamp.
- `Session.violationCount` is the session's aggregate count; `terminationReason` records termination.
- The signed-in profile stats API sums `violationCount` over the user's sessions. The profile dashboard displays this aggregate as **Violations**.
- The profile also derives **Give Ups** as completed sessions with no accepted submission. The admin dashboard is not an authoritative violation audit view.

## Enforcement boundary

**Client-side:** full-screen prompt, keyboard/copy/paste interception, tab visibility and history detection, warnings, and overlays. These depend on the browser and active JavaScript.

**Backend:** validates user/session ownership and event names, stores event/count/termination state, and blocks submissions against a terminated or completed session. The server cannot independently verify that every browser event occurred; violation reports originate in the client. No account-wide suspension, tamper-proof proctoring, operating-system monitoring, or server-enforced wall-clock expiry is implemented by these paths.
