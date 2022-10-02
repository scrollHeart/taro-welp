<template>
<div class="index-wrap">
  <TopNav
    :leftShow="false"
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
  <div class="layout-wrap" :style="`height: ${mainHeight}px`">
    <Home v-show="activeTab === '首页'"/>
    <Action v-show="activeTab === '行动'"/>
  </div>
  <div class="tab-bar" :style="`height: ${tabBarHeight}px`">
    <span :class="{'active': activeTab === '首页'}" @click="clickTab('首页')">
      <i class="home_icon"></i>
      首页
    </span>
    <span :class="{'active': activeTab === '行动'}" @click="clickTab('行动')">
      <i class="action_icon"></i>
      行动
    </span>
    <span :class="{'active': activeTab === '数据'}" @click="clickTab('数据')">
      <i class="data_icon"></i>
      数据
    </span>
    <span :class="{'active': activeTab === '课程'}" @click="clickTab('课程')">
      <i class="course_icon"></i>
      课程
    </span>
  </div>
</div>
</template>
<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue'
import TopNav from '@/components/topNav.vue'
import Home from './components/home/index.vue'
import Action from './components/action/index.vue'
import { useNavInfo } from '@/hooks/useNavInfo'
import './tabBar.scss'
//
const { mainHeight, tabBarHeight } = useNavInfo()
console.log(mainHeight, 'mainHeight------------')
// 当前tab页设置默认
const activeTab:Ref<string> = ref('')
activeTab.value = '首页'

// 点击tab切换页面
const clickTab = (val) => {
  console.log(val, 'clickTab------')
  activeTab.value = val
}
</script>



