<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <div class="reality-check-wrap">
        <h3>xxx</h3>
        <section class="step1" v-if="step1Show">
            <p>你在日记中记录了<b>{{ createTime }}</b> 发生的这种担忧：</p>
            <div class="detail-box">
                当我们坐在一起的时候，我们会感到痛苦，我们会为我们的幸福而努力。
                <span>2022年2月7日 / 2:08 上午</span>
            </div>
            <h4>这真的发生了吗?</h4>
            <nut-radiogroup v-model="radioVal" direction="horizontal">
                <nut-radio label="1">是</nut-radio>
                <nut-radio label="2">否</nut-radio>
            </nut-radiogroup>
            <nut-button size="large" type="primary" @click="goNextHandle">下一步</nut-button>
        </section>
        <section class="step2" v-if="step2Show">
            <p>请将<b>实际发生</b>的事情从 -100 到 0打分。</p>
            <div class="option-box">
                <ul>
                    <li>
                        <b>0</b>
                        <span>没有焦虑，平静</span>
                    </li>
                    <li>
                        <b>-25</b>
                        <span>轻度焦虑，能够应付</span>
                    </li>
                    <li>
                        <b>-50</b>
                        <span>中度焦虑，注意力不集中</span>
                    </li>
                    <li>
                        <b>-75</b>
                        <span>严重的焦虑，离开情况的想法</span>
                    </li>
                    <li>
                        <b>-100</b>
                        <span>非常严重的焦虑，最糟糕的经历</span>
                    </li>
                </ul>
            </div>
            <div class="progress-img-wrap">
                <div class="progress-box level-box">
                    <nut-range v-model="curValue" hidden-range :step="-25" @change="onChange">
                        <template #button>
                            <div class="custom-button">
                                <span>
                                    <image style="width: 48px; height: 48px;" src="@/assets/icons/icon_location_on@2x.png" />
                                    <text>{{ curValue }}</text>
                                </span>
                            </div>
                        </template>
                    </nut-range>
                    <div class="cross-line-group">
                        <b class="cross-line1"></b>
                        <b class="cross-line2"></b>
                        <b class="cross-line3"></b>
                    </div>
                    <div class="info-box"><text>0</text><text>-100</text></div>
                </div>
            </div>
            <nut-button size="large" type="primary" @click="goDoneHandle">完成</nut-button>
        </section>
    </div>
</template>
<script lang="ts" setup>
import Taro from 'tarojs/taro'
import { ref } from 'vue'
import TopNav from '@/components/topNav.vue'
// 单选值初始化
const radioVal = ref('')
// 创建时间初始化
const createTime = ref('')
createTime.value = '2022年5月20日'
// 初始化当前输入或选中选项的值
const curValue:Ref<any> = ref(null)
// 第一步显示
const step1Show = ref(true)
// 第二步显示
const step2Show = ref(false)
// 返回页面
const goPathHandle = () => {
    console.log('goPathHandle')
}
// 下一步
const goNextHandle = () => {
    if (radioVal.value && radioVal.value === '2') {
        // 调用现实检验完成接口
        // 返回上一页
        console.log('返回上一页')
    } else {
        step1Show.value = false
        step2Show.value = true
    }
    console.log('下一步')
}
// 完成
const goDoneHandle = () => {
    // 调用现实检验完成接口
    // 返回上一页
}
</script>
<style lang="scss">
.reality-check-wrap {
    padding: 0 20px;
    h3 {
        margin: 25px 0;
        text-align: center;
        font-weight: 600;
    }
    p {
        font-size: 16px;
        color: #2F394F;
        b {
            color: #5D5FEF;
        }
    }
    .detail-box {
        height: 106px;
        background: #FFFFFF;
        box-shadow: 0px 1px 8px 1px rgba(20,46,110,0.1);
        border-radius: 8px 8px 8px 8px;
        margin: 10px 0 25px;
        padding: 13px;
        box-sizing: border-box;
        span {
            color: #C9CDD4;
        }
    }
    h4 {
        padding: 0 14px;
        margin-bottom: 25px;
    }
    .nut-radiogroup {
        display: inline-block;
        padding: 0 14px;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 30px;
    }
    .nut-radiogroup--horizontal .nut-radio {
        flex: 0 1 50%;
    }
    .step2 {
        .option-box {
            height: 230px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 1px rgba(20,46,110,0.1);
            border-radius: 8px 8px 8px 8px;
            padding: 16px;
            box-sizing: border-box;
            color: #86909C;
            li {
                height: 42px;
                b {
                    width: 41px;
                    height: 22px;
                    background: #DEDDFF;
                    border-radius: 8px 8px 8px 8px;
                    margin-right: 10px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    color: #5D5FEF;
                    font-size: 15px;
                }
            }
        }
        .progress-img-wrap {
            margin-top: 30px;
        }
        .progress-box {
            height: 100px;
        }
        .info-box {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #7A8499;
        }
        .nut-range {
            height: 30px;
            border-radius: 30px;
            background-color: #DEDDFF;
        }
        .cross-line-group {
            width: 100%;
            height: 30px;
            position: relative;
            b {
                width: 2px;
                height: 100%;
                background-color: #FBFAF9;
                position: absolute;
                top: -17px;
            }
            .cross-line1 {
                left: 25%;
            }
            .cross-line2 {
                left: 50%;
            }
            .cross-line3 {
                left: 75%;
            }
        }
        .custom-button {
            width: 48px;
            height: 48px;
            image {
                width: 48px;
                height: 48px;
                position: relative;
                top: -40px;
            }
            text {
                position: absolute;
                top: -29px;
                left: 50%;
                font-size: 20rpx;
                font-weight: 600;
                color: #5D5FEF;
                transform: translate(-50%, 0);
            }
        }
    }
}
</style>
