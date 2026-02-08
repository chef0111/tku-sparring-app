import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  ssr: {
    // Prevent SSR-specific packages from being bundled into the client
    noExternal: ['@tabler/icons-react'],
  },
  build: {
    rollupOptions: {
      external: [
        // Externalize Node.js built-ins to prevent them from being bundled
        'node:stream',
        'node:stream/web',
        'node:async_hooks',
        'node:buffer',
      ],
    },
  },
});

export default config;
