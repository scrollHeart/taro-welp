<template>
  <view class="home-wrap">
    <!-- 课程提醒 -->
    <div v-if="noticeData.type">
      <div class="course-remind">
        <span>&#x23f0; 今天 <b class="txt-color">{{ courseTime }}</b> 有课程学习</span>
        <span class="txt-color">查看</span>
      </div>
      <div class="course-remind">
        <span>&#x23f0; <b class="txt-color">生物期中考试</b> 怎么样了？</span>
        <span class="txt-color">现实检验</span>
      </div>
      <div class="course-remind">
        <span>👏 你已完成预测试！</span>
      </div>
    </div>
    <!-- 课程学习 -->
    <div class="card-wrap course-wrap">
      <div class="card-left">
        <h2>{{ curActionCardInfo[0].text }}</h2>
        <span>第{{ curPractice.week }}周  今日训练 {{ curPractice.num }}/{{ curPractice.total }}</span>
      </div>
    </div>
    <div v-if="stageInfoData">
      <h1>当前练习</h1>
      <div class="card-wrap" :style="{ backgroundColor: curActionCardInfo[curPractice.actionType].bgColor }">
        <div class="card-left">
          <h2>{{ curActionCardInfo[curPractice.actionType].text }}</h2>
          <span>第{{ curPractice.week }}周  今日训练 {{ curPractice.num }}/{{ curPractice.total }}</span>
        </div>
        <div class="card-right">
          <image :style="{ width: curActionCardInfo[curPractice.actionType].width, height: curActionCardInfo[curPractice.actionType].height }" :src="curActionCardInfo[curPractice.actionType].url"></image>
        </div>
      </div>
    </div>
    <h1>当前成就</h1>
    <ul>
      <li>
        <image style="width: 44px; height: 44px;" src="../../icons/icon_home_1@2x.png"></image>
        <div class="num">{{ userAchievement.psyAssesCount }}</div>
        <div class="txt">心理测评</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="../../icons/icon_home_2@2x.png"></image>
        <div class="num">{{ userAchievement.anxietyLogCount }}</div>
        <div class="txt">焦虑日记</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="../../icons/icon_home_3@2x.png"></image>
        <div class="num">{{ userAchievement.moodRecordCount }}</div>
        <div class="txt">心情记录</div>
      </li>
      <li>
        <image style="width: 44px; height: 44px;" src="../../icons/icon_home_4@2x.png"></image>
        <div class="num">{{ userAchievement.relaxTrainCount }}</div>
        <div class="txt">放松训练</div>
      </li>
    </ul>
    <h1>
      测评数据
      <span class="more">查看更多</span>
    </h1>
    <view class="radar-chart">
      <e-chart ref="vueref0" canvas-id="bar-canvas" />
      <div class="time-info">
        <span class="time-title">{{ dayAgo }}</span>
        <span class="time-detail">{{ lastTime }}</span>
      </div>
    </view>

  </view>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted, Ref } from 'vue'
import Taro from '@tarojs/taro'
import { getHomePsychometricInfo } from '@/services/apis/home'
import { EChart } from "echarts4taro3"

import './index.scss'


import homeImg3 from '../../images/img_home_3@2x.png'
import homeImg4 from '../../images/img_home_4@2x.png'
import homeImg5 from '../../images/img_home_5@2x.png'
import homeImg6 from '../../images/img_home_6@2x.png'
import homeBg from '../../images/img_home_7@2x.png'
// stageId eg: 2
// stageName eg: 心理测评
const mapStage = {
  1: '初筛',
  2: '心理测评',
  3: '焦虑日记',
  4: '放松训练',
  5: '心情记录'
}
/* 头部导航 start */
// 导航路由跳转
const goPathHandle = () => {
  // Taro.navigateTo({ url: '/pagesSub/my/index' })
}
/* 头部导航 end */

// 课程提醒
const courseTime:Ref<string> = ref('')
courseTime.value = '17:00'
/* 当前练习 start */
const curPractice = reactive({
  actionType: 4,
  title: '',
  week: 0,
  num: 0,
  total: 0
})
curPractice.title = '放松训练'
const curActionCardInfo = {
        0: {
          width: '111px',
          height: '100px',
          bgColor: '#5D5FEF',
          url: homeBg,
          text: '课程学习'
        },
        1: {
          width: '111px',
          height: '100px',
          bgColor: '#FF9A2E',
          url: homeImg6,
          text: '心理测评'
        },
        2: {
          width: '120px',
          height: '106px',
          bgColor: '#FF664F',
          url: homeImg3,
          text: '焦虑日记'
        },
        3: {
          width: '98px',
          height: '97px',
          bgColor: '#3F9BFF',
          url: homeImg4,
          text: '放松训练'
        },
        4: {
          width: '67px',
          height: '93px',
          bgColor: '#1FBE8E',
          url: homeImg5,
          text: '心情记录'
        }
      }
const stageInfoData:Ref<any> = ref({})

