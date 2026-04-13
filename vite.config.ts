import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],
  // 使用环境变量设置 base 路径，Netlify 设置为 /，GitHub Pages 设置为 /personsite/
  base: process.env.VITE_BASE_URL || '/personsite/',
})
