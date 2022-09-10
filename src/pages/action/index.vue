<template>
  <TopNav
    :leftShow="leftShow"
    :title="title"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
  <div class="action-wrap">
    <div class="item1">
      <h2>心理测评</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 157px; height: 143px;" src="@/assets/images/home/img_home_6@2x.png"></image>
    </div>
    <div class="item2">
      <h2>焦虑日记</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 157px; height: 143px;" src="@/assets/images/home/img_home_3@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
      <div class="modal-box">
        <span class="iconfont icon-suo"></span>
        暂未解锁
      </div>
    </div>
    <div class="item3">
      <h2>放松训练</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 134px; height: 141px;" src="@/assets/images/home/img_home_4@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
    </div>
    <div class="item4">
      <h2>心情记录</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 103px; height: 142px;" src="@/assets/images/home/img_home_5@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'
import { onMounted, ref } from 'vue'
import './index.scss'
import '@/assets/styles/navBar.scss'

onMounted(() => {

})




</script>
