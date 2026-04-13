## Why

当前博客模块使用静态数组存储文章数据，每次通过 Decap CMS 发布新文章后，需要手动修改 `src/lib/blog.ts` 才能显示。这违背了"可视化编辑、自动发布"的初衷。需要将文章加载方式改为构建时动态扫描 MDX 文件，实现 CMS 保存后自动部署即生效。

## What Changes

- **重构博客数据加载机制**：使用 Vite 的 `import.meta.glob` 在构建时动态扫描 `src/content/blog/*.mdx` 文件
- **新增 MDX 文件解析器**：解析 frontmatter（title, date, tags, excerpt）和正文内容
- **新增文件系统监控**：开发环境下支持热更新（可选）
- **删除静态文章数组**：移除 `src/lib/blog.ts` 中的硬编码文章数据
- **保留原有接口**：`getAllPosts()`, `getRecentPosts()`, `getPostBySlug()` 等函数签名不变

## Out of Scope

- **运行时 API 加载**：不引入后端服务，保持纯静态站点
- **增量构建优化**：首次实现全量扫描，后续可优化为增量
- **文章草稿功能**：暂不支持 draft/published 状态区分
- **文章搜索功能**：搜索需单独实现，不在本次变更
- **图片资源处理**：图片仍放在 public 目录，不处理 MDX 中的相对路径图片

## Capabilities

### New Capabilities

- `mdx-file-loading`: MDX 文件动态加载，包括文件扫描、frontmatter 解析、slug 生成
- `blog-data-transform`: 博客数据转换，将原始 MDX 数据转换为 BlogPost 类型

### Modified Capabilities

- `blog-content`: 修改数据加载方式（从静态数组改为动态扫描），不影响外部接口

## Impact

### 代码影响
- 重写 `src/lib/blog.ts`，完全替换现有实现
- `src/types/blog.ts` 可能需要扩展 BlogPost 类型
- 新增 `src/lib/mdx-loader.ts` 用于 MDX 文件处理（可选拆分）

### 依赖影响
- 新增 `gray-matter` 依赖（已安装）用于 frontmatter 解析
- 可能需要 `slugify` 用于生成 URL slug

### 构建影响
- 构建时间可能增加（取决于文章数量，< 100 篇影响可忽略）
- 生产构建输出不变，仍是静态 HTML

### CMS 影响
- Decap CMS 配置无需修改
- 文章保存位置不变（`src/content/blog/`）
- 现有文章无需迁移，自动加载

### 风险
- 文件名含特殊字符时 slug 生成可能异常（需处理）
- 缺少必填字段的文章可能导致构建失败（需验证）
