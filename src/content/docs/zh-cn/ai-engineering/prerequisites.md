---
title: "当前有用的前置知识索引"
description: "用最小介绍认识AI开发的核心概念，并区分曾经重要、如今退为辅助的知识，以及一直非核心但仍有用的工具概念。"
contentId: "ai-engineering/prerequisites"
translationStatus: current
updated: "2026-10-29"
version: "0.1.5"
sidebar:
  order: 3
  label: "3. 当前有用的前置知识索引"
---

用AI开发软件，需要理解一些基本概念。这篇提供最小介绍，让你读懂后续教程，知道遇到问题时应该查什么。

截至2026年10月，我们把这些知识分成两档：仍然需要掌握的核心概念，以及有用但不需要重点学习的非核心概念。第二档再区分曾经重要、如今退为辅助的知识，和一直非核心但仍然有用的工具概念。这个划分围绕使用AI交付软件的需要；开发模型或Agent平台，会有另外的学习要求。

## 第一档：仍然需要掌握的核心概念

本节只做索引，帮助初学者建立基本概念，也帮助已有经验的开发者辨别哪些知识仍然是核心。这里的简短介绍只是学习入口。随着学习和项目实践的推进，每个核心概念都应该尽可能深入地理解。

随着理解的深入，这些核心概念会持续改变你思考开发问题时的问题表征，影响你怎样界定问题、组织信息和寻找解决方向。这门课程围绕第一档展开，后续教程会反复从不同角度深入讲解这些概念，以及它们在实际开发中的作用和联系。

### 模型与Agent

模型根据提供的信息进行推理和生成。开发Agent则围绕模型组织连续工作：读取文件、修改代码、运行命令、检查结果，再决定下一步。同一个模型在不同工具和环境中的表现也会不同，遇到问题时需要分清是模型能力不足，还是信息、工具或工作组织出了问题。

### Session（会话）

Session是开发工具组织一段持续工作的单位，包含对话、工具执行记录和相关状态。它会经历多次模型调用，也可能跨越上下文压缩；会话继续，不代表历史细节都还在当前上下文中。会话怎样保存、恢复、与其他会话共享信息，取决于工具和配置。

### 上下文（Context）

上下文是一次模型调用实际获得的信息，包括指令、对话、代码、文档和工具结果。文件存在于项目里，不代表模型已经读过。Token是模型处理信息的基本单位，不等同于一个汉字或英文单词；上下文窗口规定一次调用可容纳的Token规模。整个项目不会自动进入模型的视野。

### 上下文压缩（Compaction）

连续工作会积累大量对话和工具结果。压缩把旧内容整理成更短的表示，供后续调用继续使用，许多工具已自动处理。压缩可能遗漏细节或保留过期判断，因此重要需求和决策应保存在可重新读取的项目文档中。

### 模型的有限注意力

上下文装得下，不代表模型能可靠地使用其中每条信息。无关内容、冲突要求和复杂关系都会影响结果。这里不要求学习Transformer原理，只需知道：应提供当前任务需要的完整信息，减少噪声，控制工作范围；一味缩短上下文、删掉必要约束，同样会导致失败。

### 约束与验收

约束是实现必须持续满足的条件，例如“金额统一使用整数分”“旧接口必须兼容”。约束保持，是让这些条件经过多次修改、多个任务和模块协作后仍然成立，需求变化时也能正确更新并传递。验收则明确通过什么证据判断结果满足要求，例如重复提交退款请求，只产生一次退款。测试提供部分证据，AI说“完成了”不能代替验收。

### Spec文档

Spec是Specification的简称，用来明确问题、预期行为、范围、约束和验收标准，把零散讨论整理成持续维护的开发依据。“增加退款功能”还不够，谁可以退款、最多退多少、重复请求怎样处理，都需要明确。AI可以协助起草，人需要判断其中的需求和取舍。

### Plan文档

Plan说明怎样完成当前Spec，包括实现方案、步骤、依赖和验证安排。例如先确定退款接口与数据约定，再实现接口和页面，最后验证完整流程。Plan随代码现状和新发现调整；涉及需求或约束变化时，也要更新Spec。步骤全部完成，不等于满足了Spec。

### Git

Git是版本控制系统，用来记录变更、比较差异、管理分支和合并工作，为审查、追踪问题和恢复已记录的版本提供依据。至少要理解仓库、提交（commit）、差异（diff）、分支（branch）、合并（merge）和冲突。命令可以让AI执行，人需要判断哪些变更属于当前任务、哪些结果可以保留。

### Git worktree

