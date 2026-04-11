## Why

个人品牌站需要被搜索引擎正确索引和展示，以便潜在雇主、合作伙伴能够通过搜索发现网站。当前站点缺少必要的 SEO 元标签和语义化 HTML 结构，影响搜索引擎对页面内容的理解和排名。同时需要允许搜索引擎爬虫正常索引网站内容。

## What Changes

- **添加 HTML Meta 标签**: 配置 title、description、keywords 等基础 SEO 元标签
- **添加 Open Graph 标签**: 支持社交媒体分享时的卡片展示
- **语义化 HTML 审查**: 检查并修复现有组件的语义化结构（如正确使用 section、article、header、main 等标签）
- **添加 robots.txt**: 允许 Google 等搜索引擎爬虫索引网站
- **添加 sitemap.xml** (可选): 帮助搜索引擎更好地理解网站结构

## Capabilities

### New Capabilities
- `seo-meta`: SEO 元标签配置，包括 title、description、OG 标签等
- `seo-semantic-html`: 语义化 HTML 结构规范

### Modified Capabilities
- (无现有能力需要修改)

## Impact

- **index.html**: 添加 meta 标签和 title
- **public/robots.txt**: 新增文件，允许爬虫索引
- **public/sitemap.xml**: 新增文件（可选）
- **现有组件**: 可能需要调整语义化标签（如添加 main、article 等）

## Out of Scope

- 复杂的 SEO 优化（如结构化数据 Schema.org）
- 性能优化（Lighthouse 分数提升）
- 多语言 SEO（hreflang）
- 服务端渲染（SSR）
- 动态 SEO（根据路由变化）
