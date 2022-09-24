import { ActionSheet, Popup, Icon, Button, Navbar, Avatar, Progress, Cell, CellGroup, Radio, RadioGroup, Range, TextArea, Toast, Calendar, Input, InfiniteLoading, Swiper, SwiperItem } from '@nutui/nutui-taro'
import { App } from 'vue'
const setNutUi = (app: App) => {
  app
    .use(ActionSheet)
    .use(Popup)
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
    .use(Toast)
    .use(Calendar)
    .use(Input)
    .use(InfiniteLoading)
    .use(Swiper)
    .use(SwiperItem)
}
export default setNutUi