Git worktree让同一仓库拥有多个独立工作目录，共享版本历史，方便不同任务分别修改、运行和验证。它隔离工作目录，不会自动消除业务依赖、合并冲突，也不会隔离共用的数据库和端口。并行开发需要同时考虑任务怎样分开、结果怎样集成。

### 搜索空间

这里指一个开发问题中所有可能的方案与实现选择。“做一个好用的订单系统”留下大量未确定的选择；明确场景、范围、接口和验收条件，可以排除无效方向，收敛搜索空间。人的重要工作，是找到有效的问题表达和约束，避免让AI在模糊目标中反复尝试，也避免过早锁定错误方案。

## 第二档：有用但非核心的概念

课程基本不会展开讲解这一档的非核心概念。这里列出它们，供你识别和查阅：先了解用途和适用范围，遇到具体需要时再深入，不必把逐项掌握当作学习前提。对于曾经重要的概念，重点理解它为什么退为辅助，调整原有的学习和投入重点；对于一直非核心的概念，知道它能解决什么问题、何时值得使用即可。一种机制仍然在工具内部发挥作用，不代表开发者还需要把它当作核心知识，投入大量时间自行搭建和维护。

### 曾经重要 现在退为辅助

#### Harness

Harness是围绕模型组织运行的系统，包括工具调用循环、上下文管理、权限和状态记录等。过去，补齐这些能力需要开发者投入大量精力；今天成熟开发工具已经承担大量这类工作，使用者应把重点放回需求、约束和验收。只有需要定制开发工具或Agent系统时，才需要深入Harness设计。

#### Skill

Skill把任务说明与脚本、模板、参考资料等资源打包，供Agent按需使用，常见入口是`SKILL.md`。过去常用预设流程补偿模型自主执行能力的不足；随着模型和工具能够自行组织更多工作，普通开发已不需要先配置大量Skill。它仍适合封装稳定、重复、有领域要求的操作。

#### MCP

MCP是Model Context Protocol，标准化AI应用与外部工具、数据源之间的连接。过去，接入外部能力常常需要开发者关注协议和配置；今天许多连接已由工具集成，使用者主要关心能力是否可用。需要定制外部系统连接时再深入，不必先学习编写MCP Server。

#### Subagent（子Agent）

Subagent把局部任务交给另一个拥有独立上下文的Agent处理，用于并行探索、独立检查或隔离大量中间信息。它主要优化执行效率，几乎不改变人需要关注的问题表征、需求取舍、约束和验收，因此不应再把设计一套多Agent组织当作开发方法的中心。局部任务具备清楚边界时，可以按需使用。

#### RAG

RAG是检索增强生成：先检索相关资料，再提供给模型。它曾被广泛用于给模型补充知识。对本教程面向的开发，RAG只用于相对稳定的外部知识检索提效；频繁变化的项目文档会增加索引同步、更新和失效管理成本，不适合采用这套方式。项目文档应优先组织好，再让Agent搜索、按需读取。Embedding、向量检索和向量数据库，是相关实现中可能遇到的概念，不需要先学。

#### 持久化记忆与Agents.md

持久化记忆把信息保存在当前上下文之外，在后续工作中重新加载。早期常用记忆文件或`AGENTS.md`、`CLAUDE.md`保存大量项目知识；随着项目增大，把这些内容集中放进自动加载的文件，会增加噪声、冲突和更新负担。少量全局约定可以保留，项目事实和决策则需要分层存放、按需读取、明确维护范围并及时更新。核心是信息的精细管理，记忆机制只是辅助手段。

### 一直非核心 但今天仍然有用

这一组是理解模型用量、设置，以及工具使用与集成的基础词汇。知道用途就能帮助你选择和使用工具，不需要先掌握其实现。

#### Token

Token用于计量模型处理的信息量，常见统计包括输入、输出和推理用量。了解它，可以帮助你读懂上下文容量、用量和费用；不需要先学习分词原理，也不必手工计算每段文字的Token数量。Token消耗更多，本身不代表任务完成得更好。

#### Thinking effort（推理强度）

推理强度控制模型处理任务时的推理投入。一般来说，更高的推理强度，是用更长时间和更多Token消耗，换取小幅的任务交付成功率提升。例外是某些小模型，它们的低、中档几乎无法用于严肃开发。

具体判断涉及模型和任务，后续会在独立的模型选择课程中讲解。这里先采用简单策略：统一选择高档，通常不会出太大的错。

#### CLI

CLI是命令行接口，通过命令、参数和输出使用工具，例如运行测试、查询Git历史或操作托管平台。人和Agent都可以使用它；你需要读懂命令的大意和执行结果，复杂命令可以让AI协助处理。

