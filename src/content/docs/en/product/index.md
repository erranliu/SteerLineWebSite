---
title: "Product: Project Planning, Agent Execution, and Acceptance"
description: "Explore how SteerLine connects roadmaps, specifications, task dependencies, agent execution, acceptance, and delivery, with clear current capabilities and future direction."
contentId: "product/index"
translationStatus: current
updated: "2026-11-01"
---

**SteerLine is a roadmap-driven AI development system that takes an active role in the project process, combining development methods with supporting tools.**

Built on multi-agent orchestration, it connects planning, documentation, execution, verification, and delivery. Clear goals and task agreements guide development; actual delivery feeds back into planning for the next round of work.

**Open source and not yet released.** The following sections describe the full product direction and intended workflow. The current foundation and remaining work are set out under “Current stage” below.

<a id="workflow"></a>

## How a project keeps moving

Consider a new feature that depends on a shared interface. The intended workflow connects planning, implementation, and acceptance:

1. **Agree on milestone outcomes.** The user sets the feature goal, priorities, and key tradeoffs. The roadmap separates the shared interface, its consuming feature, and test preparation that can proceed independently.
2. **Define task agreements.** The Spec describes outcomes, scope, and acceptance criteria. The Plan arranges implementation, verification, and required environments. Handoff requirements are explicit before work begins.
3. **Organize execution by dependency.** The consuming task waits for the interface to be delivered. Independent test preparation can proceed in parallel. Formal admission into the DAG fixes the agreed scope and dependencies.
4. **Implement, test, and repair.** Execution agents follow the task documents and record results and problems. Requirement changes prompt a review of the affected tasks, specifications, and deliverables before work continues.
5. **Verify delivery and plan ahead.** Review code, test results, and necessary human acceptance; verify delivery facts such as actual PR merges. Release tasks whose dependencies are satisfied, then bring results and open decisions back into the roadmap.

This loop connects intended outcomes with actual delivery. At the current stage, people still control subsequent roadmap changes. A user-facing lead agent and full lifecycle management remain future directions.

<a id="roadmap"></a>

## Roadmaps and the task DAG

The roadmap organizes milestone outcomes and overall progress. A task DAG, or directed acyclic dependency graph, expresses prerequisites. A Spec defines each task's deliverables, while a Plan arranges implementation and verification.

Task boundaries follow independent outcomes and explicit handoffs. A shared-interface task, for example, needs to deliver an interface agreement, implementation, and verification results. Consumers use that delivery to determine whether they can begin. Clear boundaries enable useful parallelism.

Drafts support discussion of goals and alternatives. Formal tasks carry confirmed execution scope. Relevant agreements are fixed at execution start, changes are assessed for their impact, and delivery results inform the next planning round.

<a id="acceptance"></a>

## Plan testing and acceptance from the start

Planning must answer what counts as passing. The Spec defines acceptance criteria; the Plan arranges verification; a task-specific acceptance record preserves actual behavior, results, and evidence. Missing environments or test capabilities should be made explicit when planning execution.

Testing is organized by purpose: minimum code checks, core workflow smoke tests, independently runnable functional tests, and reusable boundary-case tests each have distinct responsibilities. Readable guides and structured inventories identify entry points, environments, and applicable scope, so verification can be selected according to the impact of a change.

Tests determine whether a version behaves as expected. Acceptance also determines whether the promised outcome exists. Automated checks enter the execution plan. Experience reviews and product decisions record human participation, pending status, and the scope actually blocked. Human checks that may be deferred remain pending; critical prerequisites and real failures continue to block affected work.

Passes, failures, skips, and unverified items are recorded separately and tied to a version, execution scope, and evidence. Generated code, successful compilation, and PR creation are process facts. Task completion also requires the relevant verification and delivery evidence.

<a id="documents"></a>

## Layered documents keep working agreements current

Documents have distinct responsibilities and reference one another, helping agents find the rules, plans, and actual results relevant to their work.

