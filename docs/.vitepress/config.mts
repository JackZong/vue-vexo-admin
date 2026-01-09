import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PAX ADMIN PRO",
  description: "An admin site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '参考', link: '/reference/conventional-commits', activeMatch: '/reference/' }
    ],

    sidebar: {
      '/guide/': [
        { text: '简介', link: '/guide/introduction' },
        { text: '前序准备', link: '/guide/prepare' },
        { text: '项目规范', link: '/guide/eslint' },
        { text: '配置项', link: '/guide/config' },
        { text: '路由', link: '/guide/router' },
        { text: '菜单', link: '/guide/menu' },
        { text: '权限', link: '/guide/permission' },
        { text: '接口请求', link: '/guide/request' },
        { text: '组件注册', link: '/guide/import' },
        { text: '使用vue插件', link: '/guide/plugin' },
        { text: '新增自定义指令', link: '/guide/directive' },
        { text: '样式', link: '/guide/style' },
        { text: '使用本地存储', link: '/guide/cache' },
        { text: '图标', link: '/guide/icon' },
        { text: '黑暗主题', link: '/guide/dark' },
        { text: '代码生成', link: '/guide/plop' },
        {
          text: '其他',
          collapsed: true,
          items: [
            { text: 'Markdown Examples', link: '/guide/markdown-examples' },
            { text: 'Runtime API Examples', link: '/guide/api-examples' }
          ]
        }
      ],
      '/reference/': [
        { text: '代码提交规范', link: '/reference/conventional-commits' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JackZong/vue-vexo-admin' }
    ]
  }
})
