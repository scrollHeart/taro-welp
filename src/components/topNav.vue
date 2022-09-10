<template>
  <div class="status-bar" :style="{height: `${statusBarHeight}px`}"></div>
    <nut-navbar :left-show="leftShow" :title="title" :style="{height: titleBarHeight + 'px'}">
      <template #left>
        <nut-icon name="my2" color="#5d5fef" @click="goPathHandle"></nut-icon>
      </template>
    </nut-navbar>
</template>
<script lang="ts" setup>
const props = defineProps(['leftShow', 'title'])
const emit = defineEmits(['goPathHandle'])
import { useNavInfo } from '@/hooks/useNavInfo'
console.log(props.leftShow, 'leftShow----nav')
const {statusBarHeight, titleBarHeight} = useNavInfo()
const goPathHandle = () => {
  emit('goPathHandle')
}
</script>

