import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://steerline.dev',
  integrations: [starlight({
    title: 'SteerLine',
    defaultLocale: 'en',
    locales: {
      en: { label: 'English', lang: 'en' },
      'zh-cn': { label: '简体中文', lang: 'zh-CN' },
    },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/erranliu/SteerLine' }],
    customCss: ['./src/styles/docs.css'],
    components: { Header: './src/components/DocsHeader.astro', Sidebar: './src/components/DocsSidebar.astro', Footer: './src/components/DocsFooter.astro', PageTitle: './src/components/PageTitle.astro', LanguageSelect: './src/components/LanguageSelect.astro', ThemeProvider: './src/components/ThemeProvider.astro', ThemeSelect: './src/components/ThemeSelect.astro', Search: './src/components/Search.astro' },
    sidebar: [
      {
        label: 'Learn AI Development',
        translations: { 'zh-CN': '学习 AI 开发' },
        items: [
          'ai-engineering',
          {
            label: 'Getting Started',
            translations: { 'zh-CN': '入门阶段' },
            items: [
              'ai-engineering/why-serious-ai-development',
              'ai-engineering/limitations',
              'ai-engineering/prerequisites',
              'ai-engineering/outdated-knowledge',
              'ai-engineering/git',
              'ai-engineering/specs',
              'ai-engineering/worktrees',
            ],
          },
          {
            label: 'Advanced',
            translations: { 'zh-CN': '进阶阶段' },
            items: [
              'ai-engineering/effective-information-and-spec-quality',
              'ai-engineering/testing-and-acceptance',
              'ai-engineering/auditing',
              'ai-engineering/layered-documentation',
              'ai-engineering/models-and-agents',
              'ai-engineering/why-steerline',
              'ai-engineering/project-milestones',
            ],
          },
          {
            label: 'AI and Cognitive Science',
            translations: { 'zh-CN': 'AI和认知科学' },
            items: [
              'ai-engineering/cognitive-science/ai-limitations',
              'ai-engineering/cognitive-science/causal-rationality',
              'ai-engineering/cognitive-science/engineering-thinking',
              'ai-engineering/cognitive-science/structural-abstraction',
              'ai-engineering/cognitive-science/generational-knowledge-evolution',
            ],
          },
          {
            label: 'Outdated Development Methods',
            translations: { 'zh-CN': '过期的开发方式' },
            items: [
              'ai-engineering/outdated-methods/session-handoff',
              'ai-engineering/outdated-methods/superpowers',
              'ai-engineering/outdated-methods/agent-team',
              'ai-engineering/outdated-methods/code-repo',
              'ai-engineering/outdated-methods/role-assignment',
              'ai-engineering/outdated-methods/prompting-techniques',
              'ai-engineering/outdated-methods/agents-md',
            ],
          },
        ],
      },
      { label: 'Learn SteerLine', translations: { 'zh-CN': '学习 SteerLine' }, autogenerate: { directory: 'steerline' } },
      { label: 'Docs', translations: { 'zh-CN': '文档' }, autogenerate: { directory: 'docs' } },
    ],
  })],
});
