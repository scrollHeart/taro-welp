<template>
  <TopNav
    :leftShow="leftShow"
    :title="title"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
  <view class="home-wrap">
    <!-- 课程提醒 -->
    <div class="course-remind">
      <span>&#x23f0; 今天 <b class="txt-color">{{ courseTime }}</b> 有课程学习</span>
      <span class="txt-color">查看</span>
    </div>
    <div class="course-remind">
      <span>&#x23f0; <b class="txt-color">生物期中考试</b> 怎么样了？</span>
      <span class="txt-color">现实检验</span>
    </div>
    <div class="course-remind">
      <span>👏 你已完成预测试！</span>
    </div>
    <!-- 课程学习 -->
    <div class="card-wrap course-wrap">
      <div class="card-left">
        <h2>{{ curActionCardInfo[0].text }}</h2>
        <span>第{{ curPractice.week }}周  今日训练 {{ curPractice.num }}/{{ curPractice.total }}</span>
      </div>
    </div>
    <h1>当前练习</h1>
    <div class="card-wrap" :style="{ backgroundColor: curActionCardInfo[curPractice.actionType].bgColor }">
      <div class="card-left">
        <h2>{{ curActionCardInfo[curPractice.actionType].text }}</h2>
        <span>第{{ curPractice.week }}周  今日训练 {{ curPractice.num }}/{{ curPractice.total }}</span>
      </div>
      <div class="card-right">
        <image :style="{ width: curActionCardInfo[curPractice.actionType].width, height: curActionCardInfo[curPractice.actionType].height }" :src="curActionCardInfo[curPractice.actionType].url"></image>
      </div>
    </div>
    <h1>当前成就</h1>
    <ul>
      <li>
        <image style="width: 44px; height: 44px;" src="@/assets/icons/icon_home_1@2x.png"></image>
        <!-- <div class="iconfont icon-jurassic_pie-chart" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div> -->
        <div class="num">12</div>
        <div class="txt">心理测评</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="@/assets/icons/icon_home_2@2x.png"></image>
        <!-- <div class="iconfont icon-lingxing" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div>
        <div class="iconfont icon-lingxing" style="width: 50px; height: 30px; margin-top: -40px; font-size: 40px; color: #deddff;"></div> -->
        <div class="num">23</div>
        <div class="txt">焦虑日记</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="@/assets/icons/icon_home_3@2x.png"></image>
        <!-- <div class="iconfont icon-xuexibiji" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div> -->
        <div class="num">23</div>
        <div class="txt">现实检验</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="@/assets/icons/icon_home_4@2x.png"></image>
        <!-- <div class="iconfont icon-paichudingcengtuxing" style="width: 50px; height: 50px; font-size: 40px; color: #deddff;"></div> -->
        <div class="num">23</div>
        <div class="txt">课程学习</div>
      </li>
    </ul>
    <h1>
      测评数据
      <span class="more">查看更多</span>
    </h1>
    <view class="radar-chart">
      <e-chart ref="vueref0" canvas-id="bar-canvas" />
      <div class="time-info">
        <span class="time-title">三天前</span>
        <span class="time-detail">2022/2/22</span>
      </div>
    </view>

  </view>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, Ref } from 'vue'
import Taro from '@tarojs/taro'
import { EChart } from "echarts4taro3"
import TopNav from '@/components/topNav.vue'

import './index.scss'
import '@/assets/styles/navBar.scss'

import homeImg3 from '@/assets/images/home/img_home_3@2x.png'
import homeImg4 from '@/assets/images/home/img_home_4@2x.png'
import homeImg5 from '@/assets/images/home/img_home_5@2x.png'
import homeImg6 from '@/assets/images/home/img_home_6@2x.png'
import homeBg from '@/assets/images/home/img_home_7@2x.png'

/* 头部导航 start */
// 导航路由跳转
const goPathHandle = () => {
  Taro.navigateTo({ url: '/pagesSub/my/index' })
}
// 导航返回箭头
const leftShow:Ref<boolean> = ref(false)
leftShow.value = false
// 导航标题
const title:Ref<string> = ref('')
title.value = 'WELP'
/* 头部导航 end */

// 课程提醒
const courseTime:Ref<string> = ref('')
courseTime.value = '17:00'
/* 当前练习 start */
const curPractice = reactive({
  actionType: 4,
  title: '',
  week: 0,
  num: 0,
  total: 0
})
curPractice.title = '放松训练'
const curActionCardInfo = {
        0: {
          width: '111px',
          height: '100px',
          bgColor: '#5D5FEF',
          url: homeBg,
          text: '课程学习'
        },
        1: {
          width: '111px',
          height: '100px',
          bgColor: '#FF9A2E',
          url: homeImg6,
          text: '心理测评'
        },
        2: {
          width: '120px',
          height: '106px',
          bgColor: '#FF664F',
          url: homeImg3,
          text: '焦虑日记'
        },
        3: {
          width: '98px',
          height: '97px',
          bgColor: '#3F9BFF',
          url: homeImg4,
          text: '放松训练'
        },
        4: {
          width: '67px',
          height: '93px',
          bgColor: '#1FBE8E',
          url: homeImg5,
          text: '心情记录'
        }
      }


/* 当前练习 end */
// 定义echarts图表dom
const vueref0 = ref(null)
onMounted(() => {
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    radar: [
      {
        indicator: [
          { text: '一般焦虑', max: 100 },
          { text: '抑郁', max: 100 },
          { text: '学业焦虑', max: 100 },
          { text: '拖延', max: 100 }
        ],
        center: ['50%', '50%'],
        radius: 100,
        axisName: {
          color: "rgba(47, 57, 79, 1)",
          fontSize: 16
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(228, 234, 240, 1)"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(228, 234, 240, 1)"
          }
        },
        splitArea: {
          show: false
        },
      },
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {
          color: "rgba(192, 190, 245, 1)"
        },
        itemStyle: {
          color: '#5D5FEF',
          opacity: 0
        },
        lineStyle: {
          width: 4
        },
        data: [
          {
            value: [60, 73, 85, 40],
            name: '雷达图'
          }
        ]
      }
    ]
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



