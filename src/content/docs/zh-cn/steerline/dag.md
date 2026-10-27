---
title: "DAG 与任务依赖"
description: "明确顺序和前置条件"
contentId: "steerline/dag"
translationStatus: current
updated: "2026-10-27"
---

有向无环图（DAG，directed acyclic graph）可以表达不存在循环路径的依赖关系。在任务图中，一条边可以表示一个任务必须在另一个任务开始前完成。

明确依赖有助于识别可以并行的工作和必须等待的工作。有效的任务图应反映真实前提：多余依赖会降低并行度，遗漏依赖可能导致过早执行。具体执行行为以当前实现为准。
