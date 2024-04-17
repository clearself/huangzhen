<template>
  <div
    style="display: flex"
    class="left-wrapper"
    :class="{
      'left-modal': activeModalName === 'left' || activeModalName === 'top-left',
      'top-model': activeModalName === 'top'
    }"
  >
    <div
      v-if="activeModalName === 'left' || activeModalName === 'top'"
      class="ub ub-ac ub-pc logo-box"
      :class="{ 'mr-5': activeModalName === 'top' }"
    >
      <div class="sys_logo" v-if="activeModalName === 'left'">
        <img v-if="collapsed" :src="imgLogoClose" height="30" />
        <img v-else :src="imgLogo" height="30" />
      </div>
      <div v-else class="sys_logo pl-2">
        <img :src="imgLogo" height="30" />
      </div>
    </div>
    <!-- <div style="flex: 1 1 200px" class="left-menu"> -->
    <div
      :class="{
        'left-menu': activeModalName === 'left' || activeModalName === 'top-left',
        'top-menu': activeModalName === 'top',
        collapsed: collapsed
      }"
    >
      <a-menu
        class="menu-box"
        theme="light"
        style="border: 0px"
        :selected-keys="[currentPath]"
        :open-keys="openKeys"
        :inline-collapsed="collapsed"
        @openChange="onOpenChange"
        @click="menuClick"
        :mode="activeModalName === 'left' || activeModalName === 'top-left' ? 'inline' : 'horizontal'"
      >
        <template v-for="menuItem in menusInfo" :key="menuItem.path">
          <template v-if="menuItem.children && menuItem.children.length > 0">
            <a-sub-menu :key="menuItem.path">
              <template #title>
                <span>
                  <span class="anticon">
                    <i v-if="menuItem.icon" class="icon-title menu-icon" :class="['iconfont', menuItem.icon]" />
                  </span>
                  <span class="icon-title">{{ $t(menuItem.name) }}</span>
                </span>
              </template>
              <a-menu-item v-for="child in menuItem.children" :key="child.path">{{ $t(child.name) }}</a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="menuItem.path">
              <span class="anticon">
                <i v-if="menuItem.icon" class="icon-title menu-icon" :class="['iconfont', menuItem.icon]" />
              </span>
              <span class="icon-title">{{ $t(menuItem.name) }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>

    <div
      v-if="activeModalName === 'left' || activeModalName === 'top-left'"
      class="ub w100 ub-ac ub-pc collapsed-btn"
      style="overflow: hidden"
    >
      <a-button type="link" block @click="toggleCollapsed" style="border-radius: 0px; margin-bottom: 16px">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Bus from '@/bus'
import { useTheme } from '@/hooks/useTheme'
const { activeModalName } = useTheme()
import { watch, ref, onMounted } from 'vue'
import imgLogo from '@/assets/imgs/logo.jpg'
import imgLogoClose from '@/assets/imgs/logo_close.png'

import { $t } from '@/i18n'
import { useRouter, useRoute } from 'vue-router' //路由
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { getNavPaths } from '@/routers'
import { useMenusStore } from '@/store/modules/permission'
const store = useMenusStore()
let menusInfo: any[]
menusInfo = store.menuList
const router = useRouter() // 路由
const route = useRoute() // 获取当前路由对象
const openKeys: any = ref([])
const collapsed = ref(false)
const navPaths: any = ref([])
watch(
  menusInfo,
  (newVal: any) => {
    navPaths.value = getNavPaths(newVal)
  },
  { immediate: true, deep: true }
)

const onOpenChange = (keys: any) => {
  const keyArr = []
  if (keys.length > 0) {
    //取最后一项，最后一项才是你当前展开的菜单
    keyArr.push(keys[keys.length - 1])
  }
  openKeys.value = keyArr
  sessionStorage.setItem('openKeys', JSON.stringify(keyArr))
}

const menuClick = (item: any) => {
  router.push(item.key)
  //判断是否是一级菜单，一级菜单item.keyPath长度为1，二级菜单item.keyPath长度为2，清空二级菜单展开数组openKeys
  if (item.keyPath.length == 1) {
    sessionStorage.removeItem('openKeys')
    openKeys.value = []
  }
}
// 处理初始化导航路由
const initRouter = (route: any) => {
  for (let i = 0; i < navPaths.value.length; i++) {
    if (route.fullPath.indexOf(navPaths.value[i]) !== -1) {
      // 如果当前路由与路由匹配上
      currentPath.value = navPaths.value[i] // 设置active
    }
  }
}
onMounted(() => {
  if (activeModalName.value !== 'top') {
    const openKey = sessionStorage.getItem('openKeys') as string
    if (!JSON.parse(openKey)?.length) {
      openKeys.value = menusInfo.length ? [menusInfo[0]?.path] : ['']
    } else {
      openKeys.value = JSON.parse(openKey)
    }
  }

  const activePath = menusInfo[0]?.children ? menusInfo[0].children[0].path : menusInfo[0]?.path
  currentPath.value = activePath
  initRouter(route)
})
// 创建响应式变量 当前高亮路由导航
const currentPath = ref('')
// 刷新时候，在当前路由
watch(
  () => router.currentRoute.value,
  (val) => {
    initRouter(val)
  },
  { deep: true }
)
// 切换折叠左侧菜单
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  let val
  const _openKey = sessionStorage.getItem('openKeys') as string
  if (!JSON.parse(_openKey)?.length) {
    val = [menusInfo[0]?.path]
  } else {
    val = JSON.parse(_openKey)
  }
  openKeys.value = collapsed.value ? [] : val
  Bus.emit('collapsed', collapsed.value)
}
</script>
<style lang="scss" scoped>
.left-wrapper {
  // background-color: #001529;
  // border: 1px solid red;
  box-shadow: 0 2px 5px #00000014;
  &.left-modal {
    flex-direction: column;
    height: 100%;
  }
  &.top-model {
    flex: 1;
    height: 50px;
    flex-direction: row;
  }
  .ant-menu-horizontal {
    line-height: 48px;
  }
}
.left-menu {
  width: 170px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  max-width: 240px;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &.collapsed {
    width: 80px;
  }
}
.top-menu {
  flex: 1;
}
.logo-box {
  height: var(--esg-navigationbar-height);
}
.icon-title {
  vertical-align: middle;
}

.menu-icon {
  position: relative;
  top: 1px;
}
</style>
