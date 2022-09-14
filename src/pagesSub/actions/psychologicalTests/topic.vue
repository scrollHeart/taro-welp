<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="topic-wrap">
        <nut-progress percentage="50" :show-text="false" stroke-height="24" />
        <section>
            <h3>{{ topicMSg }}</h3>
            <span class="promit">请根据您在过去一周（包括今天）的感受评分。</span>
            <div class="topic-type-box">
                <div v-if="questionType === 1">
                    <nut-cell-group>
                        <nut-cell>
                        <nut-radiogroup v-model="radioVal">
                            <nut-radio
                                v-for="item in optionArr"
                                :key="item.id"
                                :label="item.id"
                                icon-name="check-normal"
                                icon-active-name="checked"
                            >{{ item.option }}</nut-radio>
                        </nut-radiogroup>
                        </nut-cell>
                    </nut-cell-group>
                </div>
            </div>
            <nut-button size="large" plain type="primary" @click="goNextQuestionHandle">{{ guideText }}</nut-button>
        </section>
    </main>
</template>
<script lang="ts" setup>
import Taro, {Current} from '@tarojs/taro'
import { ref, Ref, onMounted } from 'vue'
import {getpsyAssQuestionList, postPracticeCommit} from '@/services/apis/action'
import TopNav from '@/components/topNav.vue'

import './topic.scss'

const psychometricIdArr = JSON.parse(Taro.getStorageSync('psychometricIdArr'))
// 初始化套题请求参数
const curSubPsychometricId:Ref<number> = ref(-1)
curSubPsychometricId.value = Taro.getStorageSync('curSubPsychometricId') ? Number(Taro.getStorageSync('curSubPsychometricId')) : psychometricIdArr[0]

onMounted(() => {
    // 调用-获取心理测评-各分类题信息
  _getpsyAssQuestionList()
})

// 导航路由跳转
const goPathHandle = () => {
    Taro.navigateBack({
        delta: 1
    })
}

// 设置心理测评信息
const psychometricInfo = ref([])
// 设置题目个数
const psychometricLen:Ref<number> = ref(0)
// 获取心理测评-各分类题信息数据
const _getpsyAssQuestionList = async () => {
    const res = await getpsyAssQuestionList(curSubPsychometricId.value)
    psychometricInfo.value = res
    psychometricLen.value = psychometricInfo.value.length
    console.log(psychometricLen.value, 'psychometricLen.value--------------------')
    // 渲染当前题目信息
    renderQuestionFn()
}

// 提交练习题
const _postPracticeCommit = async (arr) => {
    const params = {
        practiceId: curSubPsychometricId.value,
        practiceInfo: arr
    }
    const res = await postPracticeCommit(params)
}
// 初始化指引文字
const guideText:Ref<string> = ref('下一题')
// 初始化当前题目信息
const curQuestionInfo:Ref<object> = ref({})
// 初始化题目问题
const topicMSg:Ref<string> = ref('')
// 初始化题目选项
const optionArr:Ref<any[]> = ref([])
// 初始化题目类型（单选，选等级进度）
const questionType:Ref<number> = ref('')
// 设置单选选中答案的值
const radioVal:Ref<number> = ref(-1)
// 初始化每套题目的答题记录
const practiceInfo:Ref<any[]> = ref([])

// 初始化当前题目题号
const curIndex:Ref<number> = ref(0)
// 渲染当前题目信息
const renderQuestionFn = () => {
    // 获取当前题目信息
    curQuestionInfo.value = psychometricInfo.value[curIndex.value]
    // 清除上题选项结果
    radioVal.value = -1
    // 更新当前题目类型
    questionType.value = curQuestionInfo.value.questionType
    // 更新题目问题
    topicMSg.value = curQuestionInfo.value.questionInfo
    // 更新题目选项
    optionArr.value = JSON.parse(curQuestionInfo.value.optionInfo)
    // 更新指引文字
    // 若是最后一套题，显示"提交"，否则显示"下一题"
    if (curIndex.value === (psychometricLen.value - 1)) {
        guideText.value = '提交'
    } else {
        guideText.value = '下一题'
    }
}

// 进入下一题/下一节/完成
const goNextQuestionHandle = () => {
    if (radioVal.value < 0) {
        console.log('没选择选项')
        return
    } else {
        optionArr.value.forEach(item => {
            if (item.id === radioVal.value) {
                practiceInfo.value.push({
                    id: curQuestionInfo.value.id,
                    subPsychometricId: curQuestionInfo.value.subPsychometricId,
                    selectedId: radioVal.value,
                    score: item.score,
                })
            }
        })

        console.log(practiceInfo.value, 'practiceInfo.value--------')
        // 更新当前题目题号
        curIndex.value++;
        if (curIndex.value < psychometricLen.value) {
            // 渲染当前题目信息
            renderQuestionFn()
        } else {
            // 下一节、完成
            let num = psychometricIdArr.indexOf(curSubPsychometricId.value)
            if ((num + 1) < psychometricIdArr.length) {
                // 提交上套题记录
                _postPracticeCommit(practiceInfo.value)
                // 当前题号归零
                curIndex.value = 0
                // 上套题目的答题记录清空
                // practiceInfo.value = []
                // console.log('跳转到下一节')
                curSubPsychometricId.value =  psychometricIdArr[num + 1]

                Taro.setStorageSync('curSubPsychometricId', curSubPsychometricId.value)
                // 跳转到展示结果页面
                Taro.redirectTo({url: '/pagesSub/actions/psychologicalTests/grogressGauge'})
            } else {
                // 提交上套题记录
                _postPracticeCommit(practiceInfo.value)
                Taro.setStorageSync('curSubPsychometricId', null)
                Taro.setStorageSync('psychometricIdArr', null)
                console.log('已完成')
                // 跳转到初筛完成页面
                Taro.redirectTo({url: '/pagesSub/actions/psychologicalTests/preliminaryEvaluation'})
            }
        }
    }

}
</script>
