import { useState, useEffect } from 'react';

interface NavigationProps {
  isDark?: boolean;
}

export function Navigation({ isDark = false }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section using Intersection Observer
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { id: 'hero', label: '首页' },
    { id: 'about', label: '关于' },
    { id: 'projects', label: '项目' },
    { id: 'contact', label: '联系我' },
  ];

  return (
    <nav
      aria-label="主导航"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isDark
          ? 'bg-gray-900/80 backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className={`text-lg font-semibold transition-colors ${
              isDark
                ? 'text-gray-100 hover:text-indigo-400'
                : 'text-gray-900 hover:text-indigo-600'
            }`}
          >
            段博斐
          </button>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  activeSection === link.id
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                      ? 'text-gray-300 hover:text-indigo-400'
                      : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
