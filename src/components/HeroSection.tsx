import { ParticleBackground } from './ParticleBackground';

interface HeroSectionProps {
  isDark?: boolean;
}

export function HeroSection({ isDark = false }: HeroSectionProps) {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-dvh w-full flex items-center justify-center overflow-hidden scroll-mt-16"
      style={{
        background: isDark
          ? 'linear-gradient(to bottom right, rgb(17, 24, 39), rgb(30, 27, 75), rgb(88, 28, 135))'
          : 'linear-gradient(to bottom right, rgb(239, 246, 255), rgb(238, 242, 255), rgb(245, 243, 255))',
      }}
    >
      {/* Particle Background */}
      <ParticleBackground isDark={isDark} />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-8 max-w-4xl mx-auto text-center">
        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          段博斐
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 mb-6">
          vibecoding / 前端开发工程师
        </p>

        {/* Bio */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8">
          专注于构建高性能、用户友好的 Web 应用。热爱技术，追求极致的用户体验。
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToProjects}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        >
          查看项目
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
