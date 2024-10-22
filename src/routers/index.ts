import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { $t } from '@/i18n'
import { useTitle } from '@/hooks/useTitle'
import { setRouteChange } from '@/hooks/useRouteListener'
import { cloneDeep } from 'lodash-es'
const Layout = () => import('@/layout/index.vue')
const { setTitle } = useTitle()
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'views.home',
    redirect: '/data-dic',
    children: []
  },
  {
    path: '/data-dic',
    redirect: '/data-dic/enumer',
    component: Layout,
    name: 'views.data-dic',
    meta: {
      title: $t('menu.data-dic')
    },
    children: [
      {
        path: 'enumer',
        component: () => import('@/views/data-dic/enumer/index.vue'),
        name: 'views.data-dic.enumer',
        meta: {
          title: $t('menu.data-dic.enumer')
        }
      },
      {
        path: 'product',
        component: () => import('@/views/data-dic/product/index.vue'),
        name: 'views.data-dic.product',
        meta: {
          title: $t('menu.data-dic.product')
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: {
      title: '404'
    }
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    name: '403',
    meta: {
      title: '403'
    }
  }
]
export const getNavPaths = (arr: any) => {
  const navPaths = <any>[]
  const _routes = cloneDeep(arr)
  _routes.forEach((item: any) => {
    navPaths.push(item.path)
    if (item.children) {
      navPaths.push(...getNavPaths(item.children))
    }
  })
  return navPaths
}

const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  // 应该添加到路由的初始路由列表。
  routes: constantRoutes
})

router.beforeEach(async (to, _from, next) => {
  next()
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
})
// console.log(router.getRoutes());
/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.async) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
export default router
