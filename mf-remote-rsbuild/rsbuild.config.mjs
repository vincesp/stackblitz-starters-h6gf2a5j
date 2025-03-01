import { defineConfig } from '@rsbuild/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'

export default defineConfig({
  dev: {
    assetPrefix: 'http://localhost:8767/',
  },
  output: {
    assetPrefix: 'http://localhost:8767/',
  },
  plugins: [
    pluginModuleFederation({
      name: 'js_remote_rsbuild',
      manifest: true,
      exposes: {
        '.': './src/index.js',
      },
      shared: ['markdown-it'],
    }),
  ],
  server: {
    port: 8767,
    cors: true,
  },
})
