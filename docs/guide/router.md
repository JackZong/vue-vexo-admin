# 路由

目前路由分为两部分，一部分是静态路由：src/router/routes.ts，一部分是动态路由：在菜单中(`@/config/menu/`)添加。

## 路由配置说明

```ts
path: '/path'                      // 路由路径
name:'router-name'                 // 设定路由的名字
meta : {
    title: 'title'                  // 设置该路由在侧边栏的名字
    icon: 'icon-name'                // 设置该路由的图标
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
    query: '{"id": 1}'             // 访问路由的默认传递参数
    hidden: true                   // 当设置 true 的时候该路由不会在侧边栏出现 
    hideTab: true                   //当设置 true 的时候该路由不会在多标签tab栏出现
}
component: () => import('@/views/user/setting.vue')  // 路由组件
```

## meta配置ts扩展

`typings/router.d.ts`

```ts
import 'vue-router'
declare module 'vue-router' {
    // 扩展 RouteMeta
    interface RouteMeta {
        title?: string
        icon?: string
        hidden?: boolean
        activeMenu?: string
        hideTab?: boolean
    }
}
```

## 静态路由

`src/router/routes.ts`

```ts
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: PageEnum.ERROR_404,
        component: () => import('@/views/error/404.vue')
    },
    {
        path: PageEnum.ERROR_403,
        component: () => import('@/views/error/403.vue')
    },
    {
        path: PageEnum.LOGIN,
        component: () => import('@/views/account/login.vue')
    },
    //多级路由：LAYOUT布局
    {
        path: '/user',
        component: LAYOUT,
        children: [
            {
                path: 'setting',
                component: () => import('@/views/user/setting.vue'),
                meta: {
                    title: '个人设置'
                }
            }
        ]
    },
    {
        path: '/dev_tools',
        component: LAYOUT,
        children: [
            {
                path: 'code/edit',
                component: () => import('@/views/dev_tools/code/edit.vue'),
                meta: {
                    title: '编辑数据表',
                    activeMenu: '/dev_tools/code'
                }
            }
        ]
    },
    {
        path: '/setting',
        component: LAYOUT,
        children: [
            {
                path: 'dict/data',
                component: () => import('@/views/setting/dict/data/index.vue'),
                meta: {
                    title: '数据管理',
                    activeMenu: '/setting/dict'
                }
            }
        ]
    }
    //要添加路由可直接在这里加
]
```

## 动态路由

如何添加一个动态路由：详见下面的菜单

