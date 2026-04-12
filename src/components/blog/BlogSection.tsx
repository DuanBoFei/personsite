import { useState } from 'react';
import type { BlogPost } from '../../types/blog';
import { getRecentPosts } from '../../lib/blog';
import { BlogCard } from './BlogCard';
import { BlogPost as BlogPostDetail } from './BlogPost';

interface BlogSectionProps {
  isDark: boolean;
}

export function BlogSection({ isDark }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const recentPosts = getRecentPosts(3);

  if (selectedPost) {
    return (
      <BlogPostDetail
        post={selectedPost}
        isDark={isDark}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <section
      id="blog"
      className={`min-h-screen py-20 px-6 md:px-8 scroll-mt-16 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-5xl font-bold text-center mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          博客
        </h2>
        <p
          className={`text-center text-lg mb-12 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          分享技术见解、学习心得和项目经验
        </p>

        {recentPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              暂无文章，敬请期待
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  isDark={isDark}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => {
                  // TODO: 展开显示更多文章或跳转到独立博客列表页
                  alert('更多文章功能即将推出');
                }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isDark
                    ? 'bg-indigo-600/80 hover:bg-indigo-500/80 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                }`}
              >
                查看全部
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
