import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const MODE = process.env.NODE_ENV;
const development = MODE === 'development';

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-sprite--[name]',
    }),
    development
    && nodePolyfills({
      include: ['node_modules/**/*.js', /node_modules\/.vite\/.*js/],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      http: true,
      crypto: true,
    }),
  ],
  server: {
    port: 8081,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
    },
  },
  build: {
    rollupOptions: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      plugins: [nodePolyfills({ crypto: true, http: true })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
