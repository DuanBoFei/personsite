# project-section Specification

## Purpose
TBD - created by archiving change add-project-section. Update Purpose after archive.
## Requirements
### Requirement: Project Section 项目展示
Project Section SHALL 展示至少 4 个项目的卡片式布局，每个卡片包含项目截图、名称、简介和 GitHub 链接。

#### Scenario: 正常显示项目卡片
- **WHEN** 用户滚动到项目展示区
- **THEN** 页面显示至少 4 个项目卡片
- **AND** 每个卡片包含项目截图、名称、简介、GitHub 链接
- **AND** 卡片使用网格布局（桌面 2 列，移动端 1 列）

#### Scenario: 项目截图懒加载
- **GIVEN** 页面包含多个项目卡片
- **WHEN** 用户滚动到可视区域
- **THEN** 项目截图使用 lazy loading 加载
- **AND** 加载前显示占位背景色

#### Scenario: GitHub 链接跳转
- **GIVEN** 项目卡片显示在页面
- **WHEN** 用户点击 GitHub 链接
- **THEN** 在新标签页打开 GitHub 仓库
- **AND** 当前页面保持不刷新

#### Scenario: 空数据处理
- **GIVEN** 项目数据数组为空
- **WHEN** 页面渲染项目展示区
- **THEN** 显示友好的空状态提示
- **AND** 不抛出错误或显示空白

---

### Requirement: 项目卡片悬浮效果
项目卡片 SHALL 在鼠标悬浮时显示微动画效果。

#### Scenario: 鼠标悬浮卡片
- **GIVEN** 项目卡片显示在页面
- **WHEN** 用户鼠标悬浮到卡片上
- **THEN** 卡片轻微上浮 (translateY -4px)
- **AND** 阴影加深（亮色模式 shadow-lg，暗色模式带主题色阴影）
- **AND** 过渡动画时长 300ms，使用 ease-out

#### Scenario: 鼠标移出卡片
- **GIVEN** 用户鼠标悬浮在卡片上
- **WHEN** 用户鼠标移出卡片
- **THEN** 卡片平滑恢复到原始状态
- **AND** 过渡动画时长 300ms

#### Scenario: 触摸设备适配
- **GIVEN** 设备为触摸设备（无鼠标）
- **WHEN** 用户查看项目卡片
- **THEN** 不显示悬浮效果
- **AND** 卡片保持静态样式

---

### Requirement: Project Section 主题适配
Project Section SHALL 支持亮/暗主题切换。

#### Scenario: 亮色模式下的卡片
- **GIVEN** 当前主题为亮色
- **WHEN** 项目展示区渲染
- **THEN** 卡片背景为白色或 gray-50
- **AND** 文字颜色为 gray-900（标题）和 gray-600（描述）
- **AND** 阴影使用标准 shadow-md/shadow-lg

#### Scenario: 暗色模式下的卡片
- **GIVEN** 当前主题为暗色
- **WHEN** 项目展示区渲染
- **THEN** 卡片背景为 gray-800
- **AND** 文字颜色为 gray-100（标题）和 gray-300（描述）
- **AND** 阴影使用带主题色的半透明阴影

---

### Requirement: Project Section 响应式布局
Project Section SHALL 适配桌面端和移动端屏幕。

#### Scenario: 桌面端布局
- **GIVEN** 视口宽度大于等于 768px
- **WHEN** 项目展示区渲染
- **THEN** 使用 2 列网格布局
- **AND** 卡片间距为 gap-6

#### Scenario: 移动端布局
- **GIVEN** 视口宽度小于 768px
- **WHEN** 项目展示区渲染
- **THEN** 使用单列布局
- **AND** 卡片水平内边距与页面一致

---

### Requirement: 项目数据结构
项目数据 SHALL 使用类型化的静态配置。

#### Scenario: 数据类型定义
- **WHEN** 查看项目数据结构
- **THEN** 每个项目包含 id、name、description、image、githubUrl、tags 字段
- **AND** 所有字段为必填
- **AND** TypeScript 类型定义完整

#### Scenario: 最少项目数量
- **WHEN** 页面加载完成
- **THEN** 项目展示区至少显示 4 个项目
- **AND** 项目数据在构建时静态确定

