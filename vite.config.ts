import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// import legacyPlugin from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const shouldUseProxy = mode !== 'production'
  const baseUrl = env.VITE_API_URL

  return {
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: shouldUseProxy
        ? {
            '/api': {
              target: baseUrl,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : undefined
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
            ElementPlusResolver({
                importStyle: false, // 项目里面已经导入全部的css文件
                exclude: new RegExp(/^(?!.*loading-directive).*$/)
            })
        ],
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        // relative paths to the directory to search for components.
        dirs: ['src/components'],
        directoryAsNamespace: true,
        deep: true,
        resolvers: [
            ElementPlusResolver({
                importStyle: false // 项目里面已经导入全部的css文件
            })
        ]
      }),
      createStyleImportPlugin({
          resolves: [ElementPlusResolve()]
      }),
      createSvgIconsPlugin({
        // 配置路劲在你的src里的svg存放文件
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        symbolId: 'local-icon-[dir]-[name]'
      }),
      vueSetupExtend()
      // legacyPlugin({
      //     targets: ['defaults', 'IE 11']
      // })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
          api: 'modern-compiler' // or "modern"
        }
      }
    },
    build: {
      rollupOptions: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_HYDRATION__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  }
})
