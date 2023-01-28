import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/element-variables.scss'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import './styles/index.scss' // global css

import 'virtual:svg-icons-register'

// svg-icon
import SvgIcon from '@gwin/svg-icon'
import '@gwin/svg-icon/lib/theme-default/index.css'

// console-base
import ConsoleBase from '@gwin/platform-console-base-pc'
import './styles/console-base-variables.scss'

// console-menu
import ConsoleMenu from '@gwin/platform-menu-pc'
import '@gwin/platform-menu-pc/lib/theme-default/index.css'

// 网络配置
import { commonConfig } from '@gwin/networking'
import { Passport } from '@gwin/platform-passport-pc'

commonConfig.loginCallback = () => {
  Passport.logout()
}

commonConfig.noPermissionCallback = () => {
  Passport.logout()
}

const app = createApp(App)

app.use(router).use(store).use(ElementPlus, { locale }).use(SvgIcon).use(ConsoleBase).use(ConsoleMenu).mount('#app')
