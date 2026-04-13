import type { BlogPost, BlogPostMeta } from '../types/blog';
// @ts-expect-error 虚拟模块
import { posts } from 'virtual:blog-posts';

const typedPosts: BlogPost[] = posts;

console.log(`[blog] 加载了 ${typedPosts.length} 篇文章`);

export function getAllPosts(): BlogPost[] {
  return typedPosts;
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return typedPosts.slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = typedPosts.find(post => post.slug === slug);
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
  // 简单的 frontmatter 解析
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return {
      meta: { title: '', date: '', tags: [], excerpt: '' },
      content: fileContent
    };
  }

  const [, frontmatter, content] = match;
  const meta: Partial<BlogPostMeta> = {};

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      if (key === 'tags') {
        try {
          meta.tags = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          meta.tags = [];
        }
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
