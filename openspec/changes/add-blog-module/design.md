## Context

当前个人品牌站是一个单页 React 应用，使用 Vite 构建，部署在 GitHub Pages。网站包含 Hero、About、Projects、Contact 四个区域，支持亮/暗主题切换。

本次变更需要添加博客模块，核心需求：
- 可视化编辑（Decap CMS）
- 复杂布局支持（MDX）
- 评论功能（Giscus）
- 随性发布（Git 工作流）

## Goals / Non-Goals

**Goals:**
- 提供可视化编辑界面，无需手写代码即可发布博客
- 支持 MDX 复杂组件（代码高亮、图片画廊、嵌入内容）
- 集成 Giscus 评论系统，与 GitHub Discussions 同步
- 博客区域与现有设计风格一致（科技感、暗色模式适配）
- 保持首屏加载 < 2 秒的性能目标

**Non-Goals:**
- 自建后端/CMS 服务
- 服务端渲染 (SSR)
- 复杂的用户权限管理
- 文章搜索/推荐算法

## Decisions

### 1. 使用 Decap CMS 作为内容管理界面

**选择 Decap CMS 而非其他方案：**

| 方案 | 可视化编辑 | 数据归属 | 成本 | 复杂度 |
|------|-----------|---------|------|--------|
| Decap CMS | ✅ | 自己的 Git 仓库 | 免费 | 中等 |
| Notion + 同步 | ✅ | Notion + Git | 免费 | 高（需同步脚本） |
| 纯 MDX 手写 | ❌ | Git 仓库 | 免费 | 低 |
| Strapi/Sanity | ✅ | 第三方服务 | 有成本 | 高 |

**理由：** Decap CMS 是唯一同时满足"可视化编辑"、"数据在自己仓库"、"免费"的方案。虽然配置 OAuth 稍复杂，但一次设置终身受益。

### 2. 使用 MDX 而非纯 Markdown

**选择 MDX：**
- 支持在文章中嵌入任意 React 组件
- 可以实现图片画廊、代码沙盒、提示框等复杂布局
- Vite 原生支持 via `@mdx-js/rollup`

**替代方案：** 纯 Markdown + 自定义语法
- 缺点：需要自定义解析器，扩展性有限

### 3. 使用 Giscus 作为评论系统

**选择 Giscus 而非 Disqus/Utterances：**

| 特性 | Giscus | Utterances | Disqus |
|------|--------|------------|--------|
| 数据存储 | GitHub Discussions | GitHub Issues | Disqus 服务器 |
| 广告 | 无 | 无 | 有（免费版） |
| 主题同步 | ✅ | ✅ | 手动配置 |
| Markdown 支持 | ✅ | ✅ | 有限 |
| 邮件通知 | ✅ | ✅ | ✅ |

**理由：** Giscus 使用 GitHub Discussions（比 Issues 更适合长期讨论），无广告，数据完全可控。

### 4. 博客区域放在 Projects 之后、Contact 之前

**布局顺序：**
```
Hero → About → Projects → Blog → Contact
```

**理由：**
- Projects 展示硬技能，Blog 展示软技能（思考、表达）
- Contact 作为最终行动号召放在最后

### 5. 首页展示最近 3 篇文章，点击跳转到独立详情页

**选择单页内列表 + 独立详情页：**

| 方案 | SEO | 分享性 | 复杂度 |
|------|-----|--------|--------|
| 纯单页（弹窗展示） | 差 | 差 | 低 |
| 单页列表 + 独立详情页 | 好 | 好 | 中等 |
| 多页路由 | 好 | 好 | 高 |

**理由：** 单页列表 + 独立详情页在 GitHub Pages 上最容易实现，同时保持 SEO 友好。

### 6. 使用 gray-matter 解析文章元数据

**文章文件结构：**
```mdx
---
title: "文章标题"
date: "2024-04-12"
tags: ["react", "vite"]
excerpt: "文章摘要"
---

# 正文内容
```

**理由：** gray-matter 是业界标准，支持 YAML frontmatter，与 Decap CMS 完美配合。

