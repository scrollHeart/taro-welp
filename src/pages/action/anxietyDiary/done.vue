<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="done-wrap">
        <image style="width: 375px; height: 489px;" src="@/pages/action/images/img_done.png" />
        <p>恭喜您完成记录！</p>
        <nut-button size="large" type="primary" @click="goNextHandle">完成</nut-button>
    </main>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, Ref } from 'vue'
import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'
</script>