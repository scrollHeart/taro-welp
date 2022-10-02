<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="grogress-gauge">
        <div class="gauge">
            <image style="width:252px;" mode="widthFix" src="./images/graph@2x.png"></image>
            <i class="iconfont icon-a-icon_test_51" :style="{transform: `rotate(${degNum}deg);`}"></i>
            <div class="data-value-box">
                <span>0</span>
                <!-- <span class="big-size">{{ score }}</span>
                <span>{{ scoreTotal }}</span> -->
                <span class="big-size">10</span>
                <span>26</span>
            </div>
        </div>
        <h3>{{ result }}</h3>
        <p>
            如果你努力，我们认为Welp将帮助你解决学业上的烦恼。Welp并不是用来帮助解决其他类型的忧虑的，因此与你的医生或训练有素的心理健康专家进行对话可能是值得的。
        </p>
        <nut-button size="large" plain type="primary" @click="goNextHandle">{{ goNextText }}</nut-button>
    </main>
</template>
<script lang="ts" setup>
import Taro, {Current} from '@tarojs/taro'
// import { EChart } from "echarts4taro3"
import TopNav from '@/components/topNav.vue'

import { ref, Ref, onMounted} from 'vue'
// 获取路由传参分数和抑郁程度
const data = JSON.parse(Current.router.params.data)
console.log(data, '4567890-----data')
// 获取总分数
const scoreTotal = data.scoreTotal
// 获取当前得分
const score = data.score

const degNum = (((score / scoreTotal) - 0.5) * 180).toFixed(2)

const result = data.result
console.log(Taro.getStorageSync('psychometricIdArr'), '4567890-----Taro.getStorageSync')
const psychometricIdArr = JSON.parse(Taro.getStorageSync('psychometricIdArr'))
let curSubPsychometricId = Taro.getStorageSync('curSubPsychometricId')
//
const goNextText:Ref<string> = ref('')
goNextText.value = '下一节'
// 定义图表dom
// const gauge = ref(null)
console.log(data, '路由传参分数和抑郁程度')
// 跳转到下一节答题
const goNextHandle = () => {
    // 下一节、完成
    let num = -1;
    psychometricIdArr.forEach((item, index) => {
        if (item.id === curSubPsychometricId) {
            num = index
        }
    })
    if (psychometricIdArr[num + 1]) {
        curSubPsychometricId =  psychometricIdArr[num + 1].id
        Taro.setStorageSync('curSubPsychometricId', curSubPsychometricId)
        // 继续答题
        Taro.redirectTo({url: '/pages/action/psychologicalTests/topic'})
    } else {
        goNextText.value = '下一步'
        Taro.setStorageSync('curSubPsychometricId', null)
        Taro.setStorageSync('psychometricIdArr', null)
        // 跳转到显示雷达图结果页
        Taro.redirectTo({url: '/pages/action/psychologicalTests/done'})
    }
}
const depressionDegree = ref('')
depressionDegree.value = '中度到严重'

onMounted (() => {
    let option = {
        series: [
            {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 40,
            splitNumber: 4,
            itemStyle: {
              color: 'transparent',
            //   shadowColor: 'rgba(0,138,255,0.45)',
            //   shadowBlur: 10,
            //   shadowOffsetX: 2,
            //   shadowOffsetY: 2
            },
            progress: {
                show: true,
                // roundCap: true,
                width: 28
            },
            axisLine: {
                // show: false,
                // roundCap: true,
                lineStyle: {
                width: 28,
                color: [
                    [0.25, '#DEDDFF'],
                    [0.5, '#ADABF8'],
                    [0.75, '#9290F4'],
                    [1, '#5D5FEF']
                ]
                }
            },
            axisTick: {
                show: false,
                splitNumber: 2,
                lineStyle: {
                width: 2,
                color: '#999'
                }
            },
            splitLine: {
                show: false,
                length: 12,
                lineStyle: {
                width: 3,
                color: '#999'
                }
            },
            axisLabel: {
                show: false,
                distance: 30,
                color: '#999',
                fontSize: 20
            },
            title: {
                show: false
            },
            data: [
                {
                value: 5
                }
            ]
            }
        ]
    }
      Taro.nextTick(() => {
    setTimeout(() => {
    //   gauge.value.refresh(option); // 初始化图表
    }, 200)
  })
})

</script>
<style lang="scss">
.grogress-gauge {
    padding: 0 32px;
    p {
        width: 311px;
        height: 128px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #86909C;
        line-height: 32px;
        margin: 30px 0 110px;
    }
    h3 {
        font-size: 22px;
        color: #1D2129;
        margin-top: 30px;
    }
    b {
        color: #5D5FEF;
        font-size: 22px;
    }
    .gauge {
        position: relative;
        .icon-a-icon_test_51 {
            position: absolute;
            left: 50%;
            bottom: 40px;
            font-size: 45px;
            color: #5D5FEF;
            margin-left: -25px;
            transform-origin: center bottom;
        }
        image {
            margin-left: -14px;
            position: relative;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .data-value-box {
            width: 200px;
            position: relative;
            display: flex;
            justify-content: space-between;
            left: 50%;
            transform: translate(-50%,0);
            font-size: 16px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #5D5FEF;
            text-align: center;
            .big-size {
                font-size: 24px;
            }
            span {
                display: inline-block;
            }
        }
    }
}
</style>