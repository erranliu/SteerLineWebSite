---
title: "Spec-Driven Development"
description: "Understand the shift from conversational development to Spec-driven development, and why it is the necessary starting point for serious delivery and lasting development capability."
contentId: "ai-engineering/specs"
translationStatus: current
updated: "2026-10-30"
version: "0.2.2"
sidebar:
  order: 6
  label: "6. Spec-Driven Development"
---

We consider Spec-driven development the single most important concept in moving into serious AI development. It is a necessary change in development paradigm. That is why this tutorial introduces it immediately after Git.

When the goal is serious software delivery, an AI development workflow that relies on conversation, repeated clarification, and correction can be considered incorrect and inefficient. Continuing with that workflow, however much time you invest, makes it difficult to develop a deep understanding of development and produces almost no meaningful accumulation of development capability.

To understand this judgment, we first need to distinguish conversational development from Spec-driven development.

## Two approaches to development

**In conversational development, conversation directly drives implementation.**

You give the AI a request, and it starts writing code. You inspect the result, add details or corrections, and it makes changes. Requirements take shape through the exchange, while the code changes alongside them. Defining requirements and implementing them are mixed together in one process.

For example, you tell the AI, "Add CSV import." It starts implementing. When you see the result, you discover that duplicate records are handled differently from what you expected, so you add a requirement. Then you notice that the error messages are unsuitable and ask for another change. Development proceeds through these exchanges.

**In Spec-driven development, you first discuss and establish a Spec, then have the AI develop against it.**

Spec is short for specification. Here, it means a requirements specification: a document describing the problem to solve, the expected behavior, the scope and constraints, and the conditions for completion.

For the same CSV import feature, you first work with the AI to establish which fields are supported, how duplicates are handled, whether import continues when some records fail, and how results are reported. Those decisions go into the Spec before the AI implements the feature.

The two approaches can be summarized as follows:

> Conversational development: make a request → the AI develops → clarify and correct through conversation → the AI makes further changes.
>
> Spec-driven development: discuss and establish the Spec → the AI develops against the Spec → check the result against the Spec.

Spec-driven development still involves conversation. Conversation helps you establish requirements and turn them into an explicit basis for development; execution then follows that basis. **The central difference is what drives implementation.**

This also separates development into two activities: defining requirements and developing against them. While defining requirements, you can explore, discuss, and change your mind. During execution, the AI works against the requirements already established. If a new requirements issue emerges, you return to the discussion, update the Spec, and then continue execution.

You may also encounter a Plan document. The Spec describes what to build and what counts as complete; the Plan describes how to implement it. For now, understanding that distinction is enough.

## Problems with conversational development and how Specs help

The problems with conversational development become increasingly apparent as work continues. To understand what Spec-driven development changes, we need to look at these concrete problems.

### The AI fills in unresolved requirements

A single request usually leaves many choices unresolved. The AI must decide what to do wherever your description is incomplete so that it can continue writing code. It can produce a complete implementation, but the resulting product behavior may never have been discussed. Once you see the result and correct it, completed work has to be redone.

Spec-driven development brings key choices into the requirements discussion before implementation. When forming the Spec, you establish what has been decided and where ambiguity remains. The AI then starts implementation with concrete requirements, reducing rework caused by filling in requirements on its own.

### Requirements are scattered across a growing conversation

Requirements become scattered across a growing conversation. Initial requests, later additions, and ad hoc corrections may override one another. Some decisions have changed; others remain valid. The current requirements must repeatedly be reconstructed from context.

Spec-driven development consolidates the requirements currently in force into a maintained document. Conversation can preserve the discussion, while execution reads the current Spec. When requirements change, there is an explicit place to record the new decisions.

### The goal keeps changing during execution

Conversational development makes it easy to keep changing the goal during execution. You request a change, and the AI acts immediately. The change affects something else, which leads to another corrective exchange. What you originally intended to complete, what was added later, and which earlier requirements still apply become increasingly unclear.

Spec-driven development requires requirements changes to be reflected in the Spec, followed by corresponding changes to implementation and verification. Git records how the requirements changed and what subsequent work was based on. Changes to the development goal become traceable.

### People must remember the history and repeat reminders

Conversational development depends on someone remembering the history, noticing deviations, and repeatedly reminding the AI. A new session requires another explanation. Returning after a break requires you to reconstruct the situation yourself. The longer development continues, the more effort it takes to maintain a shared understanding.

A Spec preserves a basis that subsequent execution can read again. When a new round of work begins, the AI can read the relevant Spec. When interpretations differ, the document provides a reference. Established requirements no longer need to be retold from memory every time.

### Completion criteria are defined too late

