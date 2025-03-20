import { defineConfig } from '@rslib/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'

export default defineConfig({
  dev: {
    assetPrefix: 'auto',
  },
  output: {
    assetPrefix: 'auto',
  },
  lib: [
    {
      format: 'esm',
      output: {
        assetPrefix: 'auto',
      }
    },
  ],
  server: {
    port: 8768,
    cors: true,
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
})
