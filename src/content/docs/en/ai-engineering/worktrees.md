---
title: "1+1+1 (Worktree+Spec+PR): Starting Parallel Development"
description: "Organize each task around one worktree, one Spec, and one PR to work in parallel with less attention spent tracking project state."
contentId: "ai-engineering/worktrees"
translationStatus: current
updated: "2026-10-30"
version: "0.2.4"
sidebar:
  order: 8
  label: "8. 1+1+1 (Worktree+Spec+PR): Starting Parallel Development"
---

The previous lesson introduced Spec-driven development. A Spec preserves agreed requirements so AI can keep working on long tasks and you can check the results against clear expectations. With that foundation in place, the most direct way to improve efficiency is to open multiple sessions and advance several tasks in parallel.

**As of October 2026, the development methods discussed from this lesson onward have not yet become a stable community consensus. We believe the next consensus the AI development community needs to establish is the 1+1+1 workflow.**

1+1+1 means: **one task, bound to one disposable worktree and one Spec, ultimately delivered as one PR.**

The worktree holds the task's changes, the Spec defines its requirements, and the PR brings its deliverables together. Keeping these three strictly bound gives each task an independent workspace, a clear basis for execution, and a dedicated point for auditing and acceptance.

You can prepare the Spec in advance or develop it through discussion in the task's session. When needed, add a Plan describing how to implement it. Where the Spec is written does not affect 1+1+1, and the Plan is not one of its three "ones." What matters is that execution and acceptance remain tied to the same worktree, Spec, and PR.

**1+1+1 has two core benefits: it supports parallel tasks and greatly reduces the attention you need to spend managing development.**

## Why 1+1+1 Is an Essential Step in AI Development

Reliable delivery takes substantial execution time. AI generates code at a limited speed. After implementation, it still needs to run tests, inspect results, fix problems, verify again, and complete acceptance checks. As a project grows more complex, more requirements must hold at the same time, and this process takes longer.

As project complexity increases, long tasks that run for several hours at a time will become the main way of working. A Spec gives those tasks a stable basis, allowing AI to keep making progress without waiting for you to explain the requirements again at every step.

Even if AI generation speeds continue to improve, reliable delivery will still depend on testing and acceptance. Faster code generation does not remove the need for thorough verification. Project size, task complexity, and the range of behaviors to check will also continue to grow. **Long tasks are unavoidable. Faster output will not turn reliable delivery into an instant answer.**

To improve efficiency further when tasks take hours, you inevitably need more parallel work. With only one session running, other tasks have to wait. While one task runs tests and fixes problems, another can continue implementation, and a third can already be going through acceptance.

But if every additional session requires you to watch its conversation, remember requirements, reinforce boundaries, and reconstruct progress, your attention soon becomes the limit on parallelism. Opening more windows does not automatically produce more reliable deliveries.

Parallel work therefore needs an approach that also reduces the effort of maintaining project state. 1+1+1 organizes development into clearly bounded tasks that can be executed and accepted independently. AI can work on several tasks at once, and you can manage that work. **We believe this is an essential step toward complex AI projects and reliable delivery.**

## Why Worktree, Spec, and PR Are All Necessary

### A Worktree Provides an Independent Workspace

A Git worktree is a separate working directory for the same Git repository. It has its own set of working files while sharing the repository's version history. In the 1+1+1 workflow, each task uses its own worktree and is developed on a separate task branch.

When multiple sessions share one directory, a file changed by one session immediately becomes visible to the others. While one session runs checks, another may still be editing the files. A commit can also accidentally include unfinished changes from another task.

Branches distinguish versions, but one working directory can show only one set of working files at a time. Giving tasks different branch names does not let multiple sessions maintain independent development states in the same directory. A worktree gives each task its own directory so edits, verification, and commits can happen separately.

**Before the PR is merged, commits and pushes on the task branch do not change the main branch.** A commit records a version of the task, and a push sends the task branch to the remote repository. These changes enter the main branch only after auditing and acceptance, when the PR is merged.

One task can remain in development while another already has a PR open. Each keeps its own state, without repeatedly tidying up the same directory whenever you switch tasks.

