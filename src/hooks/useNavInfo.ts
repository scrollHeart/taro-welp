
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
interface INavInfo {
    statusBarHeight: number
    titleBarHeight: number
    titelBarWidth: number
    titleRightWidth: number
    appHeaderHeight: number
    marginSides: number
    capsuleWidth: number
    capsuleHeight:number
    capsuleLeft: number
    contentHeight: number
    screenHeight: number
    tabBarHeight: number
    mainHeight: number
  }
 export function useNavInfo() {

    const navInfo:INavInfo = reactive({
        statusBarHeight: 0,
        titleBarHeight: 0,
        titelBarWidth: 0,
        appHeaderHeight: 0,
        marginSides: 0,
        capsuleWidth: 0,
        capsuleHeight:0,
        capsuleLeft: 0,
        contentHeight: 0,
        screenHeight: 0,
        tabBarHeight: 0,
        mainHeight: 0
    })
     const { statusBarHeight, screenWidth, screenHeight } = Taro.getSystemInfoSync()

     // px转换到rpx的比例
     const pxToRpxScale = screenHeight / screenWidth
     // 获取胶囊信息
     const { width, height, left, top, right } = Taro.getMenuButtonBoundingClientRect()
     // 计算标题栏高度
     const titleBarHeight = height + (top - statusBarHeight) * 2
     // 计算导航栏高度
     const appHeaderHeight = statusBarHeight + titleBarHeight
     //边距，两边的
     const marginSides = screenWidth - right
     //标题宽度
     const titelBarWidth = screenWidth - width - marginSides * 3
     // 去掉标题宽度，剩下胶囊和右边距宽度
     const titleRightWidth = width + marginSides * 3
     //去掉导航栏，屏幕剩余的高度
     const contentHeight = screenHeight - appHeaderHeight
    // 底部tabBar高度
    const tabBarHeight = Math.floor(pxToRpxScale * (82/(812/375)))
    // 主页面高度
    const mainHeight = screenHeight - appHeaderHeight - tabBarHeight
    const setNavInfo = {
        statusBarHeight, // 状态栏高度
        titleBarHeight, // 标题栏高度
        titelBarWidth, // 标题栏宽度
        titleRightWidth, // 胶囊和右边距宽度
        appHeaderHeight, // 计算导航栏高度
        marginSides, // 侧边距
        capsuleWidth: width, // 胶囊宽度
        capsuleHeight: height, // 胶囊高度
        capsuleLeft: left, // 胶囊距左边距离
        contentHeight, // 去掉导航栏，屏幕剩余的高度
        screenHeight, // 屏幕高度
        tabBarHeight, // 底部导航栏高度
        mainHeight, // 主页面高度
     }
    Object.assign(navInfo,setNavInfo)
     return navInfo
 }