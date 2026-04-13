## Phase 1: 基础结构和依赖

- [x] 1.1 安装博客模块依赖：`decap-cms-app`, `@mdx-js/rollup`, `react-markdown`, `remark-gfm`, `react-syntax-highlighter`, `gray-matter`
- [x] 1.2 配置 Vite 支持 MDX（修改 vite.config.ts 添加 @mdx-js/rollup 插件）
- [x] 1.3 创建博客类型定义文件 `src/types/blog.ts`
- [x] 1.4 创建博客工具函数文件 `src/lib/blog.ts`（包含 getAllPosts, getPostBySlug, parseFrontmatter）
- [x] 1.5 创建 `src/content/blog/` 目录并添加示例文章 `2024-04-12-hello-world.mdx`

## Phase 2: 博客列表组件

- [x] 2.1 创建 `BlogCard.tsx` 组件，显示标题、日期、标签、摘要
- [x] 2.2 创建 `BlogSection.tsx` 组件，展示最近 3 篇文章
- [x] 2.3 在 `App.tsx` 中添加 BlogSection（位于 Projects 之后、Contact 之前）
- [x] 2.4 为 BlogSection 添加暗色模式样式支持
- [x] 2.5 测试博客列表渲染和样式

## Phase 3: 文章详情页

- [x] 3.1 创建 `MDXComponents.tsx`，定义自定义 MDX 组件（标题、代码块、提示框）
- [x] 3.2 创建 `BlogPost.tsx` 组件，渲染文章详情和 MDX 内容
- [x] 3.3 配置代码高亮组件，支持亮/暗主题切换
- [x] 3.4 添加文章加载失败时的 404 提示（已在 BlogSection 中处理）
- [x] 3.5 测试文章详情页渲染和暗色模式适配

## Phase 4: Decap CMS 集成

- [x] 4.1 创建 `public/admin/index.html` Decap CMS 入口文件
- [x] 4.2 创建 `public/admin/config.yml` Decap CMS 配置文件
- [ ] 4.3 在 GitHub 创建 OAuth App 并配置回调地址（需手动配置）
- [ ] 4.4 更新 config.yml 中的 OAuth 客户端 ID（需手动配置）
- [ ] 4.5 测试 CMS 登录和文章创建功能（需手动配置）

## Phase 5: 评论系统集成

- [ ] 5.1 在 GitHub 仓库启用 Discussions 功能（需手动配置）
- [x] 5.2 安装 Giscus 组件依赖
- [x] 5.3 在 `BlogPost.tsx` 中集成 Giscus 评论组件
- [x] 5.4 配置 Giscus 主题与网站主题同步
- [ ] 5.5 测试评论功能（需先发布一篇测试文章）

## Phase 6: 导航更新

- [x] 6.1 修改 `Navigation.tsx`，在"项目"和"联系我"之间添加"博客"链接
- [x] 6.2 更新导航滚动逻辑，支持平滑滚动到 #blog
- [x] 6.3 更新当前链接高亮逻辑，支持 Blog Section 高亮
- [x] 6.4 为 BlogPost 详情页添加返回链接
- [x] 6.5 测试导航功能完整流程

## Phase 7: 测试和优化

- [x] 7.1 创建第二篇示例文章，测试列表排序
- [x] 7.2 测试暗色/亮色模式切换时所有组件同步
- [x] 7.3 测试移动端响应式布局
- [x] 7.4 验证首屏加载性能（目标 < 2 秒）
- [x] 7.5 构建并部署到 GitHub Pages 测试
