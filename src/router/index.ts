

import { createRouter, createWebHistory, type RouteRecordRaw, RouterView } from 'vue-router'

import { MenuEnum } from '@/enums/appEnums'
import useUserStore from '@/stores/modules/user'
import { isExternal } from '@/utils/validate'

import { constantRoutes, INDEX_ROUTE_NAME, LAYOUT } from './routes'

// 匹配views里面所有的.vue文件，动态引入
const modules = import.meta.glob('/src/views/**/*.vue')

//
export function getModulesKey() {
  return Object.keys(modules).map((item) => item.replace('/src/views/', '').replace('.vue', ''))
}

// Use meta.perms to determine if the current user has permission
export function hasPermission(perms: any[], route: any) {
  if (route.meta && route.meta.perms) {
    return perms.some((key) => {
      return '*' == key || route.meta.perms.includes(key)
    })
  } else {
    return true
  }
}

// // 过滤路由所需要的数据
// export function filterAsyncRoutes(routes: any[], firstRoute = true) {
//     return routes.map((route) => {
//         const routeRecord = createRouteRecord(route, firstRoute)
//         if (route.children != null && route.children && route.children.length) {
//             routeRecord.children = filterAsyncRoutes(route.children, false)
//         }
//         return routeRecord
//     })
// }
// 过滤路由所需要的数据
export function filterAsyncRoutes(routes: any[], perms: any[], firstRoute = true) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const routeRecord = createRouteRecord(route, firstRoute)
    // console.log('routeRecord', routeRecord)
    if (hasPermission(perms, routeRecord)) {
      if (routeRecord.children != null && routeRecord.children && routeRecord.children.length) {
        routeRecord.children = filterAsyncRoutes(routeRecord.children, perms, false)
      }
      res.push(routeRecord)
    }
  })

  return res
}

// 创建一条路由记录
export function createRouteRecord(route: any, firstRoute: boolean): RouteRecordRaw {
  console.log('route', route)
  //@ts-ignore
  const routeRecord: RouteRecordRaw = {
    path: isExternal(route.path) ? route.path : firstRoute ? `/${route.path}` : route.path,
    name: Symbol(route.path),
    meta: {
      hidden: route.hidden,
      keepAlive: route.keepAlive,
      title: route.title,
      perms: route.perms,
      query: route.params,
      icon: route.icon,
      type: route.type,
      activeMenu: route.selected
    }
  }
  const type = route.children ? MenuEnum.CATALOGUE : MenuEnum.MENU
  switch (type) {
    case MenuEnum.CATALOGUE:
      routeRecord.children = route.children
      // routeRecord.component = firstRoute ? LAYOUT : RouterView
      // if (!route.children) {
      //   routeRecord.component = RouterView
      // }
      break
    case MenuEnum.MENU:
      routeRecord.component = loadRouteView(route.component)
      break
  }
  return routeRecord
}

// 动态加载组件
export function loadRouteView(component: string) {
  try {
    const key = Object.keys(modules).find((key) => {
      return key.includes(`/${component}.vue`)
    })
    if (key) {
      return modules[key]
    }
    throw Error(`找不到组件${component}，请确保组件路径正确`)
  } catch (error) {
    console.error(error)
    return RouterView
  }
}

// 找到第一个有效的路由
export function findFirstValidRoute(routes: RouteRecordRaw[]): string | undefined {
  for (const route of routes) {
    const type = route.children ? MenuEnum.CATALOGUE : MenuEnum.MENU
    if (type == MenuEnum.MENU && !route.meta?.hidden && !isExternal(route.path)) {
      return route.name as string
    }
    if (route.children) {
      const name = findFirstValidRoute(route.children)
      if (name) {
        return name
      }
    }
  }
}
//通过权限字符查询路由路径
export function getRoutePath(perms: string) {
  const routerObj = useRouter() || router
  return routerObj.getRoutes().find((item) => item.meta?.perms == perms)?.path || ''
}

// 重置路由
export function resetRouter() {
  router.removeRoute(INDEX_ROUTE_NAME)
  const { routes } = useUserStore()
  routes.forEach((route) => {
    const name = route.name
    if (name && router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
