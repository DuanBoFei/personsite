## ADDED Requirements

### Requirement: MDX 文章文件存储
博客文章 SHALL 以 MDX 格式存储在 `src/content/blog/` 目录下，每个文件包含 YAML frontmatter 元数据和 MDX 正文。

#### Scenario: 文章文件格式正确
- **GIVEN** 一个有效的博客文章文件
- **WHEN** 系统读取该文件
- **THEN** 解析出 title, date, tags, excerpt 等元数据
- **AND** 解析出 MDX 格式的正文内容

#### Scenario: 文章文件缺少必填字段
- **GIVEN** 一个缺少 title 字段的文章文件
- **WHEN** 系统尝试解析该文件
- **THEN** 跳过该文件并记录警告
- **AND** 不中断其他文章的加载

---

### Requirement: Decap CMS 集成
系统 SHALL 集成 Decap CMS，提供 `/admin` 路径的可视化编辑界面，支持创建、编辑、删除博客文章。

#### Scenario: 访问 CMS 登录页
- **WHEN** 用户访问 `/admin`
- **THEN** 显示 Decap CMS 登录界面
- **AND** 提供 GitHub OAuth 登录按钮

#### Scenario: 成功登录后查看文章列表
- **GIVEN** 用户已完成 GitHub OAuth 授权
- **WHEN** 用户进入 CMS 后台
- **THEN** 显示所有博客文章列表
- **AND** 显示文章的标题、发布日期、状态

#### Scenario: 创建新文章
- **GIVEN** 用户已登录 CMS
- **WHEN** 用户点击"新建文章"并填写表单
- **THEN** 生成 MDX 文件并提交到 Git 仓库
- **AND** 文件路径格式为 `src/content/blog/YYYY-MM-DD-slug.mdx`

---

### Requirement: 文章元数据管理
每篇文章 SHALL 包含以下元数据：title（标题）、date（发布日期）、tags（标签列表）、excerpt（摘要）。

#### Scenario: 元数据完整的文章
- **GIVEN** 一篇包含所有元数据的文章
- **WHEN** 系统渲染文章卡片
- **THEN** 正确显示标题、日期、标签和摘要

#### Scenario: 元数据缺失的文章
- **GIVEN** 一篇缺少 excerpt 的文章
- **WHEN** 系统渲染文章卡片
- **THEN** 自动截取正文前 200 字符作为摘要
- **AND** 显示截断提示（...）

#### Scenario: 日期格式解析
- **GIVEN** 一个格式为 "2024-04-12" 的日期字符串
- **WHEN** 系统解析该日期
- **THEN** 正确转换为 Date 对象
- **AND** 支持按日期排序

---

## MODIFIED Requirements

### Requirement: 构建时动态加载文章列表
系统 SHALL 在构建时动态加载所有 MDX 文章，替换原有的静态数组方式。

#### Scenario: 构建时加载所有文章
- **GIVEN** `src/content/blog/` 目录下有多个 MDX 文件
- **WHEN** 执行 Vite 构建
- **THEN** 使用 Vite 虚拟模块加载所有文件
- **AND** 按日期降序排列生成文章列表

#### Scenario: 接口兼容性
- **GIVEN** 动态加载的文章列表
- **WHEN** 调用 `getAllPosts()`, `getRecentPosts()`, `getPostBySlug()`
- **THEN** 返回类型与原有接口完全一致
- **AND** 现有组件无需修改即可工作

---

### Requirement: frontmatter 解析
系统 SHALL 使用 gray-matter 解析每个 MDX 文件的 frontmatter，提取 title, date, tags, excerpt。

#### Scenario: 完整的 frontmatter
- **GIVEN** MDX 文件包含完整的 YAML frontmatter
- **WHEN** 解析文件
- **THEN** 正确提取 title, date, tags, excerpt
- **AND** 提取正文内容（不含 frontmatter）

#### Scenario: 缺少可选字段
- **GIVEN** MDX 文件缺少 excerpt 字段
- **WHEN** 解析文件
- **THEN** excerpt 设为空字符串或从正文截取
- **AND** 不报错

#### Scenario: 缺少必填字段
- **GIVEN** MDX 文件缺少 title 或 date
- **WHEN** 解析文件
- **THEN** 跳过该文件并记录警告
- **AND** 继续处理其他文件

#### Scenario: 日期格式无效
- **GIVEN** date 字段为无效格式
- **WHEN** 解析文件
- **THEN** 尝试解析为 Date 对象
- **AND** 失败时跳过该文件

---

### Requirement: 数据转换为 BlogPost 类型
系统 SHALL 将解析后的数据转换为 BlogPost 类型，保持与原有接口兼容。

#### Scenario: 正常转换
- **GIVEN** 成功解析的 MDX 数据
- **WHEN** 转换为 BlogPost
- **THEN** 所有字段符合 BlogPost 类型定义
- **AND** content 字段为 Markdown 字符串

#### Scenario: tags 字段处理
- **GIVEN** frontmatter 中 tags 为字符串或数组
- **WHEN** 转换数据
- **THEN** 统一转换为字符串数组
- **AND** 空值转为空数组

---

### Requirement: 构建时扫描 MDX 文件
系统 SHALL 在构建时使用 Vite 扫描 `src/content/blog/` 目录下的所有 `.mdx` 文件。

#### Scenario: 构建时发现所有 MDX 文件
- **GIVEN** `src/content/blog/` 目录下有 3 个 MDX 文件
- **WHEN** 执行 Vite 构建
- **THEN** 系统扫描并加载所有 3 个文件
- **AND** 不遗漏任何文件

#### Scenario: 新增 MDX 文件后重新构建
- **GIVEN** 已构建一次后新增 1 个 MDX 文件
- **WHEN** 重新执行 Vite 构建
- **THEN** 新文件被包含在构建输出中
- **AND** 网站显示新增的文章

#### Scenario: 目录为空时
- **GIVEN** `src/content/blog/` 目录为空
- **WHEN** 执行 Vite 构建
- **THEN** 系统返回空数组
- **AND** 不抛出错误

---

### Requirement: 文件名提取 slug
系统 SHALL 从 MDX 文件名提取 URL slug，移除日期前缀（如 `YYYY-MM-DD-`）。

#### Scenario: 标准文件名
- **GIVEN** 文件名为 `2024-04-12-hello-world.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `hello-world`

#### Scenario: 中文文件名
- **GIVEN** 文件名为 `2026-04-13-测试.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `测试`
- **AND** 保持中文可读性

#### Scenario: 文件名无日期前缀
- **GIVEN** 文件名为 `my-article.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `my-article`
- **AND** 不报错
