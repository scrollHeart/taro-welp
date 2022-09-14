<template>
    <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <image></image>
    <nut-button size="large" type="primary" @click="goRegisterHandle">首次使用，注册</nut-button>
    <nut-button plain size="large" type="primary" @click="goLoginHandle">已有账号，登录</nut-button>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, Ref } from 'vue'
import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'

import {getCurUserStage, getHomePsychometricInfo} from '@/services/apis/home'
// 登录之后调用, 获取用户当前阶段
const goLoginHandle = () => {
    _getCurUserStage()
}

// 获取用户当前阶段
const _getCurUserStage = async () => {
   const res =  await getCurUserStage()
   console.log(res, '获取用户当前阶段')
}

</script>
