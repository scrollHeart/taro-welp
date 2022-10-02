<template>
    <div>
        启动页面
    </div>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
setTimeout(() => {
    Taro.navigateTo({url: '/pages/guides/login'})
}, 1000)
</script>