## 技术架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         博客模块架构                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │   Decap CMS  │    │   MDX 文件   │    │   Vite 构建   │     │
│   │   (/admin)   │───►│   (Git 仓库)  │───►│   (GitHub     │     │
│   │              │    │              │    │   Pages)      │     │
│   └──────────────┘    └──────────────┘    └──────┬───────┘     │
│          │                                       │             │
│          │         ┌─────────────────────────────┘             │
│          │         │                                           │
│          │    ┌────▼────┐    ┌─────────┐    ┌─────────┐       │
│          │    │ 首页列表 │    │ 文章详情 │    │ Giscus  │       │
│          │    │         │    │  (MDX)  │    │  评论   │       │
│          │    └─────────┘    └─────────┘    └─────────┘       │
│          │                                                     │
│          └────────────────────────────────────────────────►    │
│                              (GitHub OAuth + Discussions)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 文件结构

```
src/
├── content/
│   └── blog/                 # MDX 文章目录
│       ├── 2024-04-hello-world.mdx
│       └── 2024-05-react-tips.mdx
├── components/
│   ├── blog/
│   │   ├── BlogSection.tsx      # 首页博客区域
│   │   ├── BlogCard.tsx         # 文章卡片
│   │   ├── BlogPost.tsx         # 文章详情页
│   │   └── MDXComponents.tsx    # 自定义 MDX 组件
│   ├── Navigation.tsx           # 修改：添加博客链接
│   └── ...
├── lib/
│   └── blog.ts                  # 博客工具函数
├── types/
│   └── blog.ts                  # 博客类型定义
└── App.tsx                      # 修改：添加 BlogSection

public/
└── admin/                       # Decap CMS
    ├── index.html               # CMS 入口
    └── config.yml               # CMS 配置
```

## Decap CMS 配置要点

```yaml
backend:
  name: github
  repo: DuanBoFei/personsite
  branch: master

media_folder: "public/images/blog"
public_folder: "/personsite/images/blog"

collections:
  - name: "blog"
    label: "博客文章"
    folder: "src/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "标题", name: "title", widget: "string" }
      - { label: "发布日期", name: "date", widget: "datetime" }
      - { label: "标签", name: "tags", widget: "list" }
      - { label: "摘要", name: "excerpt", widget: "text" }
      - { label: "正文", name: "body", widget: "markdown" }
```

## Giscus 集成方案

```tsx
// Giscus 组件配置
<Giscus
  repo="DuanBoFei/personsite"
  repoId="..."
  category="Blog Comments"
  categoryId="..."
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  theme={isDark ? "dark" : "light"}
/>
```

## 性能优化策略

1. **MDX 组件懒加载**：使用 `React.lazy` 动态导入 MDX 组件
2. **代码高亮按需加载**：只加载需要的语言高亮
3. **图片懒加载**：所有图片使用 `loading="lazy"`
4. **Giscus 延迟加载**：滚动到评论区附近再加载 Giscus

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Decap CMS OAuth 配置复杂 | 提供详细配置文档，包含截图步骤 |
| MDX 构建时间增加 | 文章数量少（< 100）时影响可忽略 |
| Giscus 要求读者有 GitHub 账号 | 个人技术博客的目标读者通常有 GitHub |
| Decap CMS 编辑器对 MDX 组件支持有限 | 简单文章用编辑器，复杂组件直接编辑 MDX 文件 |
| 首屏加载增加博客相关代码 | 使用动态导入，延迟加载博客组件 |

## Migration Plan

1. **Phase 1**: 创建基础结构（文件目录、配置、类型定义）
2. **Phase 2**: 实现博客列表和卡片组件
3. **Phase 3**: 实现文章详情页和 MDX 渲染
4. **Phase 4**: 集成 Decap CMS
5. **Phase 5**: 集成 Giscus 评论
6. **Phase 6**: 更新导航和首页布局
7. **Phase 7**: 创建示例文章，配置 OAuth，测试完整流程

**Rollback Strategy:**
- 所有变更是增量的，回滚只需删除新增文件
- 文章数据在 Git 仓库中，不会丢失
- 评论数据在 GitHub Discussions 中，独立存在

## Open Questions

1. 是否需要文章封面图？（会增加配置复杂度）
2. 博客列表是否需要"加载更多"按钮还是展示全部？
3. 是否需要文章阅读时间估算？
