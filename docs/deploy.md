# 部署指南

## 构建静态站点

```bash
# 安装依赖
npm install

# 构建静态站点
npm run build
```

构建完成后，静态文件将生成在 `docs/.vitepress/dist` 目录中。

## 部署选项

### 1. Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 构建设置：
   - Build Command: `npm run build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `npm install`

### 2. Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `docs/.vitepress/dist`

### 3. GitHub Pages 部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. 服务器部署

```bash
# 构建
npm run build

# 将 docs/.vitepress/dist 目录上传到服务器
# 配置 Nginx 或 Apache 指向该目录
```

## SEO 优化检查清单

- ✅ 配置了 meta 标签（title, description, keywords）
- ✅ 添加了 Open Graph 标签
- ✅ 添加了 Twitter Card 标签
- ✅ 配置了 robots.txt
- ✅ 启用了 sitemap 生成
- ✅ 使用了语义化的 HTML 结构
- ✅ 配置了合适的页面标题和描述

## 性能优化

VitePress 已经内置了以下优化：
- 代码分割
- 预加载关键资源
- 服务端渲染 (SSR)
- 静态站点生成 (SSG)
- 图片懒加载
- CSS 和 JS 压缩

## 注意事项

1. 记得在 `docs/.vitepress/config.ts` 中更新 `sitemap.hostname` 为你的实际域名
2. 更新 `robots.txt` 中的站点地图 URL
3. 确保所有图片都放在 `docs/public` 目录中
4. 测试所有页面的 SEO 标签是否正确显示