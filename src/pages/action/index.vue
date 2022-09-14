<template>
  <TopNav
    :leftShow="false"
    title="练习"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
  <div class="action-wrap">
    <div class="item1" @click="goDetailHandle('psychologicalTests')">
      <h2>心理测评</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 157px; height: 143px;" src="@/assets/images/home/img_home_6@2x.png"></image>
    </div>
    <div class="item2" @click="goDetailHandle('anxietyDiary')" >
      <h2>焦虑日记</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 157px; height: 143px;" src="@/assets/images/home/img_home_3@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
      <div class="modal-box">
        <div class="unlock-box">
          <span class="iconfont icon-suo" style="fontSize: 46px;"></span>
          <span>暂未解锁</span>
        </div>
      </div>
    </div>
    <div class="item3" @click="goDetailHandle('3')">
      <h2>放松训练</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 134px; height: 141px;" src="@/assets/images/home/img_home_4@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
      <div class="modal-box">
        <div class="unlock-box">
          <span class="iconfont icon-suo" style="fontSize: 46px;"></span>
          <span>暂未解锁</span>
        </div>
      </div>
    </div>
    <div class="item4" @click="goDetailHandle('4')">
      <h2>心情记录</h2>
      <span>第1周  今日训练 1/3</span>
      <image style="width: 103px; height: 142px;" src="@/assets/images/home/img_home_5@2x.png"></image>
      <div class="bor-box">
        <div class="new-week"><span class="iconfont icon-xingxing"></span>本周新增</div>
      </div>
      <div class="modal-box">
        <div class="unlock-box">
          <span class="iconfont icon-suo" style="fontSize: 46px;"></span>
          <span>暂未解锁</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'
import { onMounted, ref } from 'vue'
import './index.scss'

// 导航路由跳转
const goPathHandle = () => {
  Taro.navigateTo({ url: '/pagesSub/my/index' })
}
// 跳转到对应练习页面
const goDetailHandle = (val: string) => {
  console.log(val)
  Taro.navigateTo({ url: `/pagesSub/actions/${val}/index` })

}


</script>

