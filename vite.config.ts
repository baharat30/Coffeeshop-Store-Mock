import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; // این رو اضافه کن

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // اینجا بذار، نه تو server
  ],
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // اصلاح اینجا
    },
  },
  base: '/',
})
