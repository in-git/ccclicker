import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  vite: {
    plugins: [
      UnoCSS()
    ]
  },
  title: '连点点',
  description: '高效便捷的连点器工具',
  lang: 'zh-CN',

  // 子路径部署配置
  base: '/ccclicker/',

  // SEO 优化配置
  head: [
    ['link', { rel: 'icon', href: '/ccclicker/logo.png' }],
    ['meta', { name: 'keywords', content: '连点器,自动点击,鼠标连点,游戏辅助,办公效率' }],
    ['meta', { name: 'author', content: '连点点团队' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '连点点 - 高效便捷的连点器工具' }],
    ['meta', { property: 'og:description', content: '专业的鼠标连点器工具，支持自定义点击频率、热键控制，提升游戏和办公效率' }],
    ['meta', { property: 'og:image', content: '/ccclicker/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '连点点 - 高效便捷的连点器工具' }],
    ['meta', { name: 'twitter:description', content: '专业的鼠标连点器工具，支持自定义点击频率、热键控制，提升游戏和办公效率' }],
    ['meta', { name: 'twitter:image', content: '/ccclicker/logo.png' }]
  ],
  themeConfig: {
    logo: '/ccclicker/logo.png',
    nav: [
      { text: '首页', link: '/' },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/in-git/ccclicker' }
    ],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2025-present 连点点'
    }
  }
})