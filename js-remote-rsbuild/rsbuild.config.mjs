import { defineConfig } from '@rslib/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'

export default defineConfig({
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
    port: 8767,
    cors: true,
  },
  plugins: [
    pluginModuleFederation({
      name: 'js_remote_rsbuild',
      manifest: false,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/index.js',
      },
      shared: ['markdown-it'],
    }),
  ],
})
