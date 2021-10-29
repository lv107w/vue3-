//配置service统一出口
import LVRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export const lvRequest1 = new LVRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export const lvRequest2 = new LVRequest({
  baseURL: '地址2'
})
