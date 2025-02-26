import { defineConfig } from 'vite';
import {federation} from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        // Define your remotes here when needed
      },
      exposes: {
        // Define your exposed modules here when needed
      },
      shared: ['markdown-it']
    })
  ],
  build: {
    target: 'esnext',
  },
});