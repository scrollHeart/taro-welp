<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="remind-box">
        <h3>您的回答表明您有临床上明显的 <b>{{ depressionDegree }}</b> 倾向</h3>
        <p>我们强烈建议您寻求专业帮助来处理这些问题
该计划并非旨在治疗抑郁症或自杀</p>
        <b>拨打全国预防自杀生命线</b>
        <b>ABCT 寻找治疗师</b>
    </main>
</template>
<script lang="ts" setup>
import TopNav from '@/components/topNav.vue'
import { ref } from 'vue'

const depressionDegree = ref('')
depressionDegree.value = '抑郁症和/或自杀'
</script>
<style lang="scss">
.remind-box {
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