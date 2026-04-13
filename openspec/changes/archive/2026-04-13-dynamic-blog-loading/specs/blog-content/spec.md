## MODIFIED Requirements

### Requirement: MDX 文章文件存储
博客文章 SHALL 以 MDX 格式存储在 `src/content/blog/` 目录下，每个文件包含 YAML frontmatter 元数据和 MDX 正文。

#### Scenario: 文章文件格式正确
- **GIVEN** 一个有效的博客文章文件
- **WHEN** 构建时系统读取该文件
- **THEN** 通过 `import.meta.glob` 加载文件内容
- **AND** 解析出 title, date, tags, excerpt 等元数据
- **AND** 解析出 MDX 格式的正文内容

#### Scenario: 文章文件缺少必填字段
- **GIVEN** 一个缺少 title 字段的文章文件
- **WHEN** 系统尝试解析该文件
- **THEN** 跳过该文件并记录警告
- **AND** 不中断其他文章的加载
- **AND** 构建成功完成

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

## ADDED Requirements

### Requirement: 构建时动态加载文章列表
系统 SHALL 在构建时动态加载所有 MDX 文章，替换原有的静态数组方式。

#### Scenario: 构建时加载所有文章
- **GIVEN** `src/content/blog/` 目录下有多个 MDX 文件
- **WHEN** 执行 Vite 构建
- **THEN** 使用 `import.meta.glob` 加载所有文件
- **AND** 按日期降序排列生成文章列表

#### Scenario: 接口兼容性
- **GIVEN** 动态加载的文章列表
- **WHEN** 调用 `getAllPosts()`, `getRecentPosts()`, `getPostBySlug()`
- **THEN** 返回类型与原有接口完全一致
- **AND** 现有组件无需修改即可工作
