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
    components: { PageTitle: './src/components/PageTitle.astro', LanguageSelect: './src/components/LanguageSelect.astro', ThemeProvider: './src/components/ThemeProvider.astro', ThemeSelect: './src/components/ThemeSelect.astro', Search: './src/components/Search.astro' },
    sidebar: [
      {
        label: 'AI Engineering / AI 开发',
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
        ],
      },
      { label: 'SteerLine Guide / 使用教程', autogenerate: { directory: 'steerline' } },
      { label: 'Reference / 参考文档', autogenerate: { directory: 'docs' } },
    ],
  })],
});
