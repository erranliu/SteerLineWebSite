---
title: "An Index of Useful Prerequisite Knowledge"
description: "Brief introductions to core AI development concepts, formerly important ideas that now play a supporting role, and useful tool concepts that have always been non-core."
contentId: "ai-engineering/prerequisites"
translationStatus: current
updated: "2026-10-29"
version: "0.1.6"
sidebar:
  order: 3
  label: "3. An Index of Useful Prerequisite Knowledge"
---

Developing software with AI requires a few basic concepts. This article gives you the minimum introduction needed to follow the rest of the course and know what to look up when a problem arises.

As of October 2026, we divide this knowledge into two tiers: core concepts to understand more deeply over time, and useful concepts that do not require intensive study. The second tier distinguishes formerly important ideas that now play a supporting role from useful tool concepts that have always been non-core. This classification serves people using AI to deliver software. Building models or agent platforms brings different learning requirements.

## Tier one: core concepts to understand more deeply over time

This section is an index: it helps beginners establish basic concepts and experienced developers identify which knowledge remains core. These brief introductions are entry points. As you progress through the course and work on projects, seek the deepest possible understanding of each core concept.

As your understanding deepens, these core concepts will continually reshape how you represent development problems, influencing how you define problems, organize information, and find directions for solutions. This course centers on the first tier. Later tutorials will repeatedly explore these concepts in depth from different angles, explaining their roles and relationships in practical development.

### Models and agents

A model reasons and generates output from the information it receives. A coding agent organizes continuous work around it: reading files, changing code, running commands, checking results, and deciding what to do next. The same model can perform differently across tools and environments. Diagnose whether a problem comes from model capability, information, tools, or the organization of work.

### Session

A session is a development tool's unit for organizing ongoing work, including conversation, tool execution records, and related state. It spans multiple model calls and may continue across context compaction. A continuing session does not mean every historical detail remains in the current context. How sessions are saved, resumed, and share information depends on the tool and its configuration.

### Context

Context is the information a model actually receives in a particular call: instructions, conversation, code, documents, and tool results. A file being in the project does not mean the model has read it. A token is a basic unit the model processes, not the equivalent of an English word or Chinese character. The context window sets the token capacity of a call. The whole project does not automatically enter the model's view.

### Context compaction

Continuous work accumulates conversation and tool results. Compaction condenses older content into a shorter representation for subsequent calls. Many tools handle it automatically. It can omit details or preserve outdated conclusions, so important requirements and decisions should live in project documents that can be read again.

### Models' limited attention

Fitting information into the context window does not mean the model can use every item reliably. Irrelevant content, conflicting requirements, and complex relationships can affect results. You do not need to study Transformer internals. Provide the complete information needed for the task, reduce noise, and control scope. Simply shortening context and removing necessary constraints can also cause failure.

### Constraints and acceptance

Constraints are conditions an implementation must continue to satisfy, such as representing money in integer cents or preserving an existing API. Constraint maintenance keeps these conditions intact across repeated changes, multiple tasks, and collaboration between modules, while correctly updating and propagating them as requirements change. Acceptance specifies the evidence that will establish compliance: for example, submitting a refund request twice must produce only one refund. Tests provide some evidence. An agent declaring “done” cannot replace acceptance.

### Spec documents

Spec is short for specification. It defines the problem, expected behavior, scope, constraints, and acceptance criteria, turning scattered discussions into a maintained basis for development. “Add refunds” is insufficient: who can issue them, how much can be refunded, and how duplicate requests behave all need answers. AI can help draft the Spec; people must judge its requirements and tradeoffs.

### Plan documents

A Plan explains how to implement the current Spec: the approach, steps, dependencies, and verification. For example, establish the refund API and data contracts, implement the API and interface, then verify the complete flow. Adjust the Plan as you inspect the code and make discoveries. Changes to requirements or constraints also require updating the Spec. Completing every step does not establish compliance with the Spec.

### Git

Git is a version control system for recording changes, comparing differences, managing branches, and merging work. It supports review, investigation, and recovery of recorded versions. At minimum, understand repositories, commits, diffs, branches, merges, and conflicts. AI can execute commands; people need to judge which changes belong to the task and which results to retain.

### Git worktree

Git worktree gives one repository multiple independent working directories with shared version history, allowing tasks to change, run, and verify code separately. It isolates working directories, without eliminating business dependencies or merge conflicts, or isolating shared databases and ports. Parallel development requires both separating tasks and integrating their results.

