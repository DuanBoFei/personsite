import { useState } from 'react';

// 图片组件，支持懒加载和标题
interface ImageProps {
  src: string;
  caption?: string;
  alt?: string;
}

export function Image({ src, caption, alt }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <img
          src={src}
          alt={alt || caption || '图片'}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// 提示框组件
interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

export function Alert({ type = 'info', children }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
  };

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className={`my-6 p-4 rounded-lg border ${styles[type]} flex gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// 代码沙盒组件（用于嵌入 CodePen、StackBlitz 等）
interface CodeSandboxProps {
  src: string;
  title?: string;
  height?: number;
}

export function CodeSandbox({ src, title = 'Code Sandbox', height = 400 }: CodeSandboxProps) {
  return (
    <div className="my-6">
      <iframe
        src={src}
        title={title}
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ height }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
      />
    </div>
  );
}

// YouTube 嵌入组件
interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title = 'YouTube Video' }: YouTubeProps) {
  return (
    <div className="my-6 aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

// 提示框/引用组件
interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div className="my-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border-l-4 border-indigo-500">
      {title && (
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
      )}
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

// 文件树组件
interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="my-6 p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
      {children}
    </div>
  );
}

// 文件树项
interface FileProps {
  name: string;
  type?: 'file' | 'folder';
}

export function File({ name, type = 'file' }: FileProps) {
  const icon = type === 'folder' ? '📁' : '📄';
  return (
    <div className="py-1">
      <span className="mr-2">{icon}</span>
      <span className={type === 'folder' ? 'text-yellow-400' : 'text-gray-300'}>{name}</span>
    </div>
  );
}

// 步骤组件
interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 space-y-4">
      {children}
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
