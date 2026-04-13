## Context

当前博客模块使用静态数组存储文章数据，每次通过 Decap CMS 发布新文章后，需要手动修改代码才能显示。这违背了"可视化编辑、自动发布"的初衷。

需要利用 Vite 的 `import.meta.glob` 功能，在构建时自动扫描 `src/content/blog/` 目录下的所有 MDX 文件，解析 frontmatter 和正文，动态生成文章列表。

## Goals / Non-Goals

**Goals:**
- 使用 Vite `import.meta.glob` 在构建时动态扫描 MDX 文件
- 解析 frontmatter（title, date, tags, excerpt）和正文内容
- 自动生成 URL slug（从文件名）
- 保留原有接口：`getAllPosts()`, `getRecentPosts()`, `getPostBySlug()`
- 构建后自动包含所有文章，无需手动修改代码

**Non-Goals:**
- 运行时 API 加载（保持纯静态）
- 开发环境热更新（首次实现可跳过）
- 草稿/发布状态管理
- 增量构建优化

## Decisions

### 1. 使用 `import.meta.glob` 而不是 `import.meta.globEager`

**选择：** 使用 `import.meta.glob` with `{ eager: true }`

**理由：**
- Vite 4+ 推荐语法
- 构建时同步加载所有模块，适合静态站点
- 代码更清晰

**替代方案：**
- 手动使用 `fs` 读取文件（需要 Node 环境，不适合浏览器）
- 构建脚本生成 JSON（增加构建复杂度）

### 2. 文件名即 slug

**选择：** 从 MDX 文件名提取 slug
- `2024-04-12-hello-world.mdx` → slug: `hello-world`
- `2026-04-13-测试.mdx` → slug: `测试` 或 `ce-shi`

**理由：**
- 简单直观，无需额外配置
- 与 Decap CMS 的 slug 生成逻辑一致

**处理中文文件名：**
- 保留中文作为 slug（现代浏览器支持）
- 或使用 `slugify` 库转为拼音

### 3. 使用 gray-matter 解析 frontmatter

**选择：** 继续使用已安装的 `gray-matter`

**理由：**
- 已是项目依赖
- 支持 YAML frontmatter
- 成熟稳定

### 4. 文章排序策略

**选择：** 按 frontmatter 中的 `date` 字段降序排列

**理由：**
- 日期是最直观的排序依据
- 与现有逻辑保持一致

**边界情况：**
- 缺少 date 字段的文章放在最后
- 相同日期的文章按文件名排序

## 技术架构

```
┌─────────────────────────────────────────────────────────────────┐
│                      构建时文章加载流程                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   src/content/blog/                                             │
│   ├── 2024-04-12-hello-world.mdx                                │
│   ├── 2024-04-10-react-tips.mdx                                 │
│   └── 2026-04-13-测试.mdx                                       │
│          ↓                                                      │
│   Vite 构建                                                     │
│          ↓                                                      │
│   import.meta.glob('/src/content/blog/*.mdx', { eager: true })  │
│          ↓                                                      │
│   解析每个文件：                                                 │
│   - 用 gray-matter 解析 frontmatter                            │
│   - 提取 content（Markdown 正文）                               │
│   - 从文件名生成 slug                                           │
│          ↓                                                      │
│   生成 BlogPost[] 数组                                           │
│          ↓                                                      │
│   按 date 降序排序                                               │
│          ↓                                                      │
│   组件使用：getAllPosts(), getRecentPosts(3) 等                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 文件结构变更

```
src/
├── lib/
│   ├── blog.ts              # 重写：使用动态加载
│   └── mdx-loader.ts        # 新增：MDX 文件解析（可选拆分）
├── content/blog/            # 不变：MDX 文件存放位置
│   └── *.mdx
└── types/
    └── blog.ts              # 可能扩展
```

## 核心代码示例

```typescript
// src/lib/blog.ts
import matter from 'gray-matter';
import type { BlogPost } from '../types/blog';

// 构建时动态导入所有 MDX 文件
const modules = import.meta.glob('/src/content/blog/*.mdx', { 
  eager: true,
  as: 'raw'  // 获取原始文本内容
});

function parseMdxFile(path: string, content: string): BlogPost {
  const { data, content: body } = matter(content);
  const slug = path
    .replace('/src/content/blog/', '')
    .replace(/\.mdx$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, ''); // 移除日期前缀
  
  return {
    slug,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt,
    content: body
  };
}

// 生成文章列表
const posts: BlogPost[] = Object.entries(modules)
  .map(([path, content]) => parseMdxFile(path, content as string))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// 导出原有接口
export const getAllPosts = () => posts;
export const getRecentPosts = (count: number) => posts.slice(0, count);
export const getPostBySlug = (slug: string) => 
  posts.find(p => p.slug === slug) || null;
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 缺少必填字段导致构建失败 | 添加默认值或跳过无效文件 |
| 文件名特殊字符导致 slug 异常 | 使用 slugify 处理或保留中文 |
| 文章数量过多影响构建时间 | 实际影响小，后续可优化 |
| 日期格式不统一 | 标准化为 ISO 格式 (YYYY-MM-DD) |
| MDX 组件无法渲染 | 保持 ReactMarkdown 组件处理方式 |

## Migration Plan

### 部署步骤
1. 更新 `src/lib/blog.ts`
2. 本地测试：`npm run build` + `npm run preview`
3. 提交代码
4. Netlify 自动部署
5. 通过 CMS 发布新文章验证

### 回滚策略
- 代码变更单一文件，回滚简单
- 保留旧的静态数据注释，紧急时可恢复

## Open Questions

1. 是否需要在开发环境支持热更新？（可后续添加）
2. 中文 slug 是否保留原样？（建议保留，或转为拼音）
3. 是否需要支持文章草稿状态？（可后续添加 `draft: true` 过滤）
