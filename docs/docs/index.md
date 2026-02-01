---
layout: home
hero:
  name: CCClicker
  text: 高效便捷的连点器工具
  tagline: 自动化点击，提升效率，解放双手
  actions:
    - theme: brand
      text: 立即下载
      link: https://github.com/in-git/ccclicker/releases
    - theme: alt
      text: 查看文档
      link: /guide/
features:
  - icon: ⚡
    title: 极速响应
    details: 采用 Rust + Tauri 技术栈，提供原生应用般的流畅体验
  - icon: 🎯
    title: 精准控制
    details: 支持自定义点击间隔、次数和触发键，满足各种自动化需求
  - icon: 🔥
    title: 热键操作
    details: 全局热键控制，一键启动/停止，无需切换窗口
  - icon: 💾
    title: 数据持久
    details: 自动保存配置，下次启动自动恢复，无需重复设置
  - icon: 🎨
    title: 现代界面
    details: 简洁美观的 UI 设计，支持主题切换，护眼舒适
  - icon: 🔒
    title: 安全可靠
    details: 本地运行，不上传数据，完全保护用户隐私
---

<style>
.VPHome {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
}

.VPHomeHero {
  padding: 6rem 2rem 4rem;
}

.VPHomeHero .name {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.VPHomeHero .text {
  font-size: 1.5rem;
  color: #a3a3a3;
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;
}

.VPHomeHero .tagline {
  font-size: 1.125rem;
  color: #737373;
  margin-bottom: 2rem;
}

.VPButton.brand {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.VPButton.brand:hover {
  background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.VPHomeFeatures {
  padding: 4rem 2rem;
}

.VPFeature {
  background: #1a1a1a;
  border: 1px solid #262626;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.VPFeature:hover {
  border-color: #6366f1;
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.VPFeature .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.VPFeature .title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e5e5e5;
}

.VPFeature .details {
  color: #a3a3a3;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .VPHomeHero .name {
    font-size: 2.5rem;
  }

  .VPHomeHero .text {
    font-size: 1.125rem;
  }
}
</style>