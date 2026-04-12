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