#### TUI

TUI是终端中的交互界面，可以包含列表、菜单、面板和快捷键。它决定你怎样与工具交互，不决定模型能力或开发方法。使用具体工具时，学习必要操作即可。

#### API与SDK

API定义程序之间怎样请求能力、交换数据；SDK是帮助程序调用这些能力的开发包。例如通过接口查询任务，或使用现成库完成身份认证和请求。需要接入服务时再了解对应接口和开发包，不必预先学习各种平台。

#### Hooks

Hook是在指定事件发生时触发的操作，例如修改文件后自动格式化、任务结束时运行检查。它适合把已经明确的重复操作交给工具自动执行。需要定制流程时，再学习具体工具的事件、配置和执行条件。

#### CI/CD

CI/CD指持续集成与持续交付或部署，常通过流水线自动运行构建、检查、测试和发布。验证哪些要求、什么条件可以交付，需要人掌握；具体流水线配置可以由AI协助完成，随项目需要学习。

#### Sandbox与权限机制

Sandbox是限制执行环境的沙箱；权限机制规定Agent可以访问哪些文件、网络和操作。你需要理解授权范围，知道工具为什么拒绝某个操作。具体隔离技术和配置可以按需学习，worktree本身也不能代替沙箱。

## 参考资料

以下资料用于按需查阅，不需要在开始开发前全部读完。官方资料介绍机制与用法，本篇对学习优先级和适用范围的判断，围绕使用AI交付软件展开。

- 模型与Agent：[Building effective agents — Anthropic](https://www.anthropic.com/research/building-effective-agents)。
- Session：[Run and continue sessions — OpenAI文档](https://developers.openai.com/api/docs/guides/agents-api/sessions)。会话与多轮工作的具体实现参考，不需要先学习API用法。
- 上下文与Token：[Context windows — Claude文档](https://platform.claude.com/docs/en/build-with-claude/context-windows)。
- 上下文压缩：[Compaction overview — Claude文档](https://platform.claude.com/docs/en/build-with-claude/compaction)。
- 上下文组织与按需检索：[Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)。
- 长上下文的有效使用：[Lost in the Middle](https://arxiv.org/abs/2307.03172)与[Context Rot — Chroma](https://www.trychroma.com/research/context-rot)。具体实验结果适用于各自研究的模型和任务。
- 约束、验收与搜索空间：本教程上一篇[AI的能力限制和人的角色](../limitations/)。
- Spec与Plan：[Specification-Driven Development — GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/spec-driven.md)。参考概念区分，不需要照搬整套流程。
- Git：[Pro Git中文版](https://git-scm.com/book/zh/v2)，优先查阅“起步”“Git基础”“Git分支”；[git-worktree官方文档](https://git-scm.com/docs/git-worktree)。
- Harness：[Effective harnesses for long-running agents — Anthropic](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)。用于了解其职责，文中流程不作为本教程的必学方法。
- Skill：[Agent Skills Overview — 官方文档](https://agentskills.io/home)。
- MCP：[What is the Model Context Protocol? — 官方文档](https://modelcontextprotocol.io/docs/getting-started/intro)。
- Subagent：[Create custom subagents — Claude Code文档](https://code.claude.com/docs/en/sub-agents)。
- RAG：[Introducing Contextual Retrieval — Anthropic](https://www.anthropic.com/research/contextual-retrieval)。用于了解检索机制，不作为项目文档的管理方案。
- 持久化记忆与指令文件：[How Claude remembers your project — Claude Code文档](https://code.claude.com/docs/en/memory)。
- 推理强度：[Reasoning models — OpenAI文档](https://developers.openai.com/api/docs/guides/reasoning)。用于了解参数含义，具体选档判断将在模型选择课程中展开。
- CLI：[About GitHub CLI — GitHub文档](https://docs.github.com/en/github-cli/github-cli/about-github-cli)，一个命令行工具的具体例子。
- TUI：[Textual官方文档](https://textual.textualize.io/)，可查看终端界面的示例，不需要学习该框架。
- API与SDK：[Libraries for the REST API — GitHub文档](https://docs.github.com/en/rest/using-the-rest-api/libraries-for-the-rest-api)。
- Hooks：[Automate actions with hooks — Claude Code文档](https://code.claude.com/docs/en/hooks-guide)。
- CI/CD：[Understanding GitHub Actions — GitHub文档](https://docs.github.com/en/actions/get-started/understand-github-actions)。
- 沙箱与权限：[Configure the sandboxed Bash tool — Claude Code文档](https://code.claude.com/docs/en/sandboxing)。
