## ADDED Requirements

### Requirement: frontmatter 解析
系统 SHALL 使用 gray-matter 解析每个 MDX 文件的 frontmatter，提取 title, date, tags, excerpt。

#### Scenario: 完整的 frontmatter
- **GIVEN** MDX 文件包含完整的 YAML frontmatter
- **WHEN** 解析文件
- **THEN** 正确提取 title, date, tags, excerpt
- **AND** 提取正文内容（不含 frontmatter）

#### Scenario: 缺少可选字段
- **GIVEN** MDX 文件缺少 excerpt 字段
- **WHEN** 解析文件
- **THEN** excerpt 设为空字符串或从正文截取
- **AND** 不报错

#### Scenario: 缺少必填字段
- **GIVEN** MDX 文件缺少 title 或 date
- **WHEN** 解析文件
- **THEN** 跳过该文件并记录警告
- **AND** 继续处理其他文件

#### Scenario: 日期格式无效
- **GIVEN** date 字段为无效格式
- **WHEN** 解析文件
- **THEN** 尝试解析为 Date 对象
- **AND** 失败时跳过该文件

---

### Requirement: 数据转换为 BlogPost 类型
系统 SHALL 将解析后的数据转换为 BlogPost 类型，保持与原有接口兼容。

#### Scenario: 正常转换
- **GIVEN** 成功解析的 MDX 数据
- **WHEN** 转换为 BlogPost
- **THEN** 所有字段符合 BlogPost 类型定义
- **AND** content 字段为 Markdown 字符串

#### Scenario: tags 字段处理
- **GIVEN** frontmatter 中 tags 为字符串或数组
- **WHEN** 转换数据
- **THEN** 统一转换为字符串数组
- **AND** 空值转为空数组
