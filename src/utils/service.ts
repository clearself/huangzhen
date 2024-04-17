import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Modal } from 'ant-design-vue'
import { h } from 'vue'
import { $t } from '@/i18n'
import { messageApi } from '@/helpers/msg-helper'
import { get, merge } from 'lodash-es'
import { getToken, logout } from '@/utils/tools'
/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 api 返回的数据
      const apiData = response.data
      // 二进制数据则直接返回
      if (response?.config?.headers?.isDownLoadImg) return apiData
      // 这个 code 是和后端约定的业务 code
      const code = apiData.code
      // 如果没有 code, 代表这不是项目后端开发的 api
      if (code === undefined) {
        console.log(response, 'apiDataapiDataapiDataapiData')
        messageApi.error('非本系统的接口')
        return Promise.reject(new Error('非本系统的接口'))
      }
      switch (code) {
        case '0':
          // 本系统采用 code === 0 来表示没有业务错误

          return apiData

        case '403':
          // 权限不足
          Modal.info({
            title: $t('modalTitleTips'),
            okText: $t('error.know'),
            content: h('div', {}, [h('p', $t('error.403'))])
          })
          return apiData
        case '401':
          messageApi.error($t('error.401'))
          // Token 过期时
          return logout()
        default:
          // 不是正确的 code
          messageApi.error(apiData.msg || 'Error')
          return apiData
      }
    },
    (error) => {
      // status 是 HTTP 状态码
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = $t('error.400')
          break
        case 401:
          // Token 过期时
          logout()
          break
        case 403:
          error.message = $t('error.403')
          break
        case 404:
          error.message = $t('error.404')
          break
        case 408:
          error.message = $t('error.408')
          break
        case 500:
          error.message = $t('error.500')
          break
        case 501:
          error.message = $t('error.501')
          break
        case 502:
          error.message = $t('error.502')
          break
        case 503:
          error.message = $t('error.503')
          break
        case 504:
          error.message = $t('error.504')
          break
        case 505:
          error.message = $t('error.505')
          break
        default:
          break
      }
      messageApi.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    const language: string = localStorage.getItem('language') || 'zh' // 从localStorage中获取 默认中文
    const defaultConfig = {
      headers: {
        // 携带 Token
        token: token ? token : undefined,
        lang: language,
        'Content-Type': 'application/json;charset=utf-8'
      },
      baseURL: import.meta.env.VITE_API_URL as string,
      timeout: import.meta.env.VITE_OVERTIME * 1000
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)
