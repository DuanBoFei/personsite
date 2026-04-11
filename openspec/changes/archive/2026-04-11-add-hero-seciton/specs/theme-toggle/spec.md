## ADDED Requirements

### Requirement: 主题切换功能
系统 SHALL 支持亮/暗主题切换，默认跟随系统偏好，支持手动切换并持久化用户选择。

#### Scenario: 首次访问 - 跟随系统偏好（亮色）
- **GIVEN** 用户首次访问（无 localStorage 记录）
- **AND** 系统偏好为亮色模式
- **WHEN** 页面加载
- **THEN** 页面以亮色主题显示
- **AND** 主题切换按钮显示"暗色模式"图标

#### Scenario: 首次访问 - 跟随系统偏好（暗色）
- **GIVEN** 用户首次访问（无 localStorage 记录）
- **AND** 系统偏好为暗色模式
- **WHEN** 页面加载
- **THEN** 页面以暗色主题显示
- **AND** 主题切换按钮显示"亮色模式"图标

#### Scenario: 手动切换到暗色模式
- **GIVEN** 当前为亮色主题
- **WHEN** 用户点击主题切换按钮
- **THEN** 页面立即切换到暗色主题（无闪烁）
- **AND** 按钮图标变为"亮色模式"
- **AND** localStorage 保存 theme: 'dark'

#### Scenario: 手动切换到亮色模式
- **GIVEN** 当前为暗色主题
- **WHEN** 用户点击主题切换按钮
- **THEN** 页面立即切换到亮色主题（无闪烁）
- **AND** 按钮图标变为"暗色模式"
- **AND** localStorage 保存 theme: 'light'

#### Scenario: 刷新页面后恢复主题
- **GIVEN** 用户之前选择了暗色主题
- **AND** localStorage 中保存 theme: 'dark'
- **WHEN** 用户刷新页面
- **THEN** 页面以暗色主题显示（无闪烁）
- **AND** 无需等待 React hydration 后才切换

---

### Requirement: 主题切换技术实现
主题切换 SHALL 使用 Tailwind CSS 的 darkMode: 'class' 策略实现。

#### Scenario: HTML class 切换
- **GIVEN** 当前为亮色主题
- **WHEN** 用户点击切换到暗色
- **THEN** document.documentElement 添加 'dark' class
- **AND** 所有使用 dark: 前缀的 Tailwind 类生效

#### Scenario: 系统偏好变化
- **GIVEN** 用户未手动设置过主题（无 localStorage）
- **AND** 当前跟随系统亮色
- **WHEN** 系统切换到暗色模式
- **THEN** 页面自动切换到暗色主题

---

### Requirement: 边界情况处理
系统 SHALL 优雅处理主题切换的边界情况。

#### Scenario: localStorage 被禁用
- **GIVEN** 用户浏览器禁用了 localStorage
- **WHEN** 用户尝试切换主题
- **THEN** 主题切换功能正常工作
- **AND** 无报错（持久化失败静默处理）
- **AND** 页面刷新后恢复默认行为（跟随系统）

#### Scenario: 无效的主题值
- **GIVEN** localStorage 中存在无效的主题值（如 'blue'）
- **WHEN** 页面加载
- **THEN** 忽略无效值
- **AND** 使用默认行为（跟随系统偏好）

#### Scenario: SSR/服务端渲染
- **GIVEN** 页面使用 SSR 或静态生成
- **WHEN** HTML 首次送达
- **THEN** 页面默认显示亮色主题（避免闪变）
- **AND** 客户端 hydration 后根据 localStorage/系统偏好更新
