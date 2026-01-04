/* eslint-disable */
import './permission'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import App from './App.vue'
import config from './config'
import install from './install'

import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/index.css'; // element-plus组件样式
import './styles/index.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(install)
app.mount('#app')

console.log(
    `%cPAX-ADMIN-PRO v${config.version}`,
    'background: #4A5DFF; color: white; font-size: 10px; padding: 4px 8px; border-radius: 4px;'
)
