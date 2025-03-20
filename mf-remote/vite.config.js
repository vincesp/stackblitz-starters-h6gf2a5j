import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: false,
    lib: {
      entry: 'src/main.js',
      name: 'mfRemote',
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
      name: 'mf_remote',
      manifest: true,
      exposes: {
        '.': './src/main.js'
      },
      shared: ['markdown-it']
    })
  ],
  preview: {
    port: 8766,
    strictPort: true,
  }
})