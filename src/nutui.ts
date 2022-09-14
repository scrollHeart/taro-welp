import { Icon, Button, Navbar, Avatar, Progress, Cell, CellGroup, Radio, RadioGroup, Range, TextArea } from '@nutui/nutui-taro'
import { App } from 'vue'
const setNutUi = (app: App) => {
  app
    .use(Icon)
    .use(Button)
    .use(Navbar)
    .use(Avatar)
    .use(Progress)
    .use(Cell)
    .use(CellGroup)
    .use(Radio)
    .use(RadioGroup)
    .use(Range)
    .use(TextArea)
}
export default setNutUi
