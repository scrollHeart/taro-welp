<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main>
        <image style="width: 375px; height: 489px;" src="@/pages/action/images/img_done.png" />
        您已完成初步评估。
        <nut-button size="large" plain type="primary" @click="goNextHandle">下一步</nut-button>
    </main>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'

const goPathHandle = () => {
    console.log('goPathHandle')
}
const goNextHandle = () => {
  Taro.redirectTo({url: '/pages/action/psychologicalTests/done'})
}
</script>
<style lang="scss">

</style>