/* 当前练习 end */
// 当前成就
const userAchievement = reactive({
  anxietyLogCount: 0,
  relaxTrainCount: 0,
  moodRecordCount: 0,
  psyAssesCount: 0
})
// 测评数据
const userPracList:Ref<any> = ref([]);
const indicatorList:Ref<any> = ref([]);
const sortArr = [14, 12, 13, 11];
const textArr = ['一般焦虑', '抑郁', '学业焦虑', '拖延'];
const lastTime:Ref<string> = ref('');
const dayAgo:Ref<string> = ref('');
// 消息提醒
const noticeData:Ref<any> = ref({});
// 获取首页数据
const mockData = {
  "code": 200000,
  "message": "success",
  "data": {
    "stageId": 1,
    "stageName": "初始",
    "pracType": false,
    "userInfoBool": true,
    "userInfo": {
      "id": 1,
      "userName": "刘建刚",
      "sex": "1",
      "phone": "13112345678",
      "imgUrl": null,
      "openId": "11111111111111",
      "schoolName": "郑州大学",
      "emergencyContact": "13200009987",
      "districtId": "辽宁省-铁岭市",
      "birthday": "1998-01-01",
      "professional": "化工",
      "age": 18,
      "emaile": "12345678@qq.com",
      "school": "中科院",
      "grade": "博士-博一"
    },
    "pracText": {
      "result": "可能有中度忧郁症 (最好咨询心理医生或心理医学工作者)",
      "score": "10",
      "scoreTotal": 27,
      "id": 12,
      "status": 1
    },
    "groupID": 1,
    "groupName": "教练组",
    "userAchievement": {
      "searchValue": null,
      "createBy": null,
      "createTime": "2022-08-31 02:23:33",
      "updateBy": null,
      "updateTime": "2022-09-24 11:25:56",
      "remark": null,
      "params": {},
      "id": 1,
      "userId": 1,
      "anxietyLogCount": 0,
      "relaxTrainCount": 0,
      "moodRecordCount": 0,
      "psyAssesCount": 13
    },
    "userPracList": [
      {
        "id": 11,
        "topicName": "心理测评-拖延",
        "score": 43,
        "scoreTotal": 50
      },
      {
        "id": 12,
        "topicName": "心理测评-抑郁",
        "score": 10,
        "scoreTotal": 27
      },
      {
        "id": 13,
        "topicName": "心理测评-学生焦虑",
        "score": null,
        "scoreTotal": 20
      },
      {
        "id": 14,
        "topicName": "心理测评-一般焦虑",
        "score": null,
        "scoreTotal": 21
      }
    ],
    "notice": {
      "type": null,
      "noticeName": null,
      "noticeTime": null
    },
    "stageInfo": null
  }
}
const _getHomePsychometricInfo = async () => {
  try {
    // const { code, data, message } = mockData;
    const { code, data, message } = await getHomePsychometricInfo();
    if (code === 200000) {
      console.log(data.userAchievement, 'data-------')
      const {stageId, stageName, stageInfo, notice} = data;
      const { anxietyLogCount, relaxTrainCount, moodRecordCount, psyAssesCount } = data.userAchievement;
      Object.assign(userAchievement, {anxietyLogCount, relaxTrainCount, moodRecordCount, psyAssesCount});
      let userPracData = data.userPracList;
      userPracData.sort((start, next) => {
        return sortArr.indexOf(start.id) - sortArr.indexOf(next.id)
      })
      console.log(userPracData, 'userPracData----------------------')
      // 当前练习
      stageInfoData.value = stageInfo;
      // mapStage
      // 消息提醒
      noticeData.value = notice;
      // 雷达图数据
      userPracList.value = userPracData.map(item => {
        return item.score ? item.score : 0;
      })
      // 雷达图指标名称和max
      indicatorList.value = userPracData.map((item, index) => {
        return {
          text: textArr[index],
          max: item.scoreTotal
        }
      })
      // 创建或更新时间
      let timeStr = data.userAchievement.updateTime ? data.userAchievement.updateTime : data.userAchievement.createTime;
      lastTime.value = (timeStr.trim().split(' '))[0];
    }
    else {
      console.log(message)
    }

  }
  catch (error) {
    console.error(error)
  }
}
// 定义echarts图表dom
const vueref0 = ref(null)
onMounted(() => {
  // 获取首页数据
  _getHomePsychometricInfo();
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    radar: [
      {
        indicator: indicatorList.value,
        center: ['50%', '50%'],
        radius: 100,
        axisName: {
          color: "rgba(47, 57, 79, 1)",
          fontSize: 16
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(228, 234, 240, 1)"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(228, 234, 240, 1)"
          }
        },
        splitArea: {
          show: false
        },
      },
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {
          color: "rgba(192, 190, 245, 1)"
        },
        itemStyle: {
          color: '#5D5FEF',
          opacity: 0
        },
        lineStyle: {
          width: 4
        },
        data: [
          {
            value: userPracList.value,
            name: '雷达图'
          }
        ]
      }
    ]
  };
  Taro.nextTick(() => {
    setTimeout(() => {
      vueref0.value.refresh(option); // 初始化图表
      setInterval(() => {
        let firstValue = option.series[0].data.shift()
        option.series[0].data.push(firstValue)
        vueref0.value.setOption(option) // 异步更新图表数据
      }, 2000)
    }, 200)
  })
})
</script>



