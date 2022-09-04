<template>
  <section>
    <text>{{ time }}</text>
  </section>
</template>

<script lang="ts" setup>
// import Taro from '@tarojs/taro'
import { getBookList } from '@/services/apis/action'

import { onMounted, ref } from 'vue'

onMounted(() => {
  _getBookDetai()
})



// const bookDetailData = ref({
//   id: '',
//   title: '',
//   author: '',
//   novelType: {
//     label: '',
//     value: 1
//   },
//   maker: '',
//   coverUrl: '',
//   intro: ''
// })
const time = ref('')
time.value = 'time000'
const list = ref([])
const _getBookDetai = async () => {
  const res = await getBookList()
  console.log(res.data, 'res-----------')
  list.value = res.data
  console.log(list.value, 'list.value--------------')
}
</script>
