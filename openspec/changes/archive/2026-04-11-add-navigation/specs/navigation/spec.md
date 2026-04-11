## ADDED Requirements

### Requirement: 导航栏固定显示
Navigation 组件 SHALL 固定在页面顶部，始终可见。

#### Scenario: 页面加载时显示导航栏
- **WHEN** 用户访问页面
- **THEN** 导航栏固定在页面顶部
- **AND** 导航栏宽度占满屏幕

#### Scenario: 滚动页面时导航栏保持固定
- **GIVEN** 用户向下滚动页面
- **WHEN** 页面内容滚动
- **THEN** 导航栏保持在顶部固定位置
- **AND** 导航栏始终可见

---

### Requirement: 导航栏内容结构
导航栏 SHALL 包含左侧 Logo/名字和右侧导航链接。

#### Scenario: 导航栏显示 Logo
- **WHEN** 页面加载
- **THEN** 导航栏左侧显示"段博斐"
- **AND** 点击可滚动到页面顶部

#### Scenario: 导航栏显示导航链接
- **WHEN** 页面加载
- **THEN** 导航栏右侧显示三个链接：首页、项目、联系我

---

### Requirement: 导航链接平滑滚动
点击导航链接 SHALL 平滑滚动到对应 section。

#### Scenario: 点击"首页"链接
- **WHEN** 用户点击"首页"链接
- **THEN** 页面平滑滚动到顶部

#### Scenario: 点击"项目"链接
- **WHEN** 用户点击"项目"链接
- **THEN** 页面平滑滚动到 #projects section
- **AND** URL 更新为包含 #projects

#### Scenario: 点击"联系我"链接
- **WHEN** 用户点击"联系我"链接
- **THEN** 页面平滑滚动到 #contact section
- **AND** URL 更新为包含 #contact

---

### Requirement: 导航栏背景模糊效果
导航栏 SHALL 在滚动时显示背景模糊效果。

#### Scenario: 滚动时显示背景模糊
- **GIVEN** 页面有内容可滚动
- **WHEN** 用户向下滚动页面
- **THEN** 导航栏背景显示 backdrop-blur 效果
- **AND** 背景具有半透明效果

#### Scenario: 亮色模式下的背景
- **GIVEN** 当前主题为亮色
- **WHEN** 导航栏显示
- **THEN** 背景为半透明白色 (bg-white/80)
- **AND** 应用 backdrop-blur-md 效果

#### Scenario: 暗色模式下的背景
- **GIVEN** 当前主题为暗色
- **WHEN** 导航栏显示
- **THEN** 背景为半透明深灰 (bg-gray-900/80)
- **AND** 应用 backdrop-blur-md 效果

---

### Requirement: 当前链接高亮
当前可见 section 对应的导航链接 SHALL 高亮显示。

#### Scenario: Hero Section 可见时高亮"首页"
- **GIVEN** Hero Section 在当前视口
- **WHEN** 页面显示
- **THEN** "首页"链接显示高亮样式

#### Scenario: Projects Section 可见时高亮"项目"
- **GIVEN** Projects Section 在当前视口
- **WHEN** 用户滚动到项目区域
- **THEN** "项目"链接显示高亮样式
- **AND** "首页"链接取消高亮

---

### Requirement: 响应式布局
导航栏 SHALL 适配移动端和桌面端。

#### Scenario: 桌面端显示
- **GIVEN** 视口宽度大于等于 768px
- **WHEN** 页面加载
- **THEN** 导航链接水平排列
- **AND** 链接间距充足

#### Scenario: 移动端显示
- **GIVEN** 视口宽度小于 768px
- **WHEN** 页面加载
- **THEN** 导航链接保持水平排列
- **AND** 文字大小适配移动端

---

### Requirement: 主题适配
导航栏 SHALL 支持亮/暗主题切换。

#### Scenario: 亮色模式下的导航栏
- **GIVEN** 当前主题为亮色
- **WHEN** 导航栏显示
- **THEN** 文字颜色为深灰色
- **AND** 背景为半透明白色

#### Scenario: 暗色模式下的导航栏
- **GIVEN** 当前主题为暗色
- **WHEN** 导航栏显示
- **THEN** 文字颜色为浅灰色
- **AND** 背景为半透明深灰

#### Scenario: 主题切换时导航栏同步
- **GIVEN** 用户切换主题
- **WHEN** 主题切换完成
- **THEN** 导航栏颜色同步更新
- **AND** 无闪烁或延迟
