## Phase 1: 数据与类型定义

- [x] 1.1 创建 Project 类型定义（id, name, description, image, githubUrl, tags）
- [x] 1.2 创建项目数据配置文件，包含至少 4 个项目

**Phase 1 已完成 ✓**

## Phase 2: ProjectCard 组件

- [x] 2.1 创建 ProjectCard 组件基础结构和 Props 类型
- [x] 2.2 实现卡片布局：图片区域（16:9比例）+ 内容区域
- [x] 2.3 实现项目信息展示：名称、描述、技术标签、GitHub链接
- [x] 2.4 实现悬浮微特效（上浮 + 阴影加深 + 过渡动画）
- [x] 2.5 实现亮/暗主题适配（卡片背景、文字颜色、阴影）
- [x] 2.6 添加图片懒加载和错误处理

**Phase 2 已完成 ✓**

## Phase 3: ProjectSection 组件

- [x] 3.1 创建 ProjectSection 组件基础结构
- [x] 3.2 实现响应式网格布局（grid-cols-1 md:grid-cols-2）
- [x] 3.3 导入项目数据并渲染 ProjectCard 列表
- [x] 3.4 添加 Section 标题和描述
- [x] 3.5 实现亮/暗主题下的 Section 背景色

**Phase 3 已完成 ✓**

## Phase 4: 集成与修改

- [x] 4.1 更新 App.tsx，用 ProjectSection 替换现有占位 section
- [x] 4.2 修改 HeroSection.tsx 中 CTA 按钮的 scrollToProjects 函数
- [x] 4.3 验证导航栏链接到 #projects 的平滑滚动
- [x] 4.4 添加空状态处理（项目数据为空时的友好提示）

**Phase 4 已完成 ✓**

## Phase 5: 验证与测试

- [x] 5.1 验证亮/暗主题切换时卡片样式正确变化
- [x] 5.2 验证桌面端 2 列布局和移动端单列布局
- [x] 5.3 验证鼠标悬浮微特效正常工作
- [x] 5.4 验证 GitHub 链接在新标签页打开
- [x] 5.5 验证图片懒加载生效

**Phase 5 已完成 ✓**

---

## 实现完成总结

### 新增文件
- `src/data/projects.ts` - 项目数据配置（4个项目）
- `src/components/ProjectCard.tsx` - 项目卡片组件
- `src/components/ProjectSection.tsx` - 项目展示区组件

### 修改文件
- `src/App.tsx` - 引入 ProjectSection，替换占位 section

### 特性实现
- ✅ 卡片式布局，桌面 2 列/移动端 1 列
- ✅ 悬浮微特效（translateY + shadow 过渡）
- ✅ 亮/暗主题适配
- ✅ 图片懒加载 + 错误处理
- ✅ 空状态提示
- ✅ GitHub 链接新标签页打开
- ✅ Hero CTA 锚点保持兼容（id="projects"）
