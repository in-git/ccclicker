import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CCClicker',
  description: '高效便捷的连点器工具',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: './theme/index.ts',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '功能特性', link: '/features' },
      { text: '使用指南', link: '/guide' }
    ],
    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/' },
        { text: '基本使用', link: '/guide/basic' },
        { text: '高级设置', link: '/guide/advanced' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/in-git/ccclicker' }
    ],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2025-present CCClicker'
    }
  }
})