### Search space

Here, the search space means the possible solutions and implementation choices for a development problem. “Build a useful order management system” leaves many choices unresolved. Defining scenarios, scope, interfaces, and acceptance criteria eliminates unhelpful directions and narrows the search space. People need to find effective problem formulations and constraints, avoiding both endless exploration of vague goals and premature commitment to bad solutions.

## Tier two: useful but non-core concepts

The course will generally not teach these non-core concepts in detail. They are listed here for recognition and reference: understand their purpose and scope, then explore them when a concrete need arises. Mastering every item is not a prerequisite. For formerly important concepts, understand why they now play a supporting role and adjust your learning priorities and effort accordingly. For concepts that have always been non-core, knowing what problems they solve and when to use them is enough. A mechanism remaining important inside a tool does not mean developers must treat it as core knowledge and invest heavily in building and maintaining it themselves.

### Formerly important, now supporting concepts

#### Harness

A harness is the system around a model that organizes execution, including the tool loop, context management, permissions, and state tracking. Developers once invested substantial effort in supplying these capabilities. Mature development tools now handle much of that work, letting users focus on requirements, constraints, and acceptance. Study harness design deeply when you need to customize development tools or agent systems.

#### Skill

A Skill packages task instructions with resources such as scripts, templates, and references for an agent to use as needed. A common entry point is `SKILL.md`. Preset workflows were often used to compensate for limited autonomous execution. As models and tools organize more work themselves, ordinary development no longer requires configuring large collections of Skills first. Skills remain useful for stable, repeated operations with domain-specific requirements.

#### MCP

MCP, the Model Context Protocol, standardizes connections between AI applications and external tools or data sources. Integrations once often required developers to focus on protocols and configuration. Many connections are now integrated into development tools, so users mainly need to know whether the capability is available. Explore MCP when customizing external integrations; learning to write an MCP server is not a prerequisite.

#### Subagent

A subagent handles a local task in its own context, enabling parallel exploration, independent checks, or isolation of large amounts of intermediate information. It mainly improves execution efficiency, with little effect on the human responsibilities of problem formulation, requirements tradeoffs, constraints, and acceptance. Designing a multi-agent organization should therefore no longer be the center of a development method. Use subagents when local tasks have clear boundaries.

#### RAG

Retrieval-augmented generation retrieves relevant material and supplies it to a model. It has been widely used to supplement model knowledge. For the development approach taught here, its role is limited to more efficient retrieval of relatively stable external knowledge. Frequently changing project documents add synchronization, update, and stale-index management costs, making this approach unsuitable for them. Organize project documents and let the agent search and read them as needed. Embeddings, vector search, and vector databases are related implementation concepts you may encounter; they are not prerequisites.

#### Persistent memory and Agents.md

Persistent memory stores information outside the current context and reloads it for later work. Early practices often placed extensive project knowledge in memory files, `AGENTS.md`, or `CLAUDE.md`. As a project grows, concentrating this information in automatically loaded files increases noise, conflicts, and maintenance costs. Retain a small set of global conventions; organize project facts and decisions in layers, load them as needed, define maintenance responsibilities, and update them promptly. Deliberate information management is core; memory mechanisms are supporting tools.

### Always non-core, but still useful

These terms help you understand model usage, settings, and tool usage and integration. Knowing their purpose helps you choose and use tools without first learning their implementation.

#### Token

Tokens measure the amount of information a model processes. Common usage statistics cover input, output, and reasoning. Understanding tokens helps you interpret context capacity, usage, and costs. You do not need to study tokenization or manually count the tokens in each passage. Consuming more tokens does not, by itself, mean a task was completed better.

#### Thinking effort

Thinking effort controls how much reasoning a model applies to a task. In general, higher effort trades more time and token consumption for a modest increase in the likelihood of successful task delivery. An exception is that some smaller models are effectively unusable for serious development at their low and medium settings.

The full judgment depends on the model and task, and will be covered in a separate lesson on model selection. For now, use a simple strategy: choose the high setting across the board. This is usually a reasonable default.

#### CLI

A command-line interface lets you use a tool through commands, arguments, and output: running tests, inspecting Git history, or operating a hosting platform, for example. Both people and agents can use it. Understand the broad meaning of commands and their results; AI can help with complex commands.

#### TUI

A terminal user interface provides interactive lists, menus, panels, and shortcuts inside a terminal. It determines how you interact with a tool, without determining model capability or development method. Learn the operations needed for the particular tool you use.

