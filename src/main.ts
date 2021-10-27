import { createApp } from 'vue'
import './service/axios_demo'
//全局引用element-plus，局部引入css路径加载不出来
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
