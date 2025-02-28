import { defineConfig } from '@rsbuild/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'

export default defineConfig({
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
