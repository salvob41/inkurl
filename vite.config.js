import { defineConfig } from 'vite'

export default defineConfig({
  base: '/inkurl/', // Adjust this to match your GitHub repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: ['@codemirror/view', '@codemirror/state', '@codemirror/language'],
          marked: ['marked']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
