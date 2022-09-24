<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="done-wrap">
        <view class="radar-chart">
            <e-chart ref="vueref0" canvas-id="bar-canvas" />
        </view>
        您可以在此应用程序的选项卡中再次访问这些初始评估结果。
        <p>免责声明
Welp 不是危机服务。没有人监视您在 Welp 上输入的数据。如果您认为您或您认识的人会伤害自己，请立即拨打 119。</p>
        <nut-button size="large" type="primary" @click="goNextHandle">完成</nut-button>
    </main>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, Ref } from 'vue'
import Taro from '@tarojs/taro'
import { EChart } from "echarts4taro3"
import TopNav from '@/components/topNav.vue'
import { pracResult } from '@/services/apis/action'

// 初始化心理测评数组
const scoreData = ref([])
// 初始化数据顺序
const orderArr = [14, 12, 13, 11]
// 定义echarts图表dom
const vueref0 = ref(null)
const goPathHandle = () => {
    console.log('goPathHandle')
}
const goNextHandle = () => {
  // 跳到首页
    Taro.redirectTo({url: '/pages/home/index'})
}
// 获取雷达图数据
const _pracResult = async() => {
  const {code, data} = await pracResult()
  orderArr.forEach(item => {
    data.forEach(s => {
      if (item === s.id) {
        scoreData.value.push(s.score)
      }
    })
  })
  console.log(scoreData.value, '--------------data')
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
            value: scoreData.value,
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
}

onMounted(() => {
  // 获取雷达图数据
  _pracResult()
})
</script>
<style lang="scss">
.done-wrap {
  padding: 0 20px;
  p {
      width: 311px;
      height: 128px;
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #86909C;
      line-height: 22px;
      margin-top: 30px;
  }
  .radar-chart {
      width: 100%;
      height: 318px;
  }
}
</style>