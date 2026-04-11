## Why

个人品牌站需要一个首屏 Hero Section 来建立第一印象，展示个人身份信息（姓名、职业、简介）并引导访客浏览项目。Hero Section 是网站的门面，需要具有视觉冲击力（科技感粒子背景）同时提供核心导航功能（CTA 按钮）。

## What Changes

- 创建全屏高度 Hero Section 组件（h-dvh）
- 居中展示个人信息：姓名、职业头衔、一句话简介
- CTA 按钮跳转到项目展示区
- 背景：CSS 渐变底层 + Canvas 粒子叠加层
- 实现亮/暗主题切换功能
- 支持响应式布局（移动端/桌面端）

## Capabilities

### New Capabilities
- `hero-section`: 首屏展示区域，包含个人信息展示、CTA 按钮、粒子背景
- `theme-toggle`: 亮/暗主题切换，支持手动切换和跟随系统偏好

### Modified Capabilities
<!-- 无现有功能需要修改 -->

## Impact

- **新增文件**:
  - `src/components/HeroSection.tsx` - Hero 主组件
  - `src/components/ParticleBackground.tsx` - Canvas 粒子背景
  - `src/components/ThemeToggle.tsx` - 主题切换按钮
  - `src/contexts/ThemeContext.tsx` - 主题状态管理
  - `src/hooks/useTheme.ts` - 主题 hook
- **修改文件**:
  - `src/App.tsx` - 引入 HeroSection
  - `tailwind.config.ts` - 配置 darkMode: 'class'
- **新增依赖**: 无（使用原生 Canvas API）

## Out of Scope

**严禁开发以下内容**：

- 任何形式的文字/按钮动画效果（入场动画、悬浮动画、打字机效果等）
- 导航栏组件
- 后端 API 调用
- 粒子背景的鼠标交互效果（仅需自动漂浮）
- 首屏以外的其他页面区域

## 现有功能影响评估

- 当前项目为全新创建，无现有功能需要兼容
- 主题切换将使用 Tailwind 的 `dark:` 前缀，不影响其他组件样式
- 粒子背景使用 fixed/absolute 定位，不影响页面滚动流
