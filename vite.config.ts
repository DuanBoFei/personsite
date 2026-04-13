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
  // Netlify 使用根路径，GitHub Pages 使用 /personsite/
  base: process.env.NETLIFY ? '/' : '/personsite/',
})
