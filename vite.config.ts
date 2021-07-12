
const path = require('path');
const { name } = require("./package");

import { viteMockServe } from 'vite-plugin-mock';
import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      base: '/',
      host: '127.0.0.1',
      port: 7703,
      open: false,
      https: false,
      cors: true
    },
    build: {
      assetsDir: '_assets',
      terserOptions: {
        compress: {
          // 是否删除console
          drop_console: command !== 'serve'
        }
      }
    },
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        },
      },
    },

    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        watchFiles: true,
        injectCode: `
          import { setupProdMockServer } from '../mock/mockProdServer';
          setupProdMockServer();
        `,
      }),
    ]
  }
}
