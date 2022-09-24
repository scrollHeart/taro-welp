<template>
  <ul class="infiniteUl" id="scroll"  style='height: 100%;'>
    <nut-infiniteloading
        containerId = 'scroll'
        :use-window='false'
        :has-more="hasMore"
        @load-more="loadMore"
    >
        <li class="infiniteLi" v-for="(item, index) in defultList" :key="index">{{item}}</li>
    </nut-infiniteloading>
  </ul>
</template>

<script>
  import { ref,reactive,onMounted,toRefs} from 'vue';
  export default {
    setup(props) {
      const hasMore = ref(true);
      const data = reactive({
        defultList: []
      });
      const loadMore = done => {
        setTimeout(() => {
          const curLen = data.defultList.length;
          for (let i = curLen; i < curLen + 10; i++) {
            data.defultList.push(`${i}`);
          }
          if (data.defultList.length > 30) hasMore.value = false;
          done()
        }, 500);
      };
      const init = () => {
        for (let i = 0; i < 10; i++) {
          data.defultList.push(`${i}`);
        }
      }
      onMounted(() => {
        init()
      });
      return { loadMore, hasMore, ...toRefs(data) };
    }
  }
</script>

<style>
.infiniteUl {
  height: 300px;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background:#eee
}
.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(100, 100, 100, 1);
  text-align: center;
}
</style>
