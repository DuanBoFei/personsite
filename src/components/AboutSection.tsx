interface AboutSectionProps {
  isDark?: boolean;
}

export function AboutSection({ isDark = false }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`min-h-screen py-20 px-6 md:px-8 scroll-mt-16 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            关于我
          </h2>
        </div>

        {/* Content: Photo + Bio */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Photo - Left side */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div
              className={`relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 ${
                isDark
                  ? 'border-gray-700 shadow-gray-900/50'
                  : 'border-gray-200 shadow-gray-200/50'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                alt="段博斐的个人照片"
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add(
                      'flex',
                      'items-center',
                      'justify-center',
                      isDark ? 'bg-gray-800' : 'bg-gray-100'
                    );
                    const fallback = document.createElement('div');
                    fallback.className = 'text-center p-4';
                    fallback.innerHTML = `
                      <svg class="w-16 h-16 mx-auto mb-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p class="text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}">照片占位图<br/>可替换为真实照片</p>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

          {/* Bio - Right side */}
          <div className="w-full md:w-3/5">
            <div className="space-y-4">
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                我是一名专注于前端开发的工程师，拥有多年的 Web 开发经验。从早期的 jQuery 时代到如今的 React、Vue 生态，
                我见证了前端技术的快速发展，也持续保持着对新技术的好奇心和学习热情。
              </p>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                我相信好的代码不仅要能运行，更要易于理解和维护。在项目中，我注重代码的可读性、组件的复用性，
                以及用户体验的每一个细节。从像素级的 UI 还原到流畅的交互体验，我都力求做到尽善尽美。
              </p>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                未来，我希望能够深入探索前端工程化、性能优化以及人工智能与前端结合的前沿领域，
                用技术创造更有价值的产品，为用户提供更优质的数字体验。
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
