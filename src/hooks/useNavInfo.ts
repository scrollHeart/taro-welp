
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
    windowHeight: number
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
        windowHeight: 0,
    })
     const { statusBarHeight, screenWidth, screenHeight, windowHeight } = Taro.getSystemInfoSync()
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

     const setNavInfo = {
        statusBarHeight,
        titleBarHeight,
        titelBarWidth,
        titleRightWidth,
        appHeaderHeight,
        marginSides,
        capsuleWidth: width,
        capsuleHeight: height,
        capsuleLeft: left,
        contentHeight,
        screenHeight,
        windowHeight
     }

    //   navInfo.statusBarHeight = statusBarHeight //状态栏高度
    //   navInfo.titleBarHeight = titleBarHeight  //标题栏高度
    //   navInfo.titelBarWidth = titelBarWidth  //标题栏宽度
    //   navInfo.titleRightWidth = titleRightWidth  //标题栏宽度
    //   navInfo.appHeaderHeight = appHeaderHeight //整个导航栏高度
    //   navInfo.marginSides = marginSides //侧边距
    //   navInfo.capsuleWidth = width //胶囊宽度
    //   navInfo.capsuleHeight = height //胶囊高度
    //   navInfo.capsuleLeft = left
    //   navInfo.contentHeight = contentHeight
    //   navInfo.screenHeight = screenHeight
    //   navInfo.windowHeight = windowHeight
    Object.assign(navInfo,setNavInfo)
     return navInfo
 }