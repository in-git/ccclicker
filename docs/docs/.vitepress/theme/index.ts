import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
  }
}

export default theme