import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

// 自定义插件：构建时加载博客文章数据
function blogLoaderPlugin() {
  const virtualModuleId = 'virtual:blog-posts'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'blog-loader',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id: string) {
      if (id !== resolvedVirtualModuleId) return

      const blogDir = path.resolve(__dirname, 'src/content/blog')
      const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))

      const posts = files.map(file => {
        const filePath = path.join(blogDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: body } = matter(content)

        // 从文件名提取 slug（移除日期前缀）
        const slug = file
          .replace(/\.mdx$/, '')
          .replace(/^\d{4}-\d{2}-\d{2}-/, '')

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          excerpt: data.excerpt || '',
          content: body
        }
      })

      // 按日期降序排序
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return `export const posts = ${JSON.stringify(posts)}`
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    blogLoaderPlugin(),
  ],
  // 使用环境变量设置 base 路径，Netlify 设置为 /，GitHub Pages 设置为 /personsite/
  base: process.env.VITE_BASE_URL || '/personsite/',
})
