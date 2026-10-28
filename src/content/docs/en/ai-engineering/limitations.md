---
title: "AI Capabilities, Limitations, and the Human Role"
description: "Understand why frontier models still need people to deliver commercial software, through three limitations: generation, constraint maintenance, and modality."
contentId: "ai-engineering/limitations"
translationStatus: current
updated: "2026-10-28"
version: "0.1.0"
sidebar:
  order: 2
  label: "2. AI Capabilities, Limitations, and the Human Role"
---

AI can already handle a great deal of complex development work. It can understand code, design solutions, implement features, write tests, and use tools to work continuously. But people are still needed throughout the development and long-term maintenance of small, midsize, and larger commercial software projects.

This article discusses the state-of-the-art (SOTA) models available as of October 28, 2026. We will not debate whether AI has consciousness or desires, or whether it can bear the consequences of its actions. We will address the practical limitations in software projects directly: why even the strongest AI today cannot replace people, and how to organize development around those limitations.

These limitations fall into three categories: generation, constraint maintenance, and modality. Constraint maintenance is the central engineering problem and the focus of this article.

## Strong generation does not make reframing a problem easy

From a software development perspective, we can understand a model's main work as search, reasoning, and generation. Given the current problem and available information, it explores solutions, derives results, and then generates code or performs actions. When a problem is clearly expressed and well scoped, AI can already do efficiently what once took skilled professionals considerable time.

The way a problem is expressed limits the directions of search. Ask how to optimize a piece of code, and AI will look for improvements to that code. But an effective solution might require changing the data structure, moving module boundaries, or eliminating that processing step altogether. We call reorganizing and expressing a problem differently a change in its representation.

AI can propose new problem representations, but it still struggles to recognize proactively and reliably when to stop pursuing an existing direction and redefine the problem. It often refines the current solution in increasing detail without breaking out of an inefficient approach in time.

Open-ended problems introduce another difficulty: an enormous search space. "Design a useful order management system" leaves many choices unresolved, including feature scope, interactions, data structures, and performance requirements. Those choices also affect one another. Letting AI keep exploring such a space consumes considerable time and makes it hard to judge when a suitable answer has been found.

One important human contribution is to identify the real problem, establish a useful representation, decide tradeoffs, and narrow the search space. Once the problem is organized well, much of the detailed reasoning and implementation can be delegated to AI.

## Completing individual tasks does not preserve project constraints

Even when the problem is clear and AI can complete each task separately, the project faces a greater difficulty: keeping all that work consistent with the same requirements.

Suppose you are adding refunds to an existing order management system. Beyond making refunds possible, you have established several requirements: preserve compatibility with existing APIs, represent all monetary amounts as integer fen (hundredths of a yuan), check permissions for refund operations, and prevent repeated submissions from issuing duplicate refunds.

AI can build the APIs, database changes, pages, and tests separately, but all those implementations must satisfy the requirements together. If a page submits an amount in yuan while the API processes it as fen, or a refund path omits a permission check, the feature fails. Producing code for each part does not mean the combined result meets the project's goals.

We call the ability to uphold these requirements throughout ongoing development **constraint maintenance**. Constraints include requirements, business rules, API contracts, architectural boundaries, and decisions already made during development. They must continue to govern later work across model calls, tasks, and modules.

Constraints also change. When requirements change, new agreements must replace old ones and reach every affected part of the project. Constraint maintenance therefore includes both following established requirements and handling changes to them correctly.

As a project grows, relationships and changes multiply, making this work harder. **How many individual problems AI can solve and whether it can keep an entire project consistent over time are different capabilities.**

## Why constraints are difficult to maintain throughout development

Start with how AI works continuously. A model call receives the current requirements, code, conversation history, and tool results, reasons over them, and generates a response or tool call. Once a tool runs, its result feeds into later calls. Continuous development advances through this sequence.

Which project facts the next call can use depends on the context supplied by the system, the information the model retrieves, and how it uses that information. A file being on disk does not mean its requirements have entered the current task. A requirement appearing in conversation history does not mean it will be applied correctly to every change.

### Fitting information into context does not ensure it is used well

When a project substantially exceeds a single context window, the model can access only part of it during a given task. It must select relevant code, read documentation, and retrieve earlier decisions before proceeding.

