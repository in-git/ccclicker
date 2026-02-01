import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import './style.css'

// 导入IconPark图标
import { install } from '@icon-park/vue-next/es/all'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册HomePage组件
    app.component('HomePage', HomePage)

    // 全局注册IconPark图标
    install(app)
  }
}