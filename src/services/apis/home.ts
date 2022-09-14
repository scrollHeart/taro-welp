import request from '../request'

// 获取用户当前所处阶段
export function getCurUserStage() {
    return request.post('businessModule/homePage/getCurUserStage')
  }

 // 获取首页数据
export function getHomePsychometricInfo() {
    return request.post('businessModule/homePage/info')
  }