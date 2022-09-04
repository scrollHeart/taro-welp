import { Icon, Button, Navbar, Avatar } from '@nutui/nutui-taro'
import { App } from 'vue'
const setNutUi = (app: App) => {
  app
    .use(Icon)
    .use(Button)
    .use(Navbar)
    .use(Avatar)
}
export default setNutUi
