import { defineConfig } from '@rslib/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'

export default defineConfig({
  output: {
    publicPath: 'auto',
  },
  lib: [
    {
      format: 'esm',
      output: {
        publicPath: 'auto',
      }
    },
  ],
  server: {
    port: 8767,
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
