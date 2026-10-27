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
      { label: 'AI Engineering / AI 开发', autogenerate: { directory: 'ai-engineering' } },
      { label: 'SteerLine Guide / 使用教程', autogenerate: { directory: 'steerline' } },
      { label: 'Reference / 参考文档', autogenerate: { directory: 'docs' } },
    ],
  })],
});
