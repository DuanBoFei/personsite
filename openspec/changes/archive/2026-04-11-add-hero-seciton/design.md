## Context

个人品牌站需要一个视觉冲击力强的首屏 Hero Section。技术栈为 React 19 + Vite 7 + TypeScript + Tailwind CSS v4。设计风格要求科技感、动态粒子风，并支持亮/暗主题切换。

## Goals / Non-Goals

**Goals:**
- 实现全屏 Hero Section，展示个人品牌和引导 CTA
- 创建高性能 Canvas 粒子背景（60fps）
- 实现无缝的亮/暗主题切换体验
- 确保首屏加载 < 2 秒

**Non-Goals:**
- 动画效果（按 proposal 要求排除）
- 导航栏组件
- 首屏以外的区域
- 鼠标与粒子的交互效果

## Decisions

### 1. 粒子背景：Canvas 2D vs CSS vs WebGL
**选择：Canvas 2D**

**理由：**
- CSS 动画虽然性能最好，但无法实现粒子连线效果
- WebGL 过于复杂，增加 bundle 体积和移动端兼容性问题
- Canvas 2D 在 Vite + React 环境中性能足够，可控性强

**实现要点：**
```
粒子系统架构：
- Particle 类：位置 (x, y)、速度 (vx, vy)、半径
- 连线逻辑：距离 < threshold 时绘制连线
- 动画循环：requestAnimationFrame
- 性能优化：visibilitychange 时暂停动画
```

### 2. 主题切换方案：Tailwind darkMode 'class' vs CSS 变量
**选择：Tailwind darkMode 'class'**

**理由：**
- 与 Tailwind 的 `dark:` 前缀完美集成
- 切换时无闪烁，样式同步更新
- 实现简单，只需在 html 元素上切换 class

**实现要点：**
```
主题优先级：localStorage > prefers-color-scheme > 默认亮色
toggle 实现：document.documentElement.classList.toggle('dark')
状态持久化：localStorage.setItem('theme', 'dark' | 'light')
```

### 3. 全屏高度：vh vs dvh vs svh
**选择：dvh (dynamic viewport height)**

**理由：**
- vh 在移动端会被地址栏遮挡
- dvh 动态适应地址栏显示/隐藏
- 现代浏览器支持良好

### 4. 主题配色方案

**亮色模式：**
```
背景渐变：from-blue-50 via-indigo-50 to-purple-50
粒子颜色：rgba(99, 102, 241, 0.3)  // indigo
文字颜色：gray-900
```

**暗色模式：**
```
背景渐变：from-gray-900 via-indigo-950 to-purple-950
粒子颜色：rgba(99, 102, 241, 0.5)
文字颜色：gray-100
```

### 5. 组件分层结构

```
HeroSection (h-dvh, relative)
├── ParticleBackground (absolute, inset-0, z-0)
│   └── Canvas (渐变背景 + 粒子绘制)
└── Content (relative, z-10)
    ├── 姓名标题 (text-4xl md:text-6xl)
    ├── 职业头衔 (text-xl md:text-2xl)
    ├── 简介文字 (text-base, max-w-lg)
    └── CTA 按钮 (primary button)
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Canvas 在低配设备上卡顿 | 检测 prefers-reduced-motion，降级为纯 CSS 渐变背景 |
| SSR 时 Canvas 无法渲染 | 使用 useEffect + useState，服务端显示占位背景 |
| 主题切换闪烁 | 在 HTML 标签上直接操作 class，避免 React 渲染延迟 |
| 移动端粒子数量过多 | 根据屏幕尺寸动态调整粒子数量（移动端减少 50%） |
| Tab 后台运行消耗电量 | visibilitychange 事件暂停/恢复动画循环 |

## 性能预算

- Canvas 粒子数量：桌面 60 个，移动端 30 个
- 连线距离阈值：100px（减少绘制次数）
- 动画帧率：使用 requestAnimationFrame，不设置固定帧率
- 首屏加载：CSS 渐变立即显示，Canvas 异步初始化

## 文件结构

```
src/
├── components/
│   ├── HeroSection.tsx       # Hero 主组件
│   ├── ParticleBackground.tsx # Canvas 粒子背景
│   └── ThemeToggle.tsx       # 主题切换按钮
├── contexts/
│   └── ThemeContext.tsx      # 主题状态管理
├── hooks/
│   └── useTheme.ts           # 主题 hook
└── types/
    └── theme.ts              # Theme 类型定义
```
