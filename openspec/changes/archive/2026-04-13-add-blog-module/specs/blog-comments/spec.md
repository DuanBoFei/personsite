## ADDED Requirements

### Requirement: Giscus 评论集成
文章详情页 SHALL 集成 Giscus 评论系统，基于 GitHub Discussions 存储评论数据。

#### Scenario: 评论区加载成功
- **GIVEN** 用户访问文章详情页
- **WHEN** 页面滚动到评论区
- **THEN** 加载 Giscus 评论组件
- **AND** 显示 GitHub 登录按钮（未登录用户）

#### Scenario: 用户发表评论
- **GIVEN** 用户已登录 GitHub
- **WHEN** 用户在评论区发表评论
- **THEN** 评论保存到对应的 GitHub Discussion
- **AND** 评论实时显示在页面上

#### Scenario: 评论加载失败
- **GIVEN** Giscus 配置错误或网络问题
- **WHEN** 尝试加载评论区
- **THEN** 显示友好提示"评论加载失败，请刷新重试"
- **AND** 不阻塞文章内容的显示

---

### Requirement: 评论主题同步
Giscus 评论组件 SHALL 与网站主题同步，切换亮/暗模式时评论主题同步切换。

#### Scenario: 亮色模式下的评论
- **GIVEN** 当前主题为亮色
- **WHEN** 渲染 Giscus 评论组件
- **THEN** 使用 Giscus 的 light 主题

#### Scenario: 暗色模式下的评论
- **GIVEN** 当前主题为暗色
- **WHEN** 渲染 Giscus 评论组件
- **THEN** 使用 Giscus 的 dark 或 dark_dimmed 主题

#### Scenario: 切换主题时
- **GIVEN** Giscus 评论组件已加载
- **WHEN** 用户切换亮/暗主题
- **THEN** Giscus 主题同步切换
- **AND** 评论内容不重新加载
