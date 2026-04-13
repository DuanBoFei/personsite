## Why

当前个人品牌站只有静态的项目展示和简介，缺少内容输出渠道。添加博客模块可以：
1. 建立技术影响力，展示专业知识
2. 记录学习过程，形成知识沉淀
3. 提高网站活跃度和 SEO 表现

## What Changes

- **新增博客内容管理**：使用 Decap CMS 提供可视化编辑界面，文章以 MDX 格式存储在 Git 仓库
- **新增博客列表页**：首页新增博客区域，展示最新文章卡片（标题、摘要、日期、标签）
- **新增文章详情页**：独立的文章展示页面，支持 MDX 复杂组件（图片画廊、代码块、嵌入内容）
- **新增评论功能**：集成 Giscus 评论系统，基于 GitHub Discussions
- **新增导航入口**：导航栏添加"博客"链接，平滑滚动到博客区域

## Out of Scope

- **搜索功能**：暂不提供文章搜索
- **文章分类/归档页面**：仅展示最新文章列表，不做复杂的分类筛选
- **阅读量/点赞统计**：暂不提供文章统计功能
- **RSS 订阅**：暂不提供 RSS 订阅功能
- **邮件订阅**：暂不提供邮件订阅功能
- **多作者支持**：仅支持单作者（本人）

## Capabilities

### New Capabilities

- `blog-content`: 博客内容管理，包括 MDX 文件存储、Decap CMS 集成、文章元数据管理
- `blog-list`: 博客列表展示，包括文章卡片、分页/加载更多、标签筛选
- `blog-post`: 文章详情展示，包括 MDX 渲染、代码高亮、暗色模式适配
- `blog-comments`: 评论系统集成，Giscus 嵌入、主题同步
- `blog-navigation`: 博客导航，导航栏链接、锚点滚动

### Modified Capabilities

- `navigation`: 新增"博客"导航链接，更新平滑滚动目标

## Impact

### 代码影响
- 新增 `src/content/blog/` 目录存放 MDX 文章
- 新增 `src/components/blog/` 目录存放博客组件
- 新增 `src/lib/blog.ts` 博客工具函数
- 新增 `public/admin/` Decap CMS 配置和入口
- 修改 `Navigation.tsx` 添加博客链接
- 修改 `App.tsx` 添加 BlogSection 组件

### 依赖影响
- 新增 `decap-cms-app` - Decap CMS 核心
- 新增 `@mdx-js/rollup` - Vite MDX 支持
- 新增 `react-markdown` + `remark-gfm` - Markdown 渲染
- 新增 `react-syntax-highlighter` - 代码高亮
- 新增 `gray-matter` - 解析文章 frontmatter

### 配置影响
- 新增 `vite.config.ts` MDX 插件配置
- 新增 `public/admin/config.yml` Decap CMS 配置
- 需要在 GitHub 设置 OAuth App 用于 Decap CMS 认证
- 需要启用 GitHub Discussions 用于 Giscus 评论

### 部署影响
- GitHub Pages 部署流程不变
- 新增构建依赖，首次安装可能稍慢
