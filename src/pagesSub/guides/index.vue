<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
  <nut-swiper :init-page="state.page" ref="swiper">
    <nut-swiper-item>
        <div>
            <image height="300px" mode="heightFix" src="@/assets/images/login/img_guide1.png" />
            <p>
                <span>本项目旨在帮助大学生缓解焦虑症状，</span>
                <span>不提供医学诊断或药物使用建议，</span>
                <span>不提供危机干预</span>
            </p>
        </div>
      <nut-button size="large" plain type="primary" @click="handleNext">下一步</nut-button>
    </nut-swiper-item>
    <nut-swiper-item>
        <div>
            <image height="300px" mode="heightFix" src="@/assets/images/login/img_guide2.png" />
            <p>
                <span>本项目将对您的数据进行匿名化处理，</span>
                <span>并仅用于科研目的，</span>
                <span>您在任何时候都有权利终止并退出项目</span>
            </p>
      </div>
      <nut-button size="large" plain type="primary" @click="handleNext">下一步</nut-button>
    </nut-swiper-item>
    <nut-swiper-item>
        <div>
            <image height="300px" mode="heightFix" src="@/assets/images/login/img_guide3.png" />
            <p>
                <span>您的年龄需要在18岁及以上，</span>
                <span>每个人只可注册一个账号，</span>
                <span>身份信息一经绑定无法修改</span>
            </p>
      </div>
      <nut-button size="large" plain type="primary" @click="handleNext">完成</nut-button>
    </nut-swiper-item>
  </nut-swiper>

</template>
<script lang="ts" setup>
  import { ref, Ref, reactive } from 'vue';
  import Taro from '@tarojs/taro'
  import TopNav from '@/components/topNav.vue'
    const swiper = ref(null) as Ref;
    const state = reactive({
        page: 0,
    })
    const goPathHandle = () => {
        console.log('goPathHandle')
    }
    const handleNext = () => {
        if (state.page < 2) {
            swiper.value.next();
            state.page++
        } else {
            console.log('跳转到信息补全页')
            Taro.navigateTo({url: '/'})
        }
    }

</script>
<style lang="scss">
.nut-swiper {
    margin-top: 70px;
    height: calc(100% - 170px);
}
.nut-swiper-item {
    line-height: 150px;
    >div {
        text-align: center;
    }
    // image {
    //     width: 100%;
    //     height: auto;
    // }
    p {
        height: 84px;
        font-size: 16px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2F394F;
        line-height: 28px;
        text-align: center;
        margin-top: -50px;
        margin-bottom: 20px;
    }
}

</style>
