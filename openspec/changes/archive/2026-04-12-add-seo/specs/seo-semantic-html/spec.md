## ADDED Requirements

### Requirement: 语义化 HTML 结构规范
网站 SHALL 使用语义化的 HTML5 标签构建页面，提升可访问性和 SEO。

#### Scenario: Main 内容区域
- **WHEN** 页面渲染
- **THEN** 主要内容包裹在 `<main>` 标签中
- **AND** 每个页面只有一个 `<main>` 标签
- **AND** `<main>` 不包含导航栏和页脚

#### Scenario: Section 内容区块
- **WHEN** 页面渲染
- **THEN** Hero、About、Projects、Contact 使用 `<section>` 标签
- **AND** 每个 `<section>` 有对应的 `id` 属性用于锚点导航
- **AND** 每个 `<section>` 有明确的标题（h2）

#### Scenario: Article 独立内容
- **WHEN** 项目卡片渲染
- **THEN** 使用 `<article>` 标签包裹
- **AND** `<article>` 包含独立的标题和内容

#### Scenario: Nav 导航区域
- **WHEN** 页面渲染
- **THEN** 导航栏使用 `<nav>` 标签
- **AND** `<nav>` 包含 `aria-label="主导航"` 属性

#### Scenario: Header 和 Footer
- **WHEN** 页面渲染
- **THEN** 如有页头/页脚内容，使用 `<header>` / `<footer>` 标签

#### Scenario: Heading 层级
- **WHEN** 页面渲染
- **THEN** 页面只有一个 `<h1>`（网站主标题）
- **AND` Section 标题使用 `<h2>`
- **AND** 卡片标题使用 `<h3>`
- **AND** 层级连续不跳跃

#### Scenario: ARIA 标签
- **WHEN** 页面渲染
- **THEN** 导航链接有明确的文本描述
- **AND** 图片有 `alt` 属性
- **AND** 按钮有明确的文字或 `aria-label`

---

### Requirement: 可访问性基础
网站 SHALL 满足基础可访问性要求。

#### Scenario: 图片替代文本
- **GIVEN** 页面包含图片
- **WHEN** 屏幕阅读器读取页面
- **THEN** 所有图片有描述性的 `alt` 属性
- **AND** 装饰性图片使用空 `alt=""`

#### Scenario: 链接描述
- **GIVEN** 页面包含链接
- **WHEN** 屏幕阅读器读取链接
- **THEN** 链接文本描述目标内容
- **AND** 无 "点击这里" 等模糊文本

#### Scenario: 焦点可见
- **GIVEN** 用户使用键盘导航
- **WHEN** 焦点在可交互元素上
- **THEN** 焦点样式清晰可见
- **AND** 焦点顺序符合视觉顺序
