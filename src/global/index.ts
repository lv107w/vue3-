import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElButton,
  ElTable,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
} from 'element-plus'

const components = [
  ElButton,
  ElTable,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
]
export function registerApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
