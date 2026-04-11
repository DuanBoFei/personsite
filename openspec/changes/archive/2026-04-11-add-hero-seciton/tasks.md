## Phase 1: 基础配置

- [x] 1.1 配置 Tailwind darkMode: 'class'
- [x] 1.2 创建 ThemeContext 基础结构
- [x] 1.3 创建 useTheme hook

**Phase 1 已完成 ✓**

## Phase 2: 主题切换功能

- [x] 2.1 实现 ThemeProvider 初始化逻辑（localStorage + 系统偏好）
- [x] 2.2 实现 toggleTheme 函数
- [x] 2.3 创建 ThemeToggle 组件（按钮 + 图标）
- [x] 2.4 处理 localStorage 禁用边界情况

**Phase 2 完成后等待确认**

## Phase 3: Canvas 粒子背景

- [x] 3.1 创建 Particle 类（位置、速度、半径、更新、绘制）
- [x] 3.2 创建 ParticleBackground 组件基础结构
- [x] 3.3 实现粒子动画循环（requestAnimationFrame）
- [x] 3.4 实现粒子连线逻辑
- [x] 3.5 响应式粒子数量（桌面 60，移动端 30）
- [x] 3.6 监听 resize 事件重计算 Canvas 尺寸
- [x] 3.7 Tab 可见性变化暂停/恢复动画
- [x] 3.8 prefers-reduced-motion 降级为纯 CSS 渐变

**Phase 3 已完成 ✓**

## Phase 4: Hero Section 组件

- [x] 4.1 创建 HeroSection 组件基础布局（h-dvh, flex, 居中）
- [x] 4.2 添加姓名标题（响应式文字大小）
- [x] 4.3 添加职业头衔
- [x] 4.4 添加简介文字（max-w-lg）
- [x] 4.5 添加 CTA 按钮（跳转到 #projects）
- [x] 4.6 整合 ParticleBackground 作为背景
- [x] 4.7 亮色/暗色主题下的文字颜色适配

**Phase 4 已完成 ✓**

## Phase 5: 集成与完善

- [x] 5.1 在 App.tsx 中引入 HeroSection 和 ThemeToggle
- [x] 5.2 确保首屏渐变背景立即显示（Canvas 异步加载）
- [x] 5.3 验证 SSR/静态生成时无闪烁
- [x] 5.4 移动端适配测试
- [x] 5.5 性能测试（首屏加载 < 2 秒）
