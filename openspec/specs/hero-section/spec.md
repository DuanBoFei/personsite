# hero-section Specification

## Purpose
TBD - created by archiving change add-hero-seciton. Update Purpose after archive.
## Requirements
### Requirement: Hero Section 展示个人信息
Hero Section SHALL 全屏显示，居中展示用户的姓名、职业头衔和一句话简介，CTA 按钮 SHALL 滚动到功能完整的项目展示区。

#### Scenario: CTA 按钮跳转到新 Project Section
- **WHEN** 用户点击"查看项目"按钮
- **THEN** 页面平滑滚动到新 Project Section（功能完整的项目展示区）
- **AND** URL 更新为包含 #projects 锚点

#### Scenario: Project Section 未渲染时的降级
- **GIVEN** Project Section 尚未渲染或不存在
- **WHEN** 用户点击"查看项目"按钮
- **THEN** 不执行滚动操作或平滑降级
- **AND** 控制台不抛出错误

### Requirement: Hero Section 背景
Hero Section SHALL 使用 CSS 渐变底层叠加 Canvas 粒子背景。

#### Scenario: 正常显示背景
- **WHEN** 页面加载
- **THEN** 背景显示渐变色（根据当前主题）
- **AND** Canvas 粒子在渐变层之上渲染

#### Scenario: 亮色主题背景
- **GIVEN** 当前主题为亮色
- **WHEN** 页面加载
- **THEN** 背景渐变从 blue-50 via indigo-50 to purple-50
- **AND** 粒子颜色为半透明 indigo

#### Scenario: 暗色主题背景
- **GIVEN** 当前主题为暗色
- **WHEN** 页面加载
- **THEN** 背景渐变从 gray-900 via indigo-950 to purple-950
- **AND** 粒子颜色为更亮的半透明 indigo

#### Scenario: 禁用动画偏好
- **GIVEN** 用户设置了 prefers-reduced-motion
- **WHEN** 页面加载
- **THEN** 不渲染 Canvas 粒子动画
- **AND** 仅显示 CSS 渐变背景

#### Scenario: Canvas 初始化失败
- **GIVEN** Canvas 初始化失败（如浏览器不支持）
- **WHEN** 页面加载
- **THEN** 降级为仅显示 CSS 渐变背景
- **AND** 页面其他功能正常可用

---

### Requirement: 性能与可访问性
Hero Section SHALL 满足性能要求并支持可访问性。

#### Scenario: 首屏加载性能
- **WHEN** 页面首次加载
- **THEN** 首屏内容在 2 秒内可见
- **AND** 渐变背景立即显示（不等待 Canvas）

#### Scenario: Tab 切换暂停动画
- **GIVEN** 页面正在运行动画
- **WHEN** 用户切换到其他 Tab
- **THEN** Canvas 动画暂停以节省资源
- **AND** 用户返回 Tab 时动画恢复

#### Scenario: 窗口大小变化
- **GIVEN** 页面已加载
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Canvas 自动重新计算尺寸
- **AND** 粒子位置正确适配新尺寸

