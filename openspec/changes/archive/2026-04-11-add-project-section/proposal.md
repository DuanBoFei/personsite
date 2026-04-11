## Why

个人品牌站需要展示实际项目作品来体现技术能力和专业水平。当前 projects section 仅为占位内容，需要替换为功能完整的项目展示区域，包含真实项目信息、视觉截图和外部链接，让访客能够直观了解开发者的技术栈和项目经验。

## What Changes

- **新增 ProjectSection 组件**: 创建卡片式布局的项目展示区，包含项目截图、名称、简介和 GitHub 链接
- **项目数据配置**: 定义至少 4 个项目的结构化数据（名称、描述、截图URL、GitHub链接）
- **悬浮微特效**: 实现鼠标悬浮时的微动画效果（卡片抬升、阴影加深）
- **修改 Hero CTA 锚点**: 将 Hero Section "查看项目" 按钮的滚动目标从占位 section 更新到新的 ProjectSection
- **响应式布局**: 支持桌面端网格布局和移动端单列布局

## Capabilities

### New Capabilities
- `project-section`: 项目展示区组件，包含项目卡片渲染、数据管理和悬浮交互效果

### Modified Capabilities
- `hero-section`: 修改 CTA 按钮的滚动锚点目标，从原占位 section 指向新的项目展示区

## Impact

- **App.tsx**: 引入 ProjectSection 组件替换现有占位 section
- **HeroSection.tsx**: 修改 `scrollToProjects` 函数指向正确的 section id
- **新增文件**:
  - `src/components/ProjectSection.tsx`
  - `src/data/projects.ts` (项目数据配置)
- **主题适配**: ProjectSection 需支持亮/暗主题切换

## Out of Scope

- 项目详情页（点击卡片不跳转到详情页）
- 项目搜索/筛选功能
- 项目分类/标签过滤
- 分页或无限滚动
- 项目排序功能
