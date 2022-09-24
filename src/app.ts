import { createApp } from 'vue'
import Taro from '@tarojs/taro'

import { store, useStore } from '@/stores'

import setNutUi from './nutui'


// import Taro from '@tarojs/taro'
import './assets/fonts/iconfont.css'
import './app.scss'

const App = createApp({
  onShow() {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

setNutUi(App)

App.use(store)

const auth = useStore('auth')
const app = useStore('app')

const token = Taro.getStorageSync('token')
if (!token) {
  auth.logout()
} else {
  app.startScreenLoading()
  setTimeout(() => {
    auth.login()
    app.cancelScreenLoading()
  }, 500)
}
export default App
