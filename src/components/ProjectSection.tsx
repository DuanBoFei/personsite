import { ProjectCard } from './ProjectCard';
import { projects } from '../data/projects';

interface ProjectSectionProps {
  isDark?: boolean;
}

export function ProjectSection({ isDark = false }: ProjectSectionProps) {
  return (
    <section
      id="projects"
      className={`min-h-screen py-20 px-6 md:px-8 scroll-mt-16 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            项目作品
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            以下是我在前端开发领域的一些代表作品，涵盖个人网站、全栈应用、数据可视化和 AI 应用等多个方向
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className={`text-center py-16 rounded-xl ${
              isDark
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
          >
            <svg
              className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? 'text-gray-600' : 'text-gray-300'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3
              className={`text-lg font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              暂无项目
            </h3>
            <p
              className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              项目列表为空，请添加一些项目数据
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
