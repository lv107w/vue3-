import axios from 'axios'
import { ElLoading } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { LVRequestConfig, LVRequestInterceptor } from './type'
import { ILoadingInstance } from 'element-plus'

const DEFAULT_LOADING = true

class LVRequest {
  instance: AxiosInstance
  interceptors?: LVRequestInterceptor
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: LVRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    //从config中取出的拦截器是对应的实例的拦截器，（是new对象的时候传入的参数，只有该对象才有的拦截器）
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有的实例都有的拦截器，（只要new对象，构造函数里默认配置拦截器）
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        //添加加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //将loading动画移除
        this.loading?.close()
        console.log('所有实例都有的拦截器：响应成功拦截')
        return res.data
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        return err
      }
    )
  }

  request<T>(config: LVRequestConfig<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      //查看new的实例传过来的config有没有拦截器，如果有就把config做一层转换
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      //判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //查看new的实例传过来的config有没有拦截器，如果有就把res做一层转换
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res)
          //将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          //将结果返回出去
          reslove(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: LVRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: LVRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: LVRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: LVRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LVRequest
