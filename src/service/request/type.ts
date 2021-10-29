import { AxiosResponse, AxiosRequestConfig } from 'axios'
export interface LVRequestInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface LVRequestConfig extends AxiosRequestConfig {
  interceptors?: LVRequestInterceptor
  showLoading?: boolean
}
