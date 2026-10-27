---
title: "Why use Git worktrees?"
description: "Isolate concurrent work without separate clones"
contentId: "ai-engineering/worktrees"
translationStatus: current
updated: "2026-10-27"
---

A Git worktree lets you check out another branch in a separate directory while sharing the same repository. This is useful when people or agents work on different tasks at the same time.

Give each task a clear branch and directory, and avoid simultaneous edits to the same checkout. Isolation reduces accidental interference, but does not resolve conflicting changes automatically: review and integrate each branch deliberately. Worktrees share repository data, so they are not a security boundary.