### A Spec Provides Clear Requirements for Execution and Acceptance

After isolating files, you still need to define what each task is responsible for.

For example, one task implements CSV import while another implements import history queries. Each has an independent worktree, but they still need to agree on the fields in an import result, how statuses are represented, and what the query API returns. Without clear requirements, both sessions can finish implementations that do not work together.

A Spec defines the task's scope, behavior, constraints, and acceptance criteria. Related tasks also need to coordinate the requirements they share before execution begins.

It reduces the need for constant supervision, too. With requirements saved in the Spec, AI can reread them and you can use them to check for deviations. When requirements change, update the Spec and coordinate implementation and verification. You no longer have to remember every agreed detail and remind several sessions separately.

### A PR Provides a Clear Point for Auditing and Acceptance

When AI finishes editing, that only means it considers execution complete. You still need to check whether the result meets the Spec, whether it introduces other problems, and whether to accept the changes.

Committing directly to the main branch mixes finishing implementation with accepting the result. You may discover that the work has not passed the necessary acceptance checks only after it has already entered the main branch.

A PR brings the task's changes together with its Spec and verification results. You can inspect what actually changed, whether the requirements were implemented, and which checks were completed before deciding to merge.

**Opening a PR means the task is ready for auditing and acceptance. Merging it means accepting those changes into the main branch.** Opening a PR does not replace the checks. If you find problems, fix them in the original task's worktree, update the same PR, and continue acceptance.

### Strict Binding Makes Tasks Manageable

Mixing unrelated tasks in one worktree makes their changes hard to separate. Combining unrelated goals in one PR keeps expanding the scope of auditing and acceptance. Using these tools alone does not establish 1+1+1.

With strict binding, each task can progress, be checked, be merged, or be abandoned independently. Its requirements, changes, and deliverables remain connected. Later, you can return to the relevant Spec and Git versions to reproduce the development state, inspect what was implemented, and see the basis for accepting that delivery.

**1+1+1 changes your basic unit of planning from exchanges in a conversation to individual, reproducible, auditable tasks.**

## The Task Lifecycle and the Two Core Benefits

A task's lifecycle can be summarized as:

> Start a task → agree on the Spec → implement and verify → open a PR → audit and accept → merge → archive.

Start a new task with its own session and worktree, and establish the corresponding Spec. AI implements the requirements, performs the necessary verification, and submits the results through a PR. If acceptance reveals problems, continue fixing them within the original task. Once accepted, merge the PR, archive the session, and clean up the temporary worktree.

### Advance Several Long Tasks at Once

Once one session starts executing, you can start another task, discuss another Spec, or review a submitted PR. Each task has its own workspace, so you do not have to wait for the previous task to finish before making the directory available for the next one.

For example, while the CSV import task runs tests, the import history query task can continue implementation, and a completed fix can go through PR acceptance. You step in where judgment is needed while AI keeps working on the other tasks.

Worktrees isolate file changes. Tasks with dependencies still need an execution and merge order. When relevant changes reach the main branch, tasks that have not yet merged also need to incorporate the necessary updates and verify again. The advanced lessons will explore how to design task boundaries and parallel work.

### Greatly Reduce the Burden on Your Attention

**The main source of this reduction is that changes to the project's accepted state are tied to PR merges.** Work in progress stays in its own worktree and task branch; commits and pushes do not bring it into the main branch. The main branch accepts a task's changes when its PR passes auditing and acceptance and is merged. Project state therefore changes through individual accepted tasks, making the scope and meaning of each change clear.

Each new session's discussion, or execution of a Spec, can start from an explicit version of the main branch that has already been checked and accepted. You know what the project currently does and what this task is intended to change. The worktree preserves that clear starting point. Unaccepted changes from other tasks do not appear in it automatically; when updates from the main branch are needed, incorporate and verify them deliberately.

Without this approach, multiple sessions continuously editing the same directory or working directly on the main branch can leave the project itself in an unstable intermediate state: partly implemented and not yet verified. Every new conversation or task requires you to first establish which behaviors work, which are unfinished, and which changes belong to other sessions. Reconstructing the current state repeatedly consumes your attention.

