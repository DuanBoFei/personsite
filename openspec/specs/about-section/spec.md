## ADDED Requirements

### Requirement: About Section 个人展示
About Section SHALL 展示个人照片和三段个人简介。

#### Scenario: 正常显示关于我区域
- **WHEN** 用户滚动到关于我区域
- **THEN** 页面显示左侧个人照片
- **AND** 右侧显示三段个人简介
- **AND** 三段简介内容清晰可读

#### Scenario: 个人照片加载
- **GIVEN** 关于我区域包含个人照片
- **WHEN** 页面加载
- **THEN** 照片使用懒加载优化
- **AND** 加载失败时显示占位图

#### Scenario: 照片占位图
- **GIVEN** 用户未提供个人照片
- **WHEN** 关于我区域渲染
- **THEN** 显示高质量占位图
- **AND** 提示用户可替换为真实照片

---

### Requirement: About Section 布局适配
About Section SHALL 支持桌面端和移动端的响应式布局。

#### Scenario: 桌面端布局
- **GIVEN** 视口宽度大于等于 768px
- **WHEN** 关于我区域渲染
- **THEN** 使用左右分栏布局（照片左，文字右）
- **AND** 照片占约 40% 宽度，文字占约 60% 宽度

#### Scenario: 移动端布局
- **GIVEN** 视口宽度小于 768px
- **WHEN** 关于我区域渲染
- **THEN** 使用垂直堆叠布局
- **AND** 照片在上，文字在下
- **AND** 照片最大宽度受限保持比例

---

### Requirement: About Section 主题适配
About Section SHALL 支持亮/暗主题切换。

#### Scenario: 亮色模式下的关于我
- **GIVEN** 当前主题为亮色
- **WHEN** 关于我区域渲染
- **THEN** 背景为白色或 gray-50
- **AND** 文字颜色为 gray-900（标题）和 gray-600（正文）
- **AND** 照片边框使用 gray-200

#### Scenario: 暗色模式下的关于我
- **GIVEN** 当前主题为暗色
- **WHEN** 关于我区域渲染
- **THEN** 背景为 gray-900
- **AND** 文字颜色为 gray-100（标题）和 gray-300（正文）
- **AND** 照片边框使用 gray-700

---

### Requirement: 个人简介内容
About Section SHALL 包含三段结构化的个人简介。

#### Scenario: 显示三段简介
- **WHEN** 关于我区域渲染
- **THEN** 显示第一段：个人背景经历
- **AND** 显示第二段：专业理念和方法
- **AND** 显示第三段：职业追求和目标

#### Scenario: 简介文字过长处理
- **GIVEN** 某段简介文字超过 200 字符
- **WHEN** 关于我区域渲染
- **THEN** 文字自动换行
- **AND** 不截断或隐藏内容
- **AND** 保持段落间距清晰可读
