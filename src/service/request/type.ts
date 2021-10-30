import { AxiosResponse, AxiosRequestConfig } from 'axios'
export interface LVRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface LVRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LVRequestInterceptor<T>
  showLoading?: boolean
}
