<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="anxiety-diary1-wrap">
        <nut-progress :percentage="percentageVaule" :show-text="false" />
        <section v-if="questionObj.questionType === 1" class="radio-type-wrap">
            <h3>{{ questionObj.questionInfo }} <b class="iconfont icon-igw-l-warning"></b></h3>
            <nut-cell-group>
                <nut-cell>
                <nut-radiogroup v-model="curValue">
                    <nut-radio
                        v-for="item in questionObj.optionInfo"
                        :key="item.id"
                        :label="item.id"
                        icon-name="check-normal"
                        icon-active-name="checked"
                    >{{ item.option }}</nut-radio>
                </nut-radiogroup>
                </nut-cell>
            </nut-cell-group>
        </section>
        <section v-if="questionObj.questionType === 3" class="progress-score-wrap">
            <h3>{{ questionObj.questionInfo }} <b class="iconfont icon-igw-l-warning"></b></h3>
            <div class="level-box">
                <nut-range v-model="curValue" hidden-range :step="25" @change="onChange">
                    <template #button>
                        <div class="custom-button">
                            <span>
                                <image style="width: 48px; height: 48px;" src="@/pages/action/images/icon_location_on@2x.png" />
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
                <div class="info-box"><text>0%</text><text>100%</text></div>
            </div>
        </section>
        <section v-if="questionObj.questionType === 4" class="calendar-section-wrap">
            <h3>{{ questionObj.questionInfo }} <b class="iconfont icon-igw-l-warning"></b></h3>
            <div class="main-box">
                <nut-calendar
                    :poppable="false"
                    :default-value="date"
                    :is-auto-back-fill="true"
                    :show-title="false"
                    @choose="setChooseValue"
                >
                </nut-calendar>
                <!-- <div class="time-text-wrap">
                    时间
                    <div class="right-text-box">
                        <nut-input v-model="timeText" type="text" />
                        <div class="time-select-box">
                            <span class="active">AM</span>
                            <span>PM</span>
                        </div>
                    </div>
                </div> -->
            </div>
        </section>
        <section v-if="questionObj.questionType === 5">
            <h3>{{ questionObj.questionInfo }} <b class="iconfont icon-igw-l-warning"></b></h3>
            <p>可以写下任何想到的话</p>
            <textarea v-model="curValue" placeholder=" 在此输入..." placeholder-style="color: #ccc;" />
            <text v-if="questionObj.questionIndex === 1" @click="goHistoryHandle" class="history-box"><i class="iconfont icon-yangshi_icon_tongyong_compass"></i>历史记录</text>
        </section>
        <section v-if="questionObj.questionType === 6" class="option-section-wrap">
            <h3>{{ questionObj.questionInfo }} <b class="iconfont icon-igw-l-warning"></b></h3>
            <p>参考焦虑尺打分</p>
            <div class="main-box">
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
                    <div class="img-box"></div>
                    <div class="progress-box level-box">
                        <nut-range v-model="curValue" hidden-range :step="-25" @change="onChange">
                            <template #button>
                                <div class="custom-button">
                                    <span>
                                        <image style="width: 48px; height: 48px;" src="@/pages/action/images/icon_location_on@2x.png" />
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
            </div>
        </section>
    </main>
    <nut-button size="large" type="primary" @click="goNextHandle">下一步</nut-button>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { ref, Ref, onMounted, reactive, toRefs } from 'vue'
import TopNav from '@/components/topNav.vue'
import { getAnxietyLogList, postPracticeCommit } from '@/services/apis/action'
interface QuestionInfo  {
    id: number,
    questionIndex: number,
    questionType: number,
    questionInfo: string,
    subQuestionInfo?: any,
    optionInfo?: any,
    status?: any,
    imgUrl?: any,
    createTime?: any
}
// 初始化焦虑日志题全部信息
const anxietyLogArr:Ref<array> = ref([])
// 初始化答题进度条值
const percentageVaule:Ref<number> = ref(0)
// 初始化当前问题信息
const questionObj:QuestionInfo = reactive({
    id: 4,
    questionIndex: 4,
    questionType: 1,
    questionInfo: '',
    optionInfo: []
})
// 初始化答题记录
const practiceInfo:Ref<any[]> = ref([])
// 初始化当前题号
const curIndex:Ref<number> = ref(0)
// 初始化当前输入或选中选项的值
const curValue:Ref<any> = ref(null)
/* questionType === 1 单选题 start */
// 初始化单选默认值 radioVal
const radioVal:Ref<number> = ref(-1)
const onChange = (value) => {
    console.log(value, 'value------')
}
/* questionType === 4 时间选择 start */
// const state = reactive({
//     date: '2022-07-08'
// });
const setChooseValue = param => {
    curValue.value = param[3];
};
// toRefs(state)
const timeText:Ref<any> = ref('')
const checked:Ref<boolean> = ref(true)
/* questionType === 5 文本题 start */