Organizing this work through commits and pushes alone also makes it easy to mix up what the commits contain. One commit may combine several tasks, while one task may span several commits. A push only synchronizes a branch; it does not establish an acceptance point for a complete task. If those changes go directly into the main branch, you have to move between commit history, code diffs, and conversations to work out what the project has actually completed. This makes information harder to obtain and project state harder to maintain.

1+1+1 keeps task requirements in the Spec and brings the task's proposed changes and verification results together in its PR. To maintain project state, you can look directly at which tasks are running, which await acceptance, and which have merged. Your attention goes mainly to agreeing on requirements, intervening when needed, and auditing and accepting changes before they merge. You do not have to follow every operation in every session or repeatedly reconstruct project progress from chat history.

**Parallelism lets more tasks advance at once. Having the main branch change through accepted PRs lets you manage those tasks from states that are easy to understand. Together, they produce the efficiency gains of 1+1+1.**

## Which Agents Support 1+1+1?

### Choose a Multi-Session Agent First

**Single-session agents are not a good fit for organizing 1+1+1 development.** The workflow needs several tasks to advance at once, with an easy way for you to inspect, switch between, and manage them. Start by distinguishing single-session agents from multi-session agents.

CLI agents default to single-session interaction: a normal invocation centers on one active conversation. You can open several terminals and run multiple CLI instances, but switching sessions, tracking task ownership, and maintaining workspace associations often fall to you or an additional management tool. This increases the attention required and does not directly provide the workflow this lesson aims to establish.

Multi-session agents manage multiple conversations as part of the product itself. You can start different tasks in one interface, inspect their execution state, switch to the task that needs your judgment, and archive it when finished. Evaluate the product interface you actually use: the Codex app and Codex CLI, or the Claude app's coding interface and Claude Code CLI, need to be considered separately.

### Multiple Sessions Also Need Native Worktree Binding

**Opening several sessions is not enough to run 1+1+1 reliably. The product also needs to maintain a native binding between each session and its worktree.**

The product should preserve which worktree belongs to the session, which directory execution uses, and where a resumed session returns. Having AI run a Git command to create a worktree is different from having the product maintain that association natively.

Without native binding, you can still create a worktree manually and point a session at its directory. But if the association depends on conversational reminders or temporary configuration, context compaction, session recovery, or directory changes during a long task may break it, forcing you to check and correct it. This makes task boundaries hard to maintain reliably and puts state management back on you.

### Current Tool Choices

As of October 30, 2026, based on our current understanding of these products and their official documentation, this course uses the following assessment:

| Multi-session agent | Native worktree–session binding |
| --- | --- |
| Codex App, Claude App, Cursor, Antigravity, TRAE, Windsurf | Known to provide stable native binding; suitable for 1+1+1. |
| DeepSeek Harness, ZCode, Kimi Code | Not currently treated as providing stable native binding; not recommended for running this course's 1+1+1 workflow. |

**We have not tested experimental plugins and modes individually, so for now we treat them as unable to support this course's 1+1+1 workflow reliably.** For example, DeepSeek Harness has an experimental worktree plugin, and Kimi Code offers the experimental Tower mode. Their existence does not mean this course has confirmed that they reliably maintain the binding we require. The table is a tool-selection assessment, not a claim that these products have no related capabilities.

For tools in the supported group, use the interface that actually provides the feature: for example, the Claude app's Code interface, Cursor's Agents Window, or the TRAE desktop task interface with worktree support. Tools will continue to change; follow the instructions for your installed version.

The Codex app can initially work in a detached HEAD state, meaning no named branch is checked out yet. For this workflow, ask AI to create a separate task branch before preparing the PR.

**This course recommends choosing a multi-session agent with stable native worktree–session binding directly.** Let the product maintain sessions, workspaces, and execution state so you can gain both parallelism and reduced attention overhead. Strict binding to the Spec and PR still needs to be established through your workflow.

## The Simplest Execution Guide

You do not need to memorize a complicated procedure. When you want to start a new task, follow these steps.

