## Context

当前个人品牌站是一个单页面 React 应用，部署在 GitHub Pages 上。站点已具备 Hero Section、About Section、Projects Section 和 Contact Section，但缺少必要的 SEO 优化。Vite 构建的静态站点需要正确配置 HTML meta 标签、robots.txt 和语义化结构，以便搜索引擎正确索引。

## Goals / Non-Goals

**Goals:**
- 配置完整的 HTML meta 标签（title、description、keywords、viewport、charset）
- 添加 Open Graph 和 Twitter Card 标签支持社交媒体分享
- 审查并修复现有组件的语义化 HTML 结构
- 添加 robots.txt 允许搜索引擎爬虫索引
- 添加 sitemap.xml 辅助搜索引擎理解站点结构

**Non-Goals:**
- 结构化数据（Schema.org JSON-LD）
- 服务端渲染（SSR）或静态站点生成（SSG）
- 动态路由 SEO
- 多语言 hreflang 标签
- 性能优化（已超出 SEO 范围）

## Decisions

### 1. Meta 标签配置方式
**决策**: 直接在 index.html 中硬编码 meta 标签  
**理由**:
- 单页面应用，所有路由共享同一个 HTML 入口
- 无需根据路由动态变化 SEO 内容
- Vite 构建时会直接复制 index.html 到输出目录
- 简单直接，无需引入 react-helmet 等库

### 2. Title 和 Description 内容
**决策**: 使用中文描述，聚焦个人品牌关键词  
**理由**:
- 目标受众主要是中文用户
- 包含"前端开发工程师"、"个人网站"等关键词
- Title 格式：姓名 | 职位 - 品牌标签

### 3. Open Graph 标签配置
**决策**: 添加完整的 OG 标签（title、description、image、url、type）  
**理由**:
- 支持微信、LinkedIn、Twitter 等社交媒体分享卡片
- 设置 og:type 为 website
- 使用绝对 URL 作为 og:image

### 4. 语义化 HTML 审查策略
**决策**: 按照以下规则审查和修复现有组件  
**审查清单**:
- 使用 `<main>` 包裹页面主要内容
- 使用 `<section>` 划分内容区块（已有 id 的 div 改为 section）
- 使用 `<article>` 包裹独立的内容单元（如项目卡片）
- 使用 `<header>`、`<nav>`、`<footer>` 等语义标签（导航栏已是 nav）
- 确保 heading 层级正确（h1 > h2 > h3）
- 添加 `aria-label` 或 `aria-labelledby` 提高可访问性

### 5. robots.txt 配置
**决策**: 允许所有爬虫访问所有路径  
```
User-agent: *
Allow: /
```
**理由**:
- 个人品牌站需要被完全索引
- 无敏感内容需要隐藏
- 部署在 GitHub Pages，无需限制爬取频率

### 6. sitemap.xml 生成
**决策**: 手动创建静态 sitemap.xml  
**理由**:
- 单页面应用，只有一个 URL
- 无需动态生成
- 包含最后修改时间和优先级信息

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| index.html 修改被 Vite 构建覆盖 | 直接修改 public/index.html 或确保 vite.config 不覆盖 |
| robots.txt 未复制到构建目录 | 放置在 public/robots.txt，Vite 会自动复制 |
| 语义化修改影响现有样式 | 保持 className 不变，仅修改标签名 |
| og:image 需要绝对 URL | 使用 GitHub Pages 完整 URL |
| 社交媒体缓存旧 OG 数据 | 添加版本参数或分享时提醒 |
