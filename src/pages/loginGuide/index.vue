<template>
    <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <div class="login-wrap">
      <image style="width: 100%; height: 326px;" src="@/assets/images/login/img_login.png"></image>
      <!-- <nut-button class="mar-bottom-box" size="large" type="primary" @click="goRegisterHandle">首次使用，注册</nut-button> -->
      <!-- <nut-button plain size="large" type="primary" @click="goLoginHandle">已有账号，登录</nut-button> -->
      <nut-button plain size="large" type="primary" @click="wxLoginHandle">微信授权登录</nut-button>
      <nut-toast :msg="mockData.data.pracText.msg" type="text" v-model:visible="show"></nut-toast>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { useStore } from '@/stores'
import TopNav from '@/components/topNav.vue'

import {getCurUserStage} from '@/services/apis/home'
import {wechatLogin} from '@/services/apis/login'

const auth = useStore('auth')
const app = useStore('app')
const wxUserInfo = () => {
  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 用户昵称和头像
  Taro.getSetting({
    success: function (res) {
      if (!res.authSetting['scope.userInfo']) {
        Taro.authorize({
          scope: 'scope.userInfo',
          success: function () {
            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
            Taro.getUserProfile({
              desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (res) => {
                // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
                console.log(res.userInfo, 'res.userInfo----------')
                const userInfo = res.userInfo
                auth.setUserInfo({
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl
                })
              }
            })
          }
        })
      }
    }
  })
}
const wxLoginHandle = () => {
  // 首次获取用户昵称和头像
  wxUserInfo()
  // 微信发起登录
  wxlogin()
}
const wxlogin = () => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log('登录成功！' + res.code)
          _wechatLogin(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
}
// 微信登录接口
const _wechatLogin = async (code) => {
  const res = await wechatLogin(code)
  // console.log(res, 'res--------调用微信登录接口')
  if (res.code === 200 && res.data) {
    // 缓存用户信息
    Taro.setStorageSync('openid', res.data.openid)
    // 缓存token
    Taro.setStorageSync('token', res.data.token)
    // 登录之后调用, 获取用户当前阶段
    _getCurUserStage()
  }
  // [临时]获取用户当前阶段
    _getCurUserStage()
}

const mockData = {
  "code": 200000,
  "message": "success",
  "data": {
    "stageId": 1,
    "stageName": "初始",
    "pracType": false,
    "status": 0,
    "pracText": {
      "msg": "初始心理测评未完成-请先心理测评-学业焦虑",
      "id": 13
    },
    "userInfoBool": false, // 信息补全是否完成
  }
}
const show = ref(false)
// 获取用户当前阶段
const _getCurUserStage = async () => {
  try {
    // const {code, data, msg} =  await getCurUserStage()
    const {code, data, message} = mockData
    if (code === 200000) {
      if (data.status !== 1) {
        // pracType: 初始心理测评是否完成, true为完成， false为未完成, 跳转到心理评测页继续初筛
        if (data.pracType) {
          // 判断信息是否补全，补全了到首页，否则到信息补全页
          if (data.userInfoBool) {
            Taro.navigateTo({url: '/pages/home/index'})
          } else {
            Taro.navigateTo({url: '/pagesSub/guides/userInfo'})
          }
        } else {
          // 将初筛未完成状态传到store，用来后续展示引导页
          app.setuserInfoBool(data.userInfoBool)
          console.log(app.userInfoBool, 'userInfoBool--------')
          show.value = true
          Taro.setStorageSync('curSubPsychometricId', data.pracText.id)
          setTimeout(() => {
            Taro.navigateTo({url: '/pagesSub/actions/psychologicalTests/index'})
          }, 500)
        }
      } else {
        // 提示用户，测试结果不正常，终止使用app其他流程
        console.log(data.pracText.msg)
        Taro.navigateTo({url: '/pagesSub/actions/psychologicalTests/remind'})
      }
    } else {
      console.log(message)
    }
  } catch (error) {
    console.error(error)
  }
}



</script>
<style lang="scss">
.login-wrap {
  padding: 0 20px;
  margin-top: 70px;
  image {
    margin-bottom: 100px;
  }
  .mar-bottom-box {
    margin-bottom: 15px;
  }
}
</style>