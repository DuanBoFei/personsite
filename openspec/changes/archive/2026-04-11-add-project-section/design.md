## Context

当前项目中已存在 `id="projects"` 的占位 section，仅包含标题和简短描述。需要将其替换为功能完整的 ProjectSection 组件，展示至少 4 个实际项目的卡片布局。

项目卡片需要包含：
- 项目截图（使用懒加载优化性能）
- 项目名称
- 项目简介（技术栈、亮点）
- GitHub 链接（外部跳转）

## Goals / Non-Goals

**Goals:**
- 创建可复用的 ProjectCard 组件，支持卡片式项目展示
- 实现响应式网格布局（桌面端 2 列，移动端 1 列）
- 添加悬浮微特效（transform + shadow 过渡）
- 更新 Hero CTA 按钮锚点到新的 ProjectSection
- 支持亮/暗主题适配
- 所有图片使用 lazy loading

**Non-Goals:**
- 项目详情页跳转
- 搜索/筛选/排序功能
- 动态加载项目数据（使用静态配置）
- 复杂的 3D 或动画效果

## Decisions

### 1. 数据结构与配置方式
**决策**: 使用静态 TypeScript 数组定义项目数据  
**理由**: 
- 项目数据变更频率低，不需要后端接口
- TypeScript 提供类型安全和 IDE 自动补全
- 构建时静态生成，无运行时依赖

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  githubUrl: string;
  tags: string[]; // 技术栈标签
}
```

### 2. 卡片布局与样式
**决策**: 使用 CSS Grid + Tailwind 响应式类  
**理由**:
- `grid-cols-1 md:grid-cols-2` 实现响应式切换
- 卡片使用 `rounded-xl` + `overflow-hidden` 实现图片圆角
- 内部垂直布局：图片(上) + 内容(下)

### 3. 悬浮微特效实现
**决策**: 使用 Tailwind `hover:` 变体 + `transition`  
**理由**:
- `hover:-translate-y-1` - 卡片轻微上浮
- `hover:shadow-lg` / `dark:hover:shadow-indigo-500/20` - 阴影加深（暗色下带主题色）
- `transition-all duration-300` - 平滑过渡动画
- 无需引入 framer-motion 等库，保持轻量

### 4. 图片处理策略
**决策**: 使用 `loading="lazy"` + `object-cover`  
**理由**:
- 原生懒加载符合性能要求
- `aspect-video` 保持 16:9 比例，统一视觉
- 占位背景色避免布局抖动

### 5. Hero CTA 锚点修改
**决策**: 修改 `scrollToProjects` 函数，保持函数名不变，仅修改目标元素 ID  
**理由**:
- 最小化改动范围，保持向后兼容
- 函数语义不变（仍是"查看项目"）

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 项目截图资源 404 | 使用可靠的 CDN 或本地图片，添加 onError fallback |
| 暗色模式下图片对比度不足 | 添加 subtle border (`border-gray-700/30`) 区分卡片与背景 |
| 4 个项目导致 section 过长 | 卡片高度固定，使用 `max-w-5xl` 限制整体宽度 |
| GitHub 链接失效 | 使用用户自己的真实项目，build 前验证链接 |
