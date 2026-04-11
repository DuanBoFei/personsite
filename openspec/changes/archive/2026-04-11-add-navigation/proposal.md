## Why

个人品牌站需要一个固定的顶部导航栏，让用户可以快速跳转到不同内容区域（首页、项目、联系我），提升用户体验和网站的可导航性。

## What Changes

- 创建固定在页面顶部的 Navigation 组件
- 左侧显示个人名字/Logo
- 右侧导航链接：首页、项目、联系我
- 点击导航链接平滑滚动到对应 section
- 导航栏滚动时添加背景模糊效果（backdrop-blur）
- 支持亮/暗主题适配
- 响应式布局：移动端适配

## Capabilities

### New Capabilities
- `navigation`: 顶部固定导航栏，包含 Logo/名字、导航链接、平滑滚动、背景模糊效果

### Modified Capabilities
<!-- 无现有功能需求变更，导航栏仅添加跳转链接到现有 section -->

## Impact

- **新增文件**:
  - `src/components/Navigation.tsx` - 导航栏组件
- **修改文件**:
  - `src/App.tsx` - 引入 Navigation 组件，添加"联系我"section
- **新增依赖**: 无

## Out of Scope

**严禁开发以下内容**：

- 搜索功能
- 多级下拉菜单
- 用户登录和注册系统
- 导航栏动画效果（按项目规则排除动画）

## 现有功能影响评估

- Hero Section 不受影响，导航栏仅添加跳转链接
- 主题切换功能与导航栏共享亮/暗模式
- 新增"联系我"section，使用现有样式体系
