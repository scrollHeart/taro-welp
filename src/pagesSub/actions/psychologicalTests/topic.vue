<template>
  <TopNav
    :title="navTitle"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="topic-wrap">
        <nut-progress :percentage="percentageVaule" :show-text="false" />
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
curSubPsychometricId.value = Taro.getStorageSync('curSubPsychometricId') ? Number(Taro.getStorageSync('curSubPsychometricId')) : psychometricIdArr[0].id
// 初始化标题文字
const navTitle:Ref<string> = ref('');
// 初始化进度条数值
const percentageVaule:Ref<number> = ref(0)
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

const mockData = {
        "msg": "操作成功",
        "code": 200,
        "data": {
            "result": "可能有中度忧郁症 (最好咨询心理医生或心理医学工作者)",
            "score": 10,
            "scoreTotal": 27,
            "status": 0
        }
    }
// 设置心理测评信息
const psychometricInfo = ref([])
// 设置题目个数
const psychometricLen:Ref<number> = ref(0)
// 获取心理测评-各分类题信息数据
const _getpsyAssQuestionList = async () => {
    const res = await getpsyAssQuestionList(curSubPsychometricId.value)
    psychometricIdArr.forEach(item => {
        if (item.id === curSubPsychometricId.value) {
            navTitle.value = item.topicName
        }
    })

    psychometricInfo.value = res
    psychometricLen.value = psychometricInfo.value.length
    // 渲染当前题目信息
    renderQuestionFn()
}

// 提交练习题
const _postPracticeCommit = async (arr) => {
    const params = {
        practiceId: curSubPsychometricId.value,
        practiceInfo: arr
    }
    try {
        const {code, data, msg} = await postPracticeCommit(params)
        // const {code, data, msg} = mockData
        if (code === 200) {
            // 1.正常结果, 跳转到仪表展示结果页 2.不正常结果，跳转到提示就医页
            if (data.status !== 1) {
                Taro.navigateTo({url: `/pagesSub/actions/psychologicalTests/grogressGauge?data=${JSON.stringify(data)}`})
            } else {
                Taro.navigateTo({url: '/pagesSub/actions/psychologicalTests/remind'})
            }
        } else {
            console.log(msg)
        }
    }
    catch (error) {
        console.error(error)
    }


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
    // 获取进度条数值
    percentageVaule.value = (curIndex.value * 100 / psychometricLen.value).toFixed(2)
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
            percentageVaule.value = 100
            // 下一节、完成
            let num = -1;
            psychometricIdArr.forEach((item, index) => {
                if (item.id === curSubPsychometricId.value) {
                    num = index
                }
            })
            // 提交上套题记录
            _postPracticeCommit(practiceInfo.value)
            if ((num + 1) < psychometricIdArr.length) {
                // 当前题号归零
                curIndex.value = 0
            }
        }
    }

}
</script>
