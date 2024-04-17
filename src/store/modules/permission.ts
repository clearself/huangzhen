import { defineStore } from 'pinia' // 定义容器
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import { handelRouteToMenu, handelRouter } from '@/utils/tools'
import { routerlist } from '@/routers/data'
export const useMenusStore = defineStore('permission', {
  /**
   * 存储全局状态，类似于vue2中的data里面的数据
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
   */
  state: () => {
    return {
      menuList: [], //菜单信息
      menuRouter: []
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    //菜单
    setMenuList(data: any) {
      this.menuList = data
    },
    //设置路由：data-->后端传入的路由信息
    setMenuRouter(data: any) {
      this.menuRouter = cloneDeep(data)
    },
    generateRoutes() {
      // let firstMenu = <any>{
      //     icon:'icon-gongzuotai',
      //     path: "/dashboard",
      //     name: "dashboard",
      //     meta: {
      //         title: "Dashboard",
      //         async:true
      //     },
      // }
      //获取路由信息
      return new Promise((resolve: any) => {
        // let _menus = localStorage.getItem('menus') as string
        const arr = routerlist
        // JSON.parse(_menus)
        // const routes = handelRouter(arr)
        // console.log(routes, 'routes')
        // 设置路由
        // this.setMenuRouter(routes)
        // 设置左侧菜单
        const menus = handelRouteToMenu(arr)
        // menus.unshift(firstMenu)
        this.setMenuList(menus)
        setTimeout(() => {
          resolve()
        }, 100)
      })
    }
  }
  // 持久化设置
  // persist: {
  //     enabled: true,	//开启
  //     storage: sessionStorage,	//修改存储位置
  //     key: 'permissions',	//设置存储的key,在这里是存在sessionStorage时的键
  //     paths: ['menuList', 'hasRouter', `roles`, 'roleIds','tabsList','tabsActive'],//指定要持久化的字段，menuRouter不需要缓存。因为每次路由跳转我们都可以重新获取
  // },
})

/** 在 setup 外使用 */
export function useMenusStoreHook() {
  return useMenusStore(store)
}
