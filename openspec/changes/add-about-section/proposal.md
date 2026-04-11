## Why

个人品牌站需要一个专门的区域来展示更详细的个人背景信息，让访客能够深入了解我的经历、理念和职业追求。"关于我"区域将作为 Hero Section 的延伸，通过照片和个人简介建立更深层的连接。

## What Changes

- **新增 AboutSection 组件**: 创建左右布局的"关于我"展示区域
- **左侧个人照片**: 展示个人形象照片，使用圆角或特殊形状裁剪
- **右侧个人简介**: 三段文字介绍个人背景、专业理念和职业追求
- **响应式布局**: 桌面端左右布局，移动端上下堆叠布局
- **主题适配**: 支持亮/暗主题切换
- **响应式布局**: 桌面端左右布局，移动端上下堆叠布局

## Capabilities

### New Capabilities
- `about-section`: "关于我"展示区域，包含照片和个人简介

### Modified Capabilities
- (无现有能力需要修改)

## Impact

- **App.tsx**: 引入 AboutSection 组件，放置在 HeroSection 和 ProjectSection 之间
- **新增文件**:
  - `src/components/AboutSection.tsx`
- **图片资源**: 需要添加个人照片到 `public/` 或 `src/assets/` 目录
- **主题适配**: AboutSection 需支持亮/暗主题切换

## Out of Scope

- 联系表单功能
- 动态编辑个人简介
- 社交媒体链接列表
- 时间线/履历展示
- 技能进度条/图表
