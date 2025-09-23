import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         
    environment: 'jsdom',    
    setupFiles: './setupTests.js', 
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'build/static/node_modules/react-dom/cjs.react-dom-client.production.js',
        'vitest.config.js',
        'build/*',
        'src/App.jsx',
        'src/index.js',
        'src/reportWebVitals.js',
        'src/setupTests.js'
      ],
    },
  },
})