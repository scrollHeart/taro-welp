<template>
  <nut-navbar :left-show="false" title="WELP">
    <template #left>
      <!-- <div>返回</div> -->
      <nut-icon name="my2" color="#5d5fef" @click="goMyPageHandle"></nut-icon>
    </template>
  </nut-navbar>
  <view class="index">
    <h1>当前练习</h1>
    <image
      style="width: 100%;height: 100px;background: #fff;"
      src="@/assets/images/home/home_img.png"
    />
    <h1>当前成就</h1>
    <ul>
      <li>
        <!-- <image style="width: 50px; height: 50px;" src="@/assets/icons/home_default.svg"></image> -->
        <div class="iconfont icon-jurassic_pie-chart" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div>
        <div>12</div>
        <div>心理测评</div>
      </li>
      <li>
        <div class="iconfont icon-lingxing" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div>
        <div class="iconfont icon-lingxing" style="width: 50px; height: 30px; margin-top: -40px; font-size: 40px; color: #deddff;"></div>
        <div style="margin-top: 10px;">23</div>
        <div>焦虑日记</div>
      </li>
      <li>
        <div class="iconfont icon-xuexibiji" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div>
        <div>23</div>
        <div>现实检验</div>
      </li>
      <li>
        <div class="iconfont icon-paichudingcengtuxing" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div>
        <div>23</div>
        <div>课程学习</div>
      </li>
    </ul>
    <h1>测评数据</h1>
    <view class="bar-chart">
      <e-chart ref="vueref0" canvas-id="bar-canvas" />
    </view>

  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import { EChart } from "echarts4taro3"

import './index.scss'
const msg = ref('Hello world')
const goMyPageHandle = () => {
  Taro.navigateTo({ url: '/pagesSub/my/index' })
}
const vueref0 = ref(null)

onMounted(() => {
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  Taro.nextTick(() => {
    setTimeout(() => {
      vueref0.value.refresh(option); // 初始化图表
      setInterval(() => {
        let firstValue = option.series[0].data.shift()
        option.series[0].data.push(firstValue)
        vueref0.value.setOption(option) // 异步更新图表数据
      }, 2000)
    }, 200)
  })
})
</script>