A longer context window helps, but capacity and the ability to use information effectively are different things. Logs, old discussions, and unrelated code add interference. Understanding several requirements and how they relate to the current change is also harder than finding a particular sentence. See [Anthropic's explanation of context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) for a discussion of these engineering problems.

For example, the model may correctly repeat that monetary amounts must use integer fen, yet update a page to submit a component's value in yuan without converting it. It has not forgotten the sentence; it has failed to apply the constraint in the implementation. Repeatedly asking it to "remember every requirement" does not solve this problem.

### Each successive call needs a reliable basis for its work

As development proceeds, code, conversation history, and tool results accumulate. To keep working, the system must retrieve, filter, or compress this information. That process can retain the main task while losing details needed later.

"Add refunds" survives, but "preserve compatibility with existing APIs" disappears during task decomposition or context organization. The next call can still implement a refund API successfully. It just implements a different API from the one originally required.

Documentation being stored in the repository therefore does not solve the problem. What the current task should read, which rules remain valid, and which decisions have changed must all be handled correctly. Saving requirements is only part of constraint maintenance.

### Local changes become assumptions for later work

Suppose one change overlooks the monetary unit and produces an incorrect data structure. Later pages, APIs, and tests may all treat that structure as an established fact and build on it.

The more smoothly the subsequent work proceeds, the further the flawed assumption spreads. If the problem is found only during integration, multiple modules will need to change together. AI has looked capable at every step, yet the project has drifted from its original requirements.

Tests do not automatically remove this difficulty. If they omit a key constraint, passing them only shows that the behavior they check matches expectations. It does not prove the project meets every requirement.

Constraint maintenance cannot therefore be reduced to "AI forgot." It also includes failing to obtain necessary information, failing to apply known requirements to the current task, and failing to update and propagate changes correctly. The more requirements there are and the longer work continues, the harder it becomes to keep them satisfied together. [Research on multi-turn constraint adherence](https://arxiv.org/abs/2605.06353) specifically examines this class of problem.

## How engineering methods help AI maintain constraints

Viewed through constraint maintenance, nearly all core AI development methods are doing the same thing: making the right requirements effective when needed and detecting deviations between implementation and requirements promptly.

A Spec makes requirements, constraints, and acceptance criteria explicit, so development does not depend on scattered descriptions in a conversation. A Plan and task decomposition control the scope of each unit of work, clarify dependencies, and reduce the number of problems a single call must handle at once.

Layered documentation and on-demand reading give the current task relevant information. APIs, types, and module boundaries encode some constraints into the program's structure, making it harder for incompatible changes to pass through.

Testing, acceptance, and auditing check whether results still meet requirements. Git preserves a history of changes and a basis for recovery. Worktrees isolate concurrent changes, while integration checks address interactions between tasks.

These methods must work together to keep a project consistent across many calls and tasks. Writing a Spec does not make AI automatically follow it thereafter. Passing tests does not mean every requirement is covered. Engineering design must connect how requirements are expressed, passed on, implemented, and checked.

Constraint maintenance does not mean piling more rules onto AI either. Repeated, conflicting, and outdated instructions obstruct execution. What matters is keeping constraints relevant to the project and current task, clearly expressed, and checkable. Designing how the model obtains necessary information and exercises judgment is part of engineering too.

## People must also act as constraint maintainers

Current engineering methods cannot remove people from the process entirely. Beyond designing and using these methods, people must keep checking direction, identify deviations, and drive corrections during development. This is the human role of **external constraint maintainer**.

Return to the refund example. Once the API and page are implemented, a person notices that the two modules interpret refund states differently. They must determine whether an implementation violates the agreement or the original state design is incomplete, then correct the implementation or revise the design and check other affected parts.

This work spans the entire development process. As requirements change, tasks advance, and new problems surface, people must maintain overall consistency, judge whether the work still addresses the right problem, and check whether a new implementation overturns established requirements.

**The quality of engineering methods directly determines how much corrective work people must do and how deeply they must understand technical details.**

With poor methods, people constantly uncover omissions, trace errors, and reconcile conflicting changes. To find the cause, they must understand extensive technical details. AI generates code quickly, but people are trapped in inspection and repair. The larger the project, the heavier this burden becomes.

Good engineering methods reduce deviations at their source and expose more problems automatically. Clear APIs and types can specify monetary units; tests can check permissions and repeated submissions. People then do not have to trace these issues line by line after every change. They can focus on new requirements, exceptional cases, and gaps in existing checks.

Engineering methods can therefore also be understood as **transferring work that people would otherwise have to maintain and correct repeatedly to development processes and tools**. Judge a method by which omissions, rework, and manual interventions it reduces while preserving delivery outcomes. More documentation and more elaborate procedures have no value on their own.

Today's methods still cannot fully replace the human constraint maintainer, but they can already free people from a substantial amount of work and reduce the range of technical details they must investigate. That is an important goal of learning AI software engineering: enabling AI to do more of the implementation while allowing people to manage larger projects effectively.

## Modality limitations turn simple observations into difficult development tasks

Constraint maintenance explains why a project drifts during long-term development. Modality limitations explain another difficulty: AI struggles with some problems that people can readily observe and judge. Today's AI shows considerable intelligence in text tasks, but that does not imply equally reliable understanding of images, moving scenes, and continuous interactions.

A person can quickly spot an awkward layout on a page. Opening a dialog once may be enough to notice that an animation feels wrong or feedback appears too late. These judgments are easy for people, but a request to "make it work well" does not give AI enough to produce them reliably. The difficulty involves both understanding visual information and turning observations into concrete changes.

Dynamic behavior is harder still. A screenshot cannot fully convey how an element follows a drag, a jump during scrolling, or the timing between several state transitions. The model must obtain information over time and identify which changes matter. Describing one frame does not mean it understands the entire interaction.

Some models already support video understanding and analysis at specific timestamps, such as [Gemini's video understanding capabilities](https://ai.google.dev/gemini-api/docs/video-understanding). But describing video content and reliably diagnosing subtle interactions in a business application, then implementing and verifying a fix, remain different tasks.

People need to provide useful observations, turn "something looks wrong" into requirements that can be acted on and checked, and participate in acceptance work AI cannot yet perform reliably. Much of the implementation can still be delegated to AI once the problem is expressed in a form it can handle effectively.

## Common low-value uses of time when starting out

Understanding these limitations also helps distinguish work that actually contributes to development. Many people starting out with AI spend substantial time without adding much output. Three patterns are particularly common.

1. **Watching AI implement a feature.** The task is clear and AI can execute it autonomously, yet a person watches the generation process and waits for it to finish. Without making a necessary judgment, supplying new information, or removing a blocker, that time adds almost no value to the project. Let AI complete work within a clear scope and intervene at the points that need human judgment.

2. **Passing requirements through short conversations, a little at a time.** Each new thought becomes another instruction. AI guesses and builds, then receives the next requirement after finishing. The relationships between requirements are never considered together, and later requests keep overturning completed work. Discuss requirements together first and produce a requirements document that can guide implementation. Later changes should update the same source of requirements.

3. **Repeatedly patching a project that has grown beyond what AI can handle reliably.** Features and dependencies accumulate, and AI frequently misses requirements or breaks existing behavior. Instead of improving the engineering structure, people ask it to fix each bug and reverse each instance of implementation drift. Fixing one part breaks another, consuming time without improving the conditions for the next task. Most so-called Vibe Coding projects stall at exactly this stage: they keep getting patched but never reach delivery. The response should be to reorganize modules, tasks, information, and verification so AI can work reliably again.

## Where people contribute value

Escaping these low-value patterns requires putting people's time back into work that matters. In AI software development today, that work falls mainly into four areas:

- **Change the problem representation.** Judge whether the current work addresses the right problem, change how the problem is understood, and narrow the search space.
- **Architect the engineering system.** Design and organize requirements, tasks, information, and verification so AI can work continuously within an effective engineering process.
- **Act as an external constraint maintainer.** Identify deviations, diagnose their causes, and drive corrections throughout development to maintain consistency across the project.
- **Compensate for modality limitations.** Supply observations AI struggles to obtain and interpret reliably, and participate in judgment and acceptance for visual and dynamic interaction tasks.

**The contribution people make per unit of time on these tasks usually diminishes.** For a given problem or development stage, finding the right representation, establishing an effective engineering system, and correcting a critical deviation can substantially improve the work that follows. Once those tasks are done, the additional contribution from further adjustment, inspection, and intervention gradually falls.

Continuous participation therefore does not require constant intervention in every step. People should intervene where they can change the problem's direction, improve the engineering system, or eliminate critical deviations, while letting AI work autonomously where the necessary conditions are in place. A good engineering system preserves delivery outcomes while reducing repeated demands on people's time and attention.
