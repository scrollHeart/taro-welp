<template>
  <div class="status-bar" :style="{height: `${statusBarHeight}px`}"></div>
    <nut-navbar :left-show="leftShow" :title="title" :style="{height: titleBarHeight + 'px'}">
      <template #left v-if="!leftShow">
        <nut-icon name="my2" color="#5d5fef" @click="goPathHandle"></nut-icon>
      </template>
    </nut-navbar>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    leftShow?: boolean,
    title: string
  }>(), {
    leftShow: true,
    title: ''
  })

const emit = defineEmits(['goPathHandle'])
import { useNavInfo } from '@/hooks/useNavInfo'

import '@/assets/styles/navBar.scss'

console.log(props.leftShow, 'leftShow----nav')
const {statusBarHeight, titleBarHeight} = useNavInfo()
const goPathHandle = () => {
  emit('goPathHandle')
}
</script>

