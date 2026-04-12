import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/blog/BlogSection';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { ProjectSection } from './components/ProjectSection';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <>
      <Navigation isDark={isDark} />
      <ThemeToggle />
      <main>
        <HeroSection isDark={isDark} />
        <AboutSection isDark={isDark} />
        <ProjectSection isDark={isDark} />
        <BlogSection isDark={isDark} />
        <section
          id="contact"
          className={`min-h-screen py-20 px-6 md:px-8 scroll-mt-16 flex items-center justify-center ${
            isDark
              ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950'
              : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
              联系我
            </h2>
            <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-12">
              欢迎通过以下方式与我联系，期待与你的交流
            </p>
            <div className="space-y-6">
              <a
                href="mailto:15809246889@163.com"
                className={`block p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gray-800/80 border border-gray-700 hover:border-indigo-500/50'
                    : 'bg-white/80 border border-gray-200 hover:border-indigo-300 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-lg font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    15809246889@163.com
                  </span>
                </div>
              </a>
              <a
                href="https://github.com/DuanBoFei"
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-gray-800/80 border border-gray-700 hover:border-indigo-500/50'
                    : 'bg-white/80 border border-gray-200 hover:border-indigo-300 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-lg font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    github.com/DuanBoFei
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
