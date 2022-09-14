<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="psychological-wrap">
        <h2>宾州担忧量表（PSWQ）<span class="iconfont icon-igw-l-warning"></span></h2>
        <p>PSWQ 是一个 16 项问卷，旨在衡量忧虑的特征，使用从 1（我完全不典型）到 5（我非常典型）的李克特评分。研究表明，该量表具有将广泛性焦虑症 (GAD) 患者与其他焦虑症患者区分开来的强大能力。</p>
        <div class="graph">
            <div class="shadow-box"></div>
            <span class="blue-point"><b></b>拖延</span>
            <span class="dark-point"><b></b>抑郁</span>
            <span class="green-point"><b></b>学业焦虑</span>
            <span class="red-point"><b></b>一般焦虑</span>
        </div>
        <nut-button type="primary" @click="goNextHandle">开始评估</nut-button>
    </main>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { ref, Ref, onMounted } from 'vue'
import {getPsychometricInfo} from '@/services/apis/action'
import TopNav from '@/components/topNav.vue'

import './index.scss'
// 导航路由跳转
const goPathHandle = () => {
    Taro.navigateBack({
    delta: 1
    })
}

onMounted(() => {
  _getPsychometricInfo()
})
// 初始化心理测评信息
const psychometricInfo= ref([])
// 获取心理测评顺序数组
const psychometricIdArr = ref([])
// psychometricIdArr.value = ['11']
// 初始化名称数组
const topicNameArr = ['抑郁', '一般焦虑', '学业焦虑', '拖延']


console.log(getPsychometricInfo, 'getPsychometricInfo----')

const _getPsychometricInfo = async () => {
    const res = await getPsychometricInfo()
    psychometricInfo.value = JSON.parse(res.ruleInfo)
    for (let j = 0; j < topicNameArr.length; j++) {
        for (let i = 0; i < psychometricInfo.value.length; i++) {
            if (psychometricInfo.value[i].topicName === topicNameArr[j]) {
                psychometricIdArr.value.push(psychometricInfo.value[i].id)
            }
        }
    }
    console.log(psychometricIdArr.value, 'psychometricIdArr.value')
    Taro.setStorageSync('psychometricIdArr', JSON.stringify(psychometricIdArr.value))
}
// 跳转到开始评估页面
const goNextHandle = () => {
    Taro.navigateTo({ url: '/pagesSub/actions/psychologicalTests/topic' })
}
</script>
<style lang="scss">
.psychological-wrap {
    .nut-button {
        width: 285px;
        height: 50px;
        box-shadow: 0px 10px 20px 1px rgba(93,95,239,0.2);
        transform: translateX(-50%);
        left: 50%;
        margin-bottom: 40px;
    }
    h2 {
        position: relative;
        .icon-igw-l-warning {
            position: absolute;
            right: 0;
            top: 4px;
            font-size: 22px;
            color: #5D5FEF;
        }
    }
}
</style>

