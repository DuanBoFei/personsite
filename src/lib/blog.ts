import type { BlogPost, BlogPostMeta } from '../types/blog';

// 示例文章数据（实际项目中可以通过 import.meta.glob 加载 MDX 文件）
const posts: BlogPost[] = [
  {
    slug: 'ce-shi',
    title: '测试',
    date: '2026-04-13',
    tags: ['测试1'],
    excerpt: '这是一次测试',
    content: `
## 代码示例

\`\`\`tsx
function App() {
   return <h1>Hello World</h1>
}
\`\`\`
    `.trim()
  },
  {
    slug: 'hello-world',
    title: 'Hello World - 开启我的博客之旅',
    date: '2024-04-12',
    tags: ['随笔', '开始'],
    excerpt: '这是我的第一篇博客文章，欢迎来到我的个人博客。',
    content: `
# Hello World

欢迎来到我的博客！这里将记录我的技术学习、项目经验和生活感悟。

## 关于这个博客

使用 React + Vite + Tailwind CSS 构建，支持亮/暗模式切换。

## 代码示例

\`\`\`tsx
function Welcome() {
  return <h1>欢迎来到我的博客</h1>;
}
\`\`\`

期待与你的交流！
    `.trim()
  },
  {
    slug: 'react-tips',
    title: 'React 开发技巧分享',
    date: '2024-04-10',
    tags: ['React', '前端'],
    excerpt: '分享一些在日常开发中常用的 React 技巧和最佳实践。',
    content: `
# React 开发技巧

## 1. 使用自定义 Hook 复用逻辑

\`\`\`tsx
function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
\`\`\`

## 2. 性能优化

使用 React.memo 和 useMemo 避免不必要的重渲染。
    `.trim()
  },
  {
    slug: 'vite-guide',
    title: 'Vite 构建工具入门指南',
    date: '2024-04-08',
    tags: ['Vite', '构建工具', '前端工程化'],
    excerpt: 'Vite 是下一代前端构建工具，本文介绍其核心特性和使用方法。',
    content: `
# Vite 构建工具入门指南

## 什么是 Vite？

Vite（法语意为"快速"）是一种新型前端构建工具，能够显著提升前端开发体验。

## 核心特性

### 1. 极速的冷启动

Vite 使用原生 ES 模块，无需打包即可启动开发服务器。

### 2. 即时的热模块替换 (HMR)

Vite 提供快速的 HMR，无论应用大小如何，更新都是即时的。

### 3. 优化的构建

生产构建使用 Rollup，输出高度优化的静态资源。

## 总结

Vite 让前端开发变得更加高效和愉悦。
    `.trim()
  }
];

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = posts.find(post => post.slug === slug);
  return post || null;
}

// 生成文章摘要（如果 excerpt 为空，从 content 截取）
export function generateExcerpt(content: string, maxLength: number = 200): string {
  // 移除 Markdown 标记
  const plainText = content
    .replace(/#+ /g, '') // 移除标题标记
    .replace(/\*\*/g, '') // 移除粗体标记
    .replace(/\*/g, '') // 移除斜体标记
    .replace(/`{3}[\s\S]*?`{3}/g, '') // 移除代码块
    .replace(/`([^`]+)`/g, '$1') // 移除行内代码标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 将链接转换为文本
    .replace(/\n+/g, ' ') // 将换行转换为空格
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // 截取到最大长度，并在单词边界处截断
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  const result = lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated;

  return result + '...';
}

export function parseFrontmatter(fileContent: string): { meta: BlogPostMeta; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatter, content] = match;
  const meta: Partial<BlogPostMeta> = {};

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      if (key === 'tags') {
        meta.tags = JSON.parse(value.replace(/'/g, '"'));
      } else {
        (meta as Record<string, string>)[key.trim()] = value;
      }
    }
  });

  return {
    meta: meta as BlogPostMeta,
    content: content.trim()
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
