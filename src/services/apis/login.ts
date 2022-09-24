import request from "../request";

// 微信登录
export function wechatLogin(code: string) {
    return request.get(`businessModule/wechatLogin?code=${code}`)
}