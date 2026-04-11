## MODIFIED Requirements

### Requirement: Hero Section 展示个人信息
Hero Section SHALL 全屏显示，居中展示用户的姓名、职业头衔和一句话简介，CTA 按钮 SHALL 滚动到功能完整的项目展示区。

#### Scenario: CTA 按钮跳转到新 Project Section
- **WHEN** 用户点击"查看项目"按钮
- **THEN** 页面平滑滚动到新 Project Section（功能完整的项目展示区）
- **AND** URL 更新为包含 #projects 锚点

#### Scenario: Project Section 未渲染时的降级
- **GIVEN** Project Section 尚未渲染或不存在
- **WHEN** 用户点击"查看项目"按钮
- **THEN** 不执行滚动操作或平滑降级
- **AND** 控制台不抛出错误