Conversational development often leaves the definition of completion until the result is visible. The AI considers the task finished, while you still see problems. Acceptance criteria keep being added during revisions, leaving no shared judgment of completion.

Spec-driven development establishes acceptance criteria during requirements definition, then checks actual results against them. Working code and an AI declaration of completion cannot replace this process. Requirements, implementation, and acceptance have a common reference.

## Long tasks need a stable basis for development

**Conversational development cannot reliably support long tasks with complex requirements.**

A long task requires multiple requirements and their relationships to remain intact throughout execution, while conversational development repeatedly reconstructs that basis from changing context. As work continues, earlier requirements become easier to omit or distort, and subsequent work can treat those deviations as established facts. Repeated local corrections cannot ensure that the task as a whole continues to satisfy all its requirements.

**Spec-driven development changes the foundation on which the entire development process depends.**

It preserves established requirements so that different stages of a long task can return to the same reference, allowing requirements and their changes to be repeatedly referenced, checked, and traced.

The document itself does not guarantee correct execution, but it provides an explicit reference for identifying deviations. You can check which requirement the implementation has departed from, which requirements change has not yet been implemented, and which results remain unverified. Requirements, process, and results can begin to be connected.

**Any advanced engineering method needs an explicit, persistently available, and checkable basis for development to work reliably. Spec-driven development establishes that foundation.**

Without it, adding tools, steps, or time cannot resolve uncertainty in the development goal itself.

## Turning experience into lasting development capability

This is also why doing more development before adopting Spec-driven development rarely produces a deep understanding of development.

After using AI for a while, you become familiar with how to describe problems, when to add context, when to ask it to check again, and when to start a new session. These experiences give you an intuitive feel for working with AI and help you handle immediate problems.

But a deeper understanding of development requires being able to explain outcomes. Did a failure come from unresolved requirements, a misunderstanding, an execution error, or an acceptance standard changed at the last minute? Which conditions made a successful attempt succeed, and how can you reproduce them next time?

When the basis for development remains scattered across conversation, these causes are difficult to distinguish. You are left with a general impression that the AI did well this time, or failed to understand you. Next time, you try phrasing things differently and continue adjusting in response to results.

You complete more development and become more practiced at handling problems as they arise, but those experiences rarely turn into an understanding that can support complex development. A change of model, context, or task requires recalibrating that intuition.

With a Spec, experience has an explicit reference. If a class of requirements repeatedly omits important boundaries, you can improve requirements discussions. If certain wording is regularly misunderstood, you can make it more precise. If a type of result repeatedly fails, you can improve execution requirements and acceptance criteria. Improvements can be recorded and reused in subsequent development.

**Time spent developing does not automatically become an understanding of development. Experience needs a process that supports identifying causes, verifying results, and making improvements before it can accumulate.**

## Starting Spec-driven development

Starting Spec-driven development does not require building a complex system first. It requires separating requirements discussions from implementation in your next development task.

1. **Discuss and establish the Spec.** Express the goal, clarify requirements with the AI, and organize the established requirements into a saved Spec.
2. **Develop against the Spec.** Have the AI execute against the Spec. If execution exposes missing or conflicting requirements, continue the discussion and update the document.
3. **Check the result against the Spec.** When implementation is complete, use the Spec to check actual results.

A Spec can include background and goals, scope, behavior and boundaries, and acceptance criteria. Its structure can vary; what matters is whether it supports execution and evaluation of the task. Keep the Spec in the project, manage it through Git, and reflect requirements changes in the document.

A Spec can still fail: when requirements have not been clarified, the AI can produce an executable Spec that misses the real goal; excessive scope makes execution and acceptance difficult to manage; overly narrow scope can lose the overall goal and its relationships. Size here refers to requirements scope and organization, rather than word count.

**Adopting Spec-driven development is only the beginning.** Organizing scope, expressing requirements, and keeping a Spec useful for execution and acceptance are advanced questions that require continued improvement through practice. Spec-driven development provides an explicit reference for those improvements, allowing lessons from one task to carry into the next.

## Why Spec-driven development comes immediately after Git

Our judgment remains clear:

**When the goal is serious software delivery, an AI development workflow in which conversation directly drives implementation through repeated clarification and correction can be considered incorrect and inefficient. Continuing with that workflow, however much time you invest, produces almost no meaningful accumulation of development capability.**

Git makes development states manageable; Specs make development goals manageable. That is why this tutorial introduces Spec-driven development immediately after Git. Completing this paradigm shift gives subsequent methods a foundation for reliable operation and allows development experience to accumulate.

**Spec-driven development is the necessary starting point for serious AI development. Organizing and using Specs effectively is a development capability that requires continued learning and improvement from that point onward.**
