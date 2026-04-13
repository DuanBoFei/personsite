## ADDED Requirements

### Requirement: 文章详情页渲染
系统 SHALL 提供文章详情页，正确渲染 MDX 内容，包括标题、元数据、正文。

#### Scenario: 成功加载文章详情
- **GIVEN** 一篇有效的 MDX 文章
- **WHEN** 用户访问文章详情页
- **THEN** 显示文章标题、发布日期、标签、正文内容
- **AND** 正确渲染 MDX 组件（标题、段落、列表等）

#### Scenario: 文章不存在
- **GIVEN** 用户访问一个不存在的文章 slug
- **WHEN** 系统尝试加载该文章
- **THEN** 显示 404 提示"文章不存在"
- **AND"提供返回首页或博客列表的链接

---

### Requirement: 代码高亮支持
文章详情页 SHALL 支持代码块语法高亮，使用 react-syntax-highlighter 实现。

#### Scenario: 渲染带语言的代码块
- **GIVEN** 一个包含 ```tsx 代码块的文章
- **WHEN"渲染文章详情页
- **THEN** 代码块显示 TypeScript 语法高亮
- **AND** 显示行号（可选）

#### Scenario: 渲染无语言的代码块
- **GIVEN** 一个包含 ``` 代码块（无语言标识）的文章
- **WHEN"渲染文章详情页
- **THEN** 代码块显示为等宽字体
- **AND** 不应用特定语言高亮

#### Scenario: 暗色模式下的代码高亮
- **GIVEN** 当前主题为暗色模式
- **WHEN** 渲染代码块
- **THEN** 使用暗色主题的高亮配色（如 vscDarkPlus）

---

### Requirement: MDX 自定义组件
文章详情页 SHALL 支持自定义 MDX 组件，包括图片画廊、提示框、代码沙盒等。

#### Scenario: 使用自定义图片组件
- **GIVEN** 文章中使用了 <Image src="..." caption="..." />
- **WHEN** 渲染文章详情页
- **THEN** 显示带标题的图片
- **AND** 图片支持懒加载

#### Scenario: 使用提示框组件
- **GIVEN** 文章中使用了 <Alert type="info">...</Alert>
- **WHEN** 渲染文章详情页
- **THEN** 显示带样式的提示框
- **AND** 根据 type 显示不同颜色（info/warning/error）

#### Scenario: 未知组件处理
- **GIVEN** 文章中使用了一个未定义的组件
- **WHEN** 渲染文章详情页
- **THEN** 忽略该组件标签
- **AND** 不导致页面崩溃

---

### Requirement: 暗色模式适配
文章详情页 SHALL 完全支持暗色模式，所有元素（文字、背景、代码块、链接）正确切换主题。

#### Scenario: 暗色模式下的正文
- **GIVEN** 当前主题为暗色
- **WHEN** 渲染文章正文
- **THEN** 文字颜色为浅色（text-gray-100）
- **AND** 背景为深色渐变

#### Scenario: 暗色模式下的链接
- **GIVEN** 当前主题为暗色
- **WHEN** 渲染文章中的链接
- **THEN** 链接颜色为亮色（如 indigo-400）
- **AND** hover 时有明显视觉反馈

#### Scenario: 主题切换时
- **GIVEN** 用户正在查看文章详情
- **WHEN** 用户切换亮/暗主题
- **THEN** 文章内容立即同步切换主题
- **AND** 无闪烁或延迟
