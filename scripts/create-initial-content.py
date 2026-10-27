"""Create the initial bilingual content. Existing pages are never overwritten."""
from pathlib import Path

pages = {
    'product/index': (
        ('Product', 'A clearer way to organize AI software engineering', '''SteerLine is an open-source project for organizing planning, task dependencies, and AI execution around a roadmap. People retain responsibility for product goals, key decisions, and merging pull requests.

## How it fits together

Start with the desired outcome and a specification. Organize work in a roadmap, express dependencies between tasks, and use verification and human review to assess the result. A DAG makes those dependencies explicit: a task can depend on the completion of other tasks.

## Project status

SteerLine has not yet been released. Consult the [project repository](https://github.com/erranliu/SteerLine) for its current implementation, acceptance boundaries, and development progress. The workflow above describes the direction of the project; it is not a guarantee that every step is available as a stable product feature.'''),
        ('产品', '以更清晰的方式组织 AI 软件工程', '''SteerLine 是一个开源项目，围绕 Roadmap 组织规划、任务依赖与 AI 执行。人负责产品目标、关键决策和 PR 合并。

## 工作方式

从期望结果和规格出发，用 Roadmap 组织工作，表达任务之间的依赖，并通过验证与人工审查评估结果。DAG（有向无环图）让任务依赖关系清晰可见：一个任务可以依赖其他任务先完成。

## 项目状态

SteerLine 尚未发布。当前实现、验收边界和开发进展请查看[项目仓库](https://github.com/erranliu/SteerLine)。以上工作流程说明项目方向，并不代表每个环节都已作为稳定功能提供。''')),
    'ai-engineering/index': (
        ('AI engineering', 'Methods for building software with AI', '''AI can help implement software, but engineering still requires clear intent, isolation, verification, and human judgment. These guides are useful independently of SteerLine.

- [Use a specification](./specs/)
- [Why use Git worktrees?](./worktrees/)
- [Understand AI limitations](./limitations/)
- [The human role in larger projects](./human-role/)'''),
        ('学习 AI 开发', '用 AI 构建软件的工程方法', '''AI 可以帮助实现软件，但工程仍需要清晰的目标、隔离、验证和人的判断。这些教程不依赖 SteerLine，也可以独立阅读。

- [如何使用 Spec](./specs/)
- [为什么使用 Git worktree](./worktrees/)
- [理解 AI 的能力限制](./limitations/)
- [大型项目中人的角色](./human-role/)''')),
    'ai-engineering/specs': (
        ('Use a specification', 'Make the intended outcome explicit', '''A spec is a shared description of the problem, intended behavior, constraints, and how to tell whether the work is complete. It gives both people and AI a basis for decisions.

## Start with the problem

Describe who needs the change, why, and what observable result should follow. Record scope, constraints, important edge cases, and acceptance criteria. Separate confirmed decisions from open questions.

## Use it throughout the work

Turn the spec into a plan and bounded tasks. Review proposed changes against its acceptance criteria, and update the spec when decisions change. A spec supports judgment; it does not replace tests, review, or communication.'''),
        ('如何使用 Spec', '让预期结果清晰可见', '''Spec 是对问题、预期行为、约束和完成标准的共同描述，为人和 AI 提供决策依据。

## 从问题开始

说明谁需要改变、为什么需要，以及可观察到的预期结果。记录范围、约束、重要边界情况和验收标准，将已确认的决定与待解决的问题分开。

## 贯穿整个工作过程

根据 Spec 制定计划并拆分边界清晰的任务。按照验收标准审查变更，决策变化时同步更新 Spec。Spec 辅助判断，不能代替测试、审查和沟通。''')),
    'ai-engineering/worktrees': (
        ('Why use Git worktrees?', 'Isolate concurrent work without separate clones', '''A Git worktree lets you check out another branch in a separate directory while sharing the same repository. This is useful when people or agents work on different tasks at the same time.

Give each task a clear branch and directory, and avoid simultaneous edits to the same checkout. Isolation reduces accidental interference, but does not resolve conflicting changes automatically: review and integrate each branch deliberately. Worktrees share repository data, so they are not a security boundary.'''),
        ('为什么使用 Git worktree', '隔离并行任务，无需重复克隆', '''Git worktree 允许同一个仓库在独立目录中检出另一个分支，同时共享仓库数据。多人或多个 agent 并行处理任务时，这有助于隔离工作现场。

为每个任务明确分支和目录，避免在同一检出目录中同时修改。隔离可以减少意外干扰，但不会自动解决冲突：每个分支仍需要有意识地审查和集成。Worktree 共享仓库数据，因此不是安全隔离边界。''')),
    'ai-engineering/limitations': (
        ('AI capabilities and limits', 'Treat output as work to be evaluated', '''AI can explore code, propose changes, and help reason about a problem. It can also misunderstand requirements, overlook context, invent details, or produce plausible but incorrect solutions. Performance varies by model, task, and available context.

Give the agent relevant context and a bounded objective. Ask for evidence, run appropriate checks, inspect the changes, and verify important claims independently. Use human judgment for ambiguity and decisions with consequences.'''),
        ('AI 的能力与局限', '把输出视为需要评估的工作', '''AI 可以探索代码、提出修改并帮助分析问题，也可能误解需求、遗漏上下文、编造细节，或给出看似合理但错误的方案。表现会随模型、任务和可用上下文变化。

提供相关背景和边界清晰的目标，要求给出依据，运行适当检查，审查修改，并独立验证重要结论。存在歧义或影响重大的决策应由人判断。''')),
    'ai-engineering/human-role': (
        ('The human role', 'Own direction, decisions, and accountability', '''In a large project, a person does more than issue prompts. People define the product outcome, choose priorities, make tradeoffs, and decide what evidence is sufficient for delivery.

Make responsibilities and decision points explicit. Review plans and results against the intended outcome, resolve ambiguity, and adjust the process when evidence reveals a problem. Delegating execution does not delegate accountability.'''),
        ('大型项目中人的角色', '掌握方向、决策与责任', '''在大型项目中，人的工作不只是写提示词。人需要定义产品目标、确定优先级、做出权衡，并判断交付所需的证据是否充分。

明确责任和决策节点，围绕目标审查计划和结果，解决歧义，并在证据暴露问题时调整流程。委托执行不等于转移责任。''')),
    'steerline/index': (
        ('SteerLine guide', 'Understand the ideas behind SteerLine', '''SteerLine organizes planning, task dependencies, and AI execution around a roadmap. Start with the concepts, then follow the repository for current implementation details.

- [Roadmap-driven development](./roadmap/)
- [DAGs and task dependencies](./dag/)

SteerLine has not yet been released. Step-by-step installation and operational tutorials will be added when they can be verified against a stable version.'''),
        ('学习 SteerLine', '理解 SteerLine 背后的理念', '''SteerLine 围绕 Roadmap 组织规划、任务依赖与 AI 执行。可以先学习核心理念，再通过项目仓库了解当前实现。

- [Roadmap 驱动开发](./roadmap/)
- [DAG 与任务依赖](./dag/)

SteerLine 尚未发布。安装与操作教程将在能够针对稳定版本验证后补充。''')),
    'steerline/roadmap': (
        ('Roadmap-driven development', 'Connect project direction to executable work', '''A roadmap connects the project's intended outcomes to planned work. It makes priorities and progress easier to discuss and gives individual tasks a larger context.

In SteerLine, the roadmap is the organizing concept for planning, dependencies, and AI execution. Keep goals and decisions explicit, revise the plan as evidence changes, and use review to determine whether the work meets its intended outcome.'''),
        ('Roadmap 驱动开发', '把项目方向与可执行工作连接起来', '''Roadmap 将项目期望达成的结果与计划工作连接起来，使优先级和进展更容易讨论，也让单个任务拥有明确的上下文。

在 SteerLine 中，Roadmap 是组织规划、依赖和 AI 执行的核心概念。明确目标与决策，随证据变化调整计划，并通过审查判断工作是否达到预期。''')),
    'steerline/dag': (
        ('DAGs and task dependencies', 'Make ordering and prerequisites explicit', '''A directed acyclic graph (DAG) describes dependencies without circular paths. In a task graph, an edge can express that one task must be completed before another can proceed.

Explicit dependencies help identify work that can happen in parallel and work that must wait. A useful graph reflects actual prerequisites: unnecessary edges reduce parallelism, while missing edges can lead to premature work. The precise execution behavior depends on the current implementation.'''),
        ('DAG 与任务依赖', '明确顺序和前置条件', '''有向无环图（DAG）可以表达不存在循环路径的依赖关系。在任务图中，一条边可以表示一个任务必须在另一个任务开始前完成。

明确依赖有助于识别可以并行的工作和必须等待的工作。有效的任务图应反映真实前提：多余依赖会降低并行度，遗漏依赖可能导致过早执行。具体执行行为以当前实现为准。''')),
    'docs/index': (
        ('Reference', 'Find the current technical details', '''SteerLine is not yet released. For current setup, configuration, commands, and known limitations, consult the [SteerLine repository](https://github.com/erranliu/SteerLine) and its documentation.

Version-specific reference pages will be published here as the product and its public workflows stabilize.'''),
        ('参考文档', '查找当前技术细节', '''SteerLine 尚未发布。有关当前安装、配置、命令和已知限制，请查阅 [SteerLine 项目仓库](https://github.com/erranliu/SteerLine)及其中的文档。

随着产品和公开工作流程趋于稳定，这里将补充适用于具体版本的参考页面。''')),
    'updates/index': (
        ('Project updates', 'Follow the work as it develops', '''SteerLine has not yet been released. The [project repository](https://github.com/erranliu/SteerLine) is the source for current development activity and project documentation. Release notes will be published here when releases are available.'''),
        ('项目更新', '关注项目的持续进展', '''SteerLine 尚未发布。[项目仓库](https://github.com/erranliu/SteerLine)是了解当前开发活动和项目文档的入口。发布版本后，这里将提供发布记录。''')),
    'about/index': (
        ('About', 'Building a more deliberate way to work with AI', '''SteerLine explores how planning, task dependencies, AI execution, and human decisions can work together in software engineering.

Explore the [repository](https://github.com/erranliu/SteerLine) to follow the project and its contribution information.'''),
        ('关于', '探索更有方向的 AI 协作方式', '''SteerLine 探索如何在软件工程中将规划、任务依赖、AI 执行和人的决策结合起来。

访问[项目仓库](https://github.com/erranliu/SteerLine)，了解项目进展和参与贡献的信息。''')),
}

for slug, translations in pages.items():
    for locale, (title, description, body) in zip(('en', 'zh-cn'), translations):
        target = Path('src/content/docs') / locale / f'{slug}.md'
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists():
            continue
        target.write_text(f'''---\ntitle: "{title}"\ndescription: "{description}"\ncontentId: "{slug}"\ntranslationStatus: current\nupdated: "2026-10-27"\n---\n\n{body}\n''', encoding='utf-8')
