---
id: features
title: Feature reference
sidebar_position: 2
---

# Feature reference

## Question library

Questions contain a title, description, difficulty, topic list, examples, constraints, expected time complexity, expected space complexity, hints, test cases, and optional optimal solutions. The question list supports the learner’s browsing workflow, while the admin interface supports authoring and editing.

## Editor and execution

The solving experience uses a browser code editor. Sample runs are intended for fast feedback during development of a solution. Final submissions are evaluated against the configured test suite and persisted for later review.

## Profiles and statistics

Profile views combine account information with activity and performance summaries. The profile API and statistics API are used by the client dashboard to show recent submissions and aggregate progress.

## Monitoring

Assessment monitoring is deliberately separate from ordinary practice. A `Session` tracks monitoring mode, violation count, termination reason, completion time, and whether admin test mode was enabled. Individual violation records retain their type and timestamp.

## Duck Insight

Duck Insight is the product’s review layer for learning after an attempt. It uses the session/question/submission context to produce an explanation instead of only returning a verdict.
