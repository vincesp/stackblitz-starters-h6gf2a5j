import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: 'http://localhost:8765',
  build: {
    target: 'esnext',
    sourcemap: false,
    lib: {
      entry: 'src/main.js',
      name: 'jsRemote',
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
    },
  },
  plugins: [
    federation({
      name: 'js_remote',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/main.js',
      },
      shared: ['markdown-it'],
    }),
  ],
  preview: {
    port: 8765,
    strictPort: true,
  },
})
