## Context

个人品牌站已完成 Hero Section 和主题切换功能。现在需要添加顶部导航栏，让用户可以快速跳转到不同内容区域。

## Goals / Non-Goals

**Goals:**
- 实现固定在页面顶部的导航栏
- 导航栏包含 Logo/名字和导航链接（首页、项目、联系我）
- 点击导航链接平滑滚动到对应 section
- 滚动时添加背景模糊效果
- 支持亮/暗主题适配
- 响应式布局适配移动端

**Non-Goals:**
- 搜索功能
- 多级下拉菜单
- 用户登录注册
- 导航栏动画效果

## Decisions

### 1. 固定导航栏实现方案
**选择：fixed 定位 + z-50**

**理由：**
- 导航栏需要始终可见，fixed 定位最符合需求
- z-50 确保导航栏在最上层
- 配合 `top-0 left-0 right-0` 实现全宽固定

### 2. 平滑滚动实现
**选择：CSS scroll-behavior: smooth + scrollIntoView**

**理由：**
- CSS `scroll-behavior: smooth` 已在 index.css 中全局设置
- 导航链接使用锚点 `#section-id`
- 点击时使用 `scrollIntoView({ behavior: 'smooth' })` 作为兜底

### 3. 背景模糊效果
**选择：Tailwind backdrop-blur + bg-opacity**

**理由：**
- Tailwind v4 支持 `backdrop-blur-md` 等类
- 配合 `bg-white/80` 或 `bg-gray-900/80` 实现半透明背景
- 暗色模式使用 `dark:bg-gray-900/80 dark:backdrop-blur-md`

### 4. 响应式布局
**选择：移动端汉堡菜单或简化显示**

**理由：**
- 桌面端：水平排列导航链接
- 移动端：可考虑汉堡菜单或保持水平但简化
- 当前需求只有 3 个链接，水平排列在移动端也可行

### 5. 当前活跃链接指示
**选择：滚动监听 + 高亮当前 section 对应链接**

**理由：**
- 使用 Intersection Observer API 监听 section 可见性
- 当前 section 对应的导航链接高亮显示
- 提升用户体验，明确当前位置

## 文件结构

```
src/
└── components/
    └── Navigation.tsx       # 导航栏组件
```

## 组件结构

```
Navigation (fixed, top-0, z-50, w-full)
├── Container (max-w-7xl, mx-auto, px-4)
│   ├── Left: Logo/Name
│   └── Right: Nav Links
│       ├── 首页 → #hero
│       ├── 项目 → #projects
│       └── 联系我 → #contact
```

## 样式规范

**亮色模式：**
```
背景：bg-white/80 backdrop-blur-md
文字：text-gray-900
链接悬停：text-indigo-600
当前链接：text-indigo-600 font-medium
```

**暗色模式：**
```
背景：dark:bg-gray-900/80 dark:backdrop-blur-md
文字：dark:text-gray-100
链接悬停：dark:text-indigo-400
当前链接：dark:text-indigo-400 font-medium
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 固定导航栏遮挡内容 | 给 Hero Section 添加足够的 padding-top 或使用 `scroll-margin-top` |
| 滚动监听性能 | 使用 Intersection Observer（高性能）而非 scroll 事件 |
| 移动端链接过多换行 | 保持链接简洁，或使用汉堡菜单（当前 3 个链接可水平排列） |
| 主题切换时导航栏样式不同步 | 使用 Tailwind dark: 前缀，与全局主题一致 |

## Section ID 映射

| 导航文本 | 目标 Section ID | 说明 |
|---------|----------------|------|
| 首页 | #hero 或顶部 | 滚动到页面顶部 |
| 项目 | #projects | 现有 projects section |
| 联系我 | #contact | 新增 contact section |
