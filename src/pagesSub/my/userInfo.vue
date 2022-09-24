<template>
  <article class="user-info">
    <nut-avatar size="large" :icon="userInfo.avatarUrl"></nut-avatar>
    <span class="ellipsis name">{{ userInfo.nickName }}</span>
  </article>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { computed } from 'vue'
import { useStore } from '@/stores'

const auth = useStore('auth')
console.log(auth.userInfo, '------------')
const userInfo = computed(() => auth.userInfo)

</script>
<style lang="scss">
.user-info {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  box-shadow: 0 4px 5px 5px rgba(116, 99, 99, 0.01);
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
    width: 200px;
  }
}
.user-info:active {
  background-color: #f9f9f9;
}
</style>