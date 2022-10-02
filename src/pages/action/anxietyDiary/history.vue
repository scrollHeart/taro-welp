<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
    <div class="bg-linear"></div>
    <main class="history-wrap">
        <h2>
            历史记录
            <div>
                <span :class="{'active': (activeText === '已完成')}" @click="clickTab('已完成')">已完成</span>
                <span :class="{'active': (activeText === '未完成')}" @click="clickTab('未完成')">未完成</span>
            </div>
        </h2>
        <ul v-if="activeText === '已完成'" class="done-wrap">
            <li>
                <p>我在担心我的期中考试，时间太紧张，我...</p>
                <div>
                    已经于 <span>2022年1月3日</span> <span>未实现</span>
                </div>
            </li>
        </ul>
        <ul v-if="activeText === '未完成'" class="un-done-wrap">
            <li @click="realityCheckHandle('1')">
                <span class="time-title">2022年2月7日 / 2:08 上午</span>
                <p>我在担心我的期中考试，时间太紧张，我...</p>
                <div>
                    应于 <span>2022年4月3日</span> <span>现实检验</span>
                </div>
            </li>
            <li @click="realityCheckHandle('2')">
                <span class="time-title">2022年2月7日 / 2:08 上午</span>
                <p>我在担心我的期中考试，时间太紧张，我...</p>
                <div>
                    应于 <span>2022年4月3日</span> <span>现实检验</span>
                </div>
            </li>
        </ul>
    </main>
    <nut-actionsheet
      v-model:visible="actionState.isVisible"
      :menu-items="menuItems"
      cancel-txt="取消"
      @choose="chooseItem"
    >
    </nut-actionsheet>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { ref, Ref, reactive, onMounted } from 'vue'
import TopNav from '@/components/topNav.vue'
// 初始化当前tab值
const activeText = ref('未完成')
// 面板数据
const actionState = reactive({
      isVisible: false,
      val: '',
    });
// 面板选项文字
const menuItems = [
      {
        name: '现实检验'
      },
      {
        name: '查看'
      },
    ];
// 面板选项操作
const chooseItem = (itemParams) => {
      actionState.val = itemParams.name;
      if (itemParams.name === '现实检验') {
        Taro.redirectTo({url: '/pages/action/anxietyDiary/realityCheck/index'})
      } else if (itemParams.name === '查看') {
        console.log('跳转到查看焦虑记录详情页')
      }
    };
// 点击现实检验
const realityCheckHandle = (val) => {
    actionState.isVisible = !actionState.isVisible;
    console.log(val, '现实检验')
}
// 点击tab
const clickTab = (val) => {
    activeText.value = val
}
</script>
<style lang="less">
.history-wrap {
    padding: 0 20px;
    font-weight: 600;
    color: #2F394F;
    line-height: 30px;
    h2 {
        display: flex;
        align-items: center;
        font-size: 22px;
        margin-bottom: 16px;
        div {
            display: flex;
            margin-left: 20px;
        }
        span {
            width: 51px;
            height: 19px;
            border-radius: 100px;
            color: #86909C;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }
        .active {
            color: #fff;
            background: #4E5969;
        }
    }
    .done-wrap {
        li {
            height: 78px;
            background: #E5E6EB;
            border-radius: 8px 8px 8px 8px;
            padding: 15px;
            box-sizing: border-box;
            p {
                font-size: 16px;
                color: #2F394F;
            }
            div {
                font-size: 14px;
                color: #86909C;
                display: flex;
                span {
                    margin-left: 5px;
                }
            }
        }
    }
    .un-done-wrap {
        li {
            padding: 15px;
            height: 106px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 1px rgba(20,46,110,0.1);
            border-radius: 8px 8px 8px 8px;
            box-sizing: border-box;
            margin-bottom: 16px;
            .time-title {
                color: #C9CDD4;
                font-size: 12px;
            }
            p {
                font-size: 16px;
                font-weight: 600;
                color: #2F394F;
            }
            >div {
                font-size: 14px;
                font-weight: 400;
                color: #9290F4;
                display: flex;
                span {
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>
