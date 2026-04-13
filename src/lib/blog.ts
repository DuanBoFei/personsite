import matter from 'gray-matter';
import type { BlogPost, BlogPostMeta } from '../types/blog';

// 构建时动态导入所有 MDX 文件（Vite 特性）
const modules = import.meta.glob('/src/content/blog/*.mdx', {
  eager: true,
  as: 'raw'
}) as Record<string, string>;

/**
 * 从文件名提取 slug（移除日期前缀）
 * 例如: /src/content/blog/2024-04-12-hello-world.mdx -> hello-world
 * 例如: /src/content/blog/2026-04-13-测试.mdx -> 测试
 */
function extractSlugFromPath(path: string): string {
  const filename = path.replace('/src/content/blog/', '').replace(/\.mdx$/, '');
  // 移除日期前缀 (YYYY-MM-DD-)
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * 解析单个 MDX 文件，提取 frontmatter 和正文
 */
function parseMdxFile(path: string, fileContent: string): BlogPost | null {
  try {
    const { data, content: body } = matter(fileContent);

    // 验证必填字段
    if (!data.title || typeof data.title !== 'string') {
      console.warn(`[blog] 跳过文件 ${path}: 缺少 title 字段`);
      return null;
    }

    if (!data.date) {
      console.warn(`[blog] 跳过文件 ${path}: 缺少 date 字段`);
      return null;
    }

    // 解析日期
    const dateObj = new Date(data.date);
    if (isNaN(dateObj.getTime())) {
      console.warn(`[blog] 跳过文件 ${path}: 无效的 date 格式 "${data.date}"`);
      return null;
    }

    // 处理 tags（可能是数组或字符串）
    let tags: string[] = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags.filter((t): t is string => typeof t === 'string');
    } else if (typeof data.tags === 'string') {
      tags = [data.tags];
    }

    // 处理 excerpt（可选字段）
    const excerpt = data.excerpt || generateExcerpt(body, 200);

    const slug = extractSlugFromPath(path);

    return {
      slug,
      title: data.title,
      date: data.date,
      tags,
      excerpt,
      content: body
    };
  } catch (error) {
    console.warn(`[blog] 解析文件 ${path} 失败:`, error);
    return null;
  }
}

// 构建时生成文章列表
const posts: BlogPost[] = Object.entries(modules)
  .map(([path, content]) => parseMdxFile(path, content))
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

console.log(`[blog] 加载了 ${posts.length} 篇文章`);

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return posts.slice(0, count);
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
  const { data, content } = matter(fileContent);

  return {
    meta: {
      title: data.title || '',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || ''
    },
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