// 跳转到历史记录页面
const goHistoryHandle = () => {
    Taro.navigateTo({url: '/pages/action/anxietyDiary/history'})
}
// 渲染当前题目信息
const curRender = () => {
    // 获取进度条数值
    percentageVaule.value = (curIndex.value * 100 / (anxietyLogArr.value.length)).toFixed(2)
    const curObj = anxietyLogArr.value[curIndex.value]
    Object.assign(questionObj, curObj)
    questionObj.optionInfo = JSON.parse(questionObj.optionInfo)
}
// 下一题
const goNextHandle = () => {
    if (curValue.value) {
        if (curIndex.value < (anxietyLogArr.value.length - 1)) {
            // 把值放到practiceInfo中
            const { id, questionIndex, questionType } = anxietyLogArr.value[curIndex.value]
            // practiceId
            practiceInfo.value.push({
                id,
                questionIndex,
                questionType,
                value: curValue.value,
                selectedId: 0,
                score: 0,
            })
            console.log(practiceInfo.value, '答题记录')
            curIndex.value++
            // 获取当前题目信息
            curRender()
            // 清空当前题目值信息
            curValue.value = null
        } else {
            // 获取进度条数值
            percentageVaule.value = 100
            // 把值放到practiceInfo中
            const { id, questionIndex, questionType } = anxietyLogArr.value[curIndex.value]
            // practiceId
            practiceInfo.value.push({
                id,
                questionIndex,
                questionType,
                value: curValue.value,
                selectedId: 0,
                score: 0,
            })
            console.log(practiceInfo.value, '答题记录')
            console.log('最后一题')
            _postPracticeCommit(practiceInfo.value)
        }
    }
}
// 提交练习题
const _postPracticeCommit = async (arr) => {
    const params = {
        practiceId: 3,
        practiceInfo: arr
    }
    try {
        const {code, data, msg} = await postPracticeCommit(params)
        // const {code, data, msg} = mockData
        if (code === 200) {
            // 跳转到完成页面
        } else {
            console.log(msg)
        }

    }
    catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    // 获取焦虑日志题信息
   _getAnxietyLogList()
})

const _getAnxietyLogList = async () => {
    const res = await getAnxietyLogList()
    // 获取焦虑日志题全部信息
    anxietyLogArr.value = res
    // 获取当前题目信息
    curRender()
}
</script>
<style lang="scss">
.anxiety-diary1-wrap {
    .history-box {
        display: flex;
        justify-content: center;
        margin: 19px 0 35px;
        color: #5D5FEF;
        i {
            margin-right: 5px;
        }
    }
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
    .radio-type-wrap {
        padding: 0 20px;
        margin-bottom: 60px;
        h3 {
            margin: 50px 0 70px;
        }
        .nut-radiogroup {
            width: 100%;
        }
        .nut-radio {
            height: 55px;
            border-bottom: 1px solid #eee;
        }
        .nut-radio__label {
            margin-left: -15px;
            font-size: 16px;
            color: #1D2129;
        }
        .nut-radio__icon,
        .nut-radio__icon--unchecked {
            left: 93%;
        }
        .nut-cell-group__warp,
        .nut-cell {
            background-color: transparent;
        }
    }
    .time-text-wrap {
        display: flex;
        justify-content: space-between;
        margin: 16px;
        .right-text-box {
            display: flex;
        }
        .nut-input  {
            width: 86px;
            height: 36px;
            background: rgba(118,118,128,0.12);
            border-radius: 6px 6px 6px 6px;
            padding: 10px;
            margin-right: 5px;
        }
    }
    .time-select-box {
        width: 98px;
        height: 32px;
        border-radius: 7px;
        background-color: #EEEEEF;
        font-size: 13px;
        color: #1D2129;
        display: flex;
        span {
            display: flex;
            flex: 0 1 50%;
            text-align: center;
            align-items: center;
            justify-content: center;
        }
        .active {
            width: 49px;
            height: 32px;
            background: #FFFFFF;
            box-shadow: 0px 3px 1px 1px rgba(0,0,0,0.04), 0px 3px 8px 1px rgba(0,0,0,0.12);
            border-radius: 7px 7px 7px 7px;
            opacity: 1;
            border: 1px solid rgba(0,0,0,0.04);
            box-sizing: border-box;
        }
    }
    .progress-score-wrap {
        padding: 0 20px;
        h3 {
            margin: 30px 0 95px;
        }
        .level-box {
            margin-bottom: 220px;
        }
    }
    .calendar-section-wrap {
        padding: 0 16px;
        .main-box {
            margin: 30px 0 60px;
            background-color: #fff;
            border-radius: 8px;
            height: 400px;
        }
        .nut-calendar {
            height: 330px;
        }
    }
    .option-section-wrap {
        padding: 0 20px;
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
        .img-box {
            height: 74px;
            width: 100%;
            background: url('./images/img_costanchor_2@2x.png') no-repeat;
            background-size: cover;
        }
        .progress-box {
            height: 100px;
        }
    }
    .level-box {
        padding-top: 60px;
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
        .selected-cross-box {
            &::before {
                background-color: #5D5FEF;
            }
        }
        .no-selected-cross-box {
            &::before {
                background-color: #DEDDFF;
            }
        }
    }
}
</style>