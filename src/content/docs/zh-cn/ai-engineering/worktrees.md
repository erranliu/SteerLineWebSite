---
title: "为什么使用 Git worktree"
description: "隔离并行任务，无需重复克隆"
contentId: "ai-engineering/worktrees"
translationStatus: current
updated: "2026-10-27"
---

Git 工作树（worktree）允许同一个仓库在独立目录中检出另一个分支，同时共享仓库数据。多人或多个 agent 并行处理任务时，这有助于隔离工作现场。

为每个任务明确分支和目录，避免在同一检出目录中同时修改。隔离可以减少意外干扰，但不会自动解决冲突：每个分支仍需要有意识地审查和集成。Worktree 共享仓库数据，因此不是安全隔离边界。
