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
        <div class="footer-box">
            <b><i class="iconfont icon-yangshi_icon_tongyong_compass"></i>拨打全国预防自杀生命线</b>
            <b><i class="iconfont icon-lianjie"></i>ABCT 寻找治疗师</b>
        </div>
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
    padding: 0 40px;
    p {
        width: 311px;
        height: 128px;
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #86909C;
        line-height: 32px;
        margin: 10px 0 230px;
    }
    h3 {
        font-size: 22px;
        color: #1D2129;
        margin-top: 100px;
    }
    b {
        color: #5D5FEF;
        font-size: 22px;
    }
    .footer-box {
        display: flex;
        flex-direction: column;
        b {
            font-size: 16px;
            text-align: center;
            i {
                font-size: 20px;
                margin-right: 8px;
            }
        }
    }
}
</style>