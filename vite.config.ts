import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock/dist'
import { resolve } from 'path'
import { ConfigEnv } from 'vite'
import viteSvgIcons from 'vite-plugin-svg-icons'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  return {
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '#': pathResolve('types')
        // '_components': pathResolve('yk-component-admin-v3')
      }
    },
    plugins: [
      vue(),
      // vueJsx({
      //   optimize: false,
      //   mergeProps: true
      // }),
      viteSvgIcons({
        iconDirs: [
          resolve(process.cwd(), 'node_modules/@gwin/svg-icon/lib/theme-default/icons/svg'),
          resolve(process.cwd(), 'src/icons/svg')
        ],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        watchFiles: true, // 监视文件夹中的文件更改。 并实时同步到请求结果
        localEnabled: command === 'serve', // 设置为 false 将禁用 mock 功能
        prodEnabled: true, // 设置打包是否启用 mock 功能
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      })
    ],
    server: {
      host: '0.0.0.0',
      port: 3001,
      strictPort: false,
      open: false,
      proxy: {
        '/cif': {
          target: 'http://106.75.75.35:8082/api',
          changeOrigin: true
        },
        '/saas': {
          target: 'http://106.75.75.35:8082/api',
          changeOrigin: true
        }
      }
    },
    // define: {
    //   'process.env': import.meta.env
    // },
    esbuild: {
      pure: ['console.log', 'debugger']
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      brotliSize: false, // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            'element-plus': ['element-plus']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          // additionalData: '@import "@gwin/platform-css-pc/lib/theme-default/index.css";'
        }
      }
    },
    optimizeDeps: {
      // 在预构建中强制排除的依赖项
      exclude: [],
      // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
    }
  }
}