1. **Create a new session and worktree.** Select the project and starting version, give the task its own workspace, and develop on a separate task branch. If the tool has not created a named branch yet, ask AI to create one before opening the PR.
2. **Discuss the requirements there and produce a Spec.** Agree on the goal, scope, behavior, and acceptance criteria, and save them in the project. Add a Plan if needed.
3. **Ask AI to execute the Spec.** Complete implementation and the necessary verification. If requirements are missing or conflict, discuss and update the Spec before continuing.
4. **Ask AI to open a PR, then audit and check acceptance.** Link the Spec and describe verification results in the PR. If you find problems, continue editing within the original task and update its PR.
5. **Merge the PR.** Once accepted, bring the task's changes into the main branch.
6. **Archive the session.** Confirm that the work has been saved, then finish the task. Tools with automatic cleanup usually reclaim the temporary worktree. Some ask whether to retain it or require a separate cleanup action. Archiving a conversation does not necessarily remove its directory immediately; the exact behavior depends on the tool.

**You can also prepare the Spec in advance.** After creating the session and worktree, ask AI to read it and start executing. Where the Spec is written does not affect 1+1+1. What matters is keeping the task clearly bound to its worktree, Spec, and PR.

AI can handle commits and pushes during execution and PR preparation. You do not need to direct every Git operation. Those operations on the task branch do not change the main branch. Focus your judgment on whether the requirements are clear and whether the PR meets the acceptance criteria.

### Why We Recommend a Worktree for Every Session

When working on a project, we recommend using an independent worktree for every session by default. Follow the same approach even if you currently run only one session.

A session that begins with requirements discussion or investigation often turns into file editing. Starting in an independent workspace reduces the need to move later and keeps temporary changes out of your main checkout.

A consistent habit removes the need to decide whether each session needs isolation or whether the current directory contains another task. Every task has its own place, and the main checkout stays stable. When you need more parallel work, simply create another session and worktree.

Archive the task when it is complete, clean up its temporary worktree, and create a fresh one for the next task. The Spec, version history, and delivery evidence in the PR are the records to preserve. The temporary working directory can be discarded after use.

**Make 1+1+1 your default workflow, and every new task becomes a clearly bounded unit that can be executed and accepted independently. It lets several long tasks run in parallel and reduces the attention you need to maintain project state.**

Once you can use 1+1+1 fluently, **congratulations: you have completed the getting-started stage.**

The getting-started stage establishes sound development practices and basic concepts for AI development. Understanding AI's capabilities and limits, managing versions with Git, defining requirements through Specs, and organizing tasks with 1+1+1 together form the foundation for developing projects with AI.

## References

- [Worktrees — Official OpenAI documentation](https://learn.chatgpt.com/docs/environments/git-worktrees): parallel sessions, workspace associations, detached HEAD, and creating task branches in Codex.
- [Desktop application — Official Claude documentation](https://code.claude.com/docs/en/desktop): multi-session management and native worktree isolation in the Claude app's coding interface.
- [Worktrees — Official Cursor documentation](https://cursor.com/docs/configuration/worktrees): native worktree support in the Agents Window.
- [Projects — Official Antigravity documentation](https://antigravity.google/docs/projects): creating a separate worktree for a conversation.
- [Worktrees — Official TRAE documentation (Chinese)](https://docs.trae.cn/work_worktree): worktree creation, task branches, and cleanup for local desktop tasks.
- [Worktrees — Official Windsurf/Cascade documentation](https://docs.devin.ai/desktop/cascade#worktrees): separate worktrees for parallel conversations.
- [Experimental Worktree — Official DeepSeek Harness repository](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/experimental/worktree/README.md): the experimental worktree plugin, session working-directory records, and retained directories and branches.
- [Tower multi-agent collaboration — Official Kimi Code documentation](https://www.kimi.com/code/docs/en/kimi-code-cli/guides/tower.html): the experimental worktree collaboration mode that requires explicit activation.
- [git-worktree — Official Git documentation](https://git-scm.com/docs/git-worktree): how multiple working directories share a repository.
