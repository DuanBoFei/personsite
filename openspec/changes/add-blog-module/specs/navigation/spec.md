## MODIFIED Requirements

### Requirement: 导航栏显示导航链接
导航栏 SHALL 包含左侧 Logo/名字和右侧导航链接。

#### Scenario: 导航栏显示导航链接
- **WHEN** 页面加载
- **THEN** 导航栏右侧显示四个链接：首页、项目、博客、联系我

---

### Requirement: 导航链接平滑滚动
点击导航链接 SHALL 平滑滚动到对应 section。

#### Scenario: 点击"博客"链接
- **WHEN** 用户点击"博客"链接
- **THEN** 页面平滑滚动到 #blog section
- **AND** URL 更新为包含 #blog

---

### Requirement: 当前链接高亮
当前可见 section 对应的导航链接 SHALL 高亮显示。

#### Scenario: Blog Section 可见时高亮"博客"
- **GIVEN** Blog Section 在当前视口
- **WHEN** 用户滚动到博客区域
- **THEN** "博客"链接显示高亮样式
- **AND** "项目"链接取消高亮
