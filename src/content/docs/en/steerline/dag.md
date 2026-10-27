---
title: "DAGs and task dependencies"
description: "Make ordering and prerequisites explicit"
contentId: "steerline/dag"
translationStatus: current
updated: "2026-10-27"
---

A directed acyclic graph (DAG) describes dependencies without circular paths. In a task graph, an edge can express that one task must be completed before another can proceed.

Explicit dependencies help identify work that can happen in parallel and work that must wait. A useful graph reflects actual prerequisites: unnecessary edges reduce parallelism, while missing edges can lead to premature work. The precise execution behavior depends on the current implementation.