#### APIs and SDKs

An API defines how programs request capabilities and exchange data. An SDK is a development package that helps programs use those capabilities. Examples include querying tasks through an interface or using a library for authentication and requests. Learn the relevant interface and package when integrating a service, rather than studying platforms in advance.

#### Hooks

A hook triggers an operation when a specified event occurs: formatting a file after an edit or running checks when a task ends, for example. Hooks automate established, repetitive operations. Learn a tool's events, configuration, and execution conditions when you need to customize its workflow.

#### CI/CD

Continuous integration and continuous delivery or deployment use pipelines to automate builds, checks, tests, and releases. People need to understand what to verify and under what conditions software can be delivered. AI can help implement the pipeline configuration; learn it as the project requires.

#### Sandboxes and permissions

A sandbox restricts the execution environment. Permissions specify which files, networks, and operations an agent can access. Understand the scope of authorization and why a tool refuses an operation. Study specific isolation technologies and configuration as needed. A worktree itself does not replace a sandbox.

## References

Consult these materials as needed; you do not need to finish them before developing software. The official sources describe mechanisms and usage. This article's judgments about learning priorities and applicability center on using AI to deliver software.

- Models and agents: [Building effective agents — Anthropic](https://www.anthropic.com/research/building-effective-agents).
- Sessions: [Run and continue sessions — OpenAI documentation](https://developers.openai.com/api/docs/guides/agents-api/sessions). A concrete implementation of sessions and multi-turn work; learning the API is not a prerequisite.
- Context and tokens: [Context windows — Claude documentation](https://platform.claude.com/docs/en/build-with-claude/context-windows).
- Compaction: [Compaction overview — Claude documentation](https://platform.claude.com/docs/en/build-with-claude/compaction).
- Context organization and on-demand retrieval: [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents).
- Effective long-context use: [Lost in the Middle](https://arxiv.org/abs/2307.03172) and [Context Rot — Chroma](https://www.trychroma.com/research/context-rot). Specific experimental results apply to the models and tasks studied.
- Constraints, acceptance, and search space: the preceding article, [AI Capabilities, Limitations, and the Human Role](../limitations/).
- Specs and Plans: [Specification-Driven Development — GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/spec-driven.md). Reference the conceptual distinctions without adopting the entire workflow.
- Git: [Pro Git, Chinese edition](https://git-scm.com/book/zh/v2) and [English edition](https://git-scm.com/book/en/v2). Start with “Getting Started,” “Git Basics,” and “Git Branching.” See also the [official git-worktree documentation](https://git-scm.com/docs/git-worktree).
- Harnesses: [Effective harnesses for long-running agents — Anthropic](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents). A reference for their responsibilities; its workflow is not required by this course.
- Skills: [Agent Skills Overview — Official documentation](https://agentskills.io/home).
- MCP: [What is the Model Context Protocol? — Official documentation](https://modelcontextprotocol.io/docs/getting-started/intro).
- Subagents: [Create custom subagents — Claude Code documentation](https://code.claude.com/docs/en/sub-agents).
- RAG: [Introducing Contextual Retrieval — Anthropic](https://www.anthropic.com/research/contextual-retrieval). A reference for retrieval mechanisms, rather than a management approach for project documents.
- Persistent memory and instruction files: [How Claude remembers your project — Claude Code documentation](https://code.claude.com/docs/en/memory).
- Thinking effort: [Reasoning models — OpenAI documentation](https://developers.openai.com/api/docs/guides/reasoning). A reference for the parameter's meaning; the model selection lesson will cover how to choose a setting.
- CLI: [About GitHub CLI — GitHub documentation](https://docs.github.com/en/github-cli/github-cli/about-github-cli), a concrete example of a command-line tool.
- TUI: [Textual documentation](https://textual.textualize.io/). View examples of terminal interfaces; learning the framework is unnecessary.
- APIs and SDKs: [Libraries for the REST API — GitHub documentation](https://docs.github.com/en/rest/using-the-rest-api/libraries-for-the-rest-api).
- Hooks: [Automate actions with hooks — Claude Code documentation](https://code.claude.com/docs/en/hooks-guide).
- CI/CD: [Understanding GitHub Actions — GitHub documentation](https://docs.github.com/en/actions/get-started/understand-github-actions).
- Sandboxes and permissions: [Configure the sandboxed Bash tool — Claude Code documentation](https://code.claude.com/docs/en/sandboxing).
