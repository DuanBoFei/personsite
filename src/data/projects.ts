export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  githubUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'personal-website',
    name: '个人品牌站',
    description: '使用 React 19 + Vite 7 + TypeScript + Tailwind CSS v4 构建的现代化个人网站，支持亮暗主题切换和动态粒子背景效果。',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yourusername/personsite',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'task-manager',
    name: '任务管理系统',
    description: '基于 React 和 Node.js 的全栈任务管理应用，支持团队协作、任务分配、进度追踪等功能。',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yourusername/task-manager',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 'data-visualization',
    name: '数据可视化平台',
    description: '使用 D3.js 和 ECharts 构建的交互式数据可视化平台，支持多种图表类型和实时数据更新。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yourusername/data-viz',
    tags: ['Vue.js', 'D3.js', 'ECharts', 'TypeScript'],
  },
  {
    id: 'ai-chatbot',
    name: 'AI 智能助手',
    description: '基于大语言模型的智能对话系统，支持多轮对话、上下文理解和知识库检索。',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/yourusername/ai-chatbot',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
  },
];
