import type { BlogPost } from '../../types/blog';
import { formatDate } from '../../lib/blog';

interface BlogCardProps {
  post: BlogPost;
  isDark: boolean;
  onClick: () => void;
}

export function BlogCard({ post, isDark, onClick }: BlogCardProps) {
  const displayTags = post.tags.slice(0, 3);
  const remainingTags = post.tags.length - 3;

  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
        isDark
          ? 'bg-gray-800/80 border border-gray-700 hover:border-indigo-500/50'
          : 'bg-white/80 border border-gray-200 hover:border-indigo-300 shadow-lg'
      }`}
    >
      <div className="flex flex-col h-full">
        <time
          className={`text-sm mb-3 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {formatDate(post.date)}
        </time>

        <h3
          className={`text-xl font-bold mb-3 line-clamp-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`text-sm mb-4 line-clamp-3 flex-grow ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? 'bg-indigo-500/20 text-indigo-300'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              +{remainingTags}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
