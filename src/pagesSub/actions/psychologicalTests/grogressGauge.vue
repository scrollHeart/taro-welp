<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="grogress-gauge">
        进度仪表盘
        <h3>你可能有 <b>{{ depressionDegree }}</b>的抑郁症状</h3>
        <p>
            如果你努力，我们认为Welp将帮助你解决学业上的烦恼。Welp并不是用来帮助解决其他类型的忧虑的，因此与你的医生或训练有素的心理健康专家进行对话可能是值得的。
        </p>
        <nut-button size="large" plain type="primary" @click="goNextHandle">下一节</nut-button>
    </main>
</template>
<script lang="ts" setup>
import Taro, {Current} from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'
import { ref, Ref } from 'vue'
// 获取路由传参分数和抑郁程度

// 跳转到下一节答题
const goNextHandle = () => {
    Taro.redirectTo({url: '/pagesSub/actions/psychologicalTests/topic'})
}
const depressionDegree = ref('')
depressionDegree.value = '中度到严重'
</script>
<style lang="scss">
.grogress-gauge {
    p {
        width: 311px;
        height: 128px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #86909C;
        line-height: 32px;
    }
    h3 {
        font-size: 22px;
        color: #1D2129;
    }
    b {
        color: #5D5FEF;
        font-size: 22px;
    }
}
</style>