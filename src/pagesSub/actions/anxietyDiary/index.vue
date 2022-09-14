<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="anxiety-diary1-wrap">
        <nut-progress percentage="50" :show-text="false" stroke-height="24" />
        <section>
            <h3>写下我的焦虑 <b class="iconfont icon-igw-l-warning"></b></h3>
            <p>可以写下任何想到的话</p>
            <textarea v-model="value" placeholder=" 在此输入..." placeholder-style="color: #ccc;" />
            <text> 历史记录</text>
            <nut-button size="large" type="primary">下一步</nut-button>
        </section>
    </main>
</template>
<script lang="ts" setup>
import TopNav from '@/components/topNav.vue'
</script>
<style lang="scss">
.anxiety-diary1-wrap {
    h3 {
        margin-top: 70px;
        b {
            font-size: 22px;
            color: #5D5FEF;
            margin-left: 5px;
        }
    }
    h3, p {
        text-align: center;
    }
    p {
        margin-top: 5px;
        margin-bottom: 20px;
    }
    textarea {
        width: 335px;
        height: 121px;
        border-radius: 8px 8px 8px 8px;
        opacity: 1;
        border: 1px solid #E5E6EB;
        margin: 0 20px;
        font-size: 16px;
        padding: 15px;
        box-sizing: border-box;
    }
    .nut-button--large {
        margin-top: 35px;
    }
}
</style>