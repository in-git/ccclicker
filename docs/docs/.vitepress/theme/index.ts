import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    // 注册HomePage组件
    app.component('HomePage', HomePage)
  }
}