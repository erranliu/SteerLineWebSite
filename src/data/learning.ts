export const learningGroups = [
  {
    id: 'getting-started', section: 'ai-engineering', sequential: true, title: ['入门阶段', 'Getting started'],
    description: ['从理解 AI 的边界开始，建立清晰的规格、版本管理与并行开发方法。', 'Understand the limits of AI, then build a foundation in specifications, version control, and parallel work.'],
    items: ['why-serious-ai-development', 'demo-and-commercial-delivery', 'limitations', 'prerequisites', 'outdated-knowledge', 'git', 'specs', 'worktrees'],
  },
  {
    id: 'advanced', section: 'ai-engineering', sequential: true, title: ['进阶阶段（待更新）', 'Going further (Update pending)'],
    description: ['把实现推进到可靠交付：关注 Spec 质量、测试验收、审计与项目管理。', 'Move from implementation to reliable delivery with better specs, testing, audits, and project planning.'],
    items: ['effective-information-and-spec-quality', 'testing-and-acceptance', 'auditing', 'layered-documentation', 'models-and-agents', 'why-steerline', 'project-milestones', 'designing-parallel-work', 'soft-and-hard-workflows', 'pursuing-convergence'],
  },
  {
    id: 'cognitive-science', section: 'ai-engineering', sequential: true, title: ['AI 和认知科学（待更新）', 'AI and cognitive science (Update pending)'],
    description: ['理解因果理性、工程思维与结构抽象，思考人与 AI 如何共同解决问题。', 'Explore causal reasoning, engineering thinking, and abstraction to understand how people and AI solve problems.'],
    items: ['cognitive-science/ai-limitations', 'cognitive-science/causal-rationality', 'cognitive-science/engineering-thinking', 'cognitive-science/structural-abstraction', 'cognitive-science/generational-knowledge-evolution', 'cognitive-science/problem-representation'],
  },
  {
    id: 'articles', section: 'articles', sequential: false, title: ['专栏文章', 'Articles'],
    description: ['围绕 AI 开发的独立教学文章。每篇讨论一个问题，无需按顺序阅读。', 'Standalone articles about AI development. Each explores a single question and can be read in any order.'],
    items: ['no-need-to-learn-harness', 'no-need-to-develop-agents', 'ai-limited-attention'],
  },
];
