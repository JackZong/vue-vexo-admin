# 简介

## 📦 技术栈概览

| 类别 | 技术选型 |
|------|----------|
| 框架 | Vue 3 (Composition API) |
| 构建工具 | Vite |
| 语言 | TypeScript |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| UI 框架 | Element Plus |
| 国际化 | vue-i18n |
| 样式方案 | SCSS + Tailwind CSS |
| 工具库 | VueUse、Axios、luxon 等 |
| 图标方案 | SVG Icon + Element Plus Icons |

## 🌟 主要功能模块

### ✅ 基础功能
- 修改初始密码：根据 `/current` 接口返回 `modifyInitPwd` 为1，则显示修改初始密码的页面；
- 忘记密码：通过邮件验证码修改密码；
- 个人中心：修改密码；
- 用户管理：增删改查、状态控制、密码重置等；
- 角色管理：新增角色、权限配置；

### 🧩 常用业务组件
- `app-link`：兼容第三方页面跳转；
- `color-picker`：颜色选择器；
- `daterange-picker`：时间范围选择；
- `del-wrap`：删除按钮包裹组件；
- `dict-value`：字典值渲染；
- `editor`：富文本编辑器（集成 wangEditor）；
- `export-data`：数据导出弹窗；
- `footer-btns`：底部固定按钮区域；
- `icon`：图标组件（Element Plus + SVG）；
- `link`：链接选择器（商城页面 / 文章列表 / 自定义链接 / 小程序）；
- `material`：素材管理（图片、视频、文件）；
- `overflow-tooltip`：超出省略并提示；
- `pagination`：分页组件；
- `pax-desc`：描述信息布局；
- `popover-input`：弹出输入框；
- `popup`：弹窗组件；
- `upload`：上传组件；
- `video-player`：视频播放器；

> 所有组件均采用 `<script setup>` 语法编写，支持 Composition API。

## 🎨 多语言 & 国际化支持

- 使用 [vue-i18n](https://vue-i18n.intlify.dev/) 实现国际化；
- 支持中英文切换，后续可扩展其他语言；
- Element Plus 内部组件语言自动同步；
- 提供 `$t()` 方法用于翻译内容；
- 支持插值、复数形式、动态语言切换；
- 配置文件位于 `/src/locales/zh.json` 和 `/src/locales/en.json`

## 🔐 权限管理机制

- 基于路由的动态权限控制；
- 接口返回菜单结构，动态生成侧边栏；
- 支持按钮级别权限控制；
- 登录鉴权流程完善（JWT + Token 刷新）；
- 支持角色权限绑定与细粒度控制；

## 🌈 主题定制能力

- 支持深色/浅色模式切换（通过 `useDark()`）；
- 可自定义主题色、布局样式；
- 使用 SCSS 变量统一管理样式；
- 支持响应式布局适配移动端；
- 使用 `useWindowSize()` 监听窗口大小变化，自动调整布局；

## 📊 数据可视化与交互

- 集成 ECharts 图表组件；
- 提供常用图表模板（柱状图、折线图、饼图等）；
- 支持响应式图表容器；
- 数据看板示例完整；
- 表格、卡片、统计面板等通用 UI 组件丰富；

## 📁 项目目录结构（简化）

```ts
src/
├── api/              # 接口封装
├── assets/           # 静态资源
├── components/       # 通用业务组件（如 color-picker、upload、editor 等）
├── config/           # 全局配置（如 API 地址、版本号等）
├── enums/            # 枚举类定义
├── hooks/            # 自定义 Hook 函数（如 usePaging）
├── i18n.ts           # 国际化配置
├── install/          # 插件注册入口
├── locales/          # 多语言包（zh.json, en.json）
├── permission.ts     # 路由守卫 & 权限控制逻辑
├── router/           # Vue Router 配置
├── stores/           # Pinia 状态管理（模块化设计）
├── styles/           # 全局样式 & SCSS 变量
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数（如本地存储、请求封装、反馈提示等）
├── views/            # 页面视图
│   ├── dashboard     # 数据看板
│   ├── system        # 系统设置（用户、角色、日志）
│   └── ...           # 其他业务页面
└── main.ts           # 应用入口
```

---

## 🧪 开发与构建

### 安装依赖

```package-install
npm install
```

### 启动开发服务器

```package-install
npm run dev
```

### 构建生产环境代码

```package-install
npm run build
```

### Lint 代码检查

```package-install
npm run lint
```

---

## 📈 特性亮点

| 特性 | 描述 |
|------|------|
| 📱 响应式布局 | 支持 PC / 移动端自适应 |
| 🌗 深色 / 浅色主题 | 支持暗黑模式切换 |
| 🌍 多语言支持 | 中英文切换，支持未来扩展 |
| ⚙️ 权限系统 | RBAC 模型，接口级权限控制 |
| 📂 文件管理 | 支持图片、视频、文档的上传与预览 |
| 📊 数据可视化 | 图表、卡片、统计面板等组件齐全 |
| 📝 富文本编辑器 | 集成 wangEditor，支持插入图片、视频 |
| 💾 持久化存储 | 使用 localStorage 存储用户偏好、语言等 |
| 📈 统一错误处理 | 接口异常拦截、全局提示 |
| 📐 模块化设计 | 组件、Store、API 分层清晰，易于维护 |

## 📚 项目优势

- ✅ **开箱即用**：提供完善的登录、权限、布局、组件、图表等基础功能；
- ✅ **高性能**：使用 Vite 构建，启动速度快，热更新流畅；
- ✅ **可扩展性强**：组件、Store、API 均模块化封装，方便二次开发；
- ✅ **技术先进**：Vue 3 + TypeScript + Pinia + Vue Router 4；
- ✅ **企业级规范**：遵循企业开发规范，适合团队协作；
- ✅ **文档完善**：配套详细说明和组件使用指南；

## 📦 适用场景

- 企业后台管理系统
- 数据分析平台
- CRM / ERP 系统
- 运营管理系统
- 多语言国际化的 SaaS 平台

## 📜 版本信息

当前版本：`v1.0.0`  
发布日期：`2025-05`  
作者：`PAXFE`
