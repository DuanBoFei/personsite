import type { BlogPost as BlogPostType } from '../../types/blog';
import { formatDate } from '../../lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Giscus from '@giscus/react';
import { Image } from './MDXComponents';

interface BlogPostProps {
  post: BlogPostType | null;
  isDark: boolean;
  onBack: () => void;
}

// 评论组件包装器
function CommentsSection({ isDark }: { isDark: boolean }) {
  return (
    <Giscus
      repo="DuanBoFei/personsite"
      repoId="R_kgDOR_88ig"
      category="Blog Comments"
      categoryId="DIC_kwDOR_88is4C6rdH"
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={isDark ? 'dark' : 'light'}
      lang="zh-CN"
      loading="lazy"
    />
  );
}

export function BlogPost({ post, isDark, onBack }: BlogPostProps) {
  // 404 状态
  if (!post) {
    return (
      <section
        className={`min-h-screen py-20 px-6 md:px-8 flex items-center justify-center ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950'
            : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
        }`}
      >
        <div className="text-center max-w-md">
          <h1 className={`text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            404
          </h1>
          <p className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            文章不存在或已被删除
          </p>
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isDark
                ? 'bg-indigo-600/80 hover:bg-indigo-500/80 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回博客列表
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`min-h-screen py-20 px-6 md:px-8 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`mb-8 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isDark
              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回博客
        </button>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1
              className={`text-3xl md:text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <time className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {formatDate(post.date)}
              </time>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div
            className={`prose max-w-none ${
              isDark ? 'prose-invert' : ''
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: {
                  node?: unknown;
                  inline?: boolean;
                  className?: string;
                  children?: React.ReactNode;
                }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';

                  return !inline && language ? (
                    <SyntaxHighlighter
                      style={isDark ? vscDarkPlus : vs}
                      language={language}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // 自定义 MDX 组件
                img({ src, alt }: { src?: string; alt?: string }) {
                  return <Image src={src || ''} alt={alt} />;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Comments Section */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              评论
            </h2>
            <CommentsSection isDark={isDark} />
          </div>
        </article>
      </div>
    </section>
  );
}
