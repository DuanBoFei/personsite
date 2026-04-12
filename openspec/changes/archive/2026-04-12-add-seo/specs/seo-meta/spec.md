## ADDED Requirements

### Requirement: HTML Meta 标签配置
网站 SHALL 在 index.html 中配置完整的 SEO meta 标签。

#### Scenario: Title 标签配置
- **WHEN** 页面加载
- **THEN** HTML 包含 title 标签
- **AND** title 包含姓名、职位和品牌信息
- **AND** title 长度在 30-60 字符之间

#### Scenario: Meta Description 配置
- **WHEN** 页面加载
- **THEN** HTML 包含 meta name="description"
- **AND** description 概括网站内容和个人定位
- **AND** description 长度在 120-160 字符之间

#### Scenario: Meta Keywords 配置
- **WHEN** 页面加载
- **THEN** HTML 包含 meta name="keywords"
- **AND** keywords 包含相关技术关键词

#### Scenario: Viewport 和 Charset 配置
- **WHEN** 页面加载
- **THEN** HTML 包含 charset="UTF-8"
- **AND** HTML 包含 viewport 适配移动端

---

### Requirement: Open Graph 标签配置
网站 SHALL 配置 Open Graph 标签以支持社交媒体分享。

#### Scenario: OG 基础标签配置
- **WHEN** 页面加载
- **THEN** HTML 包含 og:title、og:description、og:type
- **AND** og:type 设置为 website
- **AND** og:url 设置为网站完整 URL

#### Scenario: OG Image 配置
- **WHEN** 页面加载
- **THEN** HTML 包含 og:image
- **AND** og:image 使用绝对 URL
- **AND** 图片尺寸建议为 1200x630 像素

#### Scenario: Twitter Card 配置
- **WHEN** 页面加载
- **THEN** HTML 包含 twitter:card（summary_large_image）
- **AND** HTML 包含 twitter:title 和 twitter:description

---

### Requirement: robots.txt 配置
网站 SHALL 提供 robots.txt 允许搜索引擎爬虫索引。

#### Scenario: robots.txt 允许所有爬虫
- **WHEN** 爬虫访问 /robots.txt
- **THEN** 返回允许所有 User-agent 访问所有路径的配置
- **AND** 文件放置在 public/robots.txt

#### Scenario: robots.txt 复制到构建目录
- **GIVEN** 执行构建命令
- **WHEN** 构建完成
- **THEN** robots.txt 存在于 dist/ 根目录

---

### Requirement: sitemap.xml 配置
网站 SHALL 提供 sitemap.xml 帮助搜索引擎理解站点结构。

#### Scenario: sitemap.xml 基本结构
- **WHEN** 访问 /sitemap.xml
- **THEN** 返回有效的 XML sitemap
- **AND** 包含网站首页 URL
- **AND** 包含最后修改日期
- **AND** 包含更新频率和优先级信息

#### Scenario: sitemap.xml 复制到构建目录
- **GIVEN** 执行构建命令
- **WHEN** 构建完成
- **THEN** sitemap.xml 存在于 dist/ 根目录

---

### Requirement: 语义化 HTML 结构
网站 SHALL 使用语义化的 HTML 标签构建页面结构。

#### Scenario: Main 标签使用
- **WHEN** 页面渲染
- **THEN** 主要内容包裹在 main 标签中
- **AND** 每个页面只有一个 main 标签

#### Scenario: Section 标签使用
- **WHEN** 页面渲染
- **THEN** Hero、About、Projects、Contact 使用 section 标签
- **AND** 每个 section 有对应的 id 属性

#### Scenario: Heading 层级正确
- **WHEN** 页面渲染
- **THEN** 页面只有一个 h1（网站标题/姓名）
- **AND** section 标题使用 h2
- **AND** 卡片/子标题使用 h3
- **AND** 层级不跳跃（如 h2 直接到 h4）

#### Scenario: Nav 标签使用
- **WHEN** 页面渲染
- **THEN** 导航栏使用 nav 标签
- **AND** nav 包含 aria-label 属性

#### Scenario: Article 标签使用
- **WHEN** 项目卡片渲染
- **THEN** 使用 article 标签包裹项目卡片
- **AND** article 语义上独立于其他内容
