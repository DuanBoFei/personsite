## Phase 1: 核心加载逻辑实现

- [x] 1.1 修改 `src/lib/blog.ts`，使用 `import.meta.glob` 扫描 MDX 文件
- [x] 1.2 实现 `parseMdxFile` 函数，解析 frontmatter 和提取 slug
- [x] 1.3 实现文章列表排序（按日期降序）
- [x] 1.4 更新 `getAllPosts()`, `getRecentPosts()`, `getPostBySlug()` 函数
- [x] 1.5 添加错误处理：跳过缺少必填字段的文件

## Phase 2: 边界情况处理

- [x] 2.1 处理中文文件名 slug 生成
- [x] 2.2 处理缺少可选字段（excerpt, tags）的默认值
- [x] 2.3 处理目录为空的情况
- [x] 2.4 处理日期格式解析异常

## Phase 3: 测试验证

- [x] 3.1 本地构建测试：`npm run build` + `npm run preview`
- [x] 3.2 验证现有 3 篇文章正常显示
- [x] 3.3 通过 CMS 创建新文章，验证自动加载
- [x] 3.4 验证文章详情页正常渲染（包括代码高亮）
- [x] 3.5 验证暗色/亮色模式切换正常

## Phase 4: 部署上线

- [x] 4.1 提交代码并推送到 GitHub
- [x] 4.2 等待 Netlify 自动部署
- [x] 4.3 线上验证：访问网站确认所有文章显示
- [ ] 4.4 通过 CMS 发布新文章，验证完整流程
