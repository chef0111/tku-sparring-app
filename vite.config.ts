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
  optimizeDeps: {
    include: ['lucide-react', '@tabler/icons-react'],
  },
  ssr: {
    noExternal: ['@tabler/icons-react'],
    optimizeDeps: {
      include: ['lucide-react', '@tabler/icons-react'],
    },
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
