import router from '@/routers/index'
import { useMenusStore } from '@/store/modules/permission'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/tools'
NProgress.configure({ showSpinner: false })
//进度条样式
const Whitelist = ['/login', '/403', '/404']

// //全局路由守卫
// router.beforeEach((to: any, from: any, next: any) => {
//   // NProgress.start();
//   const store = useMenusStore();
//   const hasetoken = getToken();
//   if (to.path == "/login" && hasetoken) {
//     //如果已经登录还在访问登录页，直接跳转首页
//     next("/");
//   }
//   if (Whitelist.indexOf(to.path) == -1) {
//     //没有在白名单里面
//     if (store.menuRouter.length == 0 && hasetoken) {
//       /*没有获取路由但是登录了,就获取路由信息*/
//       store.generateRoutes().then(() => {
//         const routerlist = store.menuRouter;
//         if (routerlist.length > 0) {
//           routerlist.forEach((item: any) => {
//             router.addRoute(item);
//           });
//         } else {
//           // 当前用户没有任何权限就跳转工作台
//           if (to.path === "/dashboard") return next();
//         }
//         next({ ...to, replace: true });
//       });
//     } else {
//       /*两种情况进入：1：已经获取了路由（一定有token），2，没有登录（一定没有路由）*/
//       // NProgress.done()
//       if (hasetoken) {
//         /*to.matched.length === 0判断当前输入的路由是否具有，即使登陆了，如果输入不能访问的路由也要404*/
//         /*情况1,并且访问路由具备，需要放行*/

//         if (to.matched.length != 0) {
//           next();
//         } else {
//           next("/404");
//         }
//       } else {
//         next("/login");
//       } /*情况2，情况1但是访问路由不对，需要404*/
//     }
//   } else {
//     next();
//   }
// });

//全局路由守卫
router.beforeEach((to: any, _from: any, next: any) => {
  NProgress.start()
  const store = useMenusStore()
  //没有在白名单里面
  const hasetoken = getToken()
  if (to.path == '/login' && hasetoken) {
    //如果已经登录还在访问登录页，直接跳转首页
    next('/')
  }
  if (Whitelist.indexOf(to.path) == -1) {
    console.log(store.menuList.length, hasetoken)
    if (store.menuList.length == 0 && hasetoken) {
      /*没有获取路由但是登录了,就获取路由信息*/
      store.generateRoutes().then(() => {
        // const routerlist = store.menuRouter
        // if (routerlist.length > 0) {
        //   routerlist.forEach((item: any) => {
        //     router.addRoute(item)
        //   })
        // } else {
        //   // 当前用户没有任何权限就跳转工作台
        //   //if (to.path === "/dashboard")
        //   return next()
        // }
        next({ ...to, replace: true })
      })
    } else {
      if (hasetoken) {
        /*to.matched.length === 0判断当前输入的路由是否具有，即使登陆了，如果输入不能访问的路由也要404*/
        /*情况1,并且访问路由具备，需要放行*/

        if (to.matched.length != 0) {
          next()
        } else {
          next('/404')
        }
      } else {
        next('/login')
      } /*情况2，情况1但是访问路由不对，需要404*/
    }
  } else {
    next()
  }
})

router.afterEach((_to) => {
  NProgress.done()
})
