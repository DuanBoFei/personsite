## ADDED Requirements

### Requirement: 构建时扫描 MDX 文件
系统 SHALL 在构建时使用 Vite 的 `import.meta.glob` 扫描 `src/content/blog/` 目录下的所有 `.mdx` 文件。

#### Scenario: 构建时发现所有 MDX 文件
- **GIVEN** `src/content/blog/` 目录下有 3 个 MDX 文件
- **WHEN** 执行 Vite 构建
- **THEN** 系统扫描并加载所有 3 个文件
- **AND** 不遗漏任何文件

#### Scenario: 新增 MDX 文件后重新构建
- **GIVEN** 已构建一次后新增 1 个 MDX 文件
- **WHEN** 重新执行 Vite 构建
- **THEN** 新文件被包含在构建输出中
- **AND** 网站显示新增的文章

#### Scenario: 目录为空时
- **GIVEN** `src/content/blog/` 目录为空
- **WHEN** 执行 Vite 构建
- **THEN** 系统返回空数组
- **AND** 不抛出错误

---

### Requirement: 文件名提取 slug
系统 SHALL 从 MDX 文件名提取 URL slug，移除日期前缀（如 `YYYY-MM-DD-`）。

#### Scenario: 标准文件名
- **GIVEN** 文件名为 `2024-04-12-hello-world.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `hello-world`

#### Scenario: 中文文件名
- **GIVEN** 文件名为 `2026-04-13-测试.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `测试`
- **AND** 保持中文可读性

#### Scenario: 文件名无日期前缀
- **GIVEN** 文件名为 `my-article.mdx`
- **WHEN** 解析文件名
- **THEN** 生成的 slug 为 `my-article`
- **AND** 不报错
