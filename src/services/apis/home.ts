import request from '../request'

// 获取用户当前所处阶段
export function getCurUserStage() {
    return request.post('businessModule/homePage/getCurUserStage')
  }

 // 获取首页数据
export function getHomePsychometricInfo() {
    return request.post('businessModule/homePage/info')
  }
  // 补全用户信息
  export function updateUserInfo(params) {
    return request.post('businessModule/user/update', params)
  }

  // 用户信息回显
  export function getUserDetail() {
    return request.post('businessModule/user/detail')
  }