| Layer | Question it answers | Main content |
| --- | --- | --- |
| Shared standards | What common requirements apply? | SteerLine project standards, Spec/Plan rules, and testing architecture standards |
| Project agreements and maintained documents | How does this project apply the requirements and currently work? | Stack, environments, process, test guides, maintained design, and architecture |
| Planning and task documents | What will this round deliver, and how will it be implemented and verified? | Roadmap, Specs, Plans, and task-specific acceptance arrangements |
| Results and evidence | What did a particular version actually achieve? | Test reports, acceptance results, delivery records, and original evidence locations |

SteerLine supplies shared standards, while each project maintains its own implementation of them. Task execution fixes the relevant versions. Results update the corresponding records; changes to lasting behavior update design and standards. Plans, current implementation, and historical evidence each retain a clear home.

<a id="collaboration"></a>

## How people and agents collaborate

**Intended workflow: the SteerLine lead agent handles the main user interaction and project process management.** People discuss requirements, review plans, and understand results through it. Connected execution agents carry out concrete work under explicit task agreements.

| Participant | Responsibility |
| --- | --- |
| User | Product goals, priorities, key tradeoffs, authorization, necessary human acceptance, and delivery decisions |
| SteerLine Agent and system | Clarify requirements, organize roadmaps and task documents, maintain dependencies and process requirements, supervise execution, and surface decisions |
| Execution agents | Implement, test, repair, commit, and create PRs once Specs and Plans are clear |

Agents interpret requirements, propose solutions, and handle complex work. Tools check task materials, dependencies, execution eligibility, and delivery facts. Decisions reserved for the user, or matters outside authorization, return to the user before affected work proceeds.

The product direction allows existing agents such as Codex and Claude to participate as executors. **Current integrations are local Codex, local Orca, and remote Orca paths. Claude integration is a future possibility, not a currently implemented capability.**

<a id="current-stage"></a>

## Current stage and future direction

As of November 1, 2026, the project README records the following foundation. Fixed versions, environments, and task-specific acceptance records determine the actual verified scope.

| Area | Current foundation | Boundaries and next steps |
| --- | --- | --- |
| Tasks and execution | Task DAG, dependency checks, independent execution candidates, session feedback, actual PR merge verification, and release of eligible successor tasks | Execution eligibility and acceptance scope depend on the selected execution profile |
| Roadmap promotion | Markdown parsing, task relationship confirmation, Spec/Plan/acceptance document generation, document publication, and formal task admission; the main path involving real Runner, browser, and GitHub document PRs has verification | Human experience and other unverified scope remain tracked in dedicated acceptance records |
| Development standards and testing | Shared project standards, layered testing, structured inventories, acceptance records, and test history tied to commits | The complete process is still under development |
| Interaction and execution integration | A Web frontend connects local Codex, local Orca, and remote Orca execution paths through SteerRunner | Eligibility and verified scope are assessed separately for each combination |

**The user-facing SteerLine lead agent, full project lifecycle management, and limited autonomous progress within agreed authorization remain future directions.** Current parsing, generation, and execution capabilities do not yet constitute the complete lead-agent product experience.

The long-term vision is engineering AGI: AI that can sustain development of complex software projects. SteerLine will develop its process and tooling in stages, assessing progress against explicit delivery and acceptance records.

## Continue exploring

- [Learn AI development](../ai-engineering/): general practices around specs, Git worktrees, and AI software engineering.
- [Learn SteerLine](../steerline/): core ideas behind roadmaps and task dependencies.
- [Project updates](../updates/): progress collected on this website.

### Project sources and verification

- [SteerLine README](https://github.com/erranliu/SteerLine/blob/main/README.md)
- [Project standards and development methods](https://github.com/erranliu/SteerLine/blob/main/SteerlineProjectGuideDoc/README.md)
- [Product vision](https://github.com/erranliu/SteerLine/blob/main/SteerlineFlow/Roadmap/product-vision.md)
- [Acceptance records](https://github.com/erranliu/SteerLine/blob/main/SteerlineFlow/testing/acceptance/README.md)
- [Roadmap promotion acceptance](https://github.com/erranliu/SteerLine/blob/main/SteerlineFlow/testing/acceptance/roadmap-promotion.md)
- [Execution profiles and integration boundaries](https://github.com/erranliu/SteerLine/blob/main/docs/product-design/execution-profiles.md)
