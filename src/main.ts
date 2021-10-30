import { createApp } from 'vue'
// import './service/axios_demo'
//全局引用element-plus，局部引入css路径加载不出来
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

import router from './router'
import store from './store'
import { lvRequest1 } from './service'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

interface DataType {
  args: any
  headers: any
  origin: string
  url: string
}

lvRequest1
  .get<DataType>({
    url: '/get',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的response')
        return res
      }
    },
    showLoading: true
  })
  .then((res) => {
    console.log(res.args + '123')
    console.log(res.url + '123456789')
